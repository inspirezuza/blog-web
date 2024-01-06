"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function login(prevState: any, formData: any) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch(
      `${process.env.STRAPI_BASE_URL}/api/auth/local`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: email, password }),
      }
    );

    if (!response.ok) {
      // If the response status is not ok, try to get the error message from the server
      const errorData = await response.json();
      const errorMessage =
        errorData.message ||
        "Login Failed. Please check your credentials and try again.";
      throw new Error(errorMessage);
    }
    const data = await response.json();
    cookies().set("token", data.jwt);
  } catch (error: any) {
    console.log(error.message);
    return { message: error.message || "Login Failed" };
  }
  redirect("/special-blogs");
}
