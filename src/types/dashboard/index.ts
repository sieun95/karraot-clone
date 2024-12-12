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
