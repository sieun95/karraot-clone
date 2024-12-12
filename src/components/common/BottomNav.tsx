import Link from "next/link";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "@/lib/auth/session";
import { SessionData } from "@/types/auth";
import { signOutAction } from "@/lib/actions/signOut";
import { Home, Search, PenSquare, MessageCircle, User, LogIn } from "lucide-react";

export default async function BottomNav() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t dark:border-gray-800 py-2 px-4 shadow-lg z-50">
      <div className="max-w-md mx-auto flex justify-around items-center">
        <Link href="/" className="flex flex-col items-center gap-1 p-2 text-gray-600 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-500 transition-colors">
          <Home className="w-6 h-6" />
          <span className="text-xs font-medium">홈</span>
        </Link>

        <Link href="/search" className="flex flex-col items-center gap-1 p-2 text-gray-600 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-500 transition-colors">
          <Search className="w-6 h-6" />
          <span className="text-xs font-medium">검색</span>
        </Link>

        <Link href="/write" className="flex flex-col items-center gap-1 p-2 text-gray-600 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-500 transition-colors">
          <PenSquare className="w-6 h-6" />
          <span className="text-xs font-medium">글쓰기</span>
        </Link>

        {session.user ? (
          <Link href="/profile" className="flex flex-col items-center gap-1 p-2 text-gray-600 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-500 transition-colors">
            <User className="w-6 h-6" />
            <span className="text-xs font-medium">프로필</span>
          </Link>
        ) : (
          <Link href="/sign-in" className="flex flex-col items-center gap-1 p-2 text-gray-600 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-500 transition-colors">
            <LogIn className="w-6 h-6" />
            <span className="text-xs font-medium">로그인</span>
          </Link>
        )}
      </div>
    </nav>
  );
}