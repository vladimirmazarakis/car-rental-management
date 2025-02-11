"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getToken = async () => {
    const ckies = await cookies();
    return ckies.get("authToken")?.value;
};

export const getRefreshToken = async() => {
  const ckies = await cookies();
  return ckies.get("authRefreshToken")?.value;
};

export const setToken = async (token: string, refreshToken: string) => {
  const ckies = await cookies();
  ckies.set("authToken", token, { httpOnly: true});
  ckies.set("authRefreshToken", refreshToken, { httpOnly: true});
};

export const resetToken = async () => {
    try {
      const ckies = await cookies();
      ckies.delete("authToken");
      ckies.delete("authRefreshToken");
    } catch (error) {
      console.error(error);
    }
}