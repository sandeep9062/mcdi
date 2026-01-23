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

export const courses: Course[] = 
[
  {
    id: '1',
    slug: 'online-fixed-prosthodontics',
    title: 'Online Fixed Prosthodontics Course',
    shortDescription: 'Master crown and bridge work with comprehensive online training and practical demonstrations',
    fullDescription: 'Comprehensive training in fixed prosthodontics covering crown preparation, bridge design, and advanced restoration techniques. Includes live sessions, recorded lectures, and case studies.',
    price: 18000,
    originalPrice: 25000,
    thumbnail: 'https://images.pexels.com/photos/3845981/pexels-photo-3845981.jpeg',
    category: 'Clinical Dentistry',
    mode: 'Online',
    duration: '3 months',
    rating: 4.8,
    reviewCount: 124,
    featured: true,
    popular: true,
    whatYouLearn: [
      'Crown and bridge preparation techniques',
      'Impression making and bite registration',
      'Provisional restorations',
      'Cementation protocols',
      'Case selection and treatment planning',
      'Esthetic considerations in anterior restorations'
    ],
    curriculum: [
      {
        module: 'Introduction to Fixed Prosthodontics',
        topics: [
          'Basic principles and biomechanics',
          'Materials science for crowns and bridges',
          'Occlusion concepts'
        ]
      },
      {
        module: 'Crown Preparation',
        topics: [
          'Tooth preparation principles',
          'Margin design and placement',
          'Preparation for different materials'
        ]
      },
      {
        module: 'Bridge Design',
        topics: [
          'Types of bridges',
          'Pontic design',
          'Abutment selection'
        ]
      },
      {
        module: 'Clinical Procedures',
        topics: [
          'Impression techniques',
          'Shade selection',
          'Temporary restorations',
          'Final cementation'
        ]
      }
    ],
    whoIsThisFor: [
      'General dentists wanting to advance in prosthodontics',
      'Recent graduates seeking specialization',
      'Dentists preparing for international licensing exams',
      'Practitioners looking to update their skills'
    ],
    faculty: {
      name: 'Dr. Rajesh Kumar',
      title: 'MDS Prosthodontics, 15+ Years Experience',
      image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg',
      bio: 'Renowned prosthodontist with extensive clinical and teaching experience. Published multiple research papers in international journals.'
    },
    faqs: [
      {
        question: 'Is this course suitable for beginners?',
        answer: 'Yes, the course is designed to accommodate both beginners and experienced practitioners. We start with fundamentals and progress to advanced techniques.'
      },
      {
        question: 'Will I receive hands-on training?',
        answer: 'While this is an online course, we provide detailed video demonstrations and case studies. Hands-on training options are available separately.'
      },
      {
        question: 'What materials are included?',
        answer: 'You will receive comprehensive video lectures, PDF notes, case study materials, and lifetime access to course content.'
      }
    ]
  },
  {
    id: '2',
    slug: 'online-dental-implant-courses',
    title: 'Online Dental Implant Courses',
    shortDescription: 'Complete implant dentistry training from basics to advanced surgical techniques',
    fullDescription: 'Master the art and science of dental implantology with comprehensive coverage of surgical protocols, prosthetic considerations, and case management.',
    price: 35000,
    originalPrice: 45000,
    thumbnail: 'https://images.pexels.com/photos/6528844/pexels-photo-6528844.jpeg',
    category: 'Clinical Dentistry',
    mode: 'Hybrid',
    duration: '6 months',
    rating: 4.9,
    reviewCount: 203,
    featured: true,
    popular: true,
    whatYouLearn: [
      'Implant treatment planning and case selection',
      'Surgical protocols and techniques',
      'Bone augmentation procedures',
      'Immediate vs delayed loading protocols',
      'Prosthetic restoration on implants',
      'Complication management'
    ],
    curriculum: [
      {
        module: 'Fundamentals of Implantology',
        topics: [
          'History and evolution of dental implants',
          'Osseointegration principles',
          'Implant systems and designs'
        ]
      },
      {
        module: 'Diagnosis and Treatment Planning',
        topics: [
          'Patient assessment and selection',
          'Radiographic evaluation',
          'Digital planning tools'
        ]
      },
      {
        module: 'Surgical Techniques',
        topics: [
          'Surgical protocols',
          'Flap design and management',
          'Implant placement techniques',
          'Bone augmentation'
        ]
      },
      {
        module: 'Prosthetic Phase',
        topics: [
          'Abutment selection',
          'Impression techniques',
          'Crown fabrication',
          'Occlusal considerations'
        ]
      }
    ],
    whoIsThisFor: [
      'Dentists wanting to start implant practice',
      'Practitioners seeking advanced implant training',
      'Specialists in prosthodontics or oral surgery',
      'Dentists preparing for certification exams'
    ],
    faculty: {
      name: 'Dr. Priya Sharma',
      title: 'MDS Oral Surgery, Implant Specialist',
      image: 'https://images.pexels.com/photos/5215109/pexels-photo-5215109.jpeg',
      bio: 'Leading implantologist with 12+ years of experience. Has placed over 5000 implants and trained hundreds of dentists.'
    },
    faqs: [
      {
        question: 'Do I need prior surgical experience?',
        answer: 'Basic dental surgery knowledge is recommended, but we cover fundamentals thoroughly for those new to implant dentistry.'
      },
      {
        question: 'Are live surgeries included?',
        answer: 'Yes, the course includes live surgery demonstrations and recorded case presentations.'
      },
      {
        question: 'Will I get clinical practice opportunities?',
        answer: 'For the "Both" mode option, we provide supervised clinical training sessions at our centers.'
      }
    ]
  },
  {
    id: '3',
    slug: 'online-endodontics-course',
    title: 'Online Endodontics Course',
    shortDescription: 'Advanced root canal treatment techniques with modern instrumentation and obturation methods',
    fullDescription: 'Comprehensive endodontic training covering diagnosis, treatment planning, and advanced root canal procedures using latest technology and techniques.',
    price: 18000,
    originalPrice: 24000,
    thumbnail: 'https://images.pexels.com/photos/3845683/pexels-photo-3845683.jpeg',
    category: 'Clinical Dentistry',
    mode: 'Online',
    duration: '3 months',
    rating: 4.7,
    reviewCount: 156,
    featured: true,
    popular: false,
    whatYouLearn: [
      'Pulp biology and pathology',
      'Modern instrumentation techniques',
      'Irrigation protocols',
      'Obturation methods',
      'Retreatment procedures',
      'Managing complex canal anatomy'
    ],
    curriculum: [
      {
        module: 'Endodontic Diagnosis',
        topics: [
          'Pulp and periapical diagnosis',
          'Radiographic interpretation',
          'Treatment planning'
        ]
      },
      {
        module: 'Access and Instrumentation',
        topics: [
          'Access cavity preparation',
          'Canal exploration and negotiation',
          'Rotary instrumentation',
          'Hand instrumentation techniques'
        ]
      },
      {
        module: 'Irrigation and Medication',
        topics: [
          'Irrigation solutions and protocols',
          'Activation techniques',
          'Intracanal medicaments'
        ]
      },
      {
        module: 'Obturation and Restoration',
        topics: [
          'Obturation techniques',
          'Warm vertical compaction',
          'Post-endodontic restoration'
        ]
      }
    ],
    whoIsThisFor: [
      'General dentists wanting to improve RCT success rates',
      'Practitioners transitioning to rotary systems',
      'Dentists seeking international exam preparation',
      'Recent graduates building clinical confidence'
    ],
    faculty: {
      name: 'Dr. Anil Verma',
      title: 'MDS Endodontics, 10+ Years Experience',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg',
      bio: 'Expert endodontist with special interest in complex cases and retreatments. Published researcher and passionate educator.'
    },
    faqs: [
      {
        question: 'What equipment do I need?',
        answer: 'Basic endodontic setup is sufficient. We cover both hand and rotary instrumentation techniques.'
      },
      {
        question: 'Are clinical cases included?',
        answer: 'Yes, the course includes extensive case presentations and step-by-step video demonstrations.'
      }
    ]
  },
  {
    id: '4',
    slug: 'online-general-dentistry-course-1',
    title: 'Online General Dentistry Course - I',
    shortDescription: 'Comprehensive training covering all aspects of general dental practice for confident clinical practice',
    fullDescription: 'Complete general dentistry program covering operative dentistry, minor oral surgery, periodontics, and practice management. Perfect for building a strong foundation.',
    price: 65000,
    originalPrice: 85000,
    thumbnail: 'https://images.pexels.com/photos/3779706/pexels-photo-3779706.jpeg',
    category: 'Clinical Dentistry',
    mode: 'Hybrid',
    duration: '6 months',
    rating: 4.8,
    reviewCount: 189,
    featured: true,
    popular: true,
    whatYouLearn: [
      'Comprehensive oral examination techniques',
      'Operative dentistry and restorations',
      'Basic periodontal procedures',
      'Minor oral surgery',
      'Treatment planning and case presentation',
      'Patient communication skills'
    ],
    curriculum: [
      {
        module: 'Diagnosis and Treatment Planning',
        topics: [
          'Comprehensive examination',
          'Radiographic interpretation',
          'Treatment sequencing'
        ]
      },
      {
        module: 'Operative Dentistry',
        topics: [
          'Cavity preparation principles',
          'Direct restorations',
          'Adhesive dentistry',
          'Esthetic restorations'
        ]
      },
      {
        module: 'Periodontics',
        topics: [
          'Periodontal examination',
          'Scaling and root planing',
          'Non-surgical periodontal therapy'
        ]
      },
      {
        module: 'Minor Oral Surgery',
        topics: [
          'Exodontia techniques',
          'Surgical anatomy',
          'Flap designs',
          'Suturing techniques'
        ]
      },
      {
        module: 'Practice Management',
        topics: [
          'Patient communication',
          'Case presentation',
          'Practice efficiency',
          'Quality assurance'
        ]
      }
    ],
    whoIsThisFor: [
      'Recent graduates starting clinical practice',
      'Dentists looking for comprehensive skill update',
      'International dentists preparing for licensing',
      'Practitioners expanding service offerings'
    ],
    faculty: {
      name: 'Dr. Sunita Malhotra',
      title: 'MDS Oral Medicine, 18+ Years Experience',
      image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg',
      bio: 'Experienced clinician and educator with passion for creating confident general dentists. Mentored over 300 practitioners.'
    },
    faqs: [
      {
        question: 'Is this suitable for fresh graduates?',
        answer: 'Absolutely! This course is specifically designed to bridge the gap between dental school and confident practice.'
      },
      {
        question: 'Will I get hands-on training?',
        answer: 'Yes, for the "Both" mode, we provide supervised clinical sessions with real patients.'
      },
      {
        question: 'What is the difference between Course I and II?',
        answer: 'Course I covers fundamentals and common procedures. Course II advances to complex cases and specialized techniques.'
      }
    ]
  },
  {
    id: '5',
    slug: 'online-general-dentistry-course-2',
    title: 'Online General Dentistry Course - II',
    shortDescription: 'Advanced general dentistry program with complex case management and specialized procedures',
    fullDescription: 'Advanced training for experienced practitioners covering complex restorations, advanced surgical procedures, interdisciplinary treatment, and practice growth strategies.',
    price: 85000,
    originalPrice: 110000,
    thumbnail: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg',
    category: 'Clinical Dentistry',
    mode: 'Hybrid',
    duration: '8 months',
    rating: 4.9,
    reviewCount: 142,
    featured: true,
    popular: true,
    whatYouLearn: [
      'Complex case treatment planning',
      'Advanced restorative techniques',
      'Full mouth rehabilitation',
      'Advanced surgical procedures',
      'Esthetic smile design',
      'Interdisciplinary treatment approaches'
    ],
    curriculum: [
      {
        module: 'Advanced Diagnosis',
        topics: [
          'Complex case analysis',
          'Occlusal evaluation',
          'Digital diagnostic tools'
        ]
      },
      {
        module: 'Advanced Restorative Dentistry',
        topics: [
          'Complex crown and bridge work',
          'Veneer and bonding techniques',
          'Full mouth rehabilitation'
        ]
      },
      {
        module: 'Esthetic Dentistry',
        topics: [
          'Smile design principles',
          'Anterior esthetics',
          'Minimally invasive techniques'
        ]
      },
      {
        module: 'Advanced Surgical Procedures',
        topics: [
          'Impacted tooth removal',
          'Bone grafting',
          'Soft tissue management'
        ]
      },
      {
        module: 'Practice Excellence',
        topics: [
          'Marketing and growth',
          'Team management',
          'Advanced case presentation'
        ]
      }
    ],
    whoIsThisFor: [
      'Experienced dentists seeking advanced skills',
      'Practitioners wanting to offer comprehensive care',
      'Dentists planning to expand their practice',
      'Those interested in full mouth rehabilitation'
    ],
    faculty: {
      name: 'Dr. Vikram Singh',
      title: 'MDS Prosthodontics, Practice Owner',
      image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg',
      bio: 'Renowned for complex full mouth rehabilitations and esthetic transformations. Runs a thriving multi-specialty practice.'
    },
    faqs: [
      {
        question: 'Is Course I a prerequisite?',
        answer: 'Not mandatory, but recommended. Course II assumes strong fundamentals in general dentistry.'
      },
      {
        question: 'How many cases will I work on?',
        answer: 'The clinical component includes supervised work on multiple complex cases with mentorship.'
      }
    ]
  },
  {
    id: '6',
    slug: 'online-restorative-dentistry-course',
    title: 'Online Restorative Dentistry Course',
    shortDescription: 'Master direct and indirect restorations with emphasis on esthetics and longevity',
    fullDescription: 'Focused training on restorative procedures including composite restorations, inlays, onlays, and esthetic anterior work with modern materials and techniques.',
    price: 15000,
    originalPrice: 20000,
    thumbnail: 'https://images.pexels.com/photos/3845624/pexels-photo-3845624.jpeg',
    category: 'Clinical Dentistry',
    mode: 'Online',
    duration: '2 months',
    rating: 4.6,
    reviewCount: 98,
    featured: false,
    popular: false,
    whatYouLearn: [
      'Modern adhesive techniques',
      'Composite layering for esthetics',
      'Indirect restorations - inlays and onlays',
      'Diastema closure',
      'Anterior esthetic restorations',
      'Material selection and handling'
    ],
    curriculum: [
      {
        module: 'Adhesive Dentistry',
        topics: [
          'Bonding protocols',
          'Enamel and dentin bonding',
          'Material science'
        ]
      },
      {
        module: 'Direct Restorations',
        topics: [
          'Composite placement techniques',
          'Layering for natural appearance',
          'Polishing and finishing'
        ]
      },
      {
        module: 'Indirect Restorations',
        topics: [
          'Inlay and onlay preparations',
          'Impression and temporization',
          'Cementation protocols'
        ]
      },
      {
        module: 'Anterior Esthetics',
        topics: [
          'Shade selection',
          'Diastema closure techniques',
          'Veneer alternatives'
        ]
      }
    ],
    whoIsThisFor: [
      'Dentists wanting to improve esthetic outcomes',
      'Practitioners seeking to expand restorative services',
      'Recent graduates building skills',
      'Dentists interested in cosmetic dentistry'
    ],
    faculty: {
      name: 'Dr. Neha Gupta',
      title: 'MDS Conservative Dentistry',
      image: 'https://images.pexels.com/photos/5215109/pexels-photo-5215109.jpeg',
      bio: 'Specialist in esthetic restorative dentistry with keen eye for natural-looking results. Popular speaker at dental conferences.'
    },
    faqs: [
      {
        question: 'What materials are covered?',
        answer: 'We cover all modern restorative materials including composites, glass ionomers, and ceramic systems.'
      },
      {
        question: 'Will I learn veneer techniques?',
        answer: 'While the focus is on direct and semi-direct restorations, we cover veneer alternatives and preparation basics.'
      }
    ]
  },
  {
    id: '7',
    slug: 'orthodontic-fundamentals-course',
    title: 'Orthodontic Fundamentals Course',
    shortDescription: 'Introduction to orthodontic diagnosis, treatment planning, and basic appliance therapy',
    fullDescription: 'Comprehensive introduction to orthodontics covering growth and development, diagnosis, treatment planning, and basic fixed and removable appliance therapy.',
    price: 28000,
    originalPrice: 35000,
    thumbnail: 'https://images.pexels.com/photos/6528840/pexels-photo-6528840.jpeg',
    category: 'Clinical Dentistry',
    mode: 'Hybrid',
    duration: '4 months',
    rating: 4.7,
    reviewCount: 87,
    featured: false,
    popular: true,
    whatYouLearn: [
      'Growth and development assessment',
      'Cephalometric analysis',
      'Orthodontic diagnosis and case classification',
      'Treatment planning principles',
      'Removable appliance design',
      'Basic fixed appliance mechanics'
    ],
    curriculum: [
      {
        module: 'Orthodontic Diagnosis',
        topics: [
          'Records collection and analysis',
          'Cephalometric tracing',
          'Model analysis'
        ]
      },
      {
        module: 'Treatment Planning',
        topics: [
          'Malocclusion classification',
          'Treatment objectives',
          'Appliance selection'
        ]
      },
      {
        module: 'Removable Appliances',
        topics: [
          'Design principles',
          'Fabrication process',
          'Clinical management'
        ]
      },
      {
        module: 'Fixed Appliances',
        topics: [
          'Bracket placement',
          'Archwire selection',
          'Basic mechanics'
        ]
      }
    ],
    whoIsThisFor: [
      'General dentists interested in orthodontics',
      'Practitioners wanting to offer limited orthodontic services',
      'Dentists preparing for specialization',
      'Those interested in interceptive orthodontics'
    ],
    faculty: {
      name: 'Dr. Amit Khanna',
      title: 'MDS Orthodontics, 14+ Years',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg',
      bio: 'Experienced orthodontist with expertise in both traditional and modern orthodontic systems. Committed to teaching practical skills.'
    },
    faqs: [
      {
        question: 'Can general dentists practice orthodontics?',
        answer: 'Yes, general dentists can perform limited orthodontic procedures. This course prepares you for interceptive and basic cases.'
      },
      {
        question: 'Are clear aligners covered?',
        answer: 'Basic concepts are introduced, but the focus is on traditional appliances. Advanced aligner therapy is covered in separate courses.'
      }
    ]
  },
  {
    id: '8',
    slug: 'pediatric-dentistry-essentials',
    title: 'Pediatric Dentistry Essentials',
    shortDescription: 'Comprehensive pediatric dental care from infancy through adolescence',
    fullDescription: 'Complete training in pediatric dentistry covering behavior management, preventive care, restorative procedures, and management of dental emergencies in children.',
    price: 22000,
    originalPrice: 28000,
    thumbnail: 'https://images.pexels.com/photos/3952048/pexels-photo-3952048.jpeg',
    category: 'Clinical Dentistry',
    mode: 'Hybrid',
    duration: '3 months',
    rating: 4.8,
    reviewCount: 134,
    featured: false,
    popular: false,
    whatYouLearn: [
      'Child psychology and behavior management',
      'Preventive pediatric dentistry',
      'Restorative procedures in primary teeth',
      'Pulp therapy in children',
      'Space management',
      'Managing dental trauma'
    ],
    curriculum: [
      {
        module: 'Child Development and Psychology',
        topics: [
          'Growth and development',
          'Behavior management techniques',
          'Parental counseling'
        ]
      },
      {
        module: 'Preventive Dentistry',
        topics: [
          'Fluoride therapy',
          'Pit and fissure sealants',
          'Diet counseling'
        ]
      },
      {
        module: 'Restorative Procedures',
        topics: [
          'Cavity preparation in primary teeth',
          'Restorative materials',
          'Stainless steel crowns'
        ]
      },
      {
        module: 'Pulp Therapy and Space Management',
        topics: [
          'Pulpotomy and pulpectomy',
          'Space maintainers',
          'Early orthodontic intervention'
        ]
      }
    ],
    whoIsThisFor: [
      'General dentists wanting to treat children confidently',
      'Practitioners looking to expand to family practice',
      'Recent graduates building pediatric skills',
      'Dentists in areas with limited pediatric specialists'
    ],
    faculty: {
      name: 'Dr. Pooja Reddy',
      title: 'MDS Pedodontics, 11+ Years',
      image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg',
      bio: 'Passionate pediatric dentist known for gentle approach and excellent behavior management skills. Trains dentists in child-friendly practices.'
    },
    faqs: [
      {
        question: 'How do you teach behavior management online?',
        answer: 'We use extensive video demonstrations, role-playing scenarios, and case discussions to teach effective behavior management.'
      },
      {
        question: 'Is sedation dentistry covered?',
        answer: 'Basic concepts and indications are discussed. Hands-on sedation training requires separate certification courses.'
      }
    ]
  },
  {
    id: '9',
    slug: 'dental-practice-management',
    title: 'Dental Practice Management Course',
    shortDescription: 'Build and grow a successful dental practice with proven business strategies',
    fullDescription: 'Comprehensive practice management training covering business setup, marketing, team building, financial management, and patient retention strategies.',
    price: 19000,
    originalPrice: 25000,
    thumbnail: 'https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg',
    category: 'Support Dentistry',
    mode: 'Online',
    duration: '2 months',
    rating: 4.7,
    reviewCount: 156,
    featured: false,
    popular: true,
    whatYouLearn: [
      'Practice setup and legal requirements',
      'Financial planning and management',
      'Marketing and patient acquisition',
      'Team hiring and training',
      'Patient retention strategies',
      'Digital practice management tools'
    ],
    curriculum: [
      {
        module: 'Starting Your Practice',
        topics: [
          'Business planning',
          'Location selection',
          'Equipment and setup',
          'Legal and regulatory compliance'
        ]
      },
      {
        module: 'Financial Management',
        topics: [
          'Budgeting and forecasting',
          'Fee setting strategies',
          'Insurance and billing',
          'Profitability analysis'
        ]
      },
      {
        module: 'Marketing Your Practice',
        topics: [
          'Brand development',
          'Digital marketing',
          'Community engagement',
          'Patient referral programs'
        ]
      },
      {
        module: 'Team and Operations',
        topics: [
          'Hiring best talent',
          'Training and development',
          'Workflow optimization',
          'Quality assurance'
        ]
      }
    ],
    whoIsThisFor: [
      'Dentists planning to open their own practice',
      'Practice owners seeking growth strategies',
      'Associates considering partnership',
      'Practitioners wanting to improve profitability'
    ],
    faculty: {
      name: 'Dr. Sanjay Kapoor',
      title: 'BDS, MBA, Practice Consultant',
      image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg',
      bio: 'Successful practice owner and business consultant who has helped dozens of dentists build thriving practices.'
    },
    faqs: [
      {
        question: 'Is this only for practice owners?',
        answer: 'No, associates and future practice owners will also benefit greatly from understanding practice management.'
      },
      {
        question: 'Do you provide business plan templates?',
        answer: 'Yes, the course includes templates, checklists, and tools you can customize for your practice.'
      }
    ]
  },
  {
    id: '10',
    slug: 'dental-photography-masterclass',
    title: 'Dental Photography Masterclass',
    shortDescription: 'Professional dental photography for documentation, marketing, and patient communication',
    fullDescription: 'Master clinical dental photography covering equipment selection, lighting techniques, standardized views, and photo editing for clinical documentation and marketing.',
    price: 12000,
    originalPrice: 16000,
    thumbnail: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg',
    category: 'Support Dentistry',
    mode: 'Online',
    duration: '1 month',
    rating: 4.6,
    reviewCount: 73,
    featured: false,
    popular: false,
    whatYouLearn: [
      'Camera and equipment selection',
      'Lighting setup and techniques',
      'Standardized clinical photography',
      'Intraoral and extraoral views',
      'Photo editing basics',
      'Using photography for case presentation'
    ],
    curriculum: [
      {
        module: 'Equipment and Setup',
        topics: [
          'Camera selection',
          'Lenses and accessories',
          'Lighting equipment',
          'Budget-friendly options'
        ]
      },
      {
        module: 'Clinical Photography Protocols',
        topics: [
          'Standardized views',
          'Patient positioning',
          'Retractors and mirrors',
          'Shade documentation'
        ]
      },
      {
        module: 'Advanced Techniques',
        topics: [
          'Macro photography',
          'Before-after series',
          'Video documentation'
        ]
      },
      {
        module: 'Post-Processing and Use',
        topics: [
          'Basic editing',
          'Image organization',
          'Case presentations',
          'Marketing materials'
        ]
      }
    ],
    whoIsThisFor: [
      'Dentists wanting professional clinical documentation',
      'Practitioners interested in esthetic dentistry',
      'Practice owners seeking better marketing',
      'Anyone wanting to improve case presentations'
    ],
    faculty: {
      name: 'Dr. Rohit Malhotra',
      title: 'BDS, Certified Dental Photographer',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg',
      bio: 'Expert in clinical dental photography with work featured in multiple dental journals. Passionate about teaching visual documentation.'
    },
    faqs: [
      {
        question: 'Do I need expensive equipment?',
        answer: 'We cover options for various budgets. You can start with basic equipment and upgrade as needed.'
      },
      {
        question: 'Is editing software included?',
        answer: 'We teach using free and paid software options. Recommendations are provided based on your needs.'
      }
    ]
  }
];
