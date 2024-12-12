export interface User {
  id: number;
  username: string;
  email: string;
}

export interface TweetState {
  errors?: {
    content?: string[];
  };
  success?: boolean;
}

export interface ProfileClientProps {
  user: {
    username: string;
    email: string;
    createdAt: Date;
  };
}

export type Tweet = {
  id: number;
  content: string;
  createdAt: Date;
  user: { id: number; username: string };
  likes: { id: number; userId: number; tweetId: number }[];
  responses: { id: number; content: string; createdAt: Date; userId: number; updatedAt: Date; tweetId: number }[];
};

export interface PageProps {
  params: {
    id: string;
  };
}
