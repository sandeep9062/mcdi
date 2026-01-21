export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Clinical Dentistry',
    slug: 'clinical-dentistry',
    description: 'Advanced clinical procedures with hands-on training and real patient experience',
    icon: 'Stethoscope'
  },
  {
    id: '2',
    name: 'International Exam Prep',
    slug: 'exam-prep',
    description: 'Comprehensive preparation for global dental licensing examinations',
    icon: 'GraduationCap'
  },
  {
    id: '3',
    name: 'Support Dentistry',
    slug: 'support-dentistry',
    description: 'Essential skills for dental practice management and patient care',
    icon: 'HeartPulse'
  }
];
