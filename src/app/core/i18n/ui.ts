import { Lang } from './lang';

export interface Ui {
  nav: { home: string; services: string; projects: string; faq: string; contact: string; skip: string; menu: string };
  switchLabel: string; // label of the link to the OTHER language, written in that language
  switchAria: string;
  hero: { heading: string[]; intro: string; seeShopify: string; seeAngular: string; hire: string };
  about: { title: string; text: string; imageAlt: string; process: string; processLink: string };
  whatIDo: { title: string; intro: string; shopifyTitle: string; shopifyText: string; angularTitle: string; angularText: string; more: string };
  projectsSection: { intro: string; title: string; showDetails: string; tabs: { all: string; shopify: string; angular: string }; tabsLabel: string };
  process: { intro: string; title: string; steps: { title: string; text: string }[] };
  skills: { lead: string; title: string; shopifyTitle: string; shopify: string[]; angularTitle: string; angular: string[] };
  faqTeaser: { lead: string; title: string; shopifyTitle: string; angularTitle: string; seeAll: string };
  hireCta: { shopifyTitle: string; shopifyText: string; shopifyEmail: string; shopifySubject: string; angularTitle: string; angularText: string; angularEmail: string; angularSubject: string; linkedin: string; resume: string };
  contact: {
    title: string; description: string; fullName: string; subject: string; email: string; mobile: string; message: string;
    placeholders: { fullName: string; subject: string; email: string; mobile: string; message: string };
    errors: { fullNameRequired: string; fullNameMin: string; subjectRequired: string; subjectMin: string; emailRequired: string; emailInvalid: string; mobileRequired: string; mobileInvalid: string; messageRequired: string; messageMin: string };
    submit: string; sending: string; countryCode: string; successTitle: string; successText: string; errorTitle: string; errorText: string; imageAlt: string;
  };
  footer: { about: string; projects: string; explore: string; contact: string; rights: string; services: string; faq: string };
  portfolio: { title: string; home: string; all: string; viewDetails: string; viewLive: string; techStack: string; none: string; noneHint: string; metaTitle: string; metaDescription: string; liveAria: string };
  project: { problem: string; built: string; stack: string; client: string; completed: string; category: string; visit: string; back: string; related: string; screenshots: string; screenshotOf: string; breadcrumbProjects: string; titleSuffix: string };
  services: { shopifyTitle: string; angularTitle: string; hubTitle: string; hubDescription: string; hubH1: string; hubIntro: string; breadcrumb: string; related: string; faqTitle: string; seeAllFaq: string; ctaTitle: string; ctaText: string; whatYouGet: string };
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
    heading: ['Howdy! Meet Your Trusted', 'Shopify & Angular Developer,', 'Crafting Fast Stores', '& Scalable Front Ends'],
    intro: 'I build conversion-focused Shopify stores and scalable Angular front ends for brands and teams in Egypt and the Middle East.',
    seeShopify: 'See Shopify projects', seeAngular: 'See Angular projects', hire: 'Hire me'
  },
  about: {
    title: 'About Kerllos Ayad, Shopify and Angular developer in Cairo',
    imageAlt: 'Developer workstation with two monitors showing code, a keyboard and a pen holder',
    process: 'How we work together: we discuss your design and vision first, I build it and connect everything, I help with your content and teach your team, and we go live with free support until it is stable.',
    processLink: 'See the four steps',
    text: "I'm Kerllos Ayad, a Shopify and Angular developer and Senior Frontend Engineer based in Cairo, Egypt, with 4+ years of experience. Half of my work is Shopify: I build stores for brands in Egypt and the Middle East, including OR, Arya, Hechter Paris, Sidewalks, El Okaby Pharmacies and Cleo's Dates. The other half is Angular: TypeScript components and prerendered pages, in projects such as the MCV bus tender system and this site. I work with your team from the first sketch to launch, writing clean Liquid, TypeScript and SCSS that is easy to maintain."
  },
  whatIDo: {
    title: 'What I do',
    intro: 'Two halves of one practice: Shopify stores and Angular front ends. Each service has its own page with what is included and how pricing works.',
    shopifyTitle: 'Shopify development', shopifyText: 'Stores for brands in Egypt and the Middle East: setup and design, custom themes and features, and speed and SEO.',
    angularTitle: 'Angular development', angularText: 'Angular and TypeScript applications and front ends: web apps, front-end engineering, and prerendering for search.',
    more: 'Read more'
  },
  projectsSection: {
    intro: 'Each project has its own page with what was built, the stack and, where there is one, a link to the live site.',
    title: 'Selected projects', showDetails: 'Show Details',
    tabs: { all: 'All', shopify: 'Shopify', angular: 'Angular' }, tabsLabel: 'Filter projects'
  },
  process: {
    title: 'How I work',
    intro: 'Four steps, from your first idea to a stable launch.',
    steps: [
      { title: 'We discuss your design and vision first.', text: 'You share your point of view and your design ideas. We talk through everything before any work starts: goals, pages, features, and what success looks like. No surprises later.' },
      { title: 'I build it and connect everything.', text: 'You give me the design, and I apply all the changes it needs. I also set up the technical integrations the project requires, such as payments, shipping, analytics, domain and SEO, so it is ready to launch.' },
      { title: 'I help with your content and teach your team.', text: 'I help you prepare the content, and I run short learning sessions on the technology, whether it is Shopify, Angular or another platform. You will know how to manage your own site.' },
      { title: 'We go live, and I support you for free until it is stable.', text: 'After launch I stay with you and fix issues at no cost until everything works smoothly.' }
    ]
  },
  skills: {
    lead: 'The tools I use every day, one group for each half of my work.',
    title: 'Skills and tools',
    shopifyTitle: 'Shopify', shopify: ['Shopify', 'Liquid', 'Shopify Metafields', 'Judge.me', 'JavaScript'],
    angularTitle: 'Angular', angular: ['Angular', 'TypeScript', 'HTML5', 'SCSS', 'Bootstrap']
  },
  faqTeaser: { lead: 'Short answers about cost, process, Liquid, Angular and prerendering. The full list is on the FAQ page.', title: 'Shopify and Angular developer FAQ', shopifyTitle: 'Shopify', angularTitle: 'Angular', seeAll: 'See all questions' },
  hireCta: {
    shopifyTitle: 'Hire a Shopify developer', shopifyText: 'Tell me about your store and what you want to change. I reply with a plan and an estimate.', shopifyEmail: 'Email me about a Shopify project', shopifySubject: 'Shopify project',
    angularTitle: 'Hire an Angular developer', angularText: 'Tell me about your application and your team. I reply with a plan and an estimate.', angularEmail: 'Email me about an Angular project', angularSubject: 'Angular project',
    linkedin: 'LinkedIn', resume: 'Download resume'
  },
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
  services: { shopifyTitle: 'Shopify services', angularTitle: 'Angular services', hubTitle: 'Shopify & Angular Development Services in Egypt | Kerllos Ayad', hubDescription: 'Shopify store setup, custom themes and speed, plus Angular web apps, front-end engineering and prerendering, by a developer in Cairo, Egypt.', hubH1: 'Shopify and Angular Development Services in Egypt', hubIntro: 'I am a Shopify and Angular developer and Senior Frontend Engineer in Cairo, Egypt. These are the six services I offer to brands and teams in Egypt and the Middle East: three for Shopify and three for Angular. Each one has its own page with what is included, how pricing works and examples from real projects.', breadcrumb: 'Services', related: 'Related projects', faqTitle: 'Common questions', seeAllFaq: 'See all questions', ctaTitle: 'Start your project', ctaText: 'Tell me about your store and what you want to change. I reply with a plan and an estimate.', whatYouGet: 'What you get' },
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
    heading: ['أهلًا! مطور Shopify', 'وAngular تثق به،', 'يبني متاجر سريعة', 'وواجهات أمامية قابلة للتوسع'],
    intro: 'أبني متاجر Shopify موجهة للتحويل وواجهات أمامية قابلة للتوسع بـ Angular للعلامات التجارية والفرق في مصر والشرق الأوسط.',
    seeShopify: 'شاهد مشاريع Shopify', seeAngular: 'شاهد مشاريع Angular', hire: 'تواصل معي'
  },
  about: {
    title: 'عن Kerllos Ayad: مطور Shopify وAngular في القاهرة',
    imageAlt: 'محطة عمل لمطور بشاشتين تعرضان كودًا ولوحة مفاتيح وحامل أقلام',
    process: 'كيف نعمل معاً: نناقش تصميمك ورؤيتك أولاً، وأبني المشروع وأربط كل شيء، وأساعدك في المحتوى وأعلّمك التقنية، ثم نطلق الموقع وأدعمك مجاناً حتى يستقر.',
    processLink: 'شاهد الخطوات الأربع',
    text: 'أنا Kerllos Ayad، مطور Shopify (شوبيفاي) وAngular ومهندس واجهات أمامية أول مقيم في القاهرة، مصر، بخبرة تتجاوز 4 سنوات. نصف عملي Shopify: أبني متاجر للعلامات التجارية في مصر والشرق الأوسط، منها OR وArya وHechter Paris وSidewalks وEl Okaby Pharmacies وCleo\'s Dates. والنصف الآخر Angular: مكونات TypeScript وصفحات مُولَّدة مسبقًا، في مشاريع مثل نظام مناقصات حافلات MCV وهذا الموقع. أعمل مع فريقك من أول فكرة حتى الإطلاق، وأكتب كود Liquid وTypeScript وSCSS نظيفًا يسهل صيانته.'
  },
  whatIDo: {
    title: 'ماذا أقدم',
    intro: 'نصفان لممارسة واحدة: متاجر Shopify وواجهات Angular الأمامية. لكل خدمة صفحتها التي توضح ما تشمله وكيف يتحدد السعر.',
    shopifyTitle: 'تطوير Shopify', shopifyText: 'متاجر للعلامات التجارية في مصر والشرق الأوسط: الإعداد والتصميم، والقوالب والميزات المخصصة، والسرعة والسيو.',
    angularTitle: 'تطوير Angular', angularText: 'تطبيقات وواجهات أمامية بـ Angular وTypeScript: تطبيقات ويب، وهندسة واجهات أمامية، وتوليد مسبق للصفحات للبحث.',
    more: 'اقرأ المزيد'
  },
  projectsSection: {
    intro: 'لكل مشروع صفحته التي توضح ما نُفذ والتقنيات المستخدمة، ورابط الموقع المباشر إن وُجد.',
    title: 'مشاريع مختارة', showDetails: 'عرض التفاصيل',
    tabs: { all: 'الكل', shopify: 'Shopify', angular: 'Angular' }, tabsLabel: 'تصفية المشاريع'
  },
  process: {
    title: 'طريقة عملي',
    intro: 'أربع خطوات، من فكرتك الأولى حتى إطلاق مستقر.',
    steps: [
      { title: 'نناقش تصميمك ورؤيتك أولاً.', text: 'تعرض عليّ وجهة نظرك وأفكارك للتصميم. نتحدث عن كل التفاصيل قبل أن نبدأ: الأهداف، الصفحات، المزايا، وما الذي يعني النجاح بالنسبة لك. لا مفاجآت لاحقاً.' },
      { title: 'أبني المشروع وأربط كل شيء.', text: 'تسلّمني التصميم، وأنفّذ كل التعديلات المطلوبة. وأجهّز التكاملات التقنية التي يحتاجها المشروع مثل الدفع والشحن والتحليلات والدومين وتحسين محركات البحث، حتى يصبح جاهزاً للإطلاق.' },
      { title: 'أساعدك في المحتوى وأعلّمك التقنية.', text: 'أساعدك في تجهيز المحتوى، وأقدّم جلسات تعليمية قصيرة عن التقنية، سواء كانت شوبيفاي أو Angular أو أي منصة أخرى، لتتمكن من إدارة موقعك بنفسك.' },
      { title: 'نطلق الموقع، وأدعمك مجاناً حتى يستقر.', text: 'بعد الإطلاق أبقى معك وأصلح أي مشكلة دون تكلفة حتى يعمل كل شيء بسلاسة.' }
    ]
  },
  skills: {
    lead: 'الأدوات التي أستخدمها يوميًا، مجموعة لكل نصف من عملي.',
    title: 'المهارات والأدوات',
    shopifyTitle: 'Shopify', shopify: ['Shopify', 'Liquid', 'Shopify Metafields', 'Judge.me', 'JavaScript'],
    angularTitle: 'Angular', angular: ['Angular', 'TypeScript', 'HTML5', 'SCSS', 'Bootstrap']
  },
  faqTeaser: { lead: 'إجابات قصيرة عن التكلفة والخطوات وLiquid وAngular والتوليد المسبق. القائمة الكاملة في صفحة الأسئلة الشائعة.', title: 'أسئلة شائعة عن مطور Shopify وAngular', shopifyTitle: 'Shopify', angularTitle: 'Angular', seeAll: 'شاهد كل الأسئلة' },
  hireCta: {
    shopifyTitle: 'وظّف مطور Shopify', shopifyText: 'أخبرني عن متجرك وما تريد تغييره، وسأرد عليك بخطة وتقدير للتكلفة.', shopifyEmail: 'راسلني عن مشروع Shopify', shopifySubject: 'مشروع Shopify',
    angularTitle: 'وظّف مطور Angular', angularText: 'أخبرني عن تطبيقك وفريقك، وسأرد عليك بخطة وتقدير للتكلفة.', angularEmail: 'راسلني عن مشروع Angular', angularSubject: 'مشروع Angular',
    linkedin: 'LinkedIn', resume: 'تحميل السيرة الذاتية'
  },
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
  services: { shopifyTitle: 'خدمات Shopify', angularTitle: 'خدمات Angular', hubTitle: 'خدمات تطوير Shopify وAngular في مصر | Kerllos Ayad', hubDescription: 'إعداد متاجر Shopify وقوالب مخصصة وتسريع، إضافة إلى تطبيقات Angular وهندسة الواجهات الأمامية والتوليد المسبق، من مطور في القاهرة، مصر.', hubH1: 'خدمات تطوير Shopify (شوبيفاي) وAngular في مصر', hubIntro: 'أنا مطور Shopify وAngular ومهندس واجهات أمامية أول في القاهرة، مصر. هذه هي الخدمات الست التي أقدمها للعلامات التجارية والفرق في مصر والشرق الأوسط: ثلاث لـ Shopify وثلاث لـ Angular. لكل خدمة صفحتها التي توضح ما تشمله وكيف يتحدد السعر وأمثلة من مشاريع حقيقية.', breadcrumb: 'الخدمات', related: 'مشاريع ذات صلة', faqTitle: 'أسئلة شائعة', seeAllFaq: 'شاهد كل الأسئلة', ctaTitle: 'ابدأ مشروعك', ctaText: 'أخبرني عن متجرك وما تريد تغييره، وسأرد عليك بخطة وتقدير للتكلفة.', whatYouGet: 'ما الذي تحصل عليه' },
  faq: { breadcrumb: 'الأسئلة الشائعة', ctaTitle: 'ما زال لديك سؤال؟', ctaText: 'أرسل لي رسالة عن متجرك وسأرد عليك بخطة وتقدير للتكلفة.', moreTitle: 'خدمات ذات صلة' },
  notFound: { title: 'الصفحة غير موجودة', text: 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.', home: 'العودة إلى الرئيسية', projects: 'شاهد كل المشاريع', metaTitle: 'الصفحة غير موجودة | Kerllos Ayad', metaDescription: 'هذه الصفحة غير موجودة. عد إلى الصفحة الرئيسية أو تصفح مشاريع Shopify والويب من تنفيذ Kerllos Ayad.' },
  home: { breadcrumb: 'الرئيسية' },
  categories: { 'All Projects': 'كل المشاريع', Shopify: 'Shopify', Angular: 'Angular', 'Node.js': 'Node.js' }
};

export const UI: Record<Lang, Ui> = { en, ar };
