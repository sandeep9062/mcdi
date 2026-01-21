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

export const reviews: Review[] = [
  {
    id: '1',
    name: 'Dr. Priya Sharma',
    course: 'Online Fixed Prosthodontics Course',
    rating: 5,
    date: '2024-12-15',
    text: 'Exceptional course! The depth of content and quality of instruction exceeded my expectations. The faculty provided personalized attention and the practical demonstrations were incredibly helpful. I feel confident in my prosthodontic skills now.',
    avatar: 'https://images.pexels.com/photos/5215109/pexels-photo-5215109.jpeg',
    verified: true
  },
  {
    id: '2',
    name: 'Dr. Rajesh Kumar',
    course: 'Online Dental Implant Courses',
    rating: 5,
    date: '2024-12-10',
    text: 'Best investment in my career! The implant course was comprehensive and the hands-on training at the center was invaluable. Faculty are highly experienced and patient with students. Highly recommend to anyone serious about implant dentistry.',
    avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg',
    verified: true
  },
  {
    id: '3',
    name: 'Dr. Sneha Reddy',
    course: 'Online General Dentistry Course - I',
    rating: 5,
    date: '2024-11-28',
    text: 'This course transformed my confidence as a practitioner. The curriculum is well-structured, covering everything from basics to advanced procedures. The one-on-one mentoring sessions were particularly helpful in addressing my specific doubts.',
    avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg',
    verified: true
  },
  {
    id: '4',
    name: 'Dr. Amit Patel',
    course: 'INBDE Exam Preparation',
    rating: 5,
    date: '2024-11-20',
    text: 'Cleared INBDE on my first attempt thanks to Master Clinical Dentistry! The study materials are excellent, practice questions are very similar to actual exam, and the mentors provide great guidance. Worth every penny!',
    avatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg',
    verified: true
  },
  {
    id: '5',
    name: 'Dr. Neha Gupta',
    course: 'Online Endodontics Course',
    rating: 4,
    date: '2024-11-15',
    text: 'Great course with comprehensive coverage of endodontic procedures. The video demonstrations are clear and well-explained. Would have loved more live interaction sessions, but overall very satisfied with the learning experience.',
    avatar: 'https://images.pexels.com/photos/5215109/pexels-photo-5215109.jpeg',
    verified: true
  },
  {
    id: '6',
    name: 'Dr. Vikram Singh',
    course: 'Online General Dentistry Course - II',
    rating: 5,
    date: '2024-11-08',
    text: 'Advanced course that really pushed my skills to the next level. Complex case management training was outstanding. The faculty expertise and teaching methodology are top-notch. This course is perfect for experienced dentists looking to excel.',
    avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg',
    verified: true
  },
  {
    id: '7',
    name: 'Dr. Anjali Desai',
    course: 'DHA Exam Preparation',
    rating: 5,
    date: '2024-10-25',
    text: 'Successfully cleared DHA exam! The preparation course was targeted and efficient. Mock tests were very similar to actual exam pattern. The instructors knowledge about DHA requirements is impressive. Thank you MCDI!',
    avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg',
    verified: true
  },
  {
    id: '8',
    name: 'Dr. Rahul Mehta',
    course: 'Orthodontic Fundamentals Course',
    rating: 4,
    date: '2024-10-18',
    text: 'Solid introduction to orthodontics. The course covers fundamentals thoroughly and prepares you for basic cases. Faculty are knowledgeable and accessible. Would recommend for general dentists wanting to add orthodontics to their practice.',
    avatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg',
    verified: true
  },
  {
    id: '9',
    name: 'Dr. Pooja Kapoor',
    course: 'Pediatric Dentistry Essentials',
    rating: 5,
    date: '2024-10-12',
    text: 'Wonderful course for anyone treating children! The behavior management techniques taught here are practical and effective. My confidence in treating pediatric patients has increased tremendously. Highly recommended!',
    avatar: 'https://images.pexels.com/photos/5215109/pexels-photo-5215109.jpeg',
    verified: true
  },
  {
    id: '10',
    name: 'Dr. Sanjay Verma',
    course: 'Dental Practice Management Course',
    rating: 5,
    date: '2024-10-05',
    text: 'Eye-opening course for practice owners! Learned practical strategies for growth, team management, and financial optimization. The business templates and tools provided are extremely useful. This course paid for itself within months!',
    avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg',
    verified: true
  },
  {
    id: '11',
    name: 'Dr. Kavita Iyer',
    course: 'Online Restorative Dentistry Course',
    rating: 4,
    date: '2024-09-28',
    text: 'Good course for improving esthetic restorative skills. The techniques taught are modern and effective. Course materials are well-organized. The practical tips shared by faculty have directly improved my clinical outcomes.',
    avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg',
    verified: true
  },
  {
    id: '12',
    name: 'Dr. Mohammed Hassan',
    course: 'ADC Exam Preparation',
    rating: 5,
    date: '2024-09-20',
    text: 'Outstanding preparation for ADC exam! Both written and practical components were covered thoroughly. The mock practical exams were especially helpful. Successfully cleared both parts. Thank you MCDI team!',
    avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg',
    verified: true
  }
];
