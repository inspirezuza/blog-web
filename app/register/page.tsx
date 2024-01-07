"use client";

import { useFormState } from "react-dom";
import { login } from "./action";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import {
  LoginEmail,
  LoginName,
  LoginPassword,
  LoginPasswordConfirm,
} from "../components/Login";

export default function Page() {
  const initState = {
    message: "",
  };

  const [state, formAction] = useFormState(login, initState);

  return (
    <>
      <form action={formAction}>
        <div className=" h-screen flex items-center justify-center font-semibold p-2">
          <Card className="max-w-[400px] bg-white/70">
            <CardHeader className="flex gap-3">
              <div className="flex flex-col items-center w-full">
                <p className="text-xl font-extrabold">Register</p>
                <p className="text-lg text-default-500">
                  ลงทะเบียนเพื่อเข้าใช้งาน KULUV ♥ จร้า
                </p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="py-2">
                <LoginName />
              </div>
              <div className="py-2">
                <LoginEmail />
              </div>
              <div className="py-2">
                <LoginPassword />
              </div>
              <div className="py-2">
                <LoginPasswordConfirm />
              </div>
            </CardBody>
            <Divider />
            <CardFooter>
              <div className="flex flex-col items-center w-full">
                <div className="max-w-80 text-sm py-4">
                  {" "}
                  Message : {state?.message}
                </div>
                <Button
                  type="submit"
                  radius="full"
                  className="w-full bg-gradient-to-tr from-pink-500 to-purple-500 text-white shadow-lg"
                >
                  Register
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </form>
    </>
  );
}
