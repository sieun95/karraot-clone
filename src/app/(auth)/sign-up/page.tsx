"use client";

import { useFormState } from "react-dom";
import { signUpAction } from "@/lib/actions/signUp";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function SignUp() {
  const [state, formAction] = useFormState((prevState: any, formData: FormData) => signUpAction(formData), {
    errors: { username: [], email: [], password: [], passwordConfirm: [], _form: [] },
    success: undefined,
  });

  if (state.success) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center px-4">
      <Card className="w-full max-w-md bg-gray-800/70 backdrop-blur-sm shadow-2xl border-gray-700">
        <CardHeader className="space-y-2">
          <h1 className="text-2xl font-bold text-center text-gray-200">안녕하세요!</h1>
          <h2 className="text-xl text-center text-gray-300">회원가입을 위해 아래 정보를 입력해주세요</h2>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-300">
                유저 이름
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="유저 이름"
                required
                className={`bg-gray-700/50 border-gray-600 text-gray-200 placeholder:text-gray-400 focus:border-orange-400 ${state.errors?.username?.length ? "border-red-500" : ""}`}
              />
              {state.errors?.username?.map((error) => (
                <p key={error} className="text-sm text-red-400">
                  {error}
                </p>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                이메일
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="이메일"
                required
                className={`bg-gray-700/50 border-gray-600 text-gray-200 placeholder:text-gray-400 focus:border-orange-400 ${state.errors?.email?.length ? "border-red-500" : ""}`}
              />
              {state.errors?.email?.map((error) => (
                <p key={error} className="text-sm text-red-400">
                  {error}
                </p>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">
                비밀번호
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="비밀번호"
                required
                className={`bg-gray-700/50 border-gray-600 text-gray-200 placeholder:text-gray-400 focus:border-orange-400 ${state.errors?.password?.length ? "border-red-500" : ""}`}
              />
              {state.errors?.password?.map((error) => (
                <p key={error} className="text-sm text-red-400">
                  {error}
                </p>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="passwordConfirm" className="text-gray-300">
                비밀번호 확인
              </Label>
              <Input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                placeholder="비밀번호 확인"
                required
                className={`bg-gray-700/50 border-gray-600 text-gray-200 placeholder:text-gray-400 focus:border-orange-400 ${state.errors?.passwordConfirm?.length ? "border-red-500" : ""}`}
              />
              {state.errors?.passwordConfirm?.map((error) => (
                <p key={error} className="text-sm text-red-400">
                  {error}
                </p>
              ))}
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white">
              회원가입
            </Button>
          </form>
          <p className="mt-6 text-center text-gray-300">
            이미 계정이 있으신가요?{" "}
            <Link href="/sign-in" className="text-orange-400 hover:text-orange-500 transition-colors">
              로그인하기
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
