"use client";

// import Link from "next/link";
import { Label } from "../ui/label";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  TwitterAuthProvider,
  User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useDialogContext } from "@/lib/context/DialogContext";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoginDialogActive, setIsLoginDialogActive } = useDialogContext();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user: User = userCredential.user;
      console.log("Successfully signin with email and password: ", user);
      router.push("/dashboard");
    } catch (error) {
      console.log("Error in signin with email and password: ", error);
      throw error;
    }
  };

  const signInandLink = async (provider: AuthProvider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      return user;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };

  const handleSignInWithGoogle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInandLink(provider);

      console.log("result: ", result);
      router.push("/dashboard");
      //   await oauthSignin({ user: result });
    } catch (error) {
      console.log("error in signup with google: ", error);
      throw error;
    }
  };

  const handleSignInWithTwitter = async (e:React.FormEvent) => {
    e.preventDefault();
    try {
      const provider = new TwitterAuthProvider();
      const result = await signInandLink(provider);
      console.log("Result: ", result);
      router.push("/dashboard");
    } catch (error) {
      console.log("Error in signup with twitter: ", error);
      throw error;
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Login</h1>
        <p className="text-gray-400">
          Enter your credentials to access your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div>
          <Label htmlFor="email" className="text-gray-300">
            Email
          </Label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              id="email"
              type="email"
              value={email}
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-[#252525] bg-[#131313] pl-10 text-white placeholder-gray-500 focus:ring-[#26890d]"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <Label htmlFor="password" className="text-gray-300">
            Password
          </Label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="border-[#252525] bg-[#131313] pl-10 pr-10 text-white placeholder-gray-500 focus:ring-[#26890d]"
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className={cn(
            "w-full text-lg py-3 bg-[#26890d] hover:bg-[#1f750b]",
            isLoading && "opacity-70"
          )}
        >
          {isLoading ? "Accessing account..." : "Login"}
        </Button>
      </form>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-[#252525] px-2 text-gray-400">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full border-gray-600 bg-transparent text-white hover:bg-[#252525] hover:text-white"
        onClick={handleSignInWithGoogle}
      >
        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Google
      </Button>

      <Button
        variant="outline"
        className="w-full border-gray-600 bg-transparent text-white hover:bg-[#252525] hover:text-white"
        onClick={handleSignInWithTwitter}
      >
        {/* <svg
            className="mr-2 h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.94 0H22L14.56 10.03L23.5 24H16.44L10.97 15.92L4.61 24H1.06L9.03 13.33L0.5 0H7.81L12.72 7.36L18.94 0ZM17.66 21.81H19.79L6.56 2.06H4.28L17.66 21.81Z"
              fill="#000000"
            />
          </svg> */}
        <svg
          className="mr-2 h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.954 4.569c-.885.39-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.56-3.591-1.56-2.719 0-4.92 2.201-4.92 4.917 0 .39.045.765.127 1.124-4.09-.205-7.719-2.165-10.148-5.144-.424.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.112-.849.171-1.296.171-.314 0-.615-.03-.916-.085.631 1.953 2.445 3.377 4.6 3.416-1.68 1.318-3.809 2.105-6.102 2.105-.395 0-.779-.023-1.17-.067 2.189 1.402 4.768 2.222 7.548 2.222 9.057 0 14.001-7.496 14.001-13.986 0-.209 0-.42-.015-.63.962-.695 1.8-1.56 2.46-2.548l-.047-.02z"
            fill="#1DA1F2"
          />
        </svg>
        Twitter
      </Button>

      <div className="mt-4 text-center text-sm">
        <span className="text-gray-400">Don&apos;t have an account? </span>
        <button
          onClick={() => setIsLoginDialogActive(!isLoginDialogActive)}
          className="text-[#26890d] hover:underline"
        >
          Register
        </button>
      </div>
    </div>
  );
}
