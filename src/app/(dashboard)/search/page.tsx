import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import SearchResult from "@/components/common/SearchResult";
import { SearchPageProps } from "@/types/dashboard";
import { searchTweets } from "@/lib/actions/searchTweets";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "당근 마켓 | 검색",
  description: "당근 마켓 검색 페이지",
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || "";
  const tweets = query ? await searchTweets(query) : [];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <form>
            <Input name="q" defaultValue={query} placeholder="트윗 내용이나 작성자 검색..." className="pl-10 bg-gray-800 border-gray-700 text-gray-200" />
          </form>
        </div>

        {query && (
          <h2 className="text-gray-200 mb-4">
            "{query}" 검색 결과 ({tweets.length}개)
          </h2>
        )}

        <div className="space-y-4">
          {tweets.map((tweet) => (
            <SearchResult key={tweet.id} tweet={tweet} />
          ))}

          {query && tweets.length === 0 && <p className="text-center text-gray-400">검색 결과가 없습니다.</p>}
        </div>
      </div>
    </div>
  );
}
