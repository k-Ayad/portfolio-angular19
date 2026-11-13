import { Lang } from './lang';

export interface Ui {
  nav: { home: string; services: string; projects: string; faq: string; contact: string; skip: string; menu: string };
  switchLabel: string; // label of the link to the OTHER language, written in that language
  switchAria: string;
  hero: { heading: string[]; intro: string; seeProjects: string; hire: string; resume: string };
  about: { title: string; text: string; imageAlt: string };
  servicesSection: { title: string; intro: string; more: string };
  projectsSection: { intro: string; title: string; showDetails: string; all: string; allTitle: string };
  clients: { title: string; text: string };
  process: { intro: string; title: string; steps: { title: string; text: string }[] };
  skills: { title: string; text: string };
  faqTeaser: { title: string; seeAll: string };
  hireCta: { title: string; text: string; email: string; linkedin: string };
  contact: {
    title: string; description: string; fullName: string; subject: string; email: string; mobile: string; message: string;
    placeholders: { fullName: string; subject: string; email: string; mobile: string; message: string };
    errors: { fullNameRequired: string; fullNameMin: string; subjectRequired: string; subjectMin: string; emailRequired: string; emailInvalid: string; mobileRequired: string; mobileInvalid: string; messageRequired: string; messageMin: string };
    submit: string; sending: string; countryCode: string; successTitle: string; successText: string; errorTitle: string; errorText: string; imageAlt: string;
  };
  footer: { about: string; projects: string; explore: string; contact: string; rights: string; services: string; faq: string };
  portfolio: { title: string; home: string; all: string; viewDetails: string; viewLive: string; techStack: string; none: string; noneHint: string; metaTitle: string; metaDescription: string; liveAria: string };
  project: { problem: string; built: string; stack: string; client: string; completed: string; category: string; visit: string; back: string; related: string; screenshots: string; screenshotOf: string; breadcrumbProjects: string; titleSuffix: string };
  services: { hubTitle: string; hubDescription: string; hubH1: string; hubIntro: string; breadcrumb: string; related: string; faqTitle: string; seeAllFaq: string; ctaTitle: string; ctaText: string; whatYouGet: string };
  faq: { breadcrumb: string; ctaTitle: string; ctaText: string; moreTitle: string };
  notFound: { title: string; text: string; home: string; projects: string; metaTitle: string; metaDescription: string };
  home: { breadcrumb: string };
  categories: Record<string, string>;
}

const en: Ui = {
  nav: { home: 'Home', services: 'Services', projects: 'Projects', faq: 'FAQ', contact: 'Contact', skip: 'Skip to content', menu: 'Toggle mobile menu' },
  switchLabel: 'العربية', // shown on English pages: the other language's name, written in that language
  switchAria: 'Read this page in Arabic',
  hero: {
    heading: ['Howdy! Meet Your Trusted', 'Shopify Developer', '& Frontend Engineer,', 'Crafting Fast Online Stores'],
    intro: "I build fast, conversion-focused Shopify stores for brands in Egypt and the Middle East: custom themes, Liquid features, speed and SEO optimization, and Angular web apps.",
    seeProjects: 'See my Shopify projects', hire: 'Hire me', resume: 'Download resume'
  },
  about: {
    title: 'About Kerllos Ayad, Shopify developer and Senior Frontend Engineer',
    imageAlt: 'Developer workstation with two monitors showing code, a keyboard and a pen holder',
    text: "I'm Kerllos Ayad, a Shopify developer and Senior Frontend Engineer (Angular) based in Cairo, Egypt, with 4+ years of experience. I build Shopify stores for brands in Egypt and the Middle East, including OR, Arya, Hechter Paris, Sidewalks, El Okaby Pharmacies and Cleo's Dates. I work with the brand's team from the first sketch to launch, writing clean Liquid, JavaScript and SCSS that is easy for your team to maintain. My services: Shopify store setup & design, custom Shopify themes & features, speed & SEO optimization, and web apps & landing pages."
  },
  servicesSection: { title: 'Shopify development services in Egypt', intro: 'I offer four services to brands in Egypt and the Middle East. Each one has its own page with what is included and how pricing works.', more: 'Read more' },
  projectsSection: { intro: 'Each project has its own page with what was built, the stack and a link to the live store.', title: 'Selected Shopify projects', showDetails: 'Show Details', all: 'All projects', allTitle: 'All Shopify & web projects' },
  clients: { title: 'Trusted by brands in Egypt and the Middle East', text: 'Stores and web projects built for these brands:' },
  process: {
    intro: 'Every project follows the same four steps, so you always know what comes next.',
    title: 'How I work',
    steps: [
      { title: 'Discovery', text: 'Your goals, products, audience and current store.' },
      { title: 'Plan and scope', text: 'Pages, features and a fixed price or hourly estimate.' },
      { title: 'Design and build', text: 'Liquid theme work, reviewed on a staging theme.' },
      { title: 'Test and launch', text: 'Mobile, speed, checkout and SEO checks before going live.' }
    ]
  },
  skills: { title: 'Skills and tools', text: 'Shopify, Liquid, Shopify Metafields, JavaScript, TypeScript, Angular, HTML5, SCSS, Bootstrap, JSON, Judge.me.' },
  faqTeaser: { title: 'Shopify developer FAQ', seeAll: 'See all questions' },
  hireCta: { title: 'Hire a Shopify developer in Cairo', text: 'Tell me about your store and what you want to change. I reply with a plan and an estimate.', email: 'Email me', linkedin: 'LinkedIn' },
  contact: {
    title: 'Contact me',
    description: "I'm always excited to work on new projects & collaborate with amazing people. Whether you need a custom Shopify theme, an Angular application, or have any questions about web development, feel free to reach out!",
    fullName: 'Full name', subject: 'Subject', email: 'Email Address', mobile: 'Mobile number', message: 'Message',
    placeholders: { fullName: 'Mohamed Gad', subject: 'Request for Website', email: 'ex. mo.gad@domain.com', mobile: '0101 123 1234', message: 'Tell me about your project...' },
    errors: { fullNameRequired: 'Full name is required', fullNameMin: 'Minimum 3 characters required', subjectRequired: 'Subject is required', subjectMin: 'Minimum 5 characters required', emailRequired: 'Email is required', emailInvalid: 'Please enter a valid email', mobileRequired: 'Mobile number is required', mobileInvalid: 'Please enter a valid 10-digit number', messageRequired: 'Message is required', messageMin: 'Minimum 10 characters required' },
    submit: 'Request A Call', sending: 'Sending...', countryCode: 'Country code',
    successTitle: 'Message Sent Successfully!', successText: "Thank you for reaching out. I'll get back to you as soon as possible.",
    errorTitle: 'Oops! Something went wrong', errorText: 'Something went wrong. Please try again.', imageAlt: 'Person using phone and laptop'
  },
  footer: { about: 'About Me', projects: 'All Projects', explore: 'Explore My Projects', contact: 'Contact Me', rights: 'all rights reserved.', services: 'Services', faq: 'FAQ' },
  portfolio: { title: 'All Projects', home: 'Home', all: 'All Projects', viewDetails: 'View Details →', viewLive: 'View Live', techStack: 'Tech Stack:', none: 'No projects found', noneHint: 'Try selecting a different category', metaTitle: 'Shopify & Angular Projects | Kerllos Ayad – Cairo, Egypt', metaDescription: 'Shopify stores, Angular applications and Node.js projects built by Kerllos Ayad, Shopify developer and Senior Frontend Engineer in Cairo, Egypt.', liveAria: 'Visit the live' },
  project: { problem: 'The problem', built: 'What I built', stack: 'Stack', client: 'Client', completed: 'Completed', category: 'Category', visit: 'Visit the live store', back: 'Back to Projects', related: 'Related Projects', screenshots: 'Screenshots', screenshotOf: 'Screenshot of the', breadcrumbProjects: 'Projects', titleSuffix: 'project by Kerllos Ayad, Cairo' },
  services: { hubTitle: 'Shopify Development Services in Egypt | Kerllos Ayad', hubDescription: 'Shopify store setup, custom themes, speed and SEO optimization, and Angular web apps by a Shopify developer in Cairo, Egypt.', hubH1: 'Shopify Development Services in Egypt', hubIntro: 'I am a Shopify developer and Senior Frontend Engineer in Cairo, Egypt. These are the four services I offer to brands in Egypt and the Middle East. Each one has its own page with what is included, how pricing works and examples from real stores.', breadcrumb: 'Services', related: 'Related projects', faqTitle: 'Common questions', seeAllFaq: 'See all questions', ctaTitle: 'Start your project', ctaText: 'Tell me about your store and what you want to change. I reply with a plan and an estimate.', whatYouGet: 'What you get' },
  faq: { breadcrumb: 'FAQ', ctaTitle: 'Still have a question?', ctaText: 'Send me a message about your store and I will reply with a plan and an estimate.', moreTitle: 'Related services' },
  notFound: { title: 'Page not found', text: 'The page you are looking for does not exist or has moved.', home: 'Go to the home page', projects: 'See all projects', metaTitle: 'Page not found | Kerllos Ayad', metaDescription: 'This page does not exist. Go back to the home page or browse the Shopify and web projects by Kerllos Ayad.' },
  home: { breadcrumb: 'Home' },
  categories: { 'All Projects': 'All Projects', Shopify: 'Shopify', Angular: 'Angular', 'Node.js': 'Node.js' }
};

const ar: Ui = {
  nav: { home: 'الرئيسية', services: 'الخدمات', projects: 'المشاريع', faq: 'الأسئلة الشائعة', contact: 'تواصل معي', skip: 'انتقل إلى المحتوى', menu: 'فتح أو إغلاق القائمة' },
  switchLabel: 'English',
  switchAria: 'عرض هذه الصفحة بالإنجليزية',
  hero: {
    heading: ['أهلًا! مطور Shopify', 'ومهندس واجهات أمامية', 'تثق به،', 'يبني متاجر إلكترونية سريعة'],
    intro: 'أبني متاجر Shopify سريعة ومصممة لزيادة المبيعات للعلامات التجارية في مصر والشرق الأوسط: قوالب مخصصة، ميزات بلغة Liquid، تحسين السرعة ومحركات البحث، وتطبيقات ويب بـ Angular.',
    seeProjects: 'شاهد مشاريع Shopify', hire: 'تواصل معي لبدء مشروعك', resume: 'تحميل السيرة الذاتية'
  },
  about: {
    title: 'عن Kerllos Ayad: مطور Shopify ومهندس واجهات أمامية أول',
    imageAlt: 'محطة عمل لمطور بشاشتين تعرضان كودًا ولوحة مفاتيح وحامل أقلام',
    text: 'أنا Kerllos Ayad، مطور Shopify (شوبيفاي) ومهندس واجهات أمامية أول (Angular) مقيم في القاهرة، مصر، بخبرة تتجاوز 4 سنوات. طورت متاجر Shopify لعلامات تجارية مثل OR وArya وHechter Paris وSidewalks وEl Okaby Pharmacies وCleo\'s Dates. أعمل مع فريق العلامة التجارية من أول فكرة حتى الإطلاق، وأكتب كود Liquid وJavaScript وSCSS نظيفًا يسهل على فريقك صيانته. خدماتي: إعداد وتصميم متاجر Shopify، وقوالب وميزات Shopify مخصصة، وتسريع المتاجر وتحسين محركات البحث، وتطبيقات الويب وصفحات الهبوط.'
  },
  servicesSection: { title: 'خدمات تطوير Shopify في مصر', intro: 'أقدم أربع خدمات للعلامات التجارية في مصر والشرق الأوسط. لكل خدمة صفحتها التي توضح ما تشمله وكيف يتحدد السعر.', more: 'اقرأ المزيد' },
  projectsSection: { intro: 'لكل مشروع صفحته التي توضح ما نُفذ والتقنيات المستخدمة ورابط المتجر المباشر.', title: 'مشاريع Shopify مختارة', showDetails: 'عرض التفاصيل', all: 'كل المشاريع', allTitle: 'كل مشاريع Shopify والويب' },
  clients: { title: 'علامات تجارية وثقت بي في مصر والشرق الأوسط', text: 'متاجر ومشاريع ويب نُفذت لهذه العلامات:' },
  process: {
    intro: 'كل مشروع يمر بالخطوات الأربع نفسها، لتعرف دائمًا ما الخطوة التالية.',
    title: 'طريقة العمل',
    steps: [
      { title: 'الاستكشاف', text: 'أهدافك ومنتجاتك وجمهورك ومتجرك الحالي.' },
      { title: 'الخطة والنطاق', text: 'الصفحات والميزات وسعر ثابت أو تقدير بالساعة.' },
      { title: 'التصميم والتنفيذ', text: 'عمل Liquid على قالب تجريبي تراجعه قبل النشر.' },
      { title: 'الاختبار والإطلاق', text: 'فحص الجوال والسرعة والدفع والسيو قبل النشر.' }
    ]
  },
  skills: { title: 'المهارات والأدوات', text: 'Shopify, Liquid, Shopify Metafields, JavaScript, TypeScript, Angular, HTML5, SCSS, Bootstrap, JSON, Judge.me.' },
  faqTeaser: { title: 'أسئلة شائعة عن مطور Shopify', seeAll: 'شاهد كل الأسئلة' },
  hireCta: { title: 'وظّف مطور Shopify في القاهرة', text: 'أخبرني عن متجرك وما تريد تغييره، وسأرد عليك بخطة وتقدير للتكلفة.', email: 'راسلني بالبريد', linkedin: 'LinkedIn' },
  contact: {
    title: 'تواصل معي',
    description: 'يسعدني دائمًا العمل على مشاريع جديدة والتعاون مع أشخاص رائعين. سواء كنت تحتاج قالب Shopify مخصصًا أو تطبيق Angular أو لديك أسئلة عن تطوير الويب، لا تتردد في التواصل!',
    fullName: 'الاسم الكامل', subject: 'الموضوع', email: 'البريد الإلكتروني', mobile: 'رقم الجوال', message: 'الرسالة',
    placeholders: { fullName: 'محمد جاد', subject: 'طلب موقع إلكتروني', email: 'مثال: mo.gad@domain.com', mobile: '0101 123 1234', message: 'أخبرني عن مشروعك...' },
    errors: { fullNameRequired: 'الاسم الكامل مطلوب', fullNameMin: 'الحد الأدنى 3 أحرف', subjectRequired: 'الموضوع مطلوب', subjectMin: 'الحد الأدنى 5 أحرف', emailRequired: 'البريد الإلكتروني مطلوب', emailInvalid: 'من فضلك أدخل بريدًا إلكترونيًا صحيحًا', mobileRequired: 'رقم الجوال مطلوب', mobileInvalid: 'من فضلك أدخل رقمًا صحيحًا من 10 أرقام', messageRequired: 'الرسالة مطلوبة', messageMin: 'الحد الأدنى 10 أحرف' },
    submit: 'اطلب مكالمة', sending: 'جارٍ الإرسال...', countryCode: 'مفتاح الدولة',
    successTitle: 'تم إرسال الرسالة بنجاح!', successText: 'شكرًا لتواصلك. سأرد عليك في أقرب وقت ممكن.',
    errorTitle: 'عذرًا! حدث خطأ', errorText: 'حدث خطأ ما. من فضلك حاول مرة أخرى.', imageAlt: 'شخص يستخدم هاتفًا وحاسوبًا محمولًا'
  },
  footer: { about: 'عني', projects: 'كل المشاريع', explore: 'استعرض مشاريعي', contact: 'تواصل معي', rights: 'جميع الحقوق محفوظة.', services: 'الخدمات', faq: 'الأسئلة الشائعة' },
  portfolio: { title: 'كل المشاريع', home: 'الرئيسية', all: 'كل المشاريع', viewDetails: '← عرض التفاصيل', viewLive: 'زيارة المتجر', techStack: 'التقنيات:', none: 'لا توجد مشاريع', noneHint: 'جرّب اختيار تصنيف آخر', metaTitle: 'مشاريع Shopify وAngular | Kerllos Ayad – القاهرة، مصر', metaDescription: 'متاجر Shopify وتطبيقات Angular ومشاريع Node.js من تنفيذ Kerllos Ayad، مطور Shopify ومهندس واجهات أمامية أول في القاهرة، مصر.', liveAria: 'زيارة المتجر المباشر لمشروع' },
  project: { problem: 'المشكلة', built: 'ما نفذته', stack: 'التقنيات', client: 'العميل', completed: 'تاريخ الإنجاز', category: 'التصنيف', visit: 'زيارة المتجر المباشر', back: 'العودة إلى المشاريع', related: 'مشاريع ذات صلة', screenshots: 'لقطات الشاشة', screenshotOf: 'لقطة شاشة لموقع', breadcrumbProjects: 'المشاريع', titleSuffix: 'مشروع من تنفيذ Kerllos Ayad، القاهرة' },
  services: { hubTitle: 'خدمات تطوير Shopify في مصر | Kerllos Ayad', hubDescription: 'إعداد متاجر Shopify وقوالب مخصصة وتسريع المتاجر وتحسين السيو وتطبيقات Angular من مطور Shopify في القاهرة، مصر.', hubH1: 'خدمات تطوير Shopify (شوبيفاي) في مصر', hubIntro: 'أنا مطور Shopify ومهندس واجهات أمامية أول في القاهرة، مصر. هذه هي الخدمات الأربع التي أقدمها للعلامات التجارية في مصر والشرق الأوسط. لكل خدمة صفحتها التي توضح ما تشمله وكيف يتحدد السعر وأمثلة من متاجر حقيقية.', breadcrumb: 'الخدمات', related: 'مشاريع ذات صلة', faqTitle: 'أسئلة شائعة', seeAllFaq: 'شاهد كل الأسئلة', ctaTitle: 'ابدأ مشروعك', ctaText: 'أخبرني عن متجرك وما تريد تغييره، وسأرد عليك بخطة وتقدير للتكلفة.', whatYouGet: 'ما الذي تحصل عليه' },
  faq: { breadcrumb: 'الأسئلة الشائعة', ctaTitle: 'ما زال لديك سؤال؟', ctaText: 'أرسل لي رسالة عن متجرك وسأرد عليك بخطة وتقدير للتكلفة.', moreTitle: 'خدمات ذات صلة' },
  notFound: { title: 'الصفحة غير موجودة', text: 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.', home: 'العودة إلى الرئيسية', projects: 'شاهد كل المشاريع', metaTitle: 'الصفحة غير موجودة | Kerllos Ayad', metaDescription: 'هذه الصفحة غير موجودة. عد إلى الصفحة الرئيسية أو تصفح مشاريع Shopify والويب من تنفيذ Kerllos Ayad.' },
  home: { breadcrumb: 'الرئيسية' },
  categories: { 'All Projects': 'كل المشاريع', Shopify: 'Shopify', Angular: 'Angular', 'Node.js': 'Node.js' }
};

export const UI: Record<Lang, Ui> = { en, ar };
