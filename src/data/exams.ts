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

export const exams: Exam[] = [
  {
    id: '1',
    slug: 'inbde',
    name: 'INBDE',
    fullName: 'Integrated National Board Dental Examination',
    country: 'USA',
    countryFlag: '🇺🇸',
    shortDescription: 'Complete preparation for the US dental licensing exam with comprehensive study materials',
    fullDescription: 'The INBDE is a computer-based examination that tests the ability to understand important information from basic biomedical, dental, and clinical sciences, and apply such information in a problem-solving context. Our comprehensive preparation program covers all exam domains with expert guidance.',
    thumbnails: ['https://images.pexels.com/photos/5212700/pexels-photo-5212700.jpeg'],
    icon: 'GraduationCap',
    whoIsThisFor: [
      'Dental graduates seeking US licensure',
      'International dentists planning to practice in the USA',
      'Dental students preparing for board exams',
      'Dentists looking to validate their knowledge'
    ],
    whatIncluded: [
      'Comprehensive video lectures covering all exam topics',
      'Practice question banks with detailed explanations',
      'Mock examinations simulating real test conditions',
      'Study guides and summary notes',
      'One-on-one mentoring sessions',
      'Regular progress assessments',
      'Access to updated exam content',
      'Discussion forums with peers and instructors'
    ],
    studyPlan: [
      {
        phase: 'Foundation Phase',
        duration: '2-3 months',
        focus: [
          'Basic biomedical sciences review',
          'Dental anatomy and physiology',
          'Pathology fundamentals',
          'Microbiology and immunology'
        ]
      },
      {
        phase: 'Clinical Sciences Phase',
        duration: '3-4 months',
        focus: [
          'Operative dentistry',
          'Endodontics and periodontics',
          'Prosthodontics and orthodontics',
          'Oral surgery and diagnosis'
        ]
      },
      {
        phase: 'Integration Phase',
        duration: '2-3 months',
        focus: [
          'Case-based learning',
          'Clinical decision making',
          'Patient management scenarios',
          'Practice questions and mock tests'
        ]
      },
      {
        phase: 'Final Review',
        duration: '3-4 weeks',
        focus: [
          'High-yield topics review',
          'Full-length practice exams',
          'Weak area strengthening',
          'Test-taking strategies'
        ]
      }
    ],
    reviews: [
      {
        name: 'Dr. Priya Sharma',
        text: 'Excellent preparation program! The question bank was very similar to the actual exam. Passed on my first attempt.',
        rating: 5
      },
      {
        name: 'Dr. Rahul Mehta',
        text: 'The mentoring sessions were invaluable. Instructors helped me focus on weak areas and build confidence.',
        rating: 5
      },
      {
        name: 'Dr. Anita Desai',
        text: 'Comprehensive coverage of all topics. The study materials are well-organized and easy to follow.',
        rating: 4
      }
    ]
  },
  {
    id: '2',
    slug: 'dha',
    name: 'DHA',
    fullName: 'Dubai Health Authority Examination',
    country: 'UAE - Dubai',
    countryFlag: '🇦🇪',
    shortDescription: 'Targeted preparation for Dubai dental licensing with focus on Gulf healthcare standards',
    fullDescription: 'The DHA exam is required for dental professionals seeking licensure in Dubai. Our program covers all aspects of the examination including clinical scenarios specific to Gulf region practice requirements and healthcare standards.',
    thumbnails: ['https://images.pexels.com/photos/3952223/pexels-photo-3952223.jpeg'],
    icon: 'Award',
    whoIsThisFor: [
      'Dentists seeking Dubai licensure',
      'International graduates planning UAE practice',
      'Dental specialists wanting DHA certification',
      'Practitioners relocating to Dubai'
    ],
    whatIncluded: [
      'DHA-specific exam format training',
      'MCQ practice with Gulf-region cases',
      'Clinical scenario discussions',
      'Dubai healthcare regulations overview',
      'Interview preparation guidance',
      'Document preparation assistance',
      'Expert mentoring from DHA-licensed dentists',
      'Regular mock examinations'
    ],
    studyPlan: [
      {
        phase: 'Exam Format Familiarization',
        duration: '2 weeks',
        focus: [
          'Understanding DHA exam pattern',
          'Dubai healthcare system overview',
          'Registration process guidance',
          'Study material organization'
        ]
      },
      {
        phase: 'Core Topics Review',
        duration: '2-3 months',
        focus: [
          'General dentistry principles',
          'Specialty-specific content',
          'Evidence-based practice',
          'Clinical guidelines and protocols'
        ]
      },
      {
        phase: 'Practice and Assessment',
        duration: '4-6 weeks',
        focus: [
          'Practice question solving',
          'Mock examinations',
          'Performance analysis',
          'Weak area improvement'
        ]
      },
      {
        phase: 'Final Preparation',
        duration: '1-2 weeks',
        focus: [
          'Rapid review of high-yield topics',
          'Test-taking strategies',
          'Stress management techniques',
          'Last-minute tips and guidance'
        ]
      }
    ],
    reviews: [
      {
        name: 'Dr. Mohammed Al-Rashid',
        text: 'Very helpful for understanding DHA exam requirements. Cleared the exam in first attempt!',
        rating: 5
      },
      {
        name: 'Dr. Sarah Khan',
        text: 'The mock tests were very close to actual exam pattern. Highly recommend this preparation course.',
        rating: 5
      }
    ]
  },
  {
    id: '3',
    slug: 'adc',
    name: 'ADC',
    fullName: 'Australian Dental Council Examination',
    country: 'Australia',
    countryFlag: '🇦🇺',
    shortDescription: 'Comprehensive preparation for Australian dental registration with practical exam training',
    fullDescription: 'The ADC examination pathway includes both written and practical components. Our program provides complete preparation for all stages including the initial assessment, written exam, and practical/clinical examination with hands-on guidance.',
    thumbnails: ['https://images.pexels.com/photos/3845981/pexels-photo-3845981.jpeg'],
    icon: 'Sparkles',
    whoIsThisFor: [
      'International dentists seeking Australian registration',
      'Dental graduates planning to migrate to Australia',
      'Dentists wanting to validate qualifications',
      'Professionals exploring Australian practice opportunities'
    ],
    whatIncluded: [
      'Written examination preparation',
      'Practical exam training with simulations',
      'Clinical case discussions',
      'Hands-on skill development guidance',
      'Australian dental practice standards',
      'Infection control protocols',
      'Communication skills training',
      'Comprehensive study materials'
    ],
    studyPlan: [
      {
        phase: 'Initial Assessment Preparation',
        duration: '4-6 weeks',
        focus: [
          'Portfolio preparation',
          'Document verification',
          'Initial assessment requirements',
          'Australian dental standards overview'
        ]
      },
      {
        phase: 'Written Exam Preparation',
        duration: '3-4 months',
        focus: [
          'Biomedical sciences',
          'Dental sciences',
          'Clinical dentistry',
          'Practice questions and mock tests'
        ]
      },
      {
        phase: 'Practical Exam Preparation',
        duration: '3-6 months',
        focus: [
          'Clinical procedure practice',
          'Patient communication',
          'Treatment planning scenarios',
          'Practical skills refinement'
        ]
      },
      {
        phase: 'Final Integration',
        duration: '4-6 weeks',
        focus: [
          'Mock practical examinations',
          'Performance feedback',
          'Fine-tuning clinical skills',
          'Exam day preparation'
        ]
      }
    ],
    reviews: [
      {
        name: 'Dr. Amit Patel',
        text: 'The practical exam preparation was outstanding. The mock setups helped me feel confident on exam day.',
        rating: 5
      },
      {
        name: 'Dr. Lakshmi Narayan',
        text: 'Comprehensive course covering both written and practical components thoroughly. Excellent mentoring!',
        rating: 5
      }
    ]
  },
  {
    id: '4',
    slug: 'afk',
    name: 'AFK',
    fullName: 'Approbation für Zahnärzte (Germany)',
    country: 'Germany',
    countryFlag: '🇩🇪',
    shortDescription: 'German dental licensing preparation with focus on clinical knowledge exam',
    fullDescription: 'The Kenntnisprüfung (AFK) is the knowledge examination required for international dentists seeking German dental license (Approbation). Our program provides specialized preparation including German dental terminology and clinical standards.',
    thumbnails: ['https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg'],
    icon: 'Library',
    whoIsThisFor: [
      'International dentists seeking German Approbation',
      'Dental graduates planning to work in Germany',
      'EU dentists requiring knowledge assessment',
      'Dentists interested in German healthcare system'
    ],
    whatIncluded: [
      'German dental system overview',
      'Clinical knowledge preparation',
      'Dental terminology in German',
      'Case-based learning',
      'Treatment planning guidance',
      'German healthcare regulations',
      'Interview preparation',
      'Study materials in English and German'
    ],
    studyPlan: [
      {
        phase: 'System Familiarization',
        duration: '4 weeks',
        focus: [
          'German healthcare system',
          'Approbation requirements',
          'Exam format and structure',
          'Language basics for dentistry'
        ]
      },
      {
        phase: 'Core Knowledge Building',
        duration: '3-4 months',
        focus: [
          'Clinical dentistry standards',
          'Diagnostic procedures',
          'Treatment protocols',
          'Evidence-based practice'
        ]
      },
      {
        phase: 'Practical Application',
        duration: '2-3 months',
        focus: [
          'Case studies and scenarios',
          'Clinical decision making',
          'Patient management',
          'Mock examinations'
        ]
      },
      {
        phase: 'Final Review',
        duration: '3-4 weeks',
        focus: [
          'High-yield topics revision',
          'Practice interviews',
          'Weak area strengthening',
          'Exam strategies'
        ]
      }
    ],
    reviews: [
      {
        name: 'Dr. Rajesh Kumar',
        text: 'Very helpful in understanding German dental standards. The course structure is excellent.',
        rating: 4
      },
      {
        name: 'Dr. Sneha Reddy',
        text: 'Good preparation for the Kenntnisprüfung. Instructors are knowledgeable about German requirements.',
        rating: 5
      }
    ]
  },
  {
    id: '5',
    slug: 'haad',
    name: 'HAAD',
    fullName: 'Health Authority Abu Dhabi Examination',
    country: 'UAE - Abu Dhabi',
    countryFlag: '🇦🇪',
    shortDescription: 'Abu Dhabi licensing exam preparation with comprehensive clinical focus',
    fullDescription: 'HAAD (now part of DOH - Department of Health) examination is required for dental professionals in Abu Dhabi. Our program covers all aspects of the examination including clinical scenarios and Abu Dhabi healthcare standards.',
    thumbnails: ['https://images.pexels.com/photos/6528840/pexels-photo-6528840.jpeg'],
    icon: 'FileCheck',
    whoIsThisFor: [
      'Dentists seeking Abu Dhabi licensure',
      'International graduates planning UAE practice',
      'Dental specialists wanting DOH certification',
      'Practitioners relocating to Abu Dhabi'
    ],
    whatIncluded: [
      'DOH-specific exam preparation',
      'MCQ practice with detailed explanations',
      'Clinical scenario training',
      'Abu Dhabi healthcare regulations',
      'Professional interview preparation',
      'Document preparation guidance',
      'Expert mentoring',
      'Regular assessments'
    ],
    studyPlan: [
      {
        phase: 'Registration and Overview',
        duration: '1-2 weeks',
        focus: [
          'DOH registration process',
          'Exam pattern understanding',
          'Study material collection',
          'Timeline planning'
        ]
      },
      {
        phase: 'Content Review',
        duration: '2-3 months',
        focus: [
          'General and specialty dentistry',
          'Clinical guidelines',
          'Evidence-based protocols',
          'UAE healthcare standards'
        ]
      },
      {
        phase: 'Practice Phase',
        duration: '4-6 weeks',
        focus: [
          'MCQ practice',
          'Mock examinations',
          'Performance analysis',
          'Improvement strategies'
        ]
      },
      {
        phase: 'Final Preparation',
        duration: '1-2 weeks',
        focus: [
          'Rapid review',
          'High-yield topics',
          'Test strategies',
          'Confidence building'
        ]
      }
    ],
    reviews: [
      {
        name: 'Dr. Ahmed Hassan',
        text: 'Great preparation course for DOH exam. The question bank is very comprehensive.',
        rating: 5
      },
      {
        name: 'Dr. Fatima Ali',
        text: 'Cleared HAAD exam on first attempt. Thank you for the excellent preparation materials!',
        rating: 5
      }
    ]
  },
  {
    id: '6',
    slug: 'ore',
    name: 'ORE',
    fullName: 'Overseas Registration Examination',
    country: 'UK',
    countryFlag: '🇬🇧',
    shortDescription: 'UK dental registration exam preparation with focus on both parts of ORE',
    fullDescription: 'The ORE is required for international dental graduates seeking registration with the General Dental Council (GDC) in the UK. Our program covers both Part 1 (written) and Part 2 (practical) examinations comprehensively.',
    thumbnails: ['https://images.pexels.com/photos/3845624/pexels-photo-3845624.jpeg'],
    icon: 'Trophy',
    whoIsThisFor: [
      'International dentists seeking UK registration',
      'Dental graduates planning UK practice',
      'Dentists wanting GDC registration',
      'Professionals interested in NHS dentistry'
    ],
    whatIncluded: [
      'Part 1 written exam preparation',
      'Part 2 practical exam training',
      'UK dental practice standards',
      'Clinical scenario discussions',
      'Hands-on skill development',
      'Communication skills training',
      'Mock examinations for both parts',
      'Comprehensive study materials'
    ],
    studyPlan: [
      {
        phase: 'Part 1 Preparation',
        duration: '3-4 months',
        focus: [
          'Basic and clinical sciences',
          'Clinical dentistry knowledge',
          'Practice questions',
          'Mock examinations'
        ]
      },
      {
        phase: 'Part 2 Clinical Skills',
        duration: '4-6 months',
        focus: [
          'Patient examination',
          'Treatment planning',
          'Clinical procedures',
          'Communication skills'
        ]
      },
      {
        phase: 'Practical Training',
        duration: '2-3 months',
        focus: [
          'Simulated clinical scenarios',
          'Time management practice',
          'Performance refinement',
          'Mock practical exams'
        ]
      },
      {
        phase: 'Final Integration',
        duration: '4 weeks',
        focus: [
          'Comprehensive review',
          'Exam strategies',
          'Stress management',
          'Last-minute preparation'
        ]
      }
    ],
    reviews: [
      {
        name: 'Dr. Neha Gupta',
        text: 'Excellent preparation for both parts of ORE. The practical training sessions were invaluable.',
        rating: 5
      },
      {
        name: 'Dr. Vikram Singh',
        text: 'Comprehensive course with great support throughout. Successfully passed both parts!',
        rating: 5
      }
    ]
  },
  {
    id: '7',
    slug: 'moh',
    name: 'MOH',
    fullName: 'Ministry of Health Examination',
    country: 'Multiple GCC Countries',
    countryFlag: '🇸🇦',
    shortDescription: 'GCC countries health ministry exam preparation for dental licensure',
    fullDescription: 'MOH examinations are required for dental practice in various GCC countries including UAE, Saudi Arabia, Qatar, and Bahrain. Our program provides comprehensive preparation for these licensing examinations.',
    thumbnails: ['https://images.pexels.com/photos/3845683/pexels-photo-3845683.jpeg'],
    icon: 'Building2',
    whoIsThisFor: [
      'Dentists seeking GCC countries licensure',
      'International graduates planning Middle East practice',
      'Dental specialists wanting MOH certification',
      'Practitioners relocating to Gulf region'
    ],
    whatIncluded: [
      'Country-specific exam preparation',
      'Comprehensive MCQ practice',
      'Clinical case discussions',
      'Healthcare regulations overview',
      'Professional requirements guidance',
      'Document preparation assistance',
      'Expert mentoring',
      'Mock examinations'
    ],
    studyPlan: [
      {
        phase: 'Country Selection and Overview',
        duration: '1 week',
        focus: [
          'Country-specific requirements',
          'Exam pattern understanding',
          'Registration process',
          'Timeline planning'
        ]
      },
      {
        phase: 'Content Preparation',
        duration: '2-3 months',
        focus: [
          'General dentistry review',
          'Specialty topics',
          'Clinical protocols',
          'Regional healthcare standards'
        ]
      },
      {
        phase: 'Practice and Assessment',
        duration: '4-6 weeks',
        focus: [
          'MCQ practice sessions',
          'Mock examinations',
          'Performance tracking',
          'Targeted improvement'
        ]
      },
      {
        phase: 'Final Review',
        duration: '1-2 weeks',
        focus: [
          'High-yield topics',
          'Exam strategies',
          'Confidence building',
          'Last-minute tips'
        ]
      }
    ],
    reviews: [
      {
        name: 'Dr. Khalid Rahman',
        text: 'Very helpful for MOH-UAE preparation. Question bank is relevant and comprehensive.',
        rating: 5
      },
      {
        name: 'Dr. Ayesha Siddiqui',
        text: 'Excellent guidance for Saudi MOH exam. Cleared on first attempt with good score!',
        rating: 5
      }
    ]
  }
];
