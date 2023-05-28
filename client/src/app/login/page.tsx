"use client";

import { login } from "@/crud";
import { Input } from "@components/Input";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { BaseSyntheticEvent, FormEventHandler, useState } from "react";
import { useCookies } from "react-cookie";
import { AUTHENTICATION_COOKIE_NAME, BACKEND_URL } from "@/config";

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies([
    AUTHENTICATION_COOKIE_NAME,
  ]);
  const router = useRouter();

  const onLogin: FormEventHandler = async (event: BaseSyntheticEvent) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
      setErrorMessage("");
      const result = await login(username, password);
      setCookie("jwt", result.data, { domain: BACKEND_URL });
      router.push("/users");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const axiosError = e as AxiosError;
        setErrorMessage(axiosError.response?.data as string);
      }
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-50">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onLogin}>
          <Input
            id="username"
            title="Username"
            type="username"
            required={true}
            autoComplete="username"
          />
          <Input
            id="password"
            title="Password"
            type="password"
            required={true}
            autoComplete="current-password"
          />

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
          <p className="mt-6 text-base leading-7 text-red-600">
            {errorMessage}
          </p>
        </form>
      </div>
    </div>
  );
}
