"use server";

import { LoginInput } from "@/modal/auth/login/login-form";
import { RegisterInput } from "@/modal/auth/register/register-form";

export async function registerUser(formData: RegisterInput) {
  const response = await fetch(`${process.env.API_BASE_URL}/users/register`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function loginUser(data: LoginInput) {
  const response = await fetch(`${process.env.API_BASE_URL}/users/login`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  const resData = await response.json();
  return resData;
}
