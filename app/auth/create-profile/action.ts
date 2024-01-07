"use server";

import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";

export async function login(prevState: any, formData: any) {
  console.log("asdf");
  try {
    const token = cookies().get("token");
    const name = formData.get("name");
    const description = formData.get("description");
    const image = formData.get("image");
    const gender = formData.get("gender");
    console.log(name);
    console.log(description);
    console.log(image);
    console.log(gender);
    const jsonData = {
      data: {
        name: name,
        description: description,
        gender: gender,
        image: image,
      },
    };
    const response = await fetch(
      `${process.env.STRAPI_BASE_URL}/api/profiles`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
        body: JSON.stringify(jsonData),
      }
    );

    if (!response.ok) {
      // If the response status is not ok, try to get the error message from the server
      const errorData = await response.json();
      console.log(errorData);
      const errorMessage =
        errorData.message || "Create profile fail. Please check and try again.";
      throw new Error(errorMessage);
    }
    const data = await response.json();
  } catch (error: any) {
    console.log(error.message);
    return { message: error.message || "Login Failed" };
  }
  redirect("/auth/main-page");
}
