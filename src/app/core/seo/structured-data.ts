import site from '../data/site.json';
import { Project } from '../models/project.interface';

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

export function homeStructuredData(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: site.name,
        jobTitle: site.jobTitle,
        description: site.homeDescription,
        url: `${site.url}/`,
        image: absoluteUrl(site.image),
        email: site.email,
        telephone: site.telephone,
        address,
        areaServed,
        knowsAbout: site.knowsAbout,
        worksFor: { '@type': 'Organization', name: 'MCV (Manufacturing Commercial Vehicles)' },
        mainEntityOfPage: { '@id': `${site.url}/#webpage` },
        sameAs: [site.linkedin, site.facebook]
      },
      {
        '@type': 'WebPage',
        '@id': `${site.url}/#webpage`,
        url: `${site.url}/`,
        name: site.homeTitle,
        description: site.homeDescription,
        inLanguage: 'en',
        about: { '@id': businessId }
      },
      {
        '@type': 'ProfessionalService',
        '@id': businessId,
        name: `${site.name} – Shopify Developer`,
        description: site.homeDescription,
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
          itemListElement: site.services.map(name => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name }
          }))
        },
        sameAs: [site.linkedin, site.facebook]
      }
    ]
  };
}

export function projectCreativeWork(project: Project): Record<string, unknown> {
  const url = `${site.url}/work/${project.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    url,
    description: project.summary,
    image: absoluteUrl(project.noScreenshot ? site.image : project.image),
    creator: { '@type': 'Person', '@id': personId, name: site.name, url: `${site.url}/` },
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

export function portfolioCollectionPage(projects: Project[]): Record<string, unknown> {
  const url = `${site.url}/portfolio`;
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#collection`,
    name: 'Shopify & Angular projects by Kerllos Ayad',
    url,
    description: 'Shopify stores, Angular applications and Node.js projects built by Kerllos Ayad in Cairo, Egypt.',
    inLanguage: 'en',
    about: { '@id': personId },
    isPartOf: { '@type': 'WebSite', name: site.name, url: `${site.url}/` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${site.url}/work/${project.slug}`,
        name: project.title
      }))
    }
  };
}
