"use client";

import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

/* ---------------- Zod schema ---------------- */
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const id = useId();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      remember: false,
    },
  });

  /* ---------------- Submit handler ---------------- */
  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);

    try {
      // simulate API call
      await new Promise((res) => setTimeout(res, 1500));
      console.log("Login data:", data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md md:max-w-md mx-auto p-6 border rounded-lg shadow-md">
      {/* Header */}
      <div className="flex flex-col items-center gap-2 mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-center">
          Welcome back
        </h2>
        <p className="text-center text-sm text-muted-foreground">
          Enter your credentials to login to your account.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Email */}
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${id}-email`}>Email</Label>
          <Input
            id={`${id}-email`}
            placeholder="rahulpandit@gmail.com"
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${id}-password`}>Password</Label>
          <Input
            id={`${id}-password`}
            placeholder="Enter your password"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember me */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Checkbox id={`${id}-remember`} {...register("remember")} />
            <Label
              htmlFor={`${id}-remember`}
              className="font-normal text-muted-foreground"
            >
              Remember me
            </Label>
          </div>
          <a className="text-sm underline hover:no-underline" href="#">
            Forgot password?
          </a>
        </div>

        {/* Submit */}
        <Button type="submit" className="w-full mt-2" disabled={loading}>
          {loading ?  <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border my-4">
        <span className="text-xs text-muted-foreground">Or</span>
      </div>

      <Button variant="outline" className="w-full" disabled={loading}>
        Login with Google
      </Button>
    </div>
  );
}
