import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Phone, Mail, MapPin, Menu, X, Globe, Home, Facebook, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import OptimizedCursor from '@/components/ui/optimized-cursor';
import LazyImage from '@/components/ui/lazy-image';
import { ImageCarousel } from '@/components/ui/image-carousel';

import { usePerformance } from '@/hooks/use-performance';
import villaHeroImage from '@/assets/villa-hero.jpg';
import architectPortrait from '@/assets/cb9503b7-96dd-4f45-a014-0cd620f5d801.png';
const Index = () => {
  const { isMobile, animationDuration, enableHeavyAnimations } = usePerformance();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('he');
  const [direction, setDirection] = useState('rtl');

  // Mobile debugging
  useEffect(() => {
    if (isMobile && typeof window !== 'undefined') {
      console.log('Mobile Debug Info:', {
        userAgent: navigator.userAgent,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        devicePixelRatio: window.devicePixelRatio,
        orientation: window.screen.orientation?.type || 'unknown',
        isMobile,
        animationDuration,
        enableHeavyAnimations
      });
    }
  }, [isMobile, animationDuration, enableHeavyAnimations]);

  // Luxury villa images for carousel - Desktop optimized (landscape/horizontal)
  const desktopHeroImages = [
    "/desktop-images/desktop-hero-1.png", 
    "/desktop-images/desktop-hero-2.jpg", 
    "/desktop-images/desktop-hero-3.png", 
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  ];

  // Mobile optimized images (portrait/vertical or square)
  const mobileHeroImages = [
    "/mobile-images/mobile-hero-1.jpg", // Portrait villa image
    "/mobile-images/mobile-hero-2.jpg", // Another portrait villa image
    "/mobile-images/mobile-hero-3.jpg", // Portrait villa image
    "/mobile-images/mobile-hero-4.jpg"  // Portrait villa image
  ];

  // Select appropriate images based on device type
  const heroImages = isMobile ? mobileHeroImages : desktopHeroImages;

  // Portfolio projects
  const projects = [{
    name: "Luxury Villa with Middle Eastern Design",
    location: "Rahat, Israel", 
    year: "2024",
    images: [
      "/1/IMG_0109.jpg",
      "/1/IMG_0110.jpg",
      "/1/IMG_0111.JPG",
      "/1/IMG_0113.jpg"
    ],
    mainImage: "/1/IMG_0110.jpg",
    description: "Contemporary luxury villa featuring stunning archway design, multi-level terraces, and sophisticated modern Islamic architectural elements with intricate geometric patterns."
  }, {
    name: "Modern Contemporary Villa with Wood Accents",
    location: "Rahat, Israel",
    year: "2024",
    images: [
      "/2/9a334caa-a025-404f-b9f1-2f072f885ed4.jpg",
      "/2/6d8636c6-040d-4c9b-a18a-72900fffd165.jpg",
      "/2/f5af2ae7-6f42-4532-a67d-f100cb67087d.jpg"
    ],
    mainImage: "/2/9a334caa-a025-404f-b9f1-2f072f885ed4.jpg",
    description: "Ultra-modern luxury villa featuring distinctive circular windows, sophisticated wood and stone cladding, and contemporary architectural design with integrated outdoor living spaces."
  }, {
    name: "Modern Villa with Panoramic Views",
    location: "Rahat, Israel",
    year: "2024",
    images: [
      "/3/מבט א.jpg",
      "/3/מבט ב.jpg",
      "/3/מבט ג.jpg"
    ],
    mainImage: "/3/מבט א.jpg",
    description: "Contemporary villa featuring stunning panoramic views, modern architectural design with clean lines, and sophisticated outdoor living spaces."
  }, {
    name: "Luxury Villa with Video Showcase",
    location: "Rahat, Israel",
    year: "2024",
    images: [
      "/4/IMG_0530.JPG",
      "/4/EEF65AC9-F3A7-42B9-B241-16B02C7E737D.JPG",
      "/4/IMG_0527.jpg",
      "/4/IMG_0531.JPG"
    ],
    mainImage: "/4/IMG_0530.JPG",
    description: "Exquisite luxury villa featuring premium materials, sophisticated design elements, and comprehensive visual documentation including video showcase."
  }, {
    name: "Lahavim Villa - Evening Views",
    location: "Lahavim, Israel",
    year: "2024",
    images: [
      "/5/וילה להבים - מבט א עם לוגו- ערב.jpg",
      "/5/וילה להבים - מבט ב עם לוגו- ערב.jpg",
      "/5/וילה להבים - מבט ג עם לוגו- ערב.jpg"
    ],
    mainImage: "/5/וילה להבים - מבט ב עם לוגו- ערב.jpg",
    description: "Stunning villa in Lahavim featuring elegant evening lighting, sophisticated architectural design, and premium luxury finishes."
  }, {
    name: "Contemporary Villa with Modern Aesthetics",
    location: "Rahat, Israel",
    year: "2024",
    images: [
      "/6/IMG_4938.jpg",
      "/6/IMG_4939.jpg"
    ],
    mainImage: "/6/IMG_4938.jpg",
    description: "Modern contemporary villa showcasing clean architectural lines, sophisticated design elements, and premium materials for discerning clients."
  }];

  // Testimonials
  const testimonials = [{
    quote: "Domyan transformed our vision into a breathtaking reality. Their attention to detail and commitment to excellence is unmatched.",
    author: "Sarah Mitchell",
    project: "Villa Owner, Beverly Hills",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  }, {
    quote: "Working with Domyan was a journey in luxury. They understood our desires and delivered beyond our wildest dreams.",
    author: "Ahmed Al-Rashid",
    project: "Palace Owner, Dubai",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  }];

  // Translation content
  const translations = {
    en: {
      direction: 'ltr',
      nav: ['HOME', 'ABOUT', 'OUR WORK', 'SERVICES', 'TESTIMONIALS', 'CONTACT'],
      heroTitle: 'CRAFTING ARCHITECTURAL MASTERPIECES',
      heroSubtitle: 'Where Luxury Meets Innovation',
      discoverPortfolio: 'Discover Our Portfolio',
      scheduleConsultation: 'Schedule Free Consultation',
      aboutTitle: 'Architectural Excellence Redefined',
      aboutText: "At Domyan, we don't just design buildings; we craft living masterpieces that harmonize luxury, functionality, and timeless elegance. With over two decades of experience in creating bespoke architectural solutions, we transform dreams into iconic structures.",
      portfolioTitle: 'Featured Projects',
      portfolioSubtitle: 'Explore our collection of luxury architectural masterpieces',
      servicesTitle: 'Premium Services',
      servicesSubtitle: 'Comprehensive architectural solutions tailored for luxury living',
      testimonialsTitle: 'Client Testimonials',
      testimonialsSubtitle: 'What our distinguished clients say about their experience with us',
      contactTitle: 'Start Your Journey',
      contactSubtitle: 'Let us bring your architectural vision to life',
      footerCompany: 'Company',
      footerServices: 'Services',
      footerContact: 'Contact',
      footerQuickLinks: 'Quick Links',
      footerCopyright: '2024 Domyan Architecture. All rights reserved.',
      getInTouch: 'Get in Touch',
      phoneLabel: 'Phone',
      emailLabel: 'Email',
      officeLabel: 'Office',
      interactiveMap: 'Interactive Map',
      footerDescription: 'Crafting architectural masterpieces where luxury meets innovation. Transforming dreams into iconic structures for over two decades.',
      footerFinalCopyright: 'Crafted with excellence by Faris Alkrinawi © 2024. All rights reserved.',
      projects: [{
        name: "Luxury Villa with Middle Eastern Design",
        location: "Rahat, Israel",
        year: "2024",
        images: [
          "/1/IMG_0109.jpg",
          "/1/IMG_0110.jpg",
          "/1/IMG_0111.JPG",
          "/1/IMG_0113.jpg"
        ],
        mainImage: "/1/IMG_0110.jpg",
        description: "Contemporary luxury villa featuring stunning archway design, multi-level terraces, and sophisticated modern Islamic architectural elements with intricate geometric patterns."
      }, {
        name: "Modern Contemporary Villa with Wood Accents",
        location: "Rahat, Israel",
        year: "2024",
        images: [
          "/2/9a334caa-a025-404f-b9f1-2f072f885ed4.jpg",
          "/2/6d8636c6-040d-4c9b-a18a-72900fffd165.jpg",
          "/2/f5af2ae7-6f42-4532-a67d-f100cb67087d.jpg"
        ],
        mainImage: "/2/9a334caa-a025-404f-b9f1-2f072f885ed4.jpg",
        description: "Ultra-modern luxury villa featuring distinctive circular windows, sophisticated wood and stone cladding, and contemporary architectural design with integrated outdoor living spaces."
      }, {
        name: "Modern Villa with Panoramic Views",
        location: "Rahat, Israel",
        year: "2024",
        images: [
          "/3/מבט א.jpg",
          "/3/מבט ב.jpg",
          "/3/מבט ג.jpg"
        ],
        mainImage: "/3/מבט א.jpg",
        description: "Contemporary villa featuring stunning panoramic views, modern architectural design with clean lines, and sophisticated outdoor living spaces."
      }, {
        name: "Luxury Villa with Video Showcase",
        location: "Rahat, Israel",
        year: "2024",
        images: [
          "/4/IMG_0530.JPG",
          "/4/EEF65AC9-F3A7-42B9-B241-16B02C7E737D.JPG",
          "/4/IMG_0527.jpg",
          "/4/IMG_0531.JPG"
        ],
        mainImage: "/4/IMG_0530.JPG",
        description: "Exquisite luxury villa featuring premium materials, sophisticated design elements, and comprehensive visual documentation including video showcase."
      }, {
        name: "Lahavim Villa - Evening Views",
        location: "Lahavim, Israel",
        year: "2024",
        images: [
          "/5/וילה להבים - מבט א עם לוגו- ערב.jpg",
          "/5/וילה להבים - מבט ב עם לוגו- ערב.jpg",
          "/5/וילה להבים - מבט ג עם לוגו- ערב.jpg"
        ],
        mainImage: "/5/וילה להבים - מבט ב עם לוגו- ערב.jpg",
        description: "Stunning villa in Lahavim featuring elegant evening lighting, sophisticated architectural design, and premium luxury finishes."
      }, {
        name: "Contemporary Villa with Modern Aesthetics",
        location: "Rahat, Israel",
        year: "2024",
        images: [
          "/6/IMG_4938.jpg",
          "/6/IMG_4939.jpg"
        ],
        mainImage: "/6/IMG_4938.jpg",
        description: "Modern contemporary villa showcasing clean architectural lines, sophisticated design elements, and premium materials for discerning clients."
      }],
      testimonials: [{
        quote: "Domyan transformed our vision into a breathtaking reality. Their attention to detail and commitment to excellence is unmatched.",
        author: "Sarah Mitchell",
        project: "Villa Owner, Beverly Hills"
      }, {
        quote: "Working with Domyan was a journey in luxury. They understood our desires and delivered beyond our wildest dreams.",
        author: "Ahmed Al-Rashid",
        project: "Palace Owner, Dubai"
      }],
      services: [{
        title: 'Luxury Villa Design',
        desc: 'Custom architectural solutions for discerning clients seeking unparalleled luxury'
      }, {
        title: 'Interior Architecture',
        desc: 'Bespoke interior spaces that reflect sophistication and timeless elegance'
      }, {
        title: 'Landscape Integration',
        desc: 'Seamless blend of architecture with natural surroundings'
      }, {
        title: 'Project Management',
        desc: 'End-to-end luxury project execution with meticulous attention to detail'
      }],
      contactForm: {
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        service: 'Service Interested In',
        message: 'Message',
        submit: 'Begin Your Luxury Journey'
      },
      stats: {
        projects: 'Projects Completed',
        years: 'Years of Excellence',
        clients: 'Satisfied Clients',
        awards: 'Excellence Rank'
      }
    },
    he: {
      direction: 'rtl',
      nav: ['בית', 'אודות', 'העבודות שלנו', 'שירותים', 'המלצות', 'צור קשר'],
      heroTitle: 'יוצרים יצירות מופת אדריכליות',
      heroSubtitle: 'איכות היוקרה פוגשת חדשנות',
      discoverPortfolio: 'גלה את הפורטפוליו שלנו',
      scheduleConsultation: 'קבע פגישת ייעוץ בחינם',
      aboutTitle: 'מצוינות אדריכלית מחדש',
      aboutText: "בדומיאן, אנחנו לא רק מעצבים בניינים; אנחנו יוצרים יצירות מופת חיות המשלבות יוקרה, פונקציונליות ואלגנטיות נצחית. עם למעלה משני עשורים של ניסיון ביצירת פתרונות אדריכליים מותאמים אישית, אנחנו הופכים חלומות למבנים איקוניים.",
      portfolioTitle: 'פרויקטים נבחרים',
      portfolioSubtitle: 'חקור את האוסף שלנו של יצירות מופת אדריכליות יוקרתיות',
      servicesTitle: 'שירותים מובחרים',
      servicesSubtitle: 'פתרונות אדריכליים מקיפים המותאמים לחיים יוקרתיים',
      testimonialsTitle: 'המלצות לקוחות',
      testimonialsSubtitle: 'מה הלקוחות המובחרים שלנו אומרים על החוויה איתנו',
      contactTitle: 'התחל את המסע שלך',
      contactSubtitle: 'תן לנו להביא את החזון האדריכלי שלך לחיים',
      footerCompany: 'חברה',
      footerServices: 'שירותים',
      footerContact: 'צור קשר',
      footerQuickLinks: 'קישורים מהירים',
      footerCopyright: '2025 דומיאן אדריכלות. כל הזכויות שמורות.',
      getInTouch: 'צור קשר',
      phoneLabel: 'טלפון',
      emailLabel: 'אימייל',
      officeLabel: 'משרד',
      interactiveMap: 'מפה אינטראקטיבית',
      footerDescription: 'יוצרים יצירות מופת אדריכליות שבהן יוקרה פוגשת חדשנות. הופכים חלומות למבנים איקוניים למעלה משני עשורים.',
      footerFinalCopyright: 'נוצר במצוינות על ידי פארס אלקרינאוי © 2025. כל הזכויות שמורות.',
      projects: [{
        name: "וילת יוקרה עם עיצוב מזרח תיכוני",
        location: "רהט, ישראל",
        year: "2025",
        images: [
          "/1/IMG_0109.jpg",
          "/1/IMG_0110.jpg",
          "/1/IMG_0111.JPG",
          "/1/IMG_0113.jpg"
        ],
        mainImage: "/1/IMG_0110.jpg",
        description: "וילת יוקרה עכשווית הכוללת עיצוב קשת מרהיב, מרפסות רב-קומתיות ואלמנטים אדריכליים מודרניים מתוחכמים עם דגמים גיאומטריים מורכבים."
      }, {
        name: "וילה עכשווית מודרנית עם אקצנטים מעץ",
        location: "רהט, ישראל",
        year: "2025",
        images: [
          "/2/9a334caa-a025-404f-b9f1-2f072f885ed4.jpg",
          "/2/6d8636c6-040d-4c9b-a18a-72900fffd165.jpg",
          "/2/f5af2ae7-6f42-4532-a67d-f100cb67087d.jpg"
        ],
        mainImage: "/2/9a334caa-a025-404f-b9f1-2f072f885ed4.jpg",
        description: "וילת יוקרה אולטרה-מודרנית הכוללת חלונות עגולים ייחודיים, ציפוי עץ ואבן מתוחכם ועיצוב אדריכלי עכשווי עם חללי מגורים חיצוניים משולבים."
      }, {
        name: "וילה מודרנית עם נוף פנורמי",
        location: "רהט, ישראל",
        year: "2024",
        images: [
          "/3/מבט א.jpg",
          "/3/מבט ב.jpg",
          "/3/מבט ג.jpg"
        ],
        mainImage: "/3/מבט א.jpg",
        description: "וילה עכשווית הכוללת נוף פנורמי מרהיב, עיצוב אדריכלי מודרני עם קווים נקיים וחללי מגורים חיצוניים מתוחכמים."
      }, {
        name: "וילת יוקרה עם הצגת וידאו",
        location: "רהט, ישראל",
        year: "2024",
        images: [
          "/4/IMG_0530.JPG",
          "/4/EEF65AC9-F3A7-42B9-B241-16B02C7E737D.JPG",
          "/4/IMG_0527.jpg",
          "/4/IMG_0531.JPG"
        ],
        mainImage: "/4/IMG_0530.JPG",
        description: "וילת יוקרה מעודנת הכוללת חומרים יוקרתיים, אלמנטי עיצוב מתוחכמים ותיעוד חזותי מקיף כולל הצגת וידאו."
      }, {
        name: "וילה להבים - מבטים ערביים",
        location: "להבים, ישראל",
        year: "2024",
        images: [
          "/5/וילה להבים - מבט א עם לוגו- ערב.jpg",
          "/5/וילה להבים - מבט ב עם לוגו- ערב.jpg",
          "/5/וילה להבים - מבט ג עם לוגו- ערב.jpg"
        ],
        mainImage: "/5/וילה להבים - מבט ב עם לוגו- ערב.jpg",
        description: "וילה מרהיבה בלהבים הכוללת תאורה ערבית אלגנטית, עיצוב אדריכלי מתוחכם וגימורים יוקרתיים."
      }, {
        name: "וילה עכשווית עם אסתטיקה מודרנית",
        location: "רהט, ישראל",
        year: "2024",
        images: [
          "/6/IMG_4938.jpg",
          "/6/IMG_4939.jpg"
        ],
        mainImage: "/6/IMG_4938.jpg",
        description: "וילה עכשווית מודרנית המציגה קווים אדריכליים נקיים, אלמנטי עיצוב מתוחכמים וחומרים יוקרתיים ללקוחות תובעניים."
      }],
      testimonials: [{
        quote: "דומיאן הפך את החזון שלנו למציאות עוצרת נשימה. תשומת הלב לפרטים והמחויבות למצוינות שלהם ללא תחרות.",
        author: "שרה מיטשל",
        project: "בעלת וילה, בוורלי הילס"
      }, {
        quote: "העבודה עם דומיאן הייתה מסע ביוקרה. הם הבינו את הרצונות שלנו וסיפקו מעבר לחלומות הפרועים שלנו.",
        author: "אחמד אל-ראשיד",
        project: "בעל ארמון, דובאי"
      }],
      services: [{
        title: 'עיצוב וילות יוקרה',
        desc: 'פתרונות אדריכליים מותאמים ללקוחות תובעניים המחפשים יוקרה ללא תחרות'
      }, {
        title: 'אדריכלות פנים',
        desc: 'חללי פנים מותאמית המשקפים תחכום ואלגנטיות נצחית'
      }, {
        title: 'אינטגרציה נופית',
        desc: 'מיזוג חלק של אדריכלות עם הסביבה הטבעית'
      }, {
        title: 'ניהול פרויקטים',
        desc: 'ביצוע פרויקטי יוקרה מקצה לקצה עם תשומת לב קפדנית לפרטים'
      }],
      contactForm: {
        name: 'שם',
        email: 'אימייל',
        phone: 'טלפון',
        service: 'השירות שמעניין אותך',
        message: 'הודעה',
        submit: 'התחל את מסע היוקרה שלך'
      },
      stats: {
        projects: 'פרויקטים שהושלמו',
        years: 'שנות מצוינות',
        clients: 'לקוחות מרוצים',
        awards: 'דירוג מצוינות'
      }
    },
    ar: {
      direction: 'rtl',
      nav: ['الرئيسية', 'عن', 'أعمالنا', 'الخدمات', 'الشهادات', 'اتصل'],
      heroTitle: 'صناعة التحف المعمارية',
      heroSubtitle: 'حيث تلتقي الفخامة بالابتكار',
      discoverPortfolio: 'اكتشف محفظتنا',
      scheduleConsultation: 'حدد موعد استشارة مجاناً',
      aboutTitle: 'إعادة تعريف التميز المعماري',
      aboutText: "في دوميان، نحن لا نصمم المباني فقط؛ نصنع تحفاً حية تجمع بين الفخامة والوظائف والأناقة الخالدة. مع أكثر من عقدين من الخبرة في إنشاء حلول معمارية مخصصة، نحول الأحلام إلى هياكل أيقونية.",
      portfolioTitle: 'المشاريع المميزة',
      portfolioSubtitle: 'استكشف مجموعتنا من التحف المعمارية الفاخرة',
      servicesTitle: 'الخدمات المميزة',
      servicesSubtitle: 'حلول معمارية شاملة مصممة للحياة الفاخرة',
      testimonialsTitle: 'شهادات العملاء',
      testimonialsSubtitle: 'ما يقوله عملاؤنا المميزون عن تجربتهم معنا',
      contactTitle: 'ابدأ رحلتك',
      contactSubtitle: 'دعنا نحقق رؤيتك المعمارية',
      footerCompany: 'الشركة',
      footerServices: 'الخدمات',
      footerContact: 'اتصل بنا',
      footerQuickLinks: 'روابط سريعة',
      footerCopyright: '2024 دوميان للهندسة المعمارية. جميع الحقوق محفوظة.',
      getInTouch: 'تواصل معنا',
      phoneLabel: 'الهاتف',
      emailLabel: 'البريد الإلكتروني',
      officeLabel: 'المكتب',
      interactiveMap: 'خريطة تفاعلية',
      footerDescription: 'صناعة التحف المعمارية حيث تلتقي الفخامة بالابتكار. تحويل الأحلام إلى هياكل أيقونية لأكثر من عقدين.',
      footerFinalCopyright: 'صُنع بامتياز بواسطة فارس القريناوي © 2024. جميع الحقوق محفوظة.',
      projects: [{
        name: "فيلا فاخرة بتصميم شرق أوسطي",
        location: "رهط، إسرائيل",
        year: "2024",
        images: [
          "/1/IMG_0109.jpg",
          "/1/IMG_0110.jpg",
          "/1/IMG_0111.JPG",
          "/1/IMG_0113.jpg"
        ],
        mainImage: "/1/IMG_0109.jpg",
        description: "فيلا فاخرة معاصرة تتميز بتصميم قوس مذهל وشرفات متعددة الطوابق وعناصر معمارية حديثة متطورة مع أنماط هندسية معقدة."
      }],
      testimonials: [{
        quote: "حولت دوميان رؤيتنا إلى واقع خلاب. اهتمامهم بالتفاصيل والالتزام بالتميز لا مثيل له.",
        author: "سارة ميتشل",
        project: "مالكة فيلا، بيفرلي هيلز"
      }, {
        quote: "العمل مع دوميان كان رحلة في الفخامة. فهموا رغباتنا وقدموا أكثر من أحلامنا الجامحة.",
        author: "أحمد الراشد",
        project: "مالك قصر، دبي"
      }],
      services: [{
        title: 'تصميم الفلل الفاخرة',
        desc: 'حلول معمارية مخصصة للعملاء المتميزين الذين يسعون للفخامة المنقطعة النظير'
      }, {
        title: 'هندسة الديكور الداخلي',
        desc: 'مساحات داخلية مخصصة تعكس التطور والأناقة الخالدة'
      }, {
        title: 'التكامل الطبيعي',
        desc: 'مزج سلس للهندسة المعمارية مع المحيط الطبيعي'
      }, {
        title: 'إدارة المشاريع',
        desc: 'تنفيذ مشاريع الفخامة من البداية للنهاية مع اهتمام دقيق بالتفاصيل'
      }],
      contactForm: {
        name: 'الاسم',
        email: 'البريد الإلكتروني',
        phone: 'الهاتف',
        service: 'الخدمة المهتم بها',
        message: 'الرسالة',
        submit: 'ابدأ رحلة الفخامة الخاصة بك'
      },
      stats: {
        projects: 'المشاريع المكتملة',
        years: 'سنوات التميز',
        clients: 'العملاء الراضون',
        awards: 'تصنيف التميز'
      }
    }
  };
  // Memoize translations to prevent unnecessary re-renders
  const t = useMemo(() => translations[language as keyof typeof translations], [language]);

  // Memoize hero images to prevent unnecessary re-renders
  const memoizedHeroImages = useMemo(() => heroImages, [heroImages, isMobile]);
  
  // Carousel state for smooth transitions
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Reset carousel when switching between mobile and desktop images
  useEffect(() => {
    setCurrentSlide(0);
    setSlideProgress(0);
  }, [isMobile]);
  
  // Carousel navigation functions
  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % memoizedHeroImages.length);
    setSlideProgress(0);
  }, [memoizedHeroImages.length]);
  
  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + memoizedHeroImages.length) % memoizedHeroImages.length);
    setSlideProgress(0);
  }, [memoizedHeroImages.length]);
  
  // Auto-advance carousel with smooth transitions
  useEffect(() => {
    if (isPaused || !enableHeavyAnimations) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 10000); // 10 seconds per slide
    
    return () => clearInterval(interval);
  }, [isPaused, nextSlide, enableHeavyAnimations]);
  
  // Progress bar animation
  useEffect(() => {
    if (isPaused) return;
    
    const progressInterval = setInterval(() => {
      setSlideProgress(prev => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + 1;
      });
    }, 100); // Update every 100ms for smooth progress
    
    return () => clearInterval(progressInterval);
  }, [isPaused, nextSlide]);

  // Language change handler
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setDirection(translations[lang as keyof typeof translations].direction);
    document.documentElement.setAttribute('dir', translations[lang as keyof typeof translations].direction);
  };

  // Memoize projects and testimonials to prevent unnecessary re-renders
  const memoizedProjects = useMemo(() => projects, []);
  const memoizedTestimonials = useMemo(() => testimonials, []);

  // Form state and validation
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Form validation
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = language === 'he' ? 'שם הוא שדה חובה' : language === 'ar' ? 'الاسم مطلوب' : 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = language === 'he' ? 'אימייל הוא שדה חובה' : language === 'ar' ? 'البريد الإلكتروني مطلوب' : 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = language === 'he' ? 'אימייל לא תקין' : language === 'ar' ? 'البريد الإلكتروني غير صحيح' : 'Invalid email format';
    }
    
    if (!formData.message.trim()) {
      errors.message = language === 'he' ? 'הודעה היא שדה חובה' : language === 'ar' ? 'الرسالة مطلوبة' : 'Message is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch {
      setSubmitStatus('error');
      
      // Reset error message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  return <div className="min-h-screen bg-background" dir={direction}>
      {/* Skip Navigation for Accessibility */}
      <a href="#main-content" className="skip-nav">
        {language === 'he' ? 'דלג לתוכן הראשי' : language === 'ar' ? 'تخطى إلى المحتوى الرئيسي' : 'Skip to main content'}
      </a>
      
      {/* Optimized Custom Cursor */}
      <OptimizedCursor />

      {/* Navigation Header */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              className="text-2xl font-serif font-bold text-green-gradient cursor-pointer"
              onClick={() => document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' })}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              aria-label="Go to top of page"
            >
              DOMYAN
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse rtl:space-x-8">
              {t.nav.map((item, index) => (
                <a 
                  key={index} 
                  href={index === 0 ? '#main-content' : `#section-${index}`} 
                  className="text-foreground hover:text-green-600 transition-all duration-300 relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* Language Selector & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="relative group">
                <Button variant="ghost" size="sm" className="glass">
                  <Globe className="w-4 h-4 mr-2" />
                  {language.toUpperCase()}
                </Button>
                <div className="absolute right-0 top-full mt-2 w-32 glass rounded-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <button onClick={() => handleLanguageChange('en')} className="flex items-center w-full px-3 py-2 text-sm hover:bg-accent/10 rounded">
                    🇬🇧 English
                  </button>
                  <button onClick={() => handleLanguageChange('he')} className="flex items-center w-full px-3 py-2 text-sm hover:bg-accent/10 rounded">
                    🇮🇱 עברית
                  </button>
                  <button onClick={() => handleLanguageChange('ar')} className="flex items-center w-full px-3 py-2 text-sm hover:bg-accent/10 rounded">
                    🇸🇦 العربية
                  </button>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && <motion.div initial={{
          opacity: 0,
          height: 0
        }} animate={{
          opacity: 1,
          height: 'auto'
        }} exit={{
          opacity: 0,
          height: 0
        }} className="md:hidden glass">
              <div className="container mx-auto px-6 py-4 space-y-4">
                {t.nav.map((item, index) => (
                  <a 
                    key={index} 
                    href={index === 0 ? '#main-content' : `#section-${index}`} 
                    className="block text-foreground hover:text-green-600 transition-colors" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section 
        id="main-content"
        className="relative h-screen overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background Carousel */}
        <div className="absolute inset-0">
          {/* Hero Images with Smooth Transitions */}
          {memoizedHeroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={image} 
                alt={`Luxury Villa ${index + 1}`} 
                className="w-full h-full object-cover ken-burns" 
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60"></div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide} 
          className="absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300 z-50 cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
        <button 
          onClick={nextSlide} 
          className="absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300 z-50 cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-7 h-7" />
        </button>

        {/* Progress Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg z-30 px-4">
          {memoizedHeroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                setSlideProgress(0);
              }}
              className="relative flex-1 h-1 bg-white/30 rounded-full overflow-hidden cursor-pointer group min-w-8 max-w-20"
              aria-label={`Go to slide ${index + 1}`}
            >
              {/* Background bar */}
              <div className="absolute inset-0 bg-white/30 rounded-full" />
              
              {/* Progress fill */}
              <div
                className={`absolute inset-0 bg-white rounded-full transition-all duration-100 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-60'
                }`}
                style={{
                  width: index === currentSlide 
                    ? `${slideProgress}%` 
                    : index < currentSlide 
                      ? '100%' 
                      : '0%',
                  transition: index === currentSlide 
                    ? 'none' 
                    : 'width 300ms ease-in-out'
                }}
              />
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </button>
          ))}
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center text-center z-20 pointer-events-none">
          <div className="max-w-4xl mx-auto px-6 hero-content pointer-events-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: animationDuration, delay: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white mb-6"
              style={{ textShadow: '0 0 30px rgba(212, 175, 55, 0.5)' }}
            >
              {t.heroTitle}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: animationDuration, delay: 0.7 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-12 font-light"
            >
              {t.heroSubtitle}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: animationDuration, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Button className="btn-luxury magnetic text-lg px-8 py-4 h-auto min-h-[60px]">
                {t.scheduleConsultation}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="section-1" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: animationDuration }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
                {t.aboutTitle}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.aboutText}
              </p>
              
              {/* Statistics */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: animationDuration, delay: 0.5 }}
                className="grid grid-cols-2 gap-8"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-deep-green">
                    <span data-countup data-end="50" data-suffix="+" data-duration="3000"></span>
                  </div>
                  <div className="text-sm text-muted-foreground">{t.stats.projects}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-deep-green">
                    <span data-countup data-end="12" data-duration="3000"></span>
                  </div>
                  <div className="text-sm text-muted-foreground">{t.stats.years}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-deep-green">
                    <span>A+</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{t.stats.awards}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-deep-green">
                    <span data-countup data-end="100" data-suffix="%" data-duration="3000"></span>
                  </div>
                  <div className="text-sm text-muted-foreground">{t.stats.clients}</div>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: animationDuration }}
              className="relative"
            >
              {/* Elegant Frame Container */}
              <div className="relative p-6 bg-green-800 rounded-2xl shadow-2xl border-4 border-amber-400">
                {/* Inner Frame */}
                <div className="relative p-4 bg-white rounded-xl shadow-inner border-2 border-green-gradient">
                  {/* Image with Enhanced Styling */}
                  <img 
                    src={architectPortrait} 
                    alt="Domyan Architect - Professional Portrait" 
                    className="w-full h-96 object-cover rounded-lg shadow-luxury" 
                  />
                  
                  {/* Subtle Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent rounded-lg"></div>
                  
                  {/* Decorative Corner Elements */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-green-gradient rounded-tl-lg"></div>
                  <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-green-gradient rounded-tr-lg"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-green-gradient rounded-bl-lg"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-green-gradient rounded-br-lg"></div>
                </div>
              </div>
              
              {/* CEO Name and Title */}
              <div className="mt-6 text-center space-y-1">
                <div className="text-lg font-semibold text-foreground">
                  {language === 'ar' ? 'محمد القريناوي' : language === 'he' ? 'מומחד אלקרינאוי' : 'Mohammed Alkrinawi'}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {language === 'ar' ? 'المدير التنفيذي والمؤسس' : language === 'he' ? 'מנכ"ל ומייסד' : 'CEO & Founder'}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="section-2" className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: animationDuration }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              {t.portfolioTitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.portfolioSubtitle}
            </p>
          </motion.div>

          <div className="space-y-16">
            {t.projects.map((project, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: animationDuration, delay: index * 0.2 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
              >
                {/* Project Header */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-8 py-6 border-b border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-3xl font-serif font-bold text-gray-800 mb-2">
                        {project.name}
                      </h3>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-green-600" />
                          {project.location}
                        </span>
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                          {project.year}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8, y: -10 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ 
                          duration: 0.6, 
                          delay: index * 0.1,
                          type: "spring",
                          stiffness: 100
                        }}
                        className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent mb-2"
                      >
                        Project #{index + 1}
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Image Carousel */}
                  <div className="p-8">
                    <ImageCarousel 
                      images={project.images || [project.mainImage || ""]}
                      projectName={project.name}
                      className="w-full h-80 rounded-xl overflow-hidden shadow-lg"
                    />
                  </div>

                  {/* Project Details */}
                  <div className="p-8 bg-gray-50 flex flex-col justify-center">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Project Overview</h4>
                        <p className="text-gray-600 leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-gray-800">Key Features</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            Luxury Design
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            Modern Architecture
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            Premium Materials
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            Custom Details
                          </div>
                        </div>
                      </div>


                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="section-3" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: animationDuration }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              {t.servicesTitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.servicesSubtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.services.map((service, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: animationDuration, delay: index * 0.1 }}
              >
                <Card className="luxury-card text-center p-8 group">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-600/10 flex items-center justify-center group-hover:bg-green-600/20 transition-colors">
                    <Home className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="section-4" className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: animationDuration }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              {t.testimonialsTitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.testimonialsSubtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {t.testimonials.map((testimonial, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: animationDuration, delay: index * 0.2 }}
              >
                <Card className="luxury-card p-8 text-center">
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-accent fill-current" />)}
                  </div>
                  <blockquote className="text-lg italic text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center justify-center space-x-4">
                    <LazyImage 
                      src={memoizedTestimonials[index]?.image || "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"} 
                      alt={testimonial.author} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-accent/20" 
                    />
                    <div className="text-left">
                      <div className="font-semibold text-foreground">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.project}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="section-5" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: animationDuration }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              {t.contactTitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.contactSubtitle}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: animationDuration }}
            >
              <Card className="luxury-card p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t.contactForm.name}
                      </label>
                      <Input 
                        className={`w-full ${formErrors.name ? 'border-red-500' : ''}`}
                        placeholder={t.contactForm.name}
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                      {formErrors.name && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t.contactForm.email}
                      </label>
                      <Input 
                        type="email" 
                        className={`w-full ${formErrors.email ? 'border-red-500' : ''}`}
                        placeholder={t.contactForm.email}
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t.contactForm.phone}
                      </label>
                      <Input 
                        type="tel" 
                        className="w-full"
                        placeholder={t.contactForm.phone}
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t.contactForm.service}
                      </label>
                      <select 
                        className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
                        value={formData.service}
                        onChange={(e) => handleInputChange('service', e.target.value)}
                      >
                        <option value="">{language === 'he' ? 'בחר שירות' : language === 'ar' ? 'اختر الخدمة' : 'Select Service'}</option>
                        <option value="Luxury Villa Design">Luxury Villa Design</option>
                        <option value="Interior Architecture">Interior Architecture</option>
                        <option value="Landscape Integration">Landscape Integration</option>
                        <option value="Full Project Management">Full Project Management</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t.contactForm.message}
                    </label>
                    <Textarea 
                      className={`w-full min-h-32 ${formErrors.message ? 'border-red-500' : ''}`}
                      placeholder={t.contactForm.message}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                    />
                    {formErrors.message && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>
                    )}
                  </div>
                  
                  {/* Submit Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                      <p className="text-green-800 text-center">
                        {language === 'he' ? 'ההודעה נשלחה בהצלחה!' : language === 'ar' ? 'تم إرسال الرسالة بنجاح!' : 'Message sent successfully!'}
                      </p>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-red-800 text-center">
                        {language === 'he' ? 'שגיאה בשליחת ההודעה. נסה שוב.' : language === 'ar' ? 'خطأ في إرسال الرسالة. حاول مرة أخرى.' : 'Error sending message. Please try again.'}
                      </p>
                    </div>
                  )}
                  
                  <Button 
                    type="submit"
                    className="btn-luxury-filled w-full magnetic"
                    disabled={isSubmitting}
                  >
                    {isSubmitting 
                      ? (language === 'he' ? 'שולח...' : language === 'ar' ? 'جاري الإرسال...' : 'Sending...')
                      : t.contactForm.submit
                    }
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Contact Info & Map */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: animationDuration }}
              className="space-y-8"
            >
              <Card className="luxury-card p-8">
                <h3 className="text-2xl font-semibold mb-6">{t.getInTouch}</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">{t.phoneLabel}</div>
                      <div className="text-muted-foreground">052-446-0770</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">{t.emailLabel}</div>
                      <div className="text-muted-foreground">ma89936@gmail.com</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">{t.officeLabel}</div>
                      <div className="text-muted-foreground">Rahat, Israel</div>
                      <div className="flex flex-wrap gap-3 mt-2">
                        <a 
                          href="https://www.google.com/maps/place/%D7%93%D7%95%D7%9E%D7%99%D7%90%D7%9F+%D7%90%D7%93%D7%A8%D7%99%D7%9B%D7%9C%D7%95%D7%AA%E2%80%AD/@31.3804224,34.7369904,17z/data=!4m6!3m5!1s0x150262675d5d5663:0x6db9f5c5438d433c!8m2!3d31.3804224!4d34.7369904!16s%2Fg%2F11f4kv9nw7?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                          </svg>
                          Google Maps
                        </a>
                        <a 
                          href="https://waze.com/ul?ll=31.3804224,34.7369904&navigate=yes&q=%D7%93%D7%95%D7%9E%D7%99%D7%90%D7%9F%20%D7%90%D7%93%D7%A8%D7%99%D7%9B%D7%9C%D7%95%D7%AA"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-[#33C1FF] hover:bg-[#2AA8E6] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 7a1 1 0 11-2 0 1 1 0 012 0zm3.5 0a1 1 0 11-2 0 1 1 0 012 0zm-1.75 3.5c-1.5 0-2.5-.7-2.5-1.8h5c0 1.1-1 1.8-2.5 1.8z"/>
                          </svg>
                          בוויז : דומיאן אדריכלות
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Interactive Google Maps */}
              <div className="h-80 bg-muted rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3396.1234567890123!2d34.7358016!3d31.3804224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x150262675d5d5663%3A0x6db9f5c5438d433c!2s%D7%93%D7%95%D7%9E%D7%99%D7%90%D7%9F%20%D7%90%D7%93%D7%A8%D7%99%D7%9B%D7%9C%D7%95%D7%AA!5e0!3m2!1sen!2sil!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="DOMYAN Architecture Office Location"
                  className="w-full h-full"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-dark-foreground py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <a 
                href="#main-content" 
                className="text-3xl font-serif font-bold text-green-gradient mb-4 hover:text-green-400 transition-colors cursor-pointer block"
              >
                DOMYAN
              </a>
              <p className="text-dark-foreground/80 mb-6 max-w-md">
                {t.footerDescription}
              </p>
              <div className="flex space-x-4">
                {/* Waze */}
                <a 
                  href="https://waze.com/ul?ll=31.3804224,34.7369904&navigate=yes&q=%D7%93%D7%95%D7%9E%D7%99%D7%90%D7%9F%20%D7%90%D7%93%D7%A8%D7%99%D7%9B%D7%9C%D7%95%D7%AA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#33C1FF]/10 rounded-full flex items-center justify-center text-[#33C1FF] hover:bg-[#33C1FF] hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 7a1 1 0 11-2 0 1 1 0 012 0zm3.5 0a1 1 0 11-2 0 1 1 0 012 0zm-1.75 3.5c-1.5 0-2.5-.7-2.5-1.8h5c0 1.1-1 1.8-2.5 1.8z"/>
                  </svg>
                </a>
                
                {/* Facebook */}
                <a href="#" className="w-10 h-10 bg-[#1877F2]/10 rounded-full flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                
                {/* Instagram */}
                <a href="#" className="w-10 h-10 bg-gradient-to-br from-[#833AB4]/10 to-[#E1306C]/10 rounded-full flex items-center justify-center text-[#E1306C] hover:bg-gradient-to-br hover:from-[#833AB4] hover:to-[#E1306C] hover:text-white transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
                
                {/* TikTok */}
                <a href="#" className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Quick Links and Contact - Side by side on mobile */}
            <div className="md:col-span-2 grid grid-cols-2 gap-6 md:gap-8">
              <div>
                <h4 className="font-semibold mb-4 text-green-gradient">{t.footerQuickLinks}</h4>
                <ul className="space-y-2">
                  {t.nav.map((item, index) => <li key={index}>
                      <a href={`#section-${index}`} className="text-dark-foreground/80 hover:text-green-600 transition-colors">
                        {item}
                      </a>
                    </li>)}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-green-gradient">{t.footerContact}</h4>
                <ul className="space-y-2 text-dark-foreground/80">
                  <li>Rahat, Israel</li>
                  <li>052-446-0770</li>
                  <li>ma89936@gmail.com</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-dark-foreground/20 mt-12 pt-8 text-center text-dark-foreground/60">
            <p>
              {(() => {
                const namePatterns = {
                  'he': 'פארס אלקרינאוי',
                  'ar': 'فارس القريناوي', 
                  'en': 'Faris Alkrinawi'
                };
                const currentName = namePatterns[language as keyof typeof namePatterns] || namePatterns['he'];
                const parts = t.footerFinalCopyright.split(currentName);
                
                return parts.map((part, index) => (
                  <React.Fragment key={index}>
                    {part}
                    {index === 0 && (
                      <motion.span
                        className="inline-block font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent relative"
                        animate={{
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        style={{
                          backgroundSize: '200% 200%',
                          textShadow: '0 0 20px rgba(255, 215, 0, 0.6), 0 0 40px rgba(255, 215, 0, 0.4), 0 0 60px rgba(255, 215, 0, 0.2)',
                          filter: 'drop-shadow(0 0 12px rgba(255, 215, 0, 0.5))'
                        }}
                      >
                        {currentName}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/30 to-transparent"
                          animate={{
                            x: ['-100%', '100%'],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 1,
                            ease: "easeInOut"
                          }}
                          style={{
                            transform: 'skewX(-20deg)',
                            width: '50%'
                          }}
                        />
                      </motion.span>
                    )}
                  </React.Fragment>
                ));
              })()}
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a 
        href="https://wa.me/972524460770?text=Hello%20Domyan,%20I'm%20interested%20in%20discussing%20a%20luxury%20architecture%20project" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-luxury hover:scale-110 transition-all duration-500 z-50 floating-slow whatsapp-glow" 
        initial={{
          scale: 0,
          rotate: -180
        }} 
        animate={{
          scale: 1,
          rotate: 0
        }} 
        transition={{
          delay: 2,
          duration: 0.8,
          type: "spring",
          stiffness: 200
        }}
        whileHover={{
          scale: 1.15,
          rotate: 5,
          transition: { duration: 0.3, type: "spring" }
        }}
        whileTap={{
          scale: 0.95,
          transition: { duration: 0.1 }
        }}
      >
        <motion.svg 
          className="w-8 h-8" 
          viewBox="0 0 24 24" 
          fill="currentColor"
          animate={{ 
            rotate: [0, -5, 5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
        </motion.svg>
      </motion.a>
    </div>;
};
export default Index;