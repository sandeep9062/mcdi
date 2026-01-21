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

export const videos: Video[] = [
  {
    id: '1',
    title: 'Introduction to Fixed Prosthodontics - Crown Preparation Basics',
    description: 'Learn the fundamental principles of crown preparation including margin design, reduction requirements, and finishing techniques.',
    thumbnail: 'https://images.pexels.com/photos/3845981/pexels-photo-3845981.jpeg',
    youtubeId: 'dQw4w9WgXcQ',
    category: 'Prosthodontics',
    duration: '15:30',
    views: 12450,
    date: '2024-11-15'
  },
  {
    id: '2',
    title: 'Dental Implant Placement - Step by Step Guide',
    description: 'Comprehensive demonstration of single implant placement from initial planning to final restoration.',
    thumbnail: 'https://images.pexels.com/photos/6528844/pexels-photo-6528844.jpeg',
    youtubeId: 'dQw4w9WgXcQ',
    category: 'Implantology',
    duration: '22:45',
    views: 18920,
    date: '2024-11-08'
  },
  {
    id: '3',
    title: 'Endodontic Success - Modern Root Canal Techniques',
    description: 'Master modern endodontic techniques including rotary instrumentation, irrigation protocols, and obturation methods.',
    thumbnail: 'https://images.pexels.com/photos/3845683/pexels-photo-3845683.jpeg',
    youtubeId: 'dQw4w9WgXcQ',
    category: 'Endodontics',
    duration: '18:20',
    views: 9870,
    date: '2024-10-28'
  },
  {
    id: '4',
    title: 'INBDE Preparation Tips - Top 10 Study Strategies',
    description: 'Expert guidance on preparing for the INBDE exam with proven study strategies and time management tips.',
    thumbnail: 'https://images.pexels.com/photos/5212700/pexels-photo-5212700.jpeg',
    youtubeId: 'dQw4w9WgXcQ',
    category: 'Exam Prep',
    duration: '12:15',
    views: 15630,
    date: '2024-10-20'
  },
  {
    id: '5',
    title: 'Behavior Management in Pediatric Dentistry',
    description: 'Effective techniques for managing child behavior in dental practice with real case examples.',
    thumbnail: 'https://images.pexels.com/photos/3952048/pexels-photo-3952048.jpeg',
    youtubeId: 'dQw4w9WgXcQ',
    category: 'Pediatric Dentistry',
    duration: '16:40',
    views: 8340,
    date: '2024-10-12'
  },
  {
    id: '6',
    title: 'Building a Successful Dental Practice - Business Essentials',
    description: 'Learn key strategies for starting and growing a profitable dental practice including marketing and team management.',
    thumbnail: 'https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg',
    youtubeId: 'dQw4w9WgXcQ',
    category: 'Practice Management',
    duration: '20:10',
    views: 11250,
    date: '2024-10-05'
  },
  {
    id: '7',
    title: 'Composite Restorations - Layering Technique for Esthetics',
    description: 'Advanced composite layering techniques for achieving natural-looking anterior restorations.',
    thumbnail: 'https://images.pexels.com/photos/3845624/pexels-photo-3845624.jpeg',
    youtubeId: 'dQw4w9WgXcQ',
    category: 'Restorative Dentistry',
    duration: '14:25',
    views: 10580,
    date: '2024-09-28'
  },
  {
    id: '8',
    title: 'DHA Exam Success Story - Student Testimonial',
    description: 'Hear from our successful student about their journey to clearing the DHA examination.',
    thumbnail: 'https://images.pexels.com/photos/3952223/pexels-photo-3952223.jpeg',
    youtubeId: 'dQw4w9WgXcQ',
    category: 'Student Success',
    duration: '8:30',
    views: 6720,
    date: '2024-09-20'
  }
];
