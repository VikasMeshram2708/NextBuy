"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { newUserSchema } from "../models/UserSchema";
// import { signIn } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<newUserSchema>({
    resolver: zodResolver(newUserSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: newUserSchema) => {
      try {
        const res = await fetch("/api/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result?.message || "Credentials Login Failed");
        }

        return result;
      } catch (error) {
        throw new Error(`Something went wrong. Login Failed :${error}`);
      }
    },
    onSuccess: (result) => {
      return toast.success(result?.message || "User Registered");
    },
    onError: (result) => {
      return toast.error(`An unexpected error occurred. :${result?.message}`);
    },
  });

  const onSubmit: SubmitHandler<newUserSchema> = (data) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-4 py-2">
      <Card className="w-full max-w-lg mx-auto dark">
        <CardHeader>
          <CardTitle>
            <span className="text-3xl font-bold">
              {isPending ? "Processing..." : "Sign Up"}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                type="text"
                {...register("username", { required: true })}
                placeholder="User Name"
              />
              {errors?.username && (
                <span className="text-red-500 text-sm">
                  {errors?.username?.message}
                </span>
              )}
            </div>
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
                {isPending ? "Processing..." : "Sign Up"}
              </Button>
              <p>
                <span>
                  Already an user ?{" "}
                  <Link href="/login" className="hover:underline">
                    Login
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
