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

export const testSeries: TestSeries[] = [
  {
    id: '1',
    slug: 'inbde-complete-test-series',
    title: 'INBDE Complete Test Series',
    shortDescription: 'Comprehensive question bank with 2000+ questions covering all INBDE exam domains',
    fullDescription: 'Master the INBDE with our comprehensive test series featuring 2000+ practice questions, detailed explanations, and performance analytics. Designed by experts who have successfully cleared the exam.',
    thumbnail: 'https://images.pexels.com/photos/5212700/pexels-photo-5212700.jpeg',
    category: 'Exam Prep',
    examType: 'INBDE',
    price: 12000,
    originalPrice: 15000,
    rating: 4.9,
    reviewCount: 156,
    featured: true,
    questionsCount: 2000,
    duration: '6 months access',
    difficulty: 'Advanced',
    whatIncluded: [
      '2000+ practice questions',
      'Detailed explanations for each answer',
      'Topic-wise and full-length mock tests',
      'Performance analytics and weak area identification',
      'Mobile and desktop access',
      'Regular updates with new questions'
    ],
    sampleQuestions: [
      {
        question: 'Which of the following is the most appropriate treatment for a mandibular fracture with displacement and mobility?',
        options: [
          'Conservative management with soft diet',
          'Open reduction and internal fixation',
          'Closed reduction with maxillomandibular fixation',
          'Observation only'
        ],
        correctAnswer: 1,
        explanation: 'Open reduction and internal fixation (ORIF) is the gold standard for displaced mandibular fractures with mobility. This approach provides stable fixation and allows for early mobilization.'
      },
      {
        question: 'The maximum recommended dose of lidocaine with epinephrine for a healthy 70kg adult is:',
        options: [
          '300mg',
          '400mg',
          '500mg',
          '600mg'
        ],
        correctAnswer: 2,
        explanation: 'For lidocaine with epinephrine, the maximum recommended dose is 7mg/kg, which equals 490mg (approximately 500mg) for a 70kg adult. This is higher than lidocaine without epinephrine due to reduced systemic absorption.'
      }
    ]
  },
  {
    id: '2',
    slug: 'dha-mock-test-series',
    title: 'DHA Mock Test Series',
    shortDescription: '1500+ DHA-specific questions with detailed explanations and Dubai healthcare protocols',
    fullDescription: 'Prepare for the DHA exam with questions specifically designed to match the exam pattern. Includes Gulf region-specific clinical scenarios and healthcare protocols.',
    thumbnail: 'https://images.pexels.com/photos/3952223/pexels-photo-3952223.jpeg',
    category: 'Exam Prep',
    examType: 'DHA',
    price: 10000,
    originalPrice: 13000,
    rating: 4.8,
    reviewCount: 203,
    featured: true,
    questionsCount: 1500,
    duration: '6 months access',
    difficulty: 'Intermediate',
    whatIncluded: [
      '1500+ DHA-pattern questions',
      'Dubai healthcare protocol scenarios',
      '10 full-length mock tests',
      'Detailed performance reports',
      'Mobile app access',
      'Expert support for doubt resolution'
    ],
    sampleQuestions: [
      {
        question: 'According to DHA guidelines, what is the minimum required continuing professional development (CPD) hours per year for general dentists?',
        options: [
          '10 hours',
          '20 hours',
          '30 hours',
          '40 hours'
        ],
        correctAnswer: 1,
        explanation: 'DHA requires a minimum of 20 CPD hours per year for general dental practitioners to maintain their license. This ensures practitioners stay updated with current standards and practices.'
      }
    ]
  },
  {
    id: '3',
    slug: 'adc-practice-questions',
    title: 'ADC Practice Question Bank',
    shortDescription: '1800+ questions for both written and practical ADC exam preparation',
    fullDescription: 'Complete question bank covering all aspects of ADC examination including biomedical sciences, clinical dentistry, and practical scenarios aligned with Australian standards.',
    thumbnail: 'https://images.pexels.com/photos/3845981/pexels-photo-3845981.jpeg',
    category: 'Exam Prep',
    examType: 'ADC',
    price: 11000,
    originalPrice: 14000,
    rating: 4.7,
    reviewCount: 128,
    featured: true,
    questionsCount: 1800,
    duration: '8 months access',
    difficulty: 'Advanced',
    whatIncluded: [
      '1800+ practice questions',
      'Written exam preparation',
      'Practical exam scenarios',
      'Australian dental standards focus',
      'Video explanations for complex topics',
      '8 months validity with updates'
    ],
    sampleQuestions: [
      {
        question: 'In the ADC practical exam, what is the time typically allocated for a Class II amalgam restoration?',
        options: [
          '30 minutes',
          '45 minutes',
          '60 minutes',
          '90 minutes'
        ],
        correctAnswer: 2,
        explanation: 'The ADC practical exam typically allocates 60 minutes for a Class II amalgam restoration, including cavity preparation, matrix placement, and finishing procedures.'
      }
    ]
  },
  {
    id: '4',
    slug: 'ore-part1-test-series',
    title: 'ORE Part 1 Test Series',
    shortDescription: '2200+ questions covering all ORE Part 1 exam topics with UK GDC standards',
    fullDescription: 'Comprehensive test series for ORE Part 1 examination with questions aligned to UK General Dental Council standards and exam format.',
    thumbnail: 'https://images.pexels.com/photos/3845624/pexels-photo-3845624.jpeg',
    category: 'Exam Prep',
    examType: 'ORE',
    price: 13000,
    originalPrice: 16000,
    rating: 4.9,
    reviewCount: 187,
    featured: false,
    questionsCount: 2200,
    duration: '6 months access',
    difficulty: 'Advanced',
    whatIncluded: [
      '2200+ ORE Part 1 questions',
      'UK dental practice standards',
      'GDC guidelines integration',
      '12 full-length mock exams',
      'Detailed analytics dashboard',
      'Regular content updates'
    ],
    sampleQuestions: [
      {
        question: 'According to GDC standards, which of the following is NOT a principle of ethical dental practice?',
        options: [
          'Put patients interests first',
          'Communicate effectively with patients',
          'Maximize practice profitability',
          'Maintain and protect patient information'
        ],
        correctAnswer: 2,
        explanation: 'While financial sustainability is important, maximizing profitability is not one of the GDC\'s core ethical principles. The GDC emphasizes patient welfare, effective communication, and confidentiality.'
      }
    ]
  },
  {
    id: '5',
    slug: 'general-dentistry-mcq-bank',
    title: 'General Dentistry MCQ Bank',
    shortDescription: '3000+ questions covering all aspects of general dental practice',
    fullDescription: 'Massive question bank covering operative dentistry, endodontics, periodontics, oral surgery, prosthodontics, and more. Perfect for knowledge building and exam preparation.',
    thumbnail: 'https://images.pexels.com/photos/3779706/pexels-photo-3779706.jpeg',
    category: 'General Knowledge',
    examType: 'General',
    price: 8000,
    originalPrice: 10000,
    rating: 4.6,
    reviewCount: 245,
    featured: false,
    questionsCount: 3000,
    duration: '12 months access',
    difficulty: 'Intermediate',
    whatIncluded: [
      '3000+ comprehensive MCQs',
      'All dental specialties covered',
      'Topic-wise practice modules',
      'Evidence-based explanations',
      'Bookmark and review features',
      '12 months extended access'
    ],
    sampleQuestions: [
      {
        question: 'What is the ideal preparation taper for a full coverage crown?',
        options: [
          '2-5 degrees',
          '6-10 degrees',
          '12-15 degrees',
          '20-25 degrees'
        ],
        correctAnswer: 1,
        explanation: 'The ideal total occlusal convergence (taper) for crown preparation is 6-10 degrees (3-5 degrees per wall). This provides adequate retention while allowing proper seating of the restoration.'
      }
    ]
  },
  {
    id: '6',
    slug: 'endodontics-mastery-tests',
    title: 'Endodontics Mastery Test Series',
    shortDescription: '1200+ specialized endodontic questions with clinical case scenarios',
    fullDescription: 'Deep dive into endodontics with specialized questions covering diagnosis, treatment planning, instrumentation, obturation, and management of endodontic complications.',
    thumbnail: 'https://images.pexels.com/photos/3845683/pexels-photo-3845683.jpeg',
    category: 'Specialty',
    examType: 'Endodontics',
    price: 6000,
    originalPrice: 8000,
    rating: 4.8,
    reviewCount: 89,
    featured: false,
    questionsCount: 1200,
    duration: '6 months access',
    difficulty: 'Advanced',
    whatIncluded: [
      '1200+ endodontic questions',
      'Clinical case scenarios',
      'Radiographic interpretation',
      'Latest techniques and materials',
      'Video explanations',
      'Expert faculty support'
    ],
    sampleQuestions: [
      {
        question: 'Which NiTi rotary file system uses a crown-down technique?',
        options: [
          'ProTaper Universal',
          'WaveOne',
          'Reciproc',
          'All of the above'
        ],
        correctAnswer: 0,
        explanation: 'ProTaper Universal is specifically designed for crown-down preparation technique, while WaveOne and Reciproc are single-file reciprocating systems that use different approaches.'
      }
    ]
  },
  {
    id: '7',
    slug: 'implantology-question-bank',
    title: 'Implantology Question Bank',
    shortDescription: '1000+ questions on dental implants, surgical protocols, and prosthetic management',
    fullDescription: 'Comprehensive test series covering all aspects of implant dentistry from surgical planning to prosthetic restoration and maintenance.',
    thumbnail: 'https://images.pexels.com/photos/6528844/pexels-photo-6528844.jpeg',
    category: 'Specialty',
    examType: 'Implantology',
    price: 7000,
    originalPrice: 9000,
    rating: 4.7,
    reviewCount: 112,
    featured: false,
    questionsCount: 1000,
    duration: '6 months access',
    difficulty: 'Advanced',
    whatIncluded: [
      '1000+ implantology questions',
      'Surgical and prosthetic aspects',
      'Case-based scenarios',
      'Complication management',
      'Latest implant systems',
      'Expert commentary'
    ],
    sampleQuestions: [
      {
        question: 'What is the minimum bone width required for placing a standard diameter (4mm) dental implant?',
        options: [
          '4mm',
          '5mm',
          '6mm',
          '7mm'
        ],
        correctAnswer: 2,
        explanation: 'For a 4mm diameter implant, a minimum of 6mm bone width is required to maintain at least 1mm of bone on both buccal and lingual aspects, ensuring long-term stability and preventing bone resorption.'
      }
    ]
  },
  {
    id: '8',
    slug: 'radiology-interpretation-tests',
    title: 'Dental Radiology Interpretation Tests',
    shortDescription: '800+ radiographic interpretation questions with image-based scenarios',
    fullDescription: 'Master radiographic interpretation with extensive image-based questions covering intraoral, panoramic, CBCT, and other imaging modalities.',
    thumbnail: 'https://images.pexels.com/photos/3952048/pexels-photo-3952048.jpeg',
    category: 'Specialty',
    examType: 'Radiology',
    price: 5000,
    originalPrice: 7000,
    rating: 4.6,
    reviewCount: 76,
    featured: false,
    questionsCount: 800,
    duration: '6 months access',
    difficulty: 'Intermediate',
    whatIncluded: [
      '800+ image-based questions',
      'All imaging modalities',
      'Pathology identification',
      'Normal vs abnormal findings',
      'Safety and technique questions',
      'Detailed image annotations'
    ],
    sampleQuestions: [
      {
        question: 'On a periapical radiograph, what is the typical radiographic appearance of a periapical abscess?',
        options: [
          'Well-defined radiolucency',
          'Ill-defined radiolucency',
          'Mixed radiolucent-radiopaque lesion',
          'Radiopaque mass'
        ],
        correctAnswer: 1,
        explanation: 'Acute periapical abscess typically appears as an ill-defined radiolucency at the root apex, reflecting the diffuse inflammatory process. Chronic lesions may show more defined borders.'
      }
    ]
  }
];
