export interface User {
  id: string;
  name: string;
  role: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}
export interface Exam {
  id: string;
  slug: string;
  name: string;
  fullName: string;
  country: string;
  countryFlag: string;
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  icon: string;
  whoIsThisFor: string[];
  whatIncluded: string[];
  studyPlan: {
    phase: string;
    duration: string;
    focus: string[];
  }[];
  reviews: {
    name: string;
    text: string;
    rating: number;
  }[];
}
export interface Course {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  originalPrice?: number;
  thumbnail: string;
  category: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  duration: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  popular: boolean;
  whatYouLearn: string[];
  curriculum: {
    module: string;
    topics: string[];
  }[];
  whoIsThisFor: string[];
  faculty: {
    name: string;
    title: string;
    image: string;
    bio: string;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
}
export interface Review {
  id: string;
  name: string;
  course: string;
  rating: number;
  date: string;
  text: string;
  avatar: string;
  verified: boolean;
}
export interface TestSeries {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  category: string;
  examType: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  questionsCount: number;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  whatIncluded: string[];
  sampleQuestions: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
}
export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  youtubeId: string;
  category: string;
  duration: string;
  views: number;
  date: string;
}

export interface Note {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;price: number;
  category: string;
  subject: string;
  content: string;
  tags: string[];
  author: string;
  dateCreated: string;
  lastUpdated: string;
  featured: boolean;
  popular: boolean;
}
