"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginSchema } from "../models/UserSchema";
import { signIn } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
// import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: loginSchema) => {
      // Call signIn and wait for response
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      return res;
    },
    onSuccess: (result) => {
      if (result?.ok) {
        toast.success("Logged In");
        return router.push("/");
      } else {
        toast.error(result?.error || "Login failed");
      }
    },
    onError: () => {
      toast.error("An unexpected error occurred.");
    },
  });

  const onSubmit: SubmitHandler<loginSchema> = (data) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-4 py-2">
      <Card className="w-full max-w-lg mx-auto dark">
        <CardHeader>
          <CardTitle className="text-3xl text-center font-bold">
            <span>{isPending ? "Processing..." : "Login"}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                type="email"
                {...register("email", { required: true })}
                placeholder="Email"
              />
              {errors?.email && (
                <span className="text-red-500 text-sm">
                  {errors?.email?.message}
                </span>
              )}
            </div>
            <div>
              <Input
                {...register("password", { required: true })}
                type="password"
                placeholder="Password"
              />
              {errors?.password && (
                <span className="text-red-500 text-sm">
                  {errors?.password?.message}
                </span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <Button disabled={isPending} variant={"secondary"}>
                {isPending ? "Processing..." : "Login"}
              </Button>
              <p>
                <span>
                  Not an user ?{" "}
                  <Link href="/signup" className="hover:underline">
                    Sign Up
                  </Link>
                </span>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
