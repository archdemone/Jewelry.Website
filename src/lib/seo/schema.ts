export function buildBreadcrumbs(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((i, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: i.name,
      item: i.item,
    })),
  };
}

export function buildOrganization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Your Jewelry Store',
    url: 'https://jewelry-website.vercel.app',
    logo: 'https://jewelry-website.vercel.app/icon-512.svg',
  };
}
