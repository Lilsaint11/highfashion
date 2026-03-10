// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Link, useForm } from "@inertiajs/react";

// export default function Signin() {
//   const [step, setStep] = useState<"email" | "code">("email");

//   const emailForm = useForm({ email: "" });
//   const codeForm = useForm({ email: "", code: "" });

//   const handleEmailSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     emailForm.post("/signin/request", {
//       onSuccess: () => {
//         codeForm.setData("email", emailForm.data.email);
//         setStep("code");
//       },
//     });
//   };

//   const handleCodeSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     codeForm.post("/signin/verify");
//   };

//   return (
//     <div className="bg-[#f4f4f4] w-screen h-screen flex items-center justify-center px-5">
//       <div className="bg-white rounded-xl flex flex-col items-center justify-center w-full max-w-md p-8">
//         <Link href="/">
//           <img src="/images/logo-black.webp" alt="Logo" className="cursor-pointer mb-6" />
//         </Link>

//         {step === "email" && (
//           <>
//             <h1 className="text-2xl font-bold">Sign in</h1>
//             <p className="text-sm text-[#aaa] mb-6">
//               Enter your email and we’ll send you a verification code
//             </p>

//             <form onSubmit={handleEmailSubmit} className="space-y-4 w-full">
//               <Input
//                 type="email"
//                 placeholder="Email"
//                 className="w-full h-12 text-sm"
//                 value={emailForm.data.email}
//                 onChange={(e) => emailForm.setData("email", e.target.value)}
//               />
//               {emailForm.errors.email && (
//                 <p className="text-sm text-red-500">{emailForm.errors.email}</p>
//               )}

//               <Button type="submit" disabled={emailForm.processing} className="w-full h-12 font-bold text-md">
//                 {emailForm.processing ? "Sending..." : "Continue"}
//               </Button>
//             </form>
//           </>
//         )}

//         {step === "code" && (
//           <>
//             <h1 className="text-2xl font-bold">Enter Code</h1>
//             <p className="text-sm text-[#aaa] mb-6">
//               We sent a 6-digit code to {codeForm.data.email}
//             </p>

//             <form onSubmit={handleCodeSubmit} className="space-y-4 w-full">
//               <Input
//                 type="text"
//                 placeholder="Verification Code"
//                 className="w-full h-12 text-sm"
//                 value={codeForm.data.code}
//                 onChange={(e) => codeForm.setData("code", e.target.value)}
//               />
//               {codeForm.errors.code && (
//                 <p className="text-sm text-red-500">{codeForm.errors.code}</p>
//               )}

//               <Button type="submit" disabled={codeForm.processing} className="w-full h-12 font-bold text-md">
//                 {codeForm.processing ? "Verifying..." : "Verify & Sign in"}
//               </Button>
//             </form>
//           </>
//         )}

//         <p className="text-sm mt-5 text-gray-500">Privacy policy</p>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useForm } from "@inertiajs/react";

export default function Signin() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const loginForm = useForm({ email: "", password: "" });
  const registerForm = useForm({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginForm.post("/signin");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    registerForm.post("/register");
  };

  return (
    <div className="bg-[#f4f4f4] w-screen h-screen flex items-center justify-center px-5">
      <div className="bg-white rounded-xl flex flex-col items-center justify-center w-full max-w-md p-8">
        <Link href="/">
          <img src="/images/logo-black.webp" alt="Logo" className="cursor-pointer mb-6" />
        </Link>

        {mode === "login" && (
          <>
            <h1 className="text-2xl font-bold">Sign in</h1>
            <p className="text-sm text-[#aaa] mb-6">Welcome back</p>

            <form onSubmit={handleLogin} className="space-y-4 w-full">
              <Input
                type="email"
                placeholder="Email"
                className="w-full h-12 text-sm"
                value={loginForm.data.email}
                onChange={(e) => loginForm.setData("email", e.target.value)}
              />
              {loginForm.errors.email && (
                <p className="text-sm text-red-500">{loginForm.errors.email}</p>
              )}

              <div className="relative">
                  <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="w-full h-12 text-sm"
                      value={loginForm.data.password}
                      onChange={(e) => loginForm.setData("password", e.target.value)}
                      required
                      tabIndex={2}
                      autoComplete="current-password"
                      placeholder="Password"
                  />
                  <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
              </div>
              {loginForm.errors.password && (
                <p className="text-sm text-red-500">{loginForm.errors.password}</p>
              )}

              <Button type="submit" disabled={loginForm.processing} className="w-full h-12 font-bold text-md">
                {loginForm.processing ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <p className="text-sm mt-5 text-gray-500">
              Don't have an account?{" "}
              <button onClick={() => setMode("register")} className="text-black font-semibold underline">
                Register
              </button>
            </p>
          </>
        )}

        {mode === "register" && (
          <>
            <h1 className="text-2xl font-bold">Create account</h1>
            <p className="text-sm text-[#aaa] mb-6">Sign up to get started</p>

            <form onSubmit={handleRegister} className="space-y-4 w-full">
              <div className="flex gap-2">
                <div className="w-full">
                  <Input
                    type="text"
                    placeholder="First name"
                    className="w-full h-12 text-sm"
                    value={registerForm.data.first_name}
                    onChange={(e) => registerForm.setData("first_name", e.target.value)}
                  />
                  {registerForm.errors.first_name && (
                    <p className="text-sm text-red-500">{registerForm.errors.first_name}</p>
                  )}
                </div>
                <div className="w-full">
                  <Input
                    type="text"
                    placeholder="Last name"
                    className="w-full h-12 text-sm"
                    value={registerForm.data.last_name}
                    onChange={(e) => registerForm.setData("last_name", e.target.value)}
                  />
                  {registerForm.errors.last_name && (
                    <p className="text-sm text-red-500">{registerForm.errors.last_name}</p>
                  )}
                </div>
              </div>

              <Input
                type="email"
                placeholder="Email"
                className="w-full h-12 text-sm"
                value={registerForm.data.email}
                onChange={(e) => registerForm.setData("email", e.target.value)}
              />
              {registerForm.errors.email && (
                <p className="text-sm text-red-500">{registerForm.errors.email}</p>
              )}

              <div className="relative">
                  <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="w-full h-12 text-sm"
                      value={registerForm.data.password}
                      onChange={(e) => registerForm.setData("password", e.target.value)}
                      required
                      tabIndex={2}
                      autoComplete="current-password"
                      placeholder="Password"
                  />
                  <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
              </div>
              {registerForm.errors.password && (
                <p className="text-sm text-red-500">{registerForm.errors.password}</p>
              )}

             
                <div className="relative">
                  <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Confirm password"
                      className="w-full h-12 text-sm"
                      value={registerForm.data.password_confirmation}
                      onChange={(e) => registerForm.setData("password_confirmation", e.target.value)}
                      required
                      tabIndex={2}
                      autoComplete="current-password"
                  />
                  <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
              </div>

              <Button type="submit" disabled={registerForm.processing} className="w-full h-12 font-bold text-md">
                {registerForm.processing ? "Creating account..." : "Create account"}
              </Button>
            </form>

            <p className="text-sm mt-5 text-gray-500">
              Already have an account?{" "}
              <button onClick={() => setMode("login")} className="text-black font-semibold underline">
                Sign in
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
