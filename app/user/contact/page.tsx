/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { ContactSchema } from "@/app/models/ContactSchema";
import { useHandleContactMutation } from "@/app/store/user/userSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ContactPage() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactSchema>({
    resolver: zodResolver(ContactSchema),
  });

  const [handleContact, { error, isError, isLoading }] =
    useHandleContactMutation();
  const onSubmit: SubmitHandler<ContactSchema> = async (data) => {
    try {
      const result = await handleContact(data);
      toast.success(result?.data || "Form Submitted Successfully");
      reset();
    } catch (error) {
      console.log(`Something went wrong.Please try again; ${error}`);
    }
  };

  useEffect(() => {
    if (isError) {
      console.log("er", error);
      // @ts-ignore
      toast.error(error);
    }
  }, [isError, error]);
  return (
    <div className="min-h-screen container mx-auto flex flex-col justify-center items-center">
      <Card className="dark w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center font-bold text-lg md:text-xl lg:text-2xl xl:text-3xl">
            {isLoading ? "Processing..." : "Contact Us"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("email", { required: true })}
              type="text"
              autoFocus
              className="rounded"
              placeholder="Email"
            />
            {errors?.email && (
              <span className="text-sm text-red-500 font-bold">
                {errors?.email?.message}
              </span>
            )}
            <Input
              {...register("subject", { required: true })}
              type="text"
              className="rounded"
              placeholder="Subject"
            />
            {errors?.subject && (
              <span className="text-sm text-red-500 font-bold">
                {errors?.subject?.message}
              </span>
            )}
            <Textarea
              {...register("message", { required: true })}
              placeholder="Type your message here."
            />
            {errors?.message && (
              <span className="text-sm text-red-500 font-bold">
                {errors?.message?.message}
              </span>
            )}
            <Button disabled={isLoading} type="submit" className="w-full">
              {isLoading ? "Processing..." : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
