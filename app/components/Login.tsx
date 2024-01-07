"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Input,
  Button,
} from "@nextui-org/react";

import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

export function LoginPassword(props: any) {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      name="password"
      id=""
      label="Password"
      variant="bordered"
      placeholder="Enter your password"
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <FaRegEye className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <FaRegEyeSlash className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
      className="max-w-xs"
    />
  );
}

export function LoginEmail() {
  return (
    <Input
      name="email"
      id=""
      label="Email"
      variant="bordered"
      placeholder="Enter your email"
      type="email"
      className="max-w-xs"
    />
  );
}

export function Login() {
  return (
    <div className=" h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 font-semibold p-4">
      <Card className="max-w-[400px] bg-white/70">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col items-center w-full">
            <p className="text-xl">Welcome to KULUV ! Please 🥹</p>
            <p className="text-lg text-default-500">ล็อกอินเพื่อเข้าใช้งาน</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="py-2">
            <LoginEmail />
          </div>
          <div className="py-2">
            <LoginPassword />
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
          <div className="flex flex-col items-center w-full">
            <Button
              radius="full"
              className="w-full bg-gradient-to-tr from-pink-500 to-purple-500 text-white shadow-lg"
            >
              Login
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
