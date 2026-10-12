import AppError from "@/helpers/AppError";
import { ApiResponse } from "@/types/api.types";
import axios from "axios";
import status from "http-status";
import { cookies } from "next/headers";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new AppError(
    status.NOT_FOUND,
    "NEXT_PUBLIC_API_BASE_URL is not defined",
  );
}

const axiosInstance = async () => {
  try {
    const cookieStore = await cookies();

    const instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    });
    return instance;
  } catch (error) {
    console.error("[axiosInstance] Error creating axios instance:", error);
    throw error;
  }
};

export interface ApiRequestOptions {
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}
const httpGet = async <Tdata>(
  endpoint: string,
  options?: ApiRequestOptions,
): Promise<Tdata> => {
  try {
    const instance = await axiosInstance();
    const response = await instance.get<ApiResponse<Tdata>>(endpoint, {
      params: options?.params,
      headers: options?.headers,
    });
    return response.data.data;
  } catch (error) {
    console.error(`GET request to ${endpoint} failed:`, error);
    throw error;
  }
};

const httpPost = async <TData>(
  endpoint: string,
  data: unknown,
  options?: ApiRequestOptions,
): Promise<TData> => {
  try {
    const instance = await axiosInstance();
    const response = await instance.post<ApiResponse<TData>>(endpoint, data, {
      params: options?.params,
      headers: options?.headers,
    });
    return response.data?.data;
  } catch (error) {
    console.error(`POST request to ${endpoint} failed:`, error);
    throw error;
  }
};

const httpPut = async <TData>(
  endpoint: string,
  data: unknown,
  options?: ApiRequestOptions,
): Promise<TData> => {
  try {
    const instance = await axiosInstance();
    const response = await instance.put<ApiResponse<TData>>(endpoint, data, {
      params: options?.params,
      headers: options?.headers,
    });
    return response.data.data;
  } catch (error) {
    console.error(`PUT request to ${endpoint} failed:`, error);
    throw error;
  }
};

const httpPatch = async <TData>(
  endpoint: string,
  data: unknown,
  options?: ApiRequestOptions,
): Promise<TData> => {
  try {
    const instance = await axiosInstance();
    const response = await instance.patch<ApiResponse<TData>>(endpoint, data, {
      params: options?.params,
      headers: options?.headers,
    });
    return response.data.data;
  } catch (error) {
    console.error(`PATCH request to ${endpoint} failed:`, error);
    throw error;
  }
};

const httpDelete = async <TData>(
  endpoint: string,
  options?: ApiRequestOptions,
): Promise<TData> => {
  try {
    const instance = await axiosInstance();
    const response = await instance.delete<ApiResponse<TData>>(endpoint, {
      params: options?.params,
      headers: options?.headers,
    });
    return response.data.data;
  } catch (error) {
    console.error(`DELETE request to ${endpoint} failed:`, error);
    throw error;
  }
};

export const httpClient = {
  get: httpGet,
  post: httpPost,
  put: httpPut,
  patch: httpPatch,
  delete: httpDelete,
};
