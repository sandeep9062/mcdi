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
  thumbnails: string[];
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
  thumbnails: string[]; // Array of thumbnail URLs
  category: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  duration: string;
  rating: number;
  reviewCount: number;
  enrollmentCount: number;
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
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}
export interface DentistRegistration {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  originalPrice?: number;
  thumbnails: string[]; // Array of thumbnail URLs
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
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  // Legacy dentist registration fields
  name: string;
  email: string;
  phone: string;
  qualification: string;
  experience: number;
  clinicName: string;
  clinicAddress: string;
  registrationNumber: string;
  specializations: string[];
  availability: {
    monday: { start: string; end: string } | { available: boolean };
    tuesday: { start: string; end: string } | { available: boolean };
    wednesday: { start: string; end: string } | { available: boolean };
    thursday: { start: string; end: string } | { available: boolean };
    friday: { start: string; end: string } | { available: boolean };
    saturday: { start: string; end: string } | { available: boolean };
    sunday: { start: string; end: string } | { available: boolean };
  };
  consultationFee: number;
  emergencyFee: number;
  languages: string[];
  about: string;
  education: {
    degree: string;
    institution: string;
    year: number;
  }[];
  certifications: string[];
  awards: string[];
  photo: string;
  verified: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
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
  thumbnails: string[]; // Array of thumbnail URLs
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
  thumbnails: string[];
  price: number;
  originalPrice?: number;
  content: string;
  tags: string[];

  dateCreated: string;
  lastUpdated: string;
  featured: boolean;
  popular: boolean;
}
