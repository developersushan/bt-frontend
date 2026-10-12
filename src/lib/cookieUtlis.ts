import { cookies } from "next/headers";

export const setCookie = async (
  name: string,
  token: string,
  rememberMe: boolean,
) => {
  const cookieStore = await cookies();

  if (rememberMe) {
    cookieStore.set(name, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  } else {
    cookieStore.set({
      name: name,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
  }
};

export const getCookie = async (name: string) => {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
};

export const deleteCookie = async (name: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(name);
};
