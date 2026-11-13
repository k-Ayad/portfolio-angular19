import site from '../data/site.json';
import { Project } from '../models/project.interface';
import { Lang, localize } from '../i18n/lang';

const personId = `${site.url}/#person`;
const businessId = `${site.url}/#service`;

export const absoluteUrl = (path: string): string =>
  /^https?:\/\//.test(path) ? path : `${site.url}/${path.replace(/^\//, '')}`;

const logo = {
  '@type': 'ImageObject',
  url: `${site.url}/assets/favicon.png`,
  width: 192,
  height: 192
};

const contactPoint = {
  '@type': 'ContactPoint',
  contactType: 'customer service',
  email: site.email,
  telephone: site.telephone
};

const address = {
  '@type': 'PostalAddress',
  addressLocality: site.location.city,
  addressCountry: site.location.countryCode
};

const areaServed = site.areaServed.map(name => ({ '@type': 'Place', name }));

export function homeStructuredData(lang: Lang = 'en'): Record<string, unknown> {
  const description = lang === 'ar' ? site.ar.homeDescription : site.homeDescription;
  const jobTitle = lang === 'ar' ? site.ar.jobTitle : site.jobTitle;
  const pageUrl = `${site.url}${localize('/', lang)}`;
  const serviceNames = lang === 'ar' ? site.ar.services : site.services;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: site.name,
        jobTitle,
        description,
        url: `${site.url}/`,
        image: absoluteUrl(site.image),
        email: site.email,
        telephone: site.telephone,
        address,
        areaServed,
        knowsAbout: site.knowsAbout,
        worksFor: { '@type': 'Organization', name: 'MCV (Manufacturing Commercial Vehicles)' },
        mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
        sameAs: [site.linkedin, site.facebook]
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: lang === 'ar' ? site.ar.homeTitle : site.homeTitle,
        description,
        inLanguage: lang,
        about: { '@id': businessId }
      },
      {
        '@type': 'ProfessionalService',
        '@id': businessId,
        name: `${site.name} – Shopify Developer`,
        description,
        url: `${site.url}/`,
        image: absoluteUrl(site.image),
        logo,
        email: site.email,
        telephone: site.telephone,
        contactPoint,
        address,
        areaServed,
        knowsAbout: site.knowsAbout,
        founder: { '@id': personId },
        provider: { '@id': personId },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Services',
          itemListElement: serviceNames.map(name => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name }
          }))
        },
        sameAs: [site.linkedin, site.facebook]
      }
    ]
  };
}

export function projectCreativeWork(project: Project, lang: Lang = 'en'): Record<string, unknown> {
  const url = `${site.url}${localize(`/work/${project.slug}`, lang)}`;
  const description = lang === 'ar' && project.ar ? project.ar.summary : project.summary;
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    url,
    description,
    inLanguage: lang,
    image: absoluteUrl(project.noScreenshot ? site.image : project.image),
    creator: { '@id': personId },
    ...(project.completionDate ? { dateCreated: project.completionDate } : {}),
    ...(project.liveUrl ? { sameAs: project.liveUrl } : {})
  };
}

export function breadcrumbs(items: { name: string; path: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`
    }))
  };
}

export function portfolioCollectionPage(projects: Project[], lang: Lang = 'en'): Record<string, unknown> {
  const url = `${site.url}${localize('/portfolio', lang)}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#collection`,
    name: lang === 'ar' ? 'مشاريع Shopify وAngular من تنفيذ Kerllos Ayad' : 'Shopify & Angular projects by Kerllos Ayad',
    url,
    description: lang === 'ar' ? 'متاجر Shopify وتطبيقات Angular ومشاريع Node.js من تنفيذ Kerllos Ayad في القاهرة، مصر.' : 'Shopify stores, Angular applications and Node.js projects built by Kerllos Ayad in Cairo, Egypt.',
    inLanguage: lang,
    about: { '@id': personId },
    isPartOf: { '@type': 'WebSite', name: site.name, url: `${site.url}${localize('/', lang)}` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${site.url}${localize(`/work/${project.slug}`, lang)}`,
        name: project.title
      }))
    }
  };
}

export function serviceStructuredData(name: string, serviceType: string, description: string, path: string, lang: Lang): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    serviceType,
    description,
    url: `${site.url}${path}`,
    inLanguage: lang,
    provider: { '@id': businessId },
    areaServed: site.areaServed.map(place => ({ '@type': 'Place', name: place }))
  };
}

export function faqPageStructuredData(items: { q: string; a: string }[], path: string, lang: Lang): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url: `${site.url}${path}`,
    inLanguage: lang,
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a }
    }))
  };
}

export function servicesCollectionPage(items: { name: string; path: string }[], name: string, description: string, path: string, lang: Lang): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: `${site.url}${path}`,
    inLanguage: lang,
    about: { '@id': businessId },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, url: `${site.url}${item.path}` }))
    }
  };
}
