"use client";

import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  AuthProvider,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (password == confirmPassword) {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        console.log("res after creating user with email and password: ", res);
        router.push("/dashboard");
      } catch (error) {
        console.log("Error in signup with email and password: ", error);
        throw error;
      }
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

  const handleSignUpWithGoogle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (employeeId === "") {
      console.log("EmployeeId is not present");
    } else {
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
    }
  };
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Create an account</h1>
        <p className="text-gray-400">Enter your information to get started</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Employee ID */}
        <div>
          <Label htmlFor="employeeId" className="text-gray-300">
            Employee ID
          </Label>
          <div className="relative mt-1">
            <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              id="employeeId"
              type="text"
              value={employeeId}
              required
              placeholder="12345"
              className="border-[#252525] bg-[#131313] pl-10 text-white placeholder-gray-500 focus:ring-[#26890d]"
              onChange={(e) => setEmployeeId(e.target.value)}
            />
          </div>
        </div>

        {/* Full Name */}
        <div>
          <Label htmlFor="name" className="text-gray-300">
            Full Name
          </Label>
          <div className="relative mt-1">
            <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              id="name"
              type="text"
              value={name}
              placeholder="John Doe"
              required
              className="border-[#252525] bg-[#131313] pl-10 text-white placeholder-gray-500 focus:ring-[#26890d]"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

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
              required
              className="border-[#252525] bg-[#131313] pl-10 text-white placeholder-gray-500 focus:ring-[#26890d]"
              onChange={(e) => setEmail(e.target.value)}
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
              className="border-[#252525] bg-[#131313] pl-10 pr-10 text-white placeholder-gray-500 focus:ring-[#26890d]"
              onChange={(e) => setPassword(e.target.value)}
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

        {/* Confirm Password */}
        <div>
          <Label htmlFor="confirmPassword" className="text-gray-300">
            Confirm Password
          </Label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              required
              className="border-[#252525] bg-[#131313] pl-10 pr-10 text-white placeholder-gray-500 focus:ring-[#26890d]"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-400"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            className="border-gray-600 checked:bg-[#26890d]"
          />
          <label htmlFor="terms" className="text-sm text-gray-300">
            I agree to the{" "}
            <Link href="/terms" className="text-[#26890d] hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-[#26890d] hover:underline">
              Privacy Policy
            </Link>
          </label>
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
          {isLoading ? "Creating account..." : "Sign Up"}
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
        onClick={handleSignUpWithGoogle}
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

      <div className="mt-4 text-center text-sm">
        <span className="text-gray-400">Already have an account? </span>
        <Link href="/login" className="text-[#26890d] hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
}
