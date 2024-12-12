import { getProfileAction } from "@/lib/actions/profile";
import ProfileClient from "@/components/common/ProfileClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "당근 마켓 | 프로필",
  description: "당근 마켓 프로필 페이지",
};

export default async function Profile() {
  const user = await getProfileAction();
  if (!user) return null;

  return <ProfileClient user={user} />;
}
