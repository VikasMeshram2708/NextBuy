"use client";

import { ContactSchema } from "@/app/models/ContactSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactSchema>({
    resolver: zodResolver(ContactSchema),
  });

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (data: ContactSchema) => {
      const res = await fetch("/api/user/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to submit your message");
      }
      return res.json();
    },
    onSuccess: () => toast.success("Form Submitted Successfully"),
    onError: (error) => {
      if (isError) {
        toast.error(
          `Something went wrong. Failed to submit your message. : ${error}`
        );
      }
    },
  });

  const onSubmit: SubmitHandler<ContactSchema> = (data) => {
    try {
      reset();
      mutate(data);
    } catch (error) {
      throw new Error(
        `Something went wrong. Failed to submit your message. :${error}`
      );
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Card className="dark w-full max-w-lg mx-auto">
        <CardHeader>
          <span className="text-2xl font-bold text-center mb-4">
            {isPending ? <span className=".myLoader"></span> : "Contact Us"}
          </span>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              {...register("subject", { required: true })}
              type="text"
              placeholder="Subject"
            />
            {errors?.subject && (
              <span className="text-sm text-red-500">
                {errors?.subject?.message}
              </span>
            )}
            <Input
              {...register("email", { required: true })}
              type="email"
              placeholder="Email"
            />
            {errors?.email && (
              <span className="text-sm text-red-500">
                {errors?.email?.message}
              </span>
            )}
            <Textarea
              {...register("message", { required: true })}
              placeholder="Message"
            />
            {errors?.message && (
              <span className="text-sm text-red-500">
                {errors?.message?.message}
              </span>
            )}
            <Button variant={"secondary"}>Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
