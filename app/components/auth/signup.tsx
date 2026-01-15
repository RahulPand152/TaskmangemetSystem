import { useId } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupForm() {
  const id = useId();

  return (
    <div className="w-full max-w-sm md:max-w-md  mx-auto p-6 border rounded-lg shadow-md">
      {/* Header */}
      <div className="flex flex-col items-center gap-2 mb-6">
        {/* <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border"
          aria-hidden="true"
        >
          <img src="/logo.webp" alt="logo" className="h-8 w-8 rounded-full" />
        </div> */}
        <h2 className="text-2xl md:text-3xl font-semibold text-center">
          Sign up
        </h2>
        <p className="text-center text-sm text-muted-foreground">
          We just need a few details to get you started.
        </p>
      </div>

      {/* Form */}
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${id}-name`}>Full name</Label>
          <Input
            id={`${id}-name`}
            placeholder="Rahul Pandit"
            type="text"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor={`${id}-email`}>Email</Label>
          <Input
            id={`${id}-email`}
            placeholder="rahulpandit@gmail.com"
            type="email"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor={`${id}-password`}>Password</Label>
          <Input
            id={`${id}-password`}
            placeholder="Enter your password"
            type="password"
            required
          />
        </div>

        <Button type="button" className="w-full mt-4">
          Sign up
        </Button>
      </form>

      {/* Or divider */}
      <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1 my-4">
        <span className="text-muted-foreground text-xs">Or</span>
      </div>

      <Button variant="outline" className="w-full mb-4">
        Continue with Google
      </Button>

      {/* Terms */}
      <p className="text-muted-foreground text-center text-xs">
        By signing up you agree to our{" "}
        <a className="underline hover:no-underline" href="#">
          Terms
        </a>
        .
      </p>
    </div>
  );
}
