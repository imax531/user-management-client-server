"use client";

import { AUTHENTICATION_COOKIE_NAME } from "@/config";
import { useCookies } from "react-cookie";
import jwt from "jsonwebtoken";
import { UserDTO } from "@dtos/User";

export enum UserType {
  ADMIN = 0,
  USER = 1,
}

export interface TokenData extends UserDTO {
  isAdmin: boolean;
  clear: () => void;
}

export function useJWT(): TokenData | undefined {
  const [cookies, setCookie, removeCookie] = useCookies([
    AUTHENTICATION_COOKIE_NAME,
  ]);
  const res = jwt.decode(cookies.jwt);
  if (res !== null) {
    const user = res as UserDTO;
    return {
      ...user,
      isAdmin: user.type === UserType.ADMIN,
      clear: () => removeCookie(AUTHENTICATION_COOKIE_NAME),
    };
  }
}
