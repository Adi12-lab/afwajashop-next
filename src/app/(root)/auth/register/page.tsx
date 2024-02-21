"use client";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { axiosInstance } from "~/lib/utils";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import PasswordInput from "~/components/ready-use/password-input";
import { registerSchema } from "~/schema";
import { Button } from "~/components/ui/button";

function Register() {
  const router = useRouter();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registerMutation = useMutation({
    mutationKey: ["register"],
    mutationFn: (payload: z.infer<typeof registerSchema>) => {
      return axiosInstance.post("/auth/register", payload);
    },
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {
    // console.log(values)
    registerMutation.mutate(values);
  }

  return (
    <div className="container max-w-full flex flex-col justify-center gap-y-10 items-center">
      <div>
        <h1 className="text-4xl">Registrasi Akun</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-[400px] md:w-[573px]"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} disabled={registerMutation.isPending}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password *</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="*******" {...field} disabled={registerMutation.isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Konfirmasi Password *</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="*******" {...field} disabled={registerMutation.isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-4 flex flex-col items-center gap-y-3">
            <Button
              type="submit"
              className="font-bold rounded-full uppercase px-[35px] h-[45.6px]"
              size={"long"}
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : (
                <span>Register</span>
              )}
            </Button>
            <p>
              Belum registrasi ?{" "}
              <Link
                href="/auth/login"
                className="hover:text-primary duration-200"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Register;
