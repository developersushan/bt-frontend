import "server-only";
import AppError from "@/helpers/AppError";
import { cookies } from "next/headers";
import status from "http-status";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type FetchOptions<TBody = unknown> = Omit<RequestInit, "body" | "method"> & {
  method?: HttpMethod;
  body?: TBody;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new AppError(status.NOT_FOUND, "API_BASE_URL is not defined");
}

export async function fetcher<TResponse = unknown, TBody = unknown>(
  endpoint: string,
  options: FetchOptions<TBody> = {},
): Promise<TResponse> {
  const {
    body,
    headers: customHeaders,
    method = "GET",
    ...requestOptions
  } = options;

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const isFormData = body instanceof FormData;
    const headers = new Headers(customHeaders);

    if (token && !headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    if (body !== undefined && !isFormData && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...requestOptions,
      method,
      headers,
      body:
        body === undefined
          ? undefined
          : isFormData
            ? (body as BodyInit)
            : JSON.stringify(body),
      cache: "no-store",
    });
  } catch {
    throw new AppError(503, "Unable to connect to the API server");
  }

  let data: unknown = null;

  try {
    if (response.status !== 204) {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      data = await (isJson ? response.json() : response.text());
    }
  } catch {
    throw new AppError(response.status, "Failed to parse the API response");
  }

  if (!response.ok) {
    const message =
      (data as Record<string, string>)?.message ||
      `Request failed with status ${response.status}`;
    throw new AppError(response.status, message);
  }

  return data as TResponse;
}
