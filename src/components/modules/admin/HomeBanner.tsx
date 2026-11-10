"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { ImagePlus, Loader2, RefreshCw, Trash2, RotateCw } from "lucide-react";
import imageCompression from "browser-image-compression";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  bannerCreate,
  bannerDelete,
  bannerUploadOne, // ⚡ NEW: add this to banner.service (see notes)
  getBanners,
} from "@/services/admin/banner.service";

// ───────────── Constants ─────────────
const MAX_IMAGES = 20;
const MAX_SIZE_MB = 5;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const COMPRESS_CONCURRENCY = 3; // how many images compress at the same time
const UPLOAD_CONCURRENCY = 4; // how many images upload at the same time

const COMPRESSION_OPTIONS = {
  maxSizeMB: 0.25,
  maxWidthOrHeight: 1600,
  useWebWorker: true,
  initialQuality: 0.75,
  fileType: "image/webp",
};

// ───────────── Validation ─────────────
const validateFile = (file: File): string | null => {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return `${file.name}: শুধু JPG, PNG অথবা WEBP দেওয়া যাবে`;
  }
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    return `${file.name}: ${MAX_SIZE_MB}MB এর বেশি বড় হওয়া যাবে না`;
  }
  return null;
};

const bannerItemSchema = z
  .object({
    // Stable key for React. Never changes, even after upload gives a server id.
    localKey: z.string(),
    // Server id once saved/uploaded, temporary UUID before that.
    bannerId: z.string(),
    previewUrl: z.string().min(1, "Image আবশ্যক"),
    // Present only while the image has NOT been uploaded yet.
    file: z
      .custom<File>((v) => typeof File !== "undefined" && v instanceof File)
      .optional(),
    alt: z.string().max(120, "Alt text সর্বোচ্চ ১২০ অক্ষর"),
    status: z.enum(["idle", "uploading", "done", "error"]).optional(),
    // If this item replaces an already-saved banner, the old server id
    replacesId: z.string().optional(),
  })
  .superRefine((item, ctx) => {
    if (!item.file) return;
    const error = validateFile(item.file);
    if (error) ctx.addIssue({ code: "custom", message: error, path: ["file"] });
  });

const bannerFormSchema = z.object({
  banners: z
    .array(bannerItemSchema)
    .max(MAX_IMAGES, `সর্বোচ্চ ${MAX_IMAGES}টি image দেওয়া যাবে`),
});

type BannerFormValues = z.infer<typeof bannerFormSchema>;
type BannerItem = BannerFormValues["banners"][number];

const isBlobUrl = (url: string): boolean => url.startsWith("blob:");

interface BannerResponse {
  id: number | string;
  image_path: string;
  image_url?: string;
  alt_text?: string;
}
type ApiResponse = {
  data: BannerResponse[];
  status?: string;
  message?: string;
};

// ───────────── Helpers ─────────────

// Run `worker` over `items`, but only `limit` at a time. Keeps result order.
async function runWithLimit<T, R>(
  items: T[],
  limit: number,
  worker: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;

  const runners = Array.from(
    { length: Math.min(limit, items.length) },
    async () => {
      while (true) {
        const i = next++;
        if (i >= items.length) break;
        results[i] = await worker(items[i]);
      }
    },
  );

  await Promise.all(runners);
  return results;
}

// A shared queue: at most `limit` tasks run at once, the rest wait.
const createLimiter = (limit: number) => {
  let active = 0;
  const queue: Array<() => void> = [];

  const release = () => {
    active--;
    queue.shift()?.();
  };

  return <T,>(task: () => Promise<T>): Promise<T> =>
    new Promise<T>((resolve, reject) => {
      const run = () => {
        active++;
        task().then(resolve, reject).finally(release);
      };
      if (active < limit) run();
      else queue.push(run);
    });
};

// Compress one file. Falls back to the original on failure or if not smaller.
const compressFile = async (file: File): Promise<File> => {
  try {
    const out = await imageCompression(file, COMPRESSION_OPTIONS);
    if (out.size >= file.size) return file;

    const baseName = file.name.replace(/\.[^.]+$/, "");
    const ext = out.type === "image/webp" ? "webp" : out.type.split("/")[1];
    return new File([out], `${baseName}.${ext}`, {
      type: out.type,
      lastModified: Date.now(),
    });
  } catch (err) {
    console.error("Compression failed for", file.name, err);
    return file;
  }
};

// The upload endpoint may return { id } or { data: { id } }. Handle both.
type IdLike = string | number;
type UploadShape = {
  id?: IdLike;
  banner?: { id?: IdLike };
  data?: { id?: IdLike; banner?: { id?: IdLike } } | IdLike;
};

const normalizeUploadResponse = (res: unknown): { id: IdLike } => {
  let r: UploadShape | null = null;
  if (typeof res === "string") {
    try {
      r = JSON.parse(res) as UploadShape;
    } catch {
      r = null;
    }
  } else {
    r = res as UploadShape | null;
  }

  const inner = r?.data && typeof r.data === "object" ? r.data : undefined;

  const id =
    r?.id ??
    inner?.id ??
    r?.banner?.id ??
    inner?.banner?.id ??
    (typeof r?.data === "string" || typeof r?.data === "number"
      ? r.data
      : undefined);

  if (id === undefined || id === null) {
    console.error("Unexpected upload response:", res);
    throw new Error(
      `Upload হয়েছে কিন্তু response এ id নেই: ${JSON.stringify(res)}`,
    );
  }
  return { id };
};

export default function HomeBanner() {
  const [pickError, setPickError] = useState<string | null>(null);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isCompressing, setIsCompressing] = useState(false);

  const addInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const replaceIndexRef = useRef<number>(-1);
  const blobUrlsRef = useRef<Set<string>>(new Set());
  const uploadLimiterRef = useRef(createLimiter(UPLOAD_CONCURRENCY));

  const form = useForm({
    defaultValues: {
      banners: [] as BannerItem[],
    },
    validators: {
      onChange: bannerFormSchema,
    },
    onSubmit: async ({ value }) => {
      setSubmitMessage(null);

      // Images are uploaded in the background already. Block save until done.
      if (value.banners.some((b) => b.status === "uploading")) {
        setSubmitMessage("Image upload চলছে, একটু অপেক্ষা করুন");
        return;
      }
      if (value.banners.some((b) => b.file)) {
        setSubmitMessage(
          "কিছু image upload হয়নি। Retry চাপুন বা Remove করুন।",
        );
        return;
      }

      // Only small JSON now: no files in this request.
      const formData = new FormData();
      formData.append(
        "banners",
        JSON.stringify(
          value.banners.map((b, order) => ({
            id: b.bannerId,
            order,
            alt: b.alt,
            hasNewFile: false,
          })),
        ),
      );

      try {
        await bannerCreate(formData);
        setSubmitMessage("Banner সফলভাবে save হয়েছে");
        void fetchDataAndSetForm(); // refresh in background
      } catch (err) {
        setSubmitMessage(
          err instanceof Error ? err.message : "কিছু একটা ভুল হয়েছে",
        );
      }
    },
  });

  const releaseUrl = (url: string): void => {
    if (isBlobUrl(url)) {
      URL.revokeObjectURL(url);
      blobUrlsRef.current.delete(url);
    }
  };

  const fetchDataAndSetForm = async () => {
    try {
      setIsFetching(true);
      const res = (await getBanners()) as ApiResponse | BannerResponse[];
      const bannersArray = Array.isArray(res) ? res : res.data || [];

      const fetchedBanners: BannerItem[] = bannersArray.map(
        (item: BannerResponse) => ({
          localKey: String(item.id),
          bannerId: String(item.id),
          previewUrl: item.image_url || item.image_path,
          alt: item.alt_text || "",
          status: "done",
        }),
      );

      // Free old local previews before replacing them with server data
      form.getFieldValue("banners").forEach((b) => releaseUrl(b.previewUrl));
      form.setFieldValue("banners", fetchedBanners);
    } catch (error) {
      console.error("Failed to fetch banners:", error);
      setSubmitMessage("ব্যানার লোড করতে সমস্যা হয়েছে");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchDataAndSetForm();

    const urls = blobUrlsRef.current;
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
      urls.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ───────────── Item helpers ─────────────
  const createItem = (file: File, replacesId?: string): BannerItem => {
    const previewUrl = URL.createObjectURL(file);
    blobUrlsRef.current.add(previewUrl);
    const id = crypto.randomUUID();
    return {
      localKey: id,
      bannerId: id,
      previewUrl,
      file,
      alt: "",
      status: "idle",
      replacesId,
    };
  };

  // Safe against concurrent updates (uses the functional form)
  const patchItem = (localKey: string, patch: Partial<BannerItem>): void => {
    form.setFieldValue("banners", (prev) =>
      prev.map((item) =>
        item.localKey === localKey ? { ...item, ...patch } : item,
      ),
    );
  };

  // Upload one item in the background (max UPLOAD_CONCURRENCY at once)
  const uploadItem = (localKey: string): Promise<void> => {
    const item = form
      .getFieldValue("banners")
      .find((b) => b.localKey === localKey);
    if (!item?.file) return Promise.resolve();

    const file = item.file;
    const replacesId = item.replacesId;
    patchItem(localKey, { status: "uploading" });

    return uploadLimiterRef.current(async () => {
      try {
        // Server Actions must receive FormData, not a bare File
        const fd = new FormData();
        fd.append("file", file);
        const result = (await bannerUploadOne(fd)) as unknown;

        // Works with both service versions:
        //  - wrapped:  { ok: true, data } / { ok: false, message }
        //  - plain:    the raw API response, e.g. { id, image_url }
        const wrapped = result as {
          ok?: boolean;
          data?: unknown;
          message?: string;
        } | null;

        let payload: unknown = result;
        if (wrapped && typeof wrapped.ok === "boolean") {
          if (!wrapped.ok) {
            throw new Error(wrapped.message || "Upload failed");
          }
          payload = wrapped.data;
        }

        const saved = normalizeUploadResponse(payload);

        // The image is now a normal saved banner: use the server id,
        // drop the file so it is never sent again.
        patchItem(localKey, {
          bannerId: String(saved.id),
          file: undefined,
          status: "done",
          replacesId: undefined,
        });

        // If this replaced an old saved banner, delete the old one now
        if (replacesId) {
          bannerDelete(replacesId).catch((err) =>
            console.error("Old banner delete failed:", err),
          );
        }
      } catch (err) {
        console.error("Upload failed:", err);
        setPickError(
          err instanceof Error ? err.message : "Upload করতে সমস্যা হয়েছে",
        );
        patchItem(localKey, { status: "error" });
      }
    });
  };

  // ───────────── Handlers ─────────────
  const handleAdd = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (files.length === 0) return;

    const remaining = MAX_IMAGES - form.getFieldValue("banners").length;
    const candidates: File[] = [];
    const problems: string[] = [];

    // 1. Validate first (cheap, synchronous)
    for (const file of files) {
      if (candidates.length >= remaining) {
        problems.push(`সর্বোচ্চ ${MAX_IMAGES}টি image দেওয়া যাবে`);
        break;
      }
      const error = validateFile(file);
      if (error) problems.push(error);
      else candidates.push(file);
    }

    setPickError(problems.length ? problems.join(" • ") : null);
    if (candidates.length === 0) return;

    // 2. Compress a few at a time (not all 15 at once)
    setIsCompressing(true);
    let items: BannerItem[] = [];
    try {
      const compressed = await runWithLimit(
        candidates,
        COMPRESS_CONCURRENCY,
        compressFile,
      );
      items = compressed.map((f) => createItem(f));
      form.setFieldValue("banners", (prev) => [...prev, ...items]);
    } finally {
      setIsCompressing(false);
    }

    // 3. Start uploading right away, in the background
    items.forEach((item) => void uploadItem(item.localKey));
  };

  const openReplace = (index: number): void => {
    replaceIndexRef.current = index;
    replaceInputRef.current?.click();
  };

  const handleReplace = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    const file = e.target.files?.[0];
    e.target.value = "";
    const index = replaceIndexRef.current;
    if (!file || index < 0) return;

    const error = validateFile(file);
    if (error) {
      setPickError(error);
      return;
    }

    setPickError(null);
    const current = form.getFieldValue("banners")[index];
    if (!current) return;

    setIsCompressing(true);
    let next: BannerItem | null = null;
    try {
      const compressed = await compressFile(file);

      // If the current item is already saved on the server, remember its id
      // so it can be deleted once the new image uploads successfully.
      const replacesId = current.file ? current.replacesId : current.bannerId;

      releaseUrl(current.previewUrl);
      next = { ...createItem(compressed, replacesId), alt: current.alt };

      const created = next;
      form.setFieldValue("banners", (prev) =>
        prev.map((item, i) => (i === index ? created : item)),
      );
    } finally {
      setIsCompressing(false);
    }

    if (next) void uploadItem(next.localKey);
  };

  const handleRemove = async (index: number): Promise<void> => {
    const current = form.getFieldValue("banners")[index];
    if (!current) return;

    const removeFromUi = () => {
      releaseUrl(current.previewUrl);
      form.setFieldValue("banners", (prev) =>
        prev.filter((_, i) => i !== index),
      );
      setPickError(null);
    };

    // Not uploaded yet (still has a file): it is not on the server.
    // If it was replacing a saved banner, that old one is removed too.
    if (current.file) {
      try {
        if (current.replacesId) await bannerDelete(current.replacesId);
        removeFromUi();
      } catch (error) {
        console.error("Delete Error:", error);
        setPickError("ডিলিট করতে সমস্যা হয়েছে, আবার চেষ্টা করুন");
      }
      return;
    }

    // Already on the server: delete via API
    try {
      await bannerDelete(current.bannerId);
      removeFromUi();
      setSubmitMessage("ব্যানার সফলভাবে ডিলিট হয়েছে");
    } catch (error) {
      console.error("Delete Error:", error);
      setPickError("ডিলিট করতে সমস্যা হয়েছে, আবার চেষ্টা করুন");
    }
  };

  // ───────────── UI ─────────────
  if (isFetching && form.getFieldValue("banners").length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border bg-card">
        <Loader2 className="mr-2 h-6 w-6 animate-spin text-muted-foreground" />
        <span className="text-muted-foreground">Banner লোড হচ্ছে...</span>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <form.Field name="banners" mode="array">
        {(bannersField) => {
          const banners = bannersField.state.value || [];
          const remaining = MAX_IMAGES - banners.length;
          const rootErrors = bannersField.state.meta.errors;
          const showRootError =
            bannersField.state.meta.isTouched && rootErrors.length > 0;

          return (
            <Card className="">
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <CardTitle>Home Banner</CardTitle>
                  <CardDescription>
                    সর্বোচ্চ {MAX_IMAGES}টি image। JPG, PNG বা WEBP, প্রতিটি{" "}
                    {MAX_SIZE_MB}MB পর্যন্ত।
                  </CardDescription>
                </div>
                <Badge variant={remaining === 0 ? "destructive" : "secondary"}>
                  {banners.length} / {MAX_IMAGES}
                </Badge>
              </CardHeader>

              <CardContent className="space-y-4">
                <input
                  ref={addInputRef}
                  type="file"
                  accept={ACCEPTED_TYPES.join(",")}
                  multiple
                  className="hidden"
                  onChange={handleAdd}
                />
                <input
                  ref={replaceInputRef}
                  type="file"
                  accept={ACCEPTED_TYPES.join(",")}
                  className="hidden"
                  onChange={handleReplace}
                />

                {pickError && (
                  <p
                    role="alert"
                    className="text-sm font-medium text-destructive"
                  >
                    {pickError}
                  </p>
                )}
                {showRootError && <FieldError errors={rootErrors} />}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {banners.map((banner, index) => {
                    const isUploading = banner.status === "uploading";
                    const hasError = banner.status === "error";

                    return (
                      <div
                        key={banner.localKey}
                        className="overflow-hidden rounded-lg border bg-card"
                      >
                        <div className="relative aspect-video bg-muted">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={banner.previewUrl}
                            alt={banner.alt || `Banner ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                          <Badge
                            className="absolute left-2 top-2"
                            variant="secondary"
                          >
                            #{index + 1}
                          </Badge>
                          {banner.file && (
                            <Badge className="absolute right-2 top-2">
                              নতুন
                            </Badge>
                          )}

                          {isUploading && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-background/70 text-sm">
                              <Loader2 className="h-6 w-6 animate-spin" />
                              <span>Upload হচ্ছে...</span>
                            </div>
                          )}

                          {hasError && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/80 text-sm">
                              <span className="font-medium text-destructive">
                                Upload ব্যর্থ হয়েছে
                              </span>
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() => void uploadItem(banner.localKey)}
                              >
                                <RotateCw className="mr-1.5 h-4 w-4" />
                                Retry
                              </Button>
                            </div>
                          )}
                        </div>

                        <div className="space-y-2 p-3">
                          <form.Field name={`banners[${index}].alt`}>
                            {(altField) => {
                              const invalid =
                                altField.state.meta.isTouched &&
                                !altField.state.meta.isValid;
                              return (
                                <Field data-invalid={invalid}>
                                  <Input
                                    id={`alt-${banner.localKey}`}
                                    name={altField.name}
                                    value={altField.state.value}
                                    placeholder="Alt text (ঐচ্ছিক)"
                                    aria-invalid={invalid}
                                    onBlur={altField.handleBlur}
                                    onChange={(e) =>
                                      altField.handleChange(e.target.value)
                                    }
                                  />
                                  {invalid && (
                                    <FieldError
                                      errors={altField.state.meta.errors}
                                    />
                                  )}
                                </Field>
                              );
                            }}
                          </form.Field>

                          <form.Field name={`banners[${index}].file`}>
                            {(fileField) =>
                              fileField.state.meta.errors.length > 0 ? (
                                <FieldError
                                  errors={fileField.state.meta.errors}
                                />
                              ) : null
                            }
                          </form.Field>

                          <div className="flex gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              disabled={isCompressing || isUploading}
                              onClick={() => openReplace(index)}
                            >
                              <RefreshCw className="mr-1.5 h-4 w-4" />
                              Replace
                            </Button>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="flex-1"
                              disabled={isCompressing || isUploading}
                              onClick={() => handleRemove(index)}
                            >
                              <Trash2 className="mr-1.5 h-4 w-4" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {(remaining > 0 || isCompressing) && (
                    <button
                      type="button"
                      disabled={isCompressing}
                      onClick={() => addInputRef.current?.click()}
                      className="flex aspect-video min-h-40 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isCompressing ? (
                        <>
                          <Loader2 className="h-7 w-7 animate-spin" />
                          <span>Image প্রসেস হচ্ছে...</span>
                        </>
                      ) : (
                        <>
                          <ImagePlus className="h-7 w-7" />
                          <span>Image যোগ করুন</span>
                          <span className="text-xs">
                            আরও {remaining}টি দেওয়া যাবে
                          </span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex items-center justify-between gap-4">
                <p role="status" className="text-sm text-muted-foreground">
                  {submitMessage}
                </p>
                <form.Subscribe
                  selector={(state) => ({
                    isSubmitting: state.isSubmitting,
                    uploading: state.values.banners.filter(
                      (b) => b.status === "uploading",
                    ).length,
                  })}
                >
                  {({ isSubmitting, uploading }) => (
                    <Button
                      type="submit"
                      disabled={isSubmitting || isCompressing || uploading > 0}
                    >
                      {(isSubmitting || uploading > 0) && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {uploading > 0
                        ? `Uploading ${uploading}...`
                        : "Save changes"}
                    </Button>
                  )}
                </form.Subscribe>
              </CardFooter>
            </Card>
          );
        }}
      </form.Field>
    </form>
  );
}
