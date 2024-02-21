"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

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
import { loginSchema } from "~/schema";
import { Button } from "~/components/ui/button";
import { axiosInstance } from "~/lib/utils";

function Login() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (payload: z.infer<typeof loginSchema>) => {
      return axiosInstance.post("/auth/login", payload);
    },
    onSuccess: ({ data }) => {
      if (data.role === "ADMIN") {
        router.replace("/admin");
      }
    },
    onError: (data) => {
      toast.error("Login gagal")
    }
  });
  function onSubmit(values: z.infer<typeof loginSchema>) {
    loginMutation.mutate(values);
  }

  return (
    <div className="container max-w-full flex flex-col justify-center gap-y-10 items-center">
      <div>
        <h1 className="text-4xl">Login Akun</h1>
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
                  <Input
                    placeholder="Email"
                    {...field}
                    disabled={loginMutation.isPending}
                  />
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
                  <PasswordInput
                    placeholder="Password"
                    {...field}
                    disabled={loginMutation.isPending}
                  />
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
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : (
                <span>Login</span>
              )}
            </Button>
            <p>
              Belum registrasi ?{" "}
              <Link
                href="/auth/register"
                className="hover:text-primary duration-200"
              >
                Registrasi
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Login;
