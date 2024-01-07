import { Button, Image } from "@nextui-org/react";
import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import Link from "next/link";

interface Blog {
  id: number;
  attributes: {
    title: string;
    description: string;
  };
}

const checkRedirect = async () => {
  try {
    const token = cookies().get("token");
    let response = await fetch(`${process.env.STRAPI_BASE_URL}/api/users/me`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    });
    if (!response.ok) {
      throw new Error("Not Authorized");
    }
    console.log("asdf");
    redirect("/auth/main-page");
  } catch (error) {
    console.log("error", error);
    return [];
  }
};

export default async function Page() {
  checkRedirect();
  return (
    <>
      <div className="h-screen flex items-center justify-center text-white">
        <div className="flex-col items-center flex px-4 gap-5 text-xl">
          <div className="text-center font-extrabold text-4xl ">KU LUV ♥</div>
          <div className="text-center  text-medium px-16 pb-64">
            ให้เราช่วยคุณหาเพื่อนหรือหาแฟนในช่วงวาเลนไทน์
            สำหรับนิสิตม.เกษตรศาสตร์
          </div>
          <Link href="login">
            <Button
              radius="full"
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white text-xl h-16 w-64 font-bold shadow-lg"
            >
              Login
            </Button>
          </Link>{" "}
          <Link href="register">
            <Button
              radius="full"
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white text-xl h-16 w-64 font-bold shadow-lg"
            >
              Register
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
