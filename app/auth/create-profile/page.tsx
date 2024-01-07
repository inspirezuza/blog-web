"use client";

import { useFormState } from "react-dom";
import { login } from "./action";
import { animals } from "./data";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";

export default function Page() {
  const initState = {
    message: "",
  };

  const [state, formAction] = useFormState(login, initState);

  return (
    <>
      <form action={formAction}>
        <div className=" h-screen flex items-center justify-center font-semibold p-4">
          <Card className="max-w-[400px] bg-white/70">
            <CardHeader className="flex gap-3">
              <div className="flex flex-col items-center w-full">
                <p className="text-xl">kuluv จะเกิด ต้องสร้างโปรไฟล์ก่อน</p>
                <p className="text-lg text-default-500">สร้างโปรไฟล์จร้า</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="py-2">
                <div className="ml-3 text-xs font-medium">
                  Upload your image
                </div>
                <Input
                  type="file"
                  name="image"
                  variant="bordered"
                  className="max-w-xs"
                />
              </div>
              <div className="py-2">
                <Input
                  name="name"
                  id=""
                  label="name"
                  variant="bordered"
                  placeholder="Enter your name"
                  type="text"
                  className="max-w-xs"
                />
              </div>
              <div className="py-2">
                <Input
                  name="description"
                  id=""
                  label="description"
                  variant="bordered"
                  placeholder="Enter your description"
                  type="text"
                  className="max-w-xs"
                />
              </div>
              <div className="py-2">
                <Select
                  name="gender"
                  items={animals}
                  label="gender"
                  variant="bordered"
                  placeholder="Select your gender"
                  className="max-w-xs"
                >
                  {(animal) => (
                    <SelectItem key={animal.value}>{animal.label}</SelectItem>
                  )}
                </Select>
                {/* <Input
                  name="gender"
                  id=""
                  label="gender"
                  variant="bordered"
                  placeholder="Enter your gender"
                  type="text"
                  className="max-w-xs"
                /> */}
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
                  Login
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </form>
    </>
  );
}
