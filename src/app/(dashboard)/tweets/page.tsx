import { getTweets } from "@/lib/actions/getTweets";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PenSquare, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

// 딜레이를 위한 유틸리티 함수
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default async function Tweets() {
  // 5초 딜레이 추가
  await delay(5000);
  const tweets = await getTweets();
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-200">전체 트윗</h1>
          <Link href="/tweets/write">
            <Button className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white">
              <PenSquare className="w-4 h-4 mr-2" />
              트윗 작성
            </Button>
          </Link>
        </div>

        {tweets.map((tweet) => (
          <Link href={`/tweets/${tweet.id}`} key={tweet.id} className="block">
            <Card className="bg-gray-800/70 backdrop-blur-sm shadow-xl border-gray-700 hover:bg-gray-700/70 transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="w-10 h-10 border border-orange-400/20">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${tweet.user.username}`} alt={tweet.user.username} />
                  <AvatarFallback className="bg-gray-700 text-orange-400">{tweet.user.username[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <Link href={`/users/${tweet.user.username}`} className="font-semibold text-gray-200 hover:text-orange-400 transition-colors">
                    {tweet.user.username}
                  </Link>
                  <span className="text-sm text-gray-400">
                    {formatDistanceToNow(new Date(tweet.createdAt), {
                      addSuffix: true,
                      locale: ko,
                    })}
                  </span>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-300 whitespace-pre-wrap mb-4">{tweet.content}</p>
                <div className="flex gap-4 text-gray-400">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{tweet.likes?.length || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{tweet.responses?.length || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
