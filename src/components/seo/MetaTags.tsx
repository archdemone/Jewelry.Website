type MetaTagsProps = {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  canonical?: string;
};

export function MetaTags({
  title,
  description,
  url,
  image,
  type = 'website',
  canonical,
}: MetaTagsProps) {
  return (
    <>
              <title>{title}</title>
              <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      <meta property="og:title" content={title} />
              <meta property="og:description" content={description} />
              <meta property="og:url" content={url} />
              <meta property="og:site_name" content="Your Jewelry Store" />
              <meta property="og:type" content={type} />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content={title} />
              <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </>
  );
}
