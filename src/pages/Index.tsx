import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Phone, Mail, MapPin, Menu, X, Globe, MessageCircle, Home, User, Briefcase, Award, MessageSquare, Contact, Facebook, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import OptimizedCursor from '@/components/ui/optimized-cursor';
import OptimizedCarousel from '@/components/ui/optimized-carousel';
import LazyImage from '@/components/ui/lazy-image';
import { usePerformance } from '@/hooks/use-performance';
import villaHeroImage from '@/assets/villa-hero.jpg';
const Index = () => {
  const { isMobile, animationDuration, enableHeavyAnimations } = usePerformance();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('he');
  const [direction, setDirection] = useState('rtl');

  // Luxury villa images for carousel
  const heroImages = ["/lovable-uploads/8d20c9fc-1ad5-4977-9593-a5406c9a6dbe.png", villaHeroImage, "/lovable-uploads/ea31bec1-6264-4ecf-969f-9f025c1b1c9f.png", "/lovable-uploads/3dc1f974-3c56-4e09-927a-0f943fe91d12.png", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"];

  // Portfolio projects
  const projects = [{
    name: "Majesty Villa",
    location: "Rahat, Israel", 
    year: "2024",
    image: "/lovable-uploads/cb36632a-5b93-4104-8208-53cae284750e.png",
    description: "Contemporary luxury villa featuring stunning archway design, multi-level terraces, and sophisticated modern Islamic architectural elements."
  }, {
    name: "Aurora Heights Villa",
    location: "Rahat, Israel",
    year: "2024",
    image: "/lovable-uploads/c096be96-831b-49dc-9749-ed9936aa3dd7.png",
    description: "Multi-story luxury residence with contemporary Islamic architecture, featuring elegant arched entrance and sophisticated tiered balconies."
  }, {
    name: "Celestial Manor",
    location: "Rahat, Israel",
    year: "2024",
    image: "/lovable-uploads/1a020df0-aba7-4519-8cec-73d3d139ccd6.png",
    description: "Spectacular villa design featuring distinctive curved archways, modern Islamic architecture, and luxurious multi-level living spaces with panoramic views."
  }, {
    name: "Grand Palacio Residence",
    location: "Rahat, Israel",
    year: "2024",
    image: "/lovable-uploads/557f6c78-e2b3-49f7-8aed-f26fcb8ad483.png",
    description: "Majestic villa showcasing timeless classical architecture with ornate ironwork gates and symmetrical design elements."
  }, {
    name: "Metropolitan Heights",
    location: "Rahat, Israel",
    year: "2024",
    image: "/lovable-uploads/925b8ff8-9907-4622-92dd-b6ccbdf1a7b4.png",
    description: "Contemporary multi-level residence featuring clean geometric lines, expansive balconies, and sophisticated urban design."
  }, {
    name: "Azure Paradise Villa",
    location: "Rahat, Israel",
    year: "2024",
    image: "/lovable-uploads/1a758107-73eb-49ec-87bd-ee3226959bd2.png",
    description: "Modern tropical sanctuary with minimalist design, floor-to-ceiling glass walls, and an infinity pool oasis."
  }, {
    name: "Desert Stone Manor",
    location: "Rahat, Israel",
    year: "2024",
    image: "/lovable-uploads/e44383fb-ba30-44bb-9ed9-07941d57ad44.png",
    description: "Rustic elegance embodied in natural stone construction with contemporary accents and terraced landscaping."
  }, {
    name: "Harmony Residence",
    location: "Rahat, Israel",
    year: "2024",
    image: "/lovable-uploads/0b30eb2c-fb15-4fd3-972a-08d6a250884b.png",
    description: "Balanced blend of traditional stone work and modern architectural elements creating a timeless family sanctuary."
  }, {
    name: "Platinum Modern Estate",
    location: "Rahat, Israel",
    year: "2024",
    image: "/lovable-uploads/b57bae22-2e9a-45c6-b6dc-1fc9e5cbc6cf.png",
    description: "Ultra-modern luxury villa featuring pristine white facades, geometric design principles, and premium finishing materials."
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
      nav: ['HOME', 'ABOUT', 'PORTFOLIO', 'SERVICES', 'TESTIMONIALS', 'CONTACT'],
      heroTitle: 'CRAFTING ARCHITECTURAL MASTERPIECES',
      heroSubtitle: 'Where Luxury Meets Innovation',
      discoverPortfolio: 'Discover Our Portfolio',
      scheduleConsultation: 'Schedule Consultation',
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
      footerFinalCopyright: 'Crafted with excellence by Domyan © 2024. All rights reserved.',
      projects: [{
        name: "Grand Palacio Residence",
        location: "Rahat, Israel",
        year: "2024",
        description: "Majestic villa showcasing timeless classical architecture with ornate ironwork gates and symmetrical design elements."
      }, {
        name: "Celestial Manor",
        location: "Rahat, Israel",
        year: "2024",
        description: "Spectacular villa design featuring distinctive curved archways, modern Islamic architecture, and luxurious multi-level living spaces with panoramic views."
      }, {
        name: "Aurora Heights Villa",
        location: "Rahat, Israel",
        year: "2024",
        description: "Multi-story luxury residence with contemporary Islamic architecture, featuring elegant arched entrance and sophisticated tiered balconies."
      }, {
        name: "Majesty Villa",
        location: "Rahat, Israel",
        year: "2024", 
        description: "Contemporary luxury villa featuring stunning archway design, multi-level terraces, and sophisticated modern Islamic architectural elements."
      }, {
        name: "Metropolitan Heights",
        location: "Rahat, Israel",
        year: "2024",
        description: "Contemporary multi-level residence featuring clean geometric lines, expansive balconies, and sophisticated urban design."
      }, {
        name: "Azure Paradise Villa",
        location: "Rahat, Israel",
        year: "2024",
        description: "Modern tropical sanctuary with minimalist design, floor-to-ceiling glass walls, and an infinity pool oasis."
      }, {
        name: "Desert Stone Manor",
        location: "Rahat, Israel",
        year: "2024",
        description: "Rustic elegance embodied in natural stone construction with contemporary accents and terraced landscaping."
      }, {
        name: "Harmony Residence",
        location: "Rahat, Israel",
        year: "2024",
        description: "Balanced blend of traditional stone work and modern architectural elements creating a timeless family sanctuary."
      }, {
        name: "Platinum Modern Estate",
        location: "Rahat, Israel",
        year: "2024",
        description: "Ultra-modern luxury villa featuring pristine white facades, geometric design principles, and premium finishing materials."
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
      nav: ['בית', 'אודות', 'פורטפוליו', 'שירותים', 'המלצות', 'צור קשר'],
      heroTitle: 'יוצרים יצירות מופת אדריכליות',
      heroSubtitle: 'איכות היוקרה פוגשת חדשנות',
      discoverPortfolio: 'גלה את הפורטפוליו שלנו',
      scheduleConsultation: 'קבע פגישת ייעוץ',
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
      footerCopyright: '2024 דומיאן אדריכלות. כל הזכויות שמורות.',
      getInTouch: 'צור קשר',
      phoneLabel: 'טלפון',
      emailLabel: 'אימייל',
      officeLabel: 'משרד',
      interactiveMap: 'מפה אינטראקטיבית',
      footerDescription: 'יוצרים יצירות מופת אדריכליות שבהן יוקרה פוגשת חדשנות. הופכים חלומות למבנים איקוניים למעלה משני עשורים.',
      footerFinalCopyright: 'נוצר במצוינות על ידי דומיאן © 2024. כל הזכויות שמורות.',
      projects: [{
        name: "אחוזת המורשת המלכותית",
        location: "רהט, ישראל",
        year: "2024",
        description: "אלגנטיות קלאסית פוגשת יוקרה מודרנית באחוזה מרהיבה זו הכוללת עמודים ניאו-קלאסיים ופרטים אדריכליים מעודנים."
      }, {
        name: "מעון פלסיו הגדול",
        location: "רהט, ישראל",
        year: "2024",
        description: "וילה מלכותית המציגה אדריכלות קלאסית נצחית עם שערי ברזל מעוטרים ואלמנטי עיצוב סימטריים."
      }, {
        name: "רמות מטרופוליטן",
        location: "רהט, ישראל",
        year: "2024",
        description: "בית מגורים עכשווי רב-קומתי הכולל קווים גיאומטריים נקיים, מרפסות נרחבות ועיצוב עירוני מתוחכם."
      }, {
        name: "וילת גן עדן תכלת",
        location: "רהט, ישראל",
        year: "2024",
        description: "מקדש טרופי מודרני עם עיצוב מינימליסטי, קירות זכוכית מהרצפה לתקרה ונווה מדבר בריכת אינסוף."
      }, {
        name: "אחוזת אבן המדבר",
        location: "רהט, ישראל",
        year: "2024",
        description: "אלגנטיות כפרית המגולמת בבנייה מאבן טבעית עם אקצנטים עכשוויים ונוף מדורג."
      }, {
        name: "מעון ההרמוניה",
        location: "רהט, ישראל",
        year: "2024",
        description: "שילוב מאוזן של עבודת אבן מסורתית ואלמנטים אדריכליים מודרניים היוצרים מקדש משפחתי נצחי."
      }, {
        name: "אחוזת פלטינום מודרנית",
        location: "רהט, ישראל",
        year: "2024",
        description: "וילת יוקרה אולטרה-מודרנית הכוללת חזיתות לבנות טהורות, עקרונות עיצוב גיאומטריים וחומרי גימור פרימיום."
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
        desc: 'חללי פנים מותאמים אישית המשקפים תחכום ואלגנטיות נצחית'
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
      nav: ['الرئيسية', 'عن', 'المحفظة', 'الخدمات', 'الشهادات', 'اتصل'],
      heroTitle: 'صناعة التحف المعمارية',
      heroSubtitle: 'حيث تلتقي الفخامة بالابتكار',
      discoverPortfolio: 'اكتشف محفظتنا',
      scheduleConsultation: 'حدد موعد استشارة',
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
      footerFinalCopyright: 'صُنع بامتياز بواسطة دوميان © 2024. جميع الحقوق محفوظة.',
      projects: [{
        name: "عقار التراث الملكي",
        location: "رهط، إسرائيل",
        year: "2024",
        description: "الأناقة الكلاسيكية تلتقي بالفخامة الحديثة في هذا العقار الرائع الذي يتميز بأعمدة نيوكلاسيكية وتفاصيل معمارية راقية."
      }, {
        name: "مقر بالاسيو الكبير",
        location: "رهط، إسرائيل",
        year: "2024",
        description: "فيلا مهيبة تعرض العمارة الكلاسيكية الخالدة مع بوابات حديدية مزخرفة وعناصر تصميم متماثلة."
      }, {
        name: "مرتفعات متروبوليتان",
        location: "رهط، إسرائيل",
        year: "2024",
        description: "مقر إقامة معاصر متعدد المستويات يتميز بخطوط هندسية نظيفة وشرفات واسعة وتصميم حضري متطور."
      }, {
        name: "فيلا جنة أزور",
        location: "رهط، إسرائيل",
        year: "2024",
        description: "ملاذ استوائي حديث بتصميم بسيط وجدران زجاجية من الأرض للسقف وواحة بركة لا نهائية."
      }, {
        name: "قصر حجر الصحراء",
        location: "رهط، إسرائيل",
        year: "2024",
        description: "الأناقة الريفية المجسدة في البناء بالحجر الطبيعي مع لمسات عصرية ومناظر طبيعية متدرجة."
      }, {
        name: "مقر الانسجام",
        location: "رهط، إسرائيل",
        year: "2024",
        description: "مزيج متوازن من أعمال الحجر التقليدية والعناصر المعمارية الحديثة لخلق ملاذ عائلي خالد."
      }, {
        name: "عقار بلاتينيوم الحديث",
        location: "رهط، إسرائيل",
        year: "2024",
        description: "فيلا فاخرة فائقة الحداثة تتميز بواجهات بيضاء نقية ومبادئ تصميم هندسية ومواد تشطيب فاخرة."
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
  const memoizedHeroImages = useMemo(() => heroImages, []);
  
  // Carousel state for smooth transitions
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
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
  return <div className="min-h-screen bg-background" dir={direction}>
      {/* Optimized Custom Cursor */}
      <OptimizedCursor />

      {/* Navigation Header */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              className="text-2xl font-serif font-bold text-green-gradient cursor-pointer"
              onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              aria-label="Go to top of page"
            >
              DOMYAN
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse rtl:space-x-8">
              {t.nav.map((item, index) => <a key={index} href={`#section-${index}`} className="text-foreground hover:text-green-600 transition-all duration-300 relative group">
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
                </a>)}
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
                {t.nav.map((item, index) => <a key={index} href={`#section-${index}`} className="block text-foreground hover:text-green-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
                    {item}
                  </a>)}
              </div>
            </motion.div>}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section 
        id="hero" 
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
              className="text-5xl md:text-7xl font-serif font-bold text-white mb-6"
              style={{ textShadow: '0 0 30px rgba(212, 175, 55, 0.5)' }}
            >
              {t.heroTitle}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: animationDuration, delay: 0.7 }}
              className="text-xl md:text-2xl text-white/90 mb-12 font-light"
            >
              {t.heroSubtitle}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: animationDuration, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Button 
                className="btn-luxury-filled magnetic"
                onClick={() => document.getElementById('section-2')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t.discoverPortfolio}
              </Button>
              <Button className="btn-luxury magnetic">
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
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-deep-green">50+</div>
                  <div className="text-sm text-muted-foreground">{t.stats.projects}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-deep-green">12</div>
                  <div className="text-sm text-muted-foreground">{t.stats.years}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-deep-green">A+</div>
                  <div className="text-sm text-muted-foreground">{t.stats.awards}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-deep-green">100%</div>
                  <div className="text-sm text-muted-foreground">{t.stats.clients}</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: animationDuration }}
              className="relative"
            >
              <img src="/lovable-uploads/cb9503b7-96dd-4f45-a014-0cd620f5d801.png" alt="Domyan Architect - Professional Portrait" className="w-full h-96 object-cover rounded-lg shadow-luxury border-gold-gradient" />
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-lg"></div>
              
              {/* CEO Name and Title */}
              <div className="mt-6 text-center space-y-1">
                <div className="text-lg font-semibold text-foreground">
                  {language === 'ar' ? 'محمد القريناوي' : language === 'he' ? 'מוחמד אלקינאוי' : 'Mohammed Alkrinawi'}
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.projects.map((project, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: animationDuration, delay: index * 0.1 }}
              >
                <Card className="luxury-card overflow-hidden group cursor-pointer">
                  <div className="relative overflow-hidden">
                    <LazyImage 
                      src={memoizedProjects[index]?.image || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                      alt={project.name} 
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                    <Button variant="ghost" className="text-green-600 hover:text-green-700 p-0">
                      View Project →
                    </Button>
                  </CardContent>
                </Card>
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
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t.contactForm.name}
                      </label>
                      <Input className="w-full" placeholder={t.contactForm.name} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t.contactForm.email}
                      </label>
                      <Input type="email" className="w-full" placeholder={t.contactForm.email} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t.contactForm.phone}
                      </label>
                      <Input type="tel" className="w-full" placeholder={t.contactForm.phone} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t.contactForm.service}
                      </label>
                      <select className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm">
                        <option>Luxury Villa Design</option>
                        <option>Interior Architecture</option>
                        <option>Landscape Integration</option>
                        <option>Full Project Management</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t.contactForm.message}
                    </label>
                    <Textarea className="w-full min-h-32" placeholder={t.contactForm.message} />
                  </div>
                  <Button className="btn-luxury-filled w-full magnetic">
                    {t.contactForm.submit}
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
                    </div>
                  </div>
                </div>
              </Card>

              {/* Map Placeholder */}
              <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-accent mx-auto mb-4" />
                  <p className="text-muted-foreground">{t.interactiveMap}</p>
                </div>
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
              <div className="text-3xl font-serif font-bold text-green-gradient mb-4">DOMYAN</div>
              <p className="text-dark-foreground/80 mb-6 max-w-md">
                {t.footerDescription}
              </p>
              <div className="flex space-x-4">
                {/* Twitter */}
                <a href="#" className="w-10 h-10 bg-[#1DA1F2]/10 rounded-full flex items-center justify-center text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
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
            <p>{t.footerFinalCopyright}</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a href="https://wa.me/972524460770?text=Hello%20Domyan,%20I'm%20interested%20in%20discussing%20a%20luxury%20architecture%20project" target="_blank" rel="noopener noreferrer" className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-luxury hover:scale-110 transition-all duration-500 z-50 floating-slow whatsapp-glow" initial={{
      scale: 0
    }} animate={{
      scale: 1
    }} transition={{
      delay: 2,
      duration: 0.5,
      type: "spring"
    }}>
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
        </svg>
      </motion.a>
    </div>;
};
export default Index;