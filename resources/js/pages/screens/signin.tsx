import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useForm } from "@inertiajs/react";

export default function Signin() {
  const [step, setStep] = useState<"email" | "code">("email");

  const emailForm = useForm({ email: "" });
  const codeForm = useForm({ email: "", code: "" });

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    emailForm.post("/signin/request", {
      onSuccess: () => {
        codeForm.setData("email", emailForm.data.email);
        setStep("code");
      },
    });
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    codeForm.post("/signin/verify");
  };

  return (
    <div className="bg-[#f4f4f4] w-screen h-screen flex items-center justify-center px-5">
      <div className="bg-white rounded-xl flex flex-col items-center justify-center w-full max-w-md p-8">
        <Link href="/">
          <img src="/images/logo-black.webp" alt="Logo" className="cursor-pointer mb-6" />
        </Link>

        {step === "email" && (
          <>
            <h1 className="text-2xl font-bold">Sign in</h1>
            <p className="text-sm text-[#aaa] mb-6">
              Enter your email and we’ll send you a verification code
            </p>

            <form onSubmit={handleEmailSubmit} className="space-y-4 w-full">
              <Input
                type="email"
                placeholder="Email"
                className="w-full h-12 text-sm"
                value={emailForm.data.email}
                onChange={(e) => emailForm.setData("email", e.target.value)}
              />
              {emailForm.errors.email && (
                <p className="text-sm text-red-500">{emailForm.errors.email}</p>
              )}

              <Button type="submit" disabled={emailForm.processing} className="w-full h-12 font-bold text-md">
                {emailForm.processing ? "Sending..." : "Continue"}
              </Button>
            </form>
          </>
        )}

        {step === "code" && (
          <>
            <h1 className="text-2xl font-bold">Enter Code</h1>
            <p className="text-sm text-[#aaa] mb-6">
              We sent a 6-digit code to {codeForm.data.email}
            </p>

            <form onSubmit={handleCodeSubmit} className="space-y-4 w-full">
              <Input
                type="text"
                placeholder="Verification Code"
                className="w-full h-12 text-sm"
                value={codeForm.data.code}
                onChange={(e) => codeForm.setData("code", e.target.value)}
              />
              {codeForm.errors.code && (
                <p className="text-sm text-red-500">{codeForm.errors.code}</p>
              )}

              <Button type="submit" disabled={codeForm.processing} className="w-full h-12 font-bold text-md">
                {codeForm.processing ? "Verifying..." : "Verify & Sign in"}
              </Button>
            </form>
          </>
        )}

        <p className="text-sm mt-5 text-gray-500">Privacy policy</p>
      </div>
    </div>
  );
}
