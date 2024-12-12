import { getTweetById } from "@/lib/actions/getTweets";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { PageProps } from "@/types/dashboard";
import LikeButton from "@/components/common/LikeButton";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "@/lib/auth/session";
import { SessionData } from "@/types/auth";
import ResponseForm from "@/components/common/ResponseForm";
import ResponseList from "@/components/common/ResponseList";

export default async function TweetDetail({ params }: PageProps) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  const tweet = await getTweetById(params.id);

  if (!tweet) {
    return <div>트윗을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="bg-gray-800/70 backdrop-blur-sm shadow-xl border-gray-700">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="w-10 h-10 border border-orange-400/20">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${tweet.user.username}`} alt={tweet.user.username} />
              <AvatarFallback className="bg-gray-700 text-orange-400">{tweet.user.username[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <Link href={`/profile/${tweet.user.id}`} className="font-semibold text-gray-200 hover:text-orange-400 transition-colors">
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
            <p className="text-gray-300 whitespace-pre-wrap">{tweet.content}</p>
          </CardContent>

          <CardFooter className="flex gap-4">
            <LikeButton initialLikes={tweet.likes?.length || 0} tweetId={Number(tweet.id)} initialIsLiked={tweet.likes?.some((like) => like.userId === session.user?.id)} />
            <Button variant="ghost" className="text-gray-400 hover:text-blue-500">
              <MessageCircle className="w-5 h-5 mr-1" />
              <span>{tweet.responses?.length || 0}</span>
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-gray-800/70 backdrop-blur-sm shadow-xl border-gray-700 p-4">
          <h2 className="text-xl font-semibold text-gray-200 mb-4">댓글 작성</h2>
          <ResponseForm tweetId={Number(params.id)} />
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-200">댓글 목록</h2>
          <ResponseList responses={tweet.responses || []} />
        </div>
      </div>
    </div>
  );
}
