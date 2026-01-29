import { DentistRegistration } from '@/types/types';

export const dentistRegistrations: DentistRegistration[] = [
  {
    id: '1',
    slug: 'dr-rajesh-kumar-prosthodontics',
    title: 'Dr. Rajesh Kumar - Prosthodontics Specialist',
    shortDescription: '15+ years experience in prosthodontics and cosmetic dentistry',
    fullDescription: 'Dr. Rajesh Kumar is a highly experienced prosthodontist with over 15 years of practice. He specializes in cosmetic dentistry and full mouth rehabilitation. Dr. Kumar is known for his gentle approach and attention to detail.',
    price: 1500,
    originalPrice: 2000,
    thumbnails: ['https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg'],
    category: 'Prosthodontics',
    mode: 'Offline',
    duration: '30 minutes consultation',
    rating: 4.8,
    reviewCount: 125,
    featured: true,
    popular: true,
    whatYouLearn: [
      'Comprehensive dental examination',
      'Personalized treatment planning',
      'Cosmetic dentistry options',
      'Full mouth rehabilitation solutions'
    ],
    curriculum: [
      {
        module: 'Initial Consultation',
        topics: [
          'Medical history review',
          'Oral examination',
          'Diagnostic imaging',
          'Treatment planning discussion'
        ]
      },
      {
        module: 'Treatment Options',
        topics: [
          'Cosmetic procedures',
          'Prosthetic solutions',
          'Material selection',
          'Timeline and cost discussion'
        ]
      }
    ],
    whoIsThisFor: [
      'Patients seeking cosmetic improvements',
      'Individuals needing full mouth rehabilitation',
      'Those with missing teeth',
      'Patients with worn or damaged teeth'
    ],
    faculty: [
      {
        name: 'Dr. Rajesh Kumar',
        title: 'MDS Prosthodontics',
        image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg',
        bio: '15+ years of experience in prosthodontics and cosmetic dentistry'
      }
    ],
    faqs: [
      {
        question: 'What is the consultation fee?',
        answer: 'The consultation fee is ₹1500, with a discounted rate of ₹2000 for comprehensive treatment planning.'
      },
      {
        question: 'How long does the consultation take?',
        answer: 'Initial consultations typically take 30 minutes to 1 hour depending on the complexity of the case.'
      }
    ],
    // Legacy dentist registration fields
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    phone: '+91 98765 43210',
    qualification: 'MDS Prosthodontics',
    experience: 15,
    clinicName: 'Kumar Dental Clinic',
    clinicAddress: '123 Dental Lane, Mumbai, Maharashtra 400001',
    registrationNumber: 'MH1234567',
    specializations: ['Prosthodontics', 'Cosmetic Dentistry'],
    availability: {
      monday: { start: '09:00', end: '18:00' },
      tuesday: { start: '09:00', end: '18:00' },
      wednesday: { start: '09:00', end: '18:00' },
      thursday: { start: '09:00', end: '18:00' },
      friday: { start: '09:00', end: '18:00' },
      saturday: { start: '09:00', end: '14:00' },
      sunday: { available: false }
    },
    consultationFee: 1500,
    emergencyFee: 2500,
    languages: ['English', 'Hindi', 'Marathi'],
    about: 'Dr. Rajesh Kumar is a highly experienced prosthodontist with over 15 years of practice. He specializes in cosmetic dentistry and full mouth rehabilitation. Dr. Kumar is known for his gentle approach and attention to detail.',
    education: [
      {
        degree: 'Bachelor of Dental Surgery (BDS)',
        institution: 'MGM Dental College',
        year: 2005
      },
      {
        degree: 'Master of Dental Surgery (MDS) - Prosthodontics',
        institution: 'AIIMS New Delhi',
        year: 2008
      }
    ],
    certifications: [
      'Fellowship in Implant Dentistry',
      'Certified Invisalign Provider',
      'Advanced Aesthetic Dentistry Certification'
    ],
    awards: [
      'Best Prosthodontist Award 2020',
      'Excellence in Dental Implants 2019'
    ],
    photo: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg',
    verified: true,
    active: true,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-12-10T14:20:00Z'
  },
  {
    id: '2',
    slug: 'dr-priya-sharma-implant-dentistry',
    title: 'Dr. Priya Sharma - Implant Dentistry Specialist',
    shortDescription: '12+ years experience in dental implants and oral surgery',
    fullDescription: 'Dr. Priya Sharma is a leading implantologist and oral surgeon with extensive experience in complex dental implant procedures. She has successfully placed over 3000 implants and is known for her precision and patient care.',
    price: 2000,
    originalPrice: 2500,
    thumbnails: ['https://images.pexels.com/photos/5215109/pexels-photo-5215109.jpeg'],
    category: 'Implant Dentistry',
    mode: 'Offline',
    duration: '45 minutes consultation',
    rating: 4.9,
    reviewCount: 200,
    featured: true,
    popular: true,
    whatYouLearn: [
      'Comprehensive implant evaluation',
      'Bone grafting options',
      'Sinus lift procedures',
      'Full mouth rehabilitation with implants'
    ],
    curriculum: [
      {
        module: 'Implant Consultation',
        topics: [
          'Medical history and health assessment',
          'Bone quality evaluation',
          'Treatment planning',
          'Surgical procedure explanation'
        ]
      },
      {
        module: 'Advanced Procedures',
        topics: [
          'Sinus lift techniques',
          'Bone grafting methods',
          'Immediate loading options',
          'Long-term maintenance'
        ]
      }
    ],
    whoIsThisFor: [
      'Patients with missing teeth',
      'Individuals needing full mouth reconstruction',
      'Those with bone loss concerns',
      'Patients seeking permanent tooth replacement'
    ],
    faculty: [
      {
        name: 'Dr. Priya Sharma',
        title: 'MDS Oral Surgery',
        image: 'https://images.pexels.com/photos/5215109/pexels-photo-5215109.jpeg',
        bio: '12+ years of experience in dental implants and oral surgery'
      }
    ],
    faqs: [
      {
        question: 'What is the success rate of dental implants?',
        answer: 'Our success rate for dental implants is over 95%, with proper care and maintenance they can last a lifetime.'
      },
      {
        question: 'Is the procedure painful?',
        answer: 'The procedure is performed under local anesthesia and most patients report minimal discomfort during recovery.'
      }
    ],
    // Legacy dentist registration fields
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 98765 12345',
    qualification: 'MDS Oral Surgery',
    experience: 12,
    clinicName: 'Sharma Dental Implant Center',
    clinicAddress: '456 Health Street, Bangalore, Karnataka 560001',
    registrationNumber: 'KA9876543',
    specializations: ['Dental Implants', 'Oral Surgery', 'Periodontics'],
    availability: {
      monday: { start: '10:00', end: '19:00' },
      tuesday: { start: '10:00', end: '19:00' },
      wednesday: { start: '10:00', end: '19:00' },
      thursday: { start: '10:00', end: '19:00' },
      friday: { start: '10:00', end: '19:00' },
      saturday: { start: '10:00', end: '16:00' },
      sunday: { available: false }
    },
    consultationFee: 2000,
    emergencyFee: 3500,
    languages: ['English', 'Hindi', 'Kannada', 'Tamil'],
    about: 'Dr. Priya Sharma is a leading implantologist and oral surgeon with extensive experience in complex dental implant procedures. She has successfully placed over 3000 implants and is known for her precision and patient care.',
    education: [
      {
        degree: 'Bachelor of Dental Surgery (BDS)',
        institution: 'BDS College Bangalore',
        year: 2008
      },
      {
        degree: 'Master of Dental Surgery (MDS) - Oral Surgery',
        institution: 'Manipal College of Dental Sciences',
        year: 2011
      }
    ],
    certifications: [
      'International Congress of Oral Implantologists (ICOI) Certification',
      'Advanced Bone Grafting Certification',
      'Sinus Lift Specialist Certification'
    ],
    awards: [
      'Outstanding Implant Surgeon 2021',
      'Best Research Paper in Implantology 2020'
    ],
    photo: 'https://images.pexels.com/photos/5215109/pexels-photo-5215109.jpeg',
    verified: true,
    active: true,
    createdAt: '2024-02-20T08:15:00Z',
    updatedAt: '2024-12-08T11:45:00Z'
  },
  {
    id: '3',
    slug: 'dr-anil-verma-endodontics',
    title: 'Dr. Anil Verma - Endodontics Specialist',
    shortDescription: '10+ years experience in painless root canal treatments',
    fullDescription: 'Dr. Anil Verma is a specialist in endodontics with a focus on painless root canal treatments. He uses advanced technology including dental microscopes and rotary instruments to ensure the best outcomes for his patients.',
    price: 1200,
    originalPrice: 1500,
    thumbnails: ['https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg'],
    category: 'Endodontics',
    mode: 'Offline',
    duration: '45 minutes consultation',
    rating: 4.7,
    reviewCount: 89,
    featured: true,
    popular: false,
    whatYouLearn: [
      'Painless root canal procedures',
      'Advanced endodontic techniques',
      'Microscopic dentistry',
      'Post-treatment care and maintenance'
    ],
    curriculum: [
      {
        module: 'Root Canal Treatment',
        topics: [
          'Diagnosis and treatment planning',
          'Modern rotary instrumentation',
          'Microscopic precision techniques',
          'Three-dimensional obturation'
        ]
      },
      {
        module: 'Advanced Procedures',
        topics: [
          'Retreatment cases',
          'Surgical endodontics',
          'Traumatic dental injuries',
          'Pain management strategies'
        ]
      }
    ],
    whoIsThisFor: [
      'Patients with tooth pain',
      'Those needing root canal treatment',
      'Individuals with dental trauma',
      'Patients with failed previous treatments'
    ],
    faculty: [
      {
        name: 'Dr. Anil Verma',
        title: 'MDS Endodontics',
        image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg',
        bio: '10+ years of experience in painless root canal treatments'
      }
    ],
    faqs: [
      {
        question: 'Is root canal treatment painful?',
        answer: 'With modern techniques and anesthesia, root canal treatment is typically no more uncomfortable than getting a filling.'
      },
      {
        question: 'How long does the procedure take?',
        answer: 'Most root canal treatments can be completed in 1-2 visits, depending on the complexity of the case.'
      }
    ],
    // Legacy dentist registration fields
    name: 'Dr. Anil Verma',
    email: 'anil.verma@example.com',
    phone: '+91 98765 67890',
    qualification: 'MDS Endodontics',
    experience: 10,
    clinicName: 'Verma Endodontic Clinic',
    clinicAddress: '789 Wellness Road, Delhi 110001',
    registrationNumber: 'DL1122334',
    specializations: ['Endodontics', 'Root Canal Treatment', 'Microsurgery'],
    availability: {
      monday: { start: '08:00', end: '17:00' },
      tuesday: { start: '08:00', end: '17:00' },
      wednesday: { start: '08:00', end: '17:00' },
      thursday: { start: '08:00', end: '17:00' },
      friday: { start: '08:00', end: '17:00' },
      saturday: { start: '09:00', end: '13:00' },
      sunday: { available: false }
    },
    consultationFee: 1200,
    emergencyFee: 2000,
    languages: ['English', 'Hindi', 'Punjabi'],
    about: 'Dr. Anil Verma is a specialist in endodontics with a focus on painless root canal treatments. He uses advanced technology including dental microscopes and rotary instruments to ensure the best outcomes for his patients.',
    education: [
      {
        degree: 'Bachelor of Dental Surgery (BDS)',
        institution: 'Delhi Dental College',
        year: 2010
      },
      {
        degree: 'Master of Dental Surgery (MDS) - Endodontics',
        institution: 'AIIMS New Delhi',
        year: 2013
      }
    ],
    certifications: [
      'Micro Endodontics Certification',
      'Rotary Endodontics Specialist',
      'Pain Management in Dentistry Certification'
    ],
    awards: [
      'Best Endodontist Award 2022',
      'Excellence in Patient Care 2021'
    ],
    photo: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg',
    verified: true,
    active: true,
    createdAt: '2024-03-10T14:30:00Z',
    updatedAt: '2024-12-12T09:15:00Z'
  },
  {
    id: '4',
    slug: 'dr-sunita-malhotra-family-dentistry',
    title: 'Dr. Sunita Malhotra - Family Dentistry Specialist',
    shortDescription: '18+ years experience in comprehensive family dental care',
    fullDescription: 'Dr. Sunita Malhotra is a family dentist with extensive experience in general dentistry and oral medicine. She provides comprehensive dental care for patients of all ages with a focus on preventive dentistry.',
    price: 1000,
    originalPrice: 1200,
    thumbnails: ['https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg'],
    category: 'General Dentistry',
    mode: 'Offline',
    duration: '30 minutes consultation',
    rating: 4.6,
    reviewCount: 156,
    featured: false,
    popular: true,
    whatYouLearn: [
      'Comprehensive dental checkups',
      'Preventive care strategies',
      'Family dental health management',
      'Oral disease prevention'
    ],
    curriculum: [
      {
        module: 'Preventive Care',
        topics: [
          'Regular dental examinations',
          'Professional cleaning procedures',
          'Fluoride treatments',
          'Sealant applications'
        ]
      },
      {
        module: 'Family Dentistry',
        topics: [
          'Pediatric dental care',
          'Adult dental health',
          'Geriatric dental needs',
          'Emergency dental services'
        ]
      }
    ],
    whoIsThisFor: [
      'Families seeking comprehensive care',
      'Patients of all ages',
      'Individuals needing preventive care',
      'Those with dental anxiety'
    ],
    faculty: [
      {
        name: 'Dr. Sunita Malhotra',
        title: 'MDS Oral Medicine',
        image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg',
        bio: '18+ years of experience in comprehensive family dental care'
      }
    ],
    faqs: [
      {
        question: 'Do you treat children?',
        answer: 'Yes, we provide comprehensive dental care for patients of all ages, including specialized pediatric dental services.'
      },
      {
        question: 'How often should I visit for checkups?',
        answer: 'We recommend dental checkups every 6 months for optimal oral health maintenance.'
      }
    ],
    // Legacy dentist registration fields
    name: 'Dr. Sunita Malhotra',
    email: 'sunita.malhotra@example.com',
    phone: '+91 98765 54321',
    qualification: 'MDS Oral Medicine',
    experience: 18,
    clinicName: 'Malhotra Family Dental Care',
    clinicAddress: '321 Care Avenue, Chennai, Tamil Nadu 600001',
    registrationNumber: 'TN7788990',
    specializations: ['General Dentistry', 'Oral Medicine', 'Pediatric Dentistry'],
    availability: {
      monday: { start: '09:30', end: '18:30' },
      tuesday: { start: '09:30', end: '18:30' },
      wednesday: { start: '09:30', end: '18:30' },
      thursday: { start: '09:30', end: '18:30' },
      friday: { start: '09:30', end: '18:30' },
      saturday: { start: '09:30', end: '15:00' },
      sunday: { available: false }
    },
    consultationFee: 1000,
    emergencyFee: 1800,
    languages: ['English', 'Hindi', 'Tamil', 'Telugu'],
    about: 'Dr. Sunita Malhotra is a family dentist with extensive experience in general dentistry and oral medicine. She provides comprehensive dental care for patients of all ages with a focus on preventive dentistry.',
    education: [
      {
        degree: 'Bachelor of Dental Surgery (BDS)',
        institution: 'Meenakshi Ammal Dental College',
        year: 2002
      },
      {
        degree: 'Master of Dental Surgery (MDS) - Oral Medicine',
        institution: 'SRM Dental College',
        year: 2005
      }
    ],
    certifications: [
      'Advanced Cardiac Life Support (ACLS)',
      'Pediatric Advanced Life Support (PALS)',
      'Cosmetic Dentistry Certification'
    ],
    awards: [
      'Best Family Dentist 2020',
      'Community Service Award 2019'
    ],
    photo: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg',
    verified: true,
    active: true,
    createdAt: '2024-01-25T11:45:00Z',
    updatedAt: '2024-12-05T16:30:00Z'
  },
  {
    id: '5',
    slug: 'dr-vikram-singh-prosthodontics',
    title: 'Dr. Vikram Singh - Prosthodontics & Implant Specialist',
    shortDescription: '20+ years experience in full mouth rehabilitation',
    fullDescription: 'Dr. Vikram Singh is a renowned prosthodontist and implantologist with over 20 years of experience. He specializes in full mouth rehabilitation and complex implant cases. His clinic is equipped with the latest technology for optimal patient care.',
    price: 2500,
    originalPrice: 3000,
    thumbnails: ['https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg'],
    category: 'Prosthodontics',
    mode: 'Offline',
    duration: '60 minutes consultation',
    rating: 4.9,
    reviewCount: 320,
    featured: true,
    popular: true,
    whatYouLearn: [
      'Full mouth rehabilitation options',
      'Advanced implant techniques',
      'Digital smile design',
      'Long-term dental solutions'
    ],
    curriculum: [
      {
        module: 'Comprehensive Evaluation',
        topics: [
          'Full mouth examination',
          'Digital imaging and planning',
          'Treatment sequencing',
          'Material selection'
        ]
      },
      {
        module: 'Advanced Procedures',
        topics: [
          'All-on-4/All-on-6 techniques',
          'Zygomatic implants',
          'Bone augmentation procedures',
          'Immediate loading protocols'
        ]
      }
    ],
    whoIsThisFor: [
      'Patients with multiple missing teeth',
      'Individuals needing full mouth reconstruction',
      'Those with failing dental work',
      'Patients seeking permanent solutions'
    ],
    faculty: [
      {
        name: 'Dr. Vikram Singh',
        title: 'MDS Prosthodontics',
        image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg',
        bio: '20+ years of experience in full mouth rehabilitation'
      }
    ],
    faqs: [
      {
        question: 'What is full mouth rehabilitation?',
        answer: 'Full mouth rehabilitation is a comprehensive treatment approach that addresses multiple dental issues to restore function, aesthetics, and oral health.'
      },
      {
        question: 'How long do dental implants last?',
        answer: 'With proper care and maintenance, dental implants can last 20 years or more, often for a lifetime.'
      }
    ],
    // Legacy dentist registration fields
    name: 'Dr. Vikram Singh',
    email: 'vikram.singh@example.com',
    phone: '+91 98765 98765',
    qualification: 'MDS Prosthodontics',
    experience: 20,
    clinicName: 'Singh Multi-Specialty Dental Clinic',
    clinicAddress: '555 Premium Lane, Hyderabad, Telangana 500001',
    registrationNumber: 'TS4455667',
    specializations: ['Prosthodontics', 'Implant Dentistry', 'Cosmetic Dentistry'],
    availability: {
      monday: { start: '10:00', end: '20:00' },
      tuesday: { start: '10:00', end: '20:00' },
      wednesday: { start: '10:00', end: '20:00' },
      thursday: { start: '10:00', end: '20:00' },
      friday: { start: '10:00', end: '20:00' },
      saturday: { start: '10:00', end: '18:00' },
      sunday: { available: true, start: '10:00', end: '16:00' }
    },
    consultationFee: 2500,
    emergencyFee: 4000,
    languages: ['English', 'Hindi', 'Telugu', 'Urdu'],
    about: 'Dr. Vikram Singh is a renowned prosthodontist and implantologist with over 20 years of experience. He specializes in full mouth rehabilitation and complex implant cases. His clinic is equipped with the latest technology for optimal patient care.',
    education: [
      {
        degree: 'Bachelor of Dental Surgery (BDS)',
        institution: 'Osmania Dental College',
        year: 2000
      },
      {
        degree: 'Master of Dental Surgery (MDS) - Prosthodontics',
        institution: 'Nair Hospital Dental College',
        year: 2003
      }
    ],
    certifications: [
      'Fellowship in Implant Dentistry (ICOI)',
      'Advanced Prosthodontics Certification',
      'Digital Smile Design Certification'
    ],
    awards: [
      'Excellence in Implant Dentistry 2021',
      'Best Prosthodontist of the Year 2020',
      'Outstanding Contribution to Dental Education 2019'
    ],
    photo: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg',
    verified: true,
    active: true,
    createdAt: '2024-02-05T09:20:00Z',
    updatedAt: '2024-12-15T10:45:00Z'
  },
  {
    id: '6',
    slug: 'dr-neha-gupta-cosmetic-dentistry',
    title: 'Dr. Neha Gupta - Cosmetic Dentistry Specialist',
    shortDescription: '8+ years experience in aesthetic and restorative dentistry',
    fullDescription: 'Dr. Neha Gupta is a specialist in cosmetic and restorative dentistry. She is passionate about creating beautiful, natural-looking smiles using the latest techniques and materials. Her gentle approach makes even the most anxious patients feel comfortable.',
    price: 1800,
    originalPrice: 2200,
    thumbnails: ['https://images.pexels.com/photos/5215109/pexels-photo-5215109.jpeg'],
    category: 'Cosmetic Dentistry',
    mode: 'Offline',
    duration: '45 minutes consultation',
    rating: 4.8,
    reviewCount: 142,
    featured: true,
    popular: false,
    whatYouLearn: [
      'Smile design principles',
      'Cosmetic treatment options',
      'Laser dentistry benefits',
      'Long-term smile maintenance'
    ],
    curriculum: [
      {
        module: 'Cosmetic Procedures',
        topics: [
          'Teeth whitening techniques',
          'Veneers and laminates',
          'Composite bonding',
          'Gum contouring'
        ]
      },
      {
        module: 'Advanced Aesthetics',
        topics: [
          'Digital smile design',
          'Laser gum treatments',
          'Full mouth makeovers',
          'Maintenance protocols'
        ]
      }
    ],
    whoIsThisFor: [
      'Patients seeking smile enhancement',
      'Individuals with stained or discolored teeth',
      'Those with chipped or misshapen teeth',
      'Patients wanting a complete smile transformation'
    ],
    faculty: [
      {
        name: 'Dr. Neha Gupta',
        title: 'MDS Conservative Dentistry',
        image: 'https://images.pexels.com/photos/5215109/pexels-photo-5215109.jpeg',
        bio: '8+ years of experience in aesthetic and restorative dentistry'
      }
    ],
    faqs: [
      {
        question: 'How long do cosmetic treatments last?',
        answer: 'Most cosmetic treatments can last 5-15 years with proper care, depending on the specific procedure and maintenance.'
      },
      {
        question: 'Is laser dentistry safe?',
        answer: 'Yes, laser dentistry is very safe and offers many benefits including reduced discomfort and faster healing times.'
      }
    ],
    // Legacy dentist registration fields
    name: 'Dr. Neha Gupta',
    email: 'neha.gupta@example.com',
    phone: '+91 98765 11223',
    qualification: 'MDS Conservative Dentistry',
    experience: 8,
    clinicName: 'Gupta Esthetic Dental Studio',
    clinicAddress: '888 Style Street, Pune, Maharashtra 411001',
    registrationNumber: 'MH9988776',
    specializations: ['Cosmetic Dentistry', 'Restorative Dentistry', 'Laser Dentistry'],
    availability: {
      monday: { start: '11:00', end: '20:00' },
      tuesday: { start: '11:00', end: '20:00' },
      wednesday: { start: '11:00', end: '20:00' },
      thursday: { start: '11:00', end: '20:00' },
      friday: { start: '11:00', end: '20:00' },
      saturday: { start: '11:00', end: '17:00' },
      sunday: { available: false }
    },
    consultationFee: 1800,
    emergencyFee: 3000,
    languages: ['English', 'Hindi', 'Marathi'],
    about: 'Dr. Neha Gupta is a specialist in cosmetic and restorative dentistry. She is passionate about creating beautiful, natural-looking smiles using the latest techniques and materials. Her gentle approach makes even the most anxious patients feel comfortable.',
    education: [
      {
        degree: 'Bachelor of Dental Surgery (BDS)',
        institution: 'Bharati Vidyapeeth Dental College',
        year: 2012
      },
      {
        degree: 'Master of Dental Surgery (MDS) - Conservative Dentistry',
        institution: 'Dr. D.Y. Patil Dental College',
        year: 2015
      }
    ],
    certifications: [
      'Laser Dentistry Certification',
      'Advanced Aesthetic Dentistry',
      'Invisalign Provider Certification'
    ],
    awards: [
      'Young Achiever in Cosmetic Dentistry 2022',
      'Best Smile Makeover 2021'
    ],
    photo: 'https://images.pexels.com/photos/5215109/pexels-photo-5215109.jpeg',
    verified: true,
    active: true,
    createdAt: '2024-04-12T13:15:00Z',
    updatedAt: '2024-12-14T15:20:00Z'
  },
  {
    id: '7',
    slug: 'dr-amit-khanna-orthodontics',
    title: 'Dr. Amit Khanna - Orthodontics Specialist',
    shortDescription: '14+ years experience in braces and clear aligners',
    fullDescription: 'Dr. Amit Khanna is a specialist orthodontist with expertise in traditional braces, clear aligners, and early orthodontic intervention. He believes in creating beautiful, healthy smiles that last a lifetime.',
    price: 1500,
    originalPrice: 1800,
    thumbnails: ['https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg'],
    category: 'Orthodontics',
    mode: 'Offline',
    duration: '45 minutes consultation',
    rating: 4.7,
    reviewCount: 178,
    featured: false,
    popular: true,
    whatYouLearn: [
      'Orthodontic treatment options',
      'Braces vs. clear aligners',
      'Early intervention benefits',
      'Treatment duration and care'
    ],
    curriculum: [
      {
        module: 'Orthodontic Treatments',
        topics: [
          'Traditional metal braces',
          'Ceramic braces options',
          'Clear aligner therapy',
          'Lingual braces'
        ]
      },
      {
        module: 'Specialized Care',
        topics: [
          'Early orthodontic intervention',
          'Adult orthodontics',
          'Surgical orthodontics',
          'Retention and maintenance'
        ]
      }
    ],
    whoIsThisFor: [
      'Children and teenagers',
      'Adults seeking orthodontic treatment',
      'Patients with misaligned teeth',
      'Individuals with bite problems'
    ],
    faculty: [
      {
        name: 'Dr. Amit Khanna',
        title: 'MDS Orthodontics',
        image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg',
        bio: '14+ years of experience in braces and clear aligners'
      }
    ],
    faqs: [
      {
        question: 'What is the best age for orthodontic treatment?',
        answer: 'While treatment can be successful at any age, the ideal time is typically between 10-14 years when the head and mouth are still growing.'
      },
      {
        question: 'How long does orthodontic treatment take?',
        answer: 'Treatment duration varies but typically ranges from 18 months to 3 years depending on the complexity of the case.'
      }
    ],
    // Legacy dentist registration fields
    name: 'Dr. Amit Khanna',
    email: 'amit.khanna@example.com',
    phone: '+91 98765 33445',
    qualification: 'MDS Orthodontics',
    experience: 14,
    clinicName: 'Khanna Orthodontic Clinic',
    clinicAddress: '777 Alignment Avenue, Ahmedabad, Gujarat 380001',
    registrationNumber: 'GJ5566778',
    specializations: ['Orthodontics', 'Dentofacial Orthopedics', 'Invisalign'],
    availability: {
      monday: { start: '09:00', end: '18:00' },
      tuesday: { start: '09:00', end: '18:00' },
      wednesday: { start: '09:00', end: '18:00' },
      thursday: { start: '09:00', end: '18:00' },
      friday: { start: '09:00', end: '18:00' },
      saturday: { start: '09:00', end: '14:00' },
      sunday: { available: false }
    },
    consultationFee: 1500,
    emergencyFee: 2500,
    languages: ['English', 'Hindi', 'Gujarati'],
    about: 'Dr. Amit Khanna is a specialist orthodontist with expertise in traditional braces, clear aligners, and early orthodontic intervention. He believes in creating beautiful, healthy smiles that last a lifetime.',
    education: [
      {
        degree: 'Bachelor of Dental Surgery (BDS)',
        institution: 'B.K. Mody Government Dental College',
        year: 2006
      },
      {
        degree: 'Master of Dental Surgery (MDS) - Orthodontics',
        institution: 'M.S. Ramaiah Dental College',
        year: 2009
      }
    ],
    certifications: [
      'Invisalign Certified Provider',
      'Lingual Braces Certification',
      'Temporomandibular Joint Disorders Management'
    ],
    awards: [
      'Best Orthodontist Award 2020',
      'Excellence in Clear Aligner Therapy 2021'
    ],
    photo: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg',
    verified: true,
    active: true,
    createdAt: '2024-03-08T10:30:00Z',
    updatedAt: '2024-12-09T12:10:00Z'
  },
  {
    id: '8',
    slug: 'dr-pooja-reddy-pediatric-dentistry',
    title: 'Dr. Pooja Reddy - Pediatric Dentistry Specialist',
    shortDescription: '11+ years experience in child-friendly dental care',
    fullDescription: 'Dr. Pooja Reddy is a pediatric dentist who creates a fun and friendly environment for children. She specializes in behavior management and provides comprehensive dental care for infants, children, and adolescents.',
    price: 800,
    originalPrice: 1000,
    thumbnails: ['https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg'],
    category: 'Pediatric Dentistry',
    mode: 'Offline',
    duration: '30 minutes consultation',
    rating: 4.9,
    reviewCount: 215,
    featured: true,
    popular: true,
    whatYouLearn: [
      'Child-friendly dental care',
      'Behavior management techniques',
      'Preventive dental strategies',
      'Pediatric dental emergencies'
    ],
    curriculum: [
      {
        module: 'Pediatric Care',
        topics: [
          'Infant oral health',
          'Child behavior management',
          'Preventive treatments',
          'Dental development monitoring'
        ]
      },
      {
        module: 'Advanced Pediatric Dentistry',
        topics: [
          'Sedation dentistry',
          'Dental trauma management',
          'Special needs dentistry',
          'Orthodontic interceptive care'
        ]
      }
    ],
    whoIsThisFor: [
      'Infants and toddlers',
      'Children and adolescents',
      'Parents seeking child-friendly care',
      'Children with special needs'
    ],
    faculty: [
      {
        name: 'Dr. Pooja Reddy',
        title: 'MDS Pedodontics',
        image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg',
        bio: '11+ years of experience in child-friendly dental care'
      }
    ],
    faqs: [
      {
        question: 'How do you handle anxious children?',
        answer: 'We use gentle behavior management techniques, child-friendly explanations, and a fun, welcoming environment to help children feel comfortable.'
      },
      {
        question: 'When should my child first visit the dentist?',
        answer: 'We recommend the first dental visit by age 1 or within 6 months of the first tooth appearing.'
      }
    ],
    // Legacy dentist registration fields
    name: 'Dr. Pooja Reddy',
    email: 'pooja.reddy@example.com',
    phone: '+91 98765 77889',
    qualification: 'MDS Pedodontics',
    experience: 11,
    clinicName: 'Kids Dental World',
    clinicAddress: '999 Children Street, Kochi, Kerala 682001',
    registrationNumber: 'KL3344556',
    specializations: ['Pediatric Dentistry', 'Preventive Dentistry', 'Sedation Dentistry'],
    availability: {
      monday: { start: '08:00', end: '17:00' },
      tuesday: { start: '08:00', end: '17:00' },
      wednesday: { start: '08:00', end: '17:00' },
      thursday: { start: '08:00', end: '17:00' },
      friday: { start: '08:00', end: '17:00' },
      saturday: { start: '09:00', end: '13:00' },
      sunday: { available: false }
    },
    consultationFee: 800,
    emergencyFee: 1500,
    languages: ['English', 'Hindi', 'Malayalam', 'Tamil'],
    about: 'Dr. Pooja Reddy is a pediatric dentist who creates a fun and friendly environment for children. She specializes in behavior management and provides comprehensive dental care for infants, children, and adolescents.',
    education: [
      {
        degree: 'Bachelor of Dental Surgery (BDS)',
        institution: 'Amrita School of Dentistry',
        year: 2011
      },
      {
        degree: 'Master of Dental Surgery (MDS) - Pedodontics',
        institution: 'Manipal College of Dental Sciences',
        year: 2014
      }
    ],
    certifications: [
      'Pediatric Conscious Sedation Certification',
      'Dental Traumatology Certification',
      'Child Psychology in Dentistry'
    ],
    awards: [
      'Best Pediatric Dentist 2021',
      'Child-Friendly Dental Practice Award 2020'
    ],
    photo: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg',
    verified: true,
    active: true,
    createdAt: '2024-05-20T08:45:00Z',
    updatedAt: '2024-12-11T14:30:00Z'
  },
  {
    id: '9',
    slug: 'dr-sanjay-kapoor-dental-excellence',
    title: 'Dr. Sanjay Kapoor - Dental Excellence Center',
    shortDescription: '16+ years experience combining clinical and business excellence',
    fullDescription: 'Dr. Sanjay Kapoor is a dentist with an MBA in Healthcare Management. He combines clinical excellence with business acumen to provide comprehensive dental care. His clinic is known for its state-of-the-art facilities and patient-centric approach.',
    price: 1200,
    originalPrice: 1500,
    thumbnails: ['https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg'],
    category: 'General Dentistry',
    mode: 'Offline',
    duration: '45 minutes consultation',
    rating: 4.8,
    reviewCount: 189,
    featured: true,
    popular: false,
    whatYouLearn: [
      'Comprehensive dental care',
      'Practice management insights',
      'Advanced dental technology',
      'Patient-centered care approaches'
    ],
    curriculum: [
      {
        module: 'Comprehensive Care',
        topics: [
          'Full mouth treatment planning',
          'Advanced diagnostic techniques',
          'Modern dental technology',
          'Patient comfort protocols'
        ]
      },
      {
        module: 'Practice Excellence',
        topics: [
          'Quality management systems',
          'Patient satisfaction strategies',
          'Advanced treatment protocols',
          'Continuing education programs'
        ]
      }
    ],
    whoIsThisFor: [
      'Patients seeking comprehensive care',
      'Individuals wanting advanced technology',
      'Those valuing patient comfort',
      'Patients with complex dental needs'
    ],
    faculty: [
      {
        name: 'Dr. Sanjay Kapoor',
        title: 'BDS, MBA',
        image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg',
        bio: '16+ years of experience combining clinical and business excellence'
      }
    ],
    faqs: [
      {
        question: 'What makes your clinic different?',
        answer: 'Our clinic combines clinical excellence with business management principles to provide the highest quality patient care with efficient, modern facilities.'
      },
      {
        question: 'Do you use the latest technology?',
        answer: 'Yes, we invest in the latest dental technology to ensure accurate diagnosis, comfortable treatment, and excellent results.'
      }
    ],
    // Legacy dentist registration fields
    name: 'Dr. Sanjay Kapoor',
    email: 'sanjay.kapoor@example.com',
    phone: '+91 98765 99001',
    qualification: 'BDS, MBA',
    experience: 16,
    clinicName: 'Kapoor Dental Excellence Center',
    clinicAddress: '111 Business Road, Jaipur, Rajasthan 302001',
    registrationNumber: 'RJ7788990',
    specializations: ['General Dentistry', 'Practice Management', 'Dental Implants'],
    availability: {
      monday: { start: '10:00', end: '21:00' },
      tuesday: { start: '10:00', end: '21:00' },
      wednesday: { start: '10:00', end: '21:00' },
      thursday: { start: '10:00', end: '21:00' },
      friday: { start: '10:00', end: '21:00' },
      saturday: { start: '10:00', end: '18:00' },
      sunday: { available: true, start: '10:00', end: '16:00' }
    },
    consultationFee: 1200,
    emergencyFee: 2200,
    languages: ['English', 'Hindi', 'Rajasthani'],
    about: 'Dr. Sanjay Kapoor is a dentist with an MBA in Healthcare Management. He combines clinical excellence with business acumen to provide comprehensive dental care. His clinic is known for its state-of-the-art facilities and patient-centric approach.',
    education: [
      {
        degree: 'Bachelor of Dental Surgery (BDS)',
        institution: 'Rajasthan University of Health Sciences',
        year: 2004
      },
      {
        degree: 'Master of Business Administration (MBA)',
        institution: 'Indian Institute of Management',
        year: 2008
      }
    ],
    certifications: [
      'Practice Management Certification',
      'Dental Implant Training',
      'Six Sigma in Healthcare'
    ],
    awards: [
      'Best Managed Dental Practice 2020',
      'Innovation in Dental Care 2021'
    ],
    photo: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg',
    verified: true,
    active: true,
    createdAt: '2024-01-30T12:00:00Z',
    updatedAt: '2024-12-13T11:20:00Z'
  },
  {
    id: '10',
    slug: 'dr-rohit-malhotra-aesthetic-dentistry',
    title: 'Dr. Rohit Malhotra - Aesthetic Dentistry Specialist',
    shortDescription: '9+ years experience in cosmetic and dental photography',
    fullDescription: 'Dr. Rohit Malhotra is a cosmetic dentist and certified dental photographer. He specializes in creating perfect smiles and uses advanced photography techniques for treatment planning and documentation. His artistic approach ensures natural and beautiful results.',
    price: 1400,
    originalPrice: 1700,
    thumbnails: ['https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg'],
    category: 'Cosmetic Dentistry',
    mode: 'Offline',
    duration: '60 minutes consultation',
    rating: 4.7,
    reviewCount: 134,
    featured: false,
    popular: true,
    whatYouLearn: [
      'Digital smile design',
      'Dental photography techniques',
      'Aesthetic treatment planning',
      'Natural-looking restorations'
    ],
    curriculum: [
      {
        module: 'Aesthetic Dentistry',
        topics: [
          'Smile analysis and design',
          'Color and shade matching',
          'Minimal preparation techniques',
          'Natural restoration materials'
        ]
      },
      {
        module: 'Dental Photography',
        topics: [
          'Clinical photography techniques',
          'Treatment documentation',
          'Before and after imaging',
          'Marketing and case presentation'
        ]
      }
    ],
    whoIsThisFor: [
      'Patients seeking perfect smiles',
      'Individuals wanting natural-looking results',
      'Those interested in smile makeovers',
      'Patients wanting documented treatment'
    ],
    faculty: [
      {
        name: 'Dr. Rohit Malhotra',
        title: 'BDS',
        image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg',
        bio: '9+ years of experience in cosmetic and dental photography'
      }
    ],
    faqs: [
      {
        question: 'What is digital smile design?',
        answer: 'Digital smile design is a comprehensive approach that uses digital technology to plan and visualize your smile transformation before treatment begins.'
      },
      {
        question: 'How does dental photography help?',
        answer: 'Dental photography helps in accurate diagnosis, treatment planning, progress documentation, and creating beautiful before-and-after comparisons.'
      }
    ],
    // Legacy dentist registration fields
    name: 'Dr. Rohit Malhotra',
    email: 'rohit.malhotra@example.com',
    phone: '+91 98765 44556',
    qualification: 'BDS',
    experience: 9,
    clinicName: 'Malhotra Dental Studio',
    clinicAddress: '222 Art Lane, Chandigarh 160001',
    registrationNumber: 'CH5566778',
    specializations: ['Cosmetic Dentistry', 'Dental Photography', 'Esthetic Dentistry'],
    availability: {
      monday: { start: '09:00', end: '18:00' },
      tuesday: { start: '09:00', end: '18:00' },
      wednesday: { start: '09:00', end: '18:00' },
      thursday: { start: '09:00', end: '18:00' },
      friday: { start: '09:00', end: '18:00' },
      saturday: { start: '09:00', end: '14:00' },
      sunday: { available: false }
    },
    consultationFee: 1400,
    emergencyFee: 2400,
    languages: ['English', 'Hindi', 'Punjabi'],
    about: 'Dr. Rohit Malhotra is a cosmetic dentist and certified dental photographer. He specializes in creating perfect smiles and uses advanced photography techniques for treatment planning and documentation. His artistic approach ensures natural and beautiful results.',
    education: [
      {
        degree: 'Bachelor of Dental Surgery (BDS)',
        institution: 'Baba Farid University of Health Sciences',
        year: 2013
      }
    ],
    certifications: [
      'Certified Dental Photographer',
      'Advanced Aesthetic Dentistry',
      'Digital Smile Design Certification'
    ],
    awards: [
      'Best Dental Photographer 2021',
      'Excellence in Aesthetic Dentistry 2020'
    ],
    photo: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg',
    verified: true,
    active: true,
    createdAt: '2024-04-05T09:30:00Z',
    updatedAt: '2024-12-07T13:45:00Z'
  }
];
