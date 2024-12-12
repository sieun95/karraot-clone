import Link from "next/link";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "@/lib/auth/session";
import { SessionData } from "@/types/auth";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "당근 마켓 | HOME",
  description: "당근 마켓 홈페이지",
};

export default async function Home() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-12 lg:py-24">
        <Card className="w-full max-w-5xl mx-auto bg-gray-800/70 backdrop-blur-sm shadow-2xl border-gray-700">
          <CardHeader className="flex flex-col items-center space-y-8 pt-12 pb-8">
            <div className="relative">
              <span className="text-9xl md:text-[150px] animate-bounce">🥕</span>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-12 bg-orange-500/20 blur-xl rounded-full"></div>
            </div>
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                당근마켓
              </h1>
              <h2 className="text-xl md:text-2xl text-gray-400">
                당신 근처의 지역 생활 커뮤니티
              </h2>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col items-center gap-8 p-8 md:p-12">
            {!session.user?.id ? (
              <div className="w-full max-w-md space-y-6">
                <Link href="/sign-up" className="block">
                  <Button className="w-full h-12 text-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white transition-all duration-300 shadow-lg hover:shadow-xl">
                    시작하기
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <div className="flex justify-center items-center gap-3 text-lg">
                  <span className="text-gray-400">이미 계정이 있나요?</span>
                  <Link href="/sign-in" className="font-medium text-orange-400 hover:text-orange-500 transition-colors">
                    로그인하기
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-6">
                <p className="text-2xl font-medium text-gray-300">
                  환영합니다, <span className="text-orange-400">{session.user.username}</span>님!
                </p>
                <p className="text-gray-400">
                  당근마켓과 함께 이웃과 따뜻한 거래를 시작해보세요.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
          <Card className="p-6 hover:shadow-lg transition-shadow bg-gray-800/80 backdrop-blur-sm border-gray-700">
            <div className="text-center space-y-4">
              <span className="text-5xl block">🤝</span>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-orange-400">신뢰할 수 있는 거래</h3>
                <p className="text-gray-400 font-medium">
                  검증된 사용자들과 안전한 거래를 경험하세요
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow bg-gray-800/80 backdrop-blur-sm border-gray-700">
            <div className="text-center space-y-4">
              <span className="text-5xl block">📍</span>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-orange-400">동네 중고 거래</h3>
                <p className="text-gray-400 font-medium">
                  가까운 이웃과 중고 물품을 거래하세요
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow bg-gray-800/80 backdrop-blur-sm border-gray-700">
            <div className="text-center space-y-4">
              <span className="text-5xl block">💬</span>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-orange-400">이웃과 소통</h3>
                <p className="text-gray-400 font-medium">
                  우리 동네의 다양한 이야기를 나눠보세요
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
