"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Mail, User, LogOut, MapPin, Heart, ShoppingBag } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { signOutAction } from "@/lib/actions/signOut";
import { toast } from "sonner";
import { ProfileClientProps } from "@/types/dashboard";

export default function ProfileClient({ user }: ProfileClientProps) {
  const handleSignOut = async () => {
    await signOutAction();
    toast.success("로그아웃 되었습니다");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* 프로필 카드 */}
          <Card className="lg:col-span-1 bg-gray-800/70 backdrop-blur-sm shadow-2xl border-gray-700">
            <CardHeader className="flex flex-col items-center space-y-4">
              <Avatar className="w-32 h-32 border-2 border-orange-400">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} />
                <AvatarFallback className="bg-gray-700 text-orange-400">{user.username[0]}</AvatarFallback>
              </Avatar>
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold text-gray-200">{user.username}</h1>
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">서울특별시 강남구</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4 text-sm text-gray-300">
                <Mail className="w-4 h-4 text-gray-400" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-300">
                <CalendarDays className="w-4 h-4 text-gray-400" />
                <span>가입일: {new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </CardContent>

            <CardFooter>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full bg-red-500/80 hover:bg-red-600/80">
                    <LogOut className="w-4 h-4 mr-2" />
                    로그아웃
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-gray-800 border-gray-700">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-gray-200">로그아웃</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400">정말 로그아웃 하시겠습니까?</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-700 text-gray-200 hover:bg-gray-600">취소</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSignOut} className="bg-red-500/80 hover:bg-red-600/80">
                      로그아웃
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>

          {/* 활동 정보 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 bg-gray-800/70 backdrop-blur-sm shadow-xl border-gray-700 hover:shadow-2xl transition-shadow">
                <div className="flex flex-col items-center space-y-2">
                  <ShoppingBag className="w-8 h-8 text-orange-400" />
                  <h3 className="font-semibold text-gray-300">판매 상품</h3>
                  <p className="text-2xl font-bold text-orange-400">12</p>
                </div>
              </Card>
              <Card className="p-4 bg-gray-800/70 backdrop-blur-sm shadow-xl border-gray-700 hover:shadow-2xl transition-shadow">
                <div className="flex flex-col items-center space-y-2">
                  <Heart className="w-8 h-8 text-orange-400" />
                  <h3 className="font-semibold text-gray-300">관심 상품</h3>
                  <p className="text-2xl font-bold text-orange-400">24</p>
                </div>
              </Card>
              <Card className="p-4 bg-gray-800/70 backdrop-blur-sm shadow-xl border-gray-700 hover:shadow-2xl transition-shadow">
                <div className="flex flex-col items-center space-y-2">
                  <User className="w-8 h-8 text-orange-400" />
                  <h3 className="font-semibold text-gray-300">팔로워</h3>
                  <p className="text-2xl font-bold text-orange-400">156</p>
                </div>
              </Card>
            </div>

            {/* 최근 활동 */}
            <Card className="bg-gray-800/70 backdrop-blur-sm shadow-2xl border-gray-700">
              <CardHeader>
                <h2 className="text-xl font-bold text-gray-200">최근 활동</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border border-gray-700 rounded-lg p-4 bg-gray-800/50">
                  <p className="text-gray-400">아직 활동 내역이 없습니다.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
