"use client";

import { redirect } from "next/navigation";
import Link from "next/link";
import { useFormState } from "react-dom";
import { signInAction } from "@/lib/actions/signIn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function SignIn() {
  const [state, formAction] = useFormState((prevState: any, formData: FormData) => signInAction(formData), {
    errors: { email: [], password: [] },
    success: undefined,
  });

  if (state.success) {
    redirect("/profile");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center px-4">
      <Card className="w-full max-w-md bg-gray-800/70 backdrop-blur-sm shadow-2xl border-gray-700">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center text-gray-200">로그인</h1>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">이메일</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="이메일" 
                required 
                className={`bg-gray-700/50 border-gray-600 text-gray-200 placeholder:text-gray-400 focus:border-orange-400 ${
                  state.errors?.email?.length ? "border-red-500" : ""
                }`}
              />
              {state.errors?.email?.map((error) => (
                <p key={error} className="text-sm text-red-400">
                  {error}
                </p>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">비밀번호</Label>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                placeholder="비밀번호" 
                required 
                className={`bg-gray-700/50 border-gray-600 text-gray-200 placeholder:text-gray-400 focus:border-orange-400 ${
                  state.errors?.password?.length ? "border-red-500" : ""
                }`}
              />
              {state.errors?.password?.map((error) => (
                <p key={error} className="text-sm text-red-400">
                  {error}
                </p>
              ))}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white"
            >
              로그인
            </Button>
          </form>
          <p className="mt-6 text-center text-gray-300">
            계정이 없으신가요?{" "}
            <Link href="/sign-up" className="text-orange-400 hover:text-orange-500 transition-colors">
              회원가입하기
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
