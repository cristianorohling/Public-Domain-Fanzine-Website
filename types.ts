export interface Edition {
  issue: number;
  title: string;
  date: string;
  excerpt: string;
  description: string;
  coverImageUrl: string;
  price: number;
  characterInfo: {
    name: string;
    description: string;
    imageUrl: string;
  }[];
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
}

export interface Wallpaper {
  id: number;
  title: string;
  imageUrl: string;
}

// FIX: Added missing BlogPost interface.
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  link: string;
}
