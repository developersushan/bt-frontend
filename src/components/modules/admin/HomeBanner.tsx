"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { ImagePlus, Loader2, RefreshCw, Trash2 } from "lucide-react";

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
// আপনার সার্ভিস ফাইল থেকে দুটো ফাংশনই ইম্পোর্ট করুন
import { bannerCreate, getBanners } from "@/services/admin/banner.service";

// ───────────── Constants ─────────────
const MAX_IMAGES = 20;
const MAX_SIZE_MB = 5;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

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
    bannerId: z.string(),
    previewUrl: z.string().min(1, "Image আবশ্যক"),
    file: z
      .custom<File>((v) => typeof File !== "undefined" && v instanceof File)
      .optional(),
    alt: z.string().max(120, "Alt text সর্বোচ্চ ১২০ অক্ষর"),
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

export default function HomeBanner() {
  const [pickError, setPickError] = useState<string | null>(null);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  const addInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const replaceIndexRef = useRef<number>(-1);
  const blobUrlsRef = useRef<Set<string>>(new Set());

  // TanStack Form সেটআপ
  const form = useForm({
    defaultValues: {
      banners: [] as BannerItem[],
    },
    validators: {
      onChange: bannerFormSchema,
    },
    onSubmit: async ({ value }) => {
      setSubmitMessage(null);

      const formData = new FormData();
      console.log("test", formData);

      // ফ্রন্টএন্ড থেকে ডাটা ফরম্যাট করা (আপনার আগের লজিক)
      formData.append(
        "banners",
        JSON.stringify(
          value.banners.map((b, order) => ({
            id: b.bannerId,
            order,
            alt: b.alt,
            hasNewFile: !!b.file,
          })),
        ),
      );

      // new file formData append
      value.banners.forEach((b) => {
        if (b.file) formData.append(`file_${b.bannerId}`, b.file);
      });

      try {
        const res = await bannerCreate(formData);

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.message || "Save করা যায়নি");
        }

        setSubmitMessage("Banner সফলভাবে save হয়েছে");

        // ⚡ Save fetch data and set form again
        await fetchDataAndSetForm();
      } catch (err) {
        setSubmitMessage(
          err instanceof Error ? err.message : "কিছু একটা ভুল হয়েছে",
        );
      }
    },
  });

  // ⚡ database set form data
  const fetchDataAndSetForm = async () => {
    try {
      setIsFetching(true);
      const res = await getBanners();

      // API রেসপন্স অনুযায়ী ডাটা ম্যাপ করা (আপনার ব্যাকএন্ড অনুযায়ী পরিবর্তন হতে পারে)
      // ধরুন res.data = [{ id: 1, image_path: '...', image_url: 'http://...', alt_text: '...' }]
      const fetchedBanners = (res.data || []).map((b: any) => ({
        bannerId: String(b.id),
        previewUrl: b.image_url || b.image_path, // সম্পূর্ণ URL
        alt: b.alt_text || "",
      }));

      // ফর্মে নতুন ডাটা সেট করা
      form.setFieldValue("banners", fetchedBanners);
    } catch (error) {
      console.error("Failed to fetch banners:", error);
      setSubmitMessage("ব্যানার লোড করতে সমস্যা হয়েছে");
    } finally {
      setIsFetching(false);
    }
  };

  // পেজ প্রথমবার লোড হলে ডাটা ফেচ করা
  useEffect(() => {
    fetchDataAndSetForm();

    // Unmount হলে সব object URL মুছে memory খালি করা
    const urls = blobUrlsRef.current;
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
      urls.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ───────────── Handlers ─────────────
  const createItem = (file: File): BannerItem => {
    const previewUrl = URL.createObjectURL(file);
    blobUrlsRef.current.add(previewUrl);
    return { bannerId: crypto.randomUUID(), previewUrl, file, alt: "" };
  };

  const releaseUrl = (url: string): void => {
    if (isBlobUrl(url)) {
      URL.revokeObjectURL(url);
      blobUrlsRef.current.delete(url);
    }
  };

  const handleAdd = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (files.length === 0) return;

    const remaining = MAX_IMAGES - form.getFieldValue("banners").length;
    const valid: File[] = [];
    const problems: string[] = [];

    for (const file of files) {
      if (valid.length >= remaining) {
        problems.push(`সর্বোচ্চ ${MAX_IMAGES}টি image দেওয়া যাবে`);
        break;
      }
      const error = validateFile(file);
      if (error) problems.push(error);
      else valid.push(file);
    }

    setPickError(problems.length ? problems.join(" • ") : null);
    if (valid.length) {
      const items = valid.map(createItem);
      form.setFieldValue("banners", (prev) => [...prev, ...items]);
    }
  };

  const openReplace = (index: number): void => {
    replaceIndexRef.current = index;
    replaceInputRef.current?.click();
  };

  const handleReplace = (e: React.ChangeEvent<HTMLInputElement>): void => {
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

    releaseUrl(current.previewUrl);
    const next = createItem(file);

    // bannerId আর alt একই থাকে, তাই server বুঝবে এটা update
    form.setFieldValue("banners", (prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...next, bannerId: current.bannerId, alt: current.alt }
          : item,
      ),
    );
  };

  const handleRemove = (index: number): void => {
    const current = form.getFieldValue("banners")[index];
    if (current) releaseUrl(current.previewUrl);

    // শুধু UI থেকে সরানো হচ্ছে, Save চাপার আগে ডাটাবেস থেকে ডিলিট হবে না
    form.setFieldValue("banners", (prev) => prev.filter((_, i) => i !== index));
    setPickError(null);
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
                {/* Hidden inputs */}
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
                  {banners.map((banner, index) => (
                    <div
                      key={banner.bannerId}
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
                          <Badge className="absolute right-2 top-2">নতুন</Badge>
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
                                  id={`alt-${banner.bannerId}`}
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
                            onClick={() => handleRemove(index)}
                          >
                            <Trash2 className="mr-1.5 h-4 w-4" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {remaining > 0 && (
                    <button
                      type="button"
                      onClick={() => addInputRef.current?.click()}
                      className="flex aspect-video min-h-40 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <ImagePlus className="h-7 w-7" />
                      <span>Image যোগ করুন</span>
                      <span className="text-xs">
                        আরও {remaining}টি দেওয়া যাবে
                      </span>
                    </button>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex items-center justify-between gap-4">
                <p role="status" className="text-sm text-muted-foreground">
                  {submitMessage}
                </p>
                <form.Subscribe selector={(state) => state.isSubmitting}>
                  {(isSubmitting) => (
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Save changes
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
