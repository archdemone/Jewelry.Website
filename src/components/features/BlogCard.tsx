import Link from 'next/link';

export type BlogCardProps = {
  slug: string;
  title: string;
  excerpt: string;
  image?: string;
  date?: string;
  category?: string;
};

export default function BlogCard({ slug, title, excerpt, image, date, category }: BlogCardProps) {
  return (
    <article className="overflow-hidden rounded-lg border">
      {image && <img src={image} alt={title} className="h-48 w-full object-cover" loading="lazy" />}
      <div className="p-4">
        <div className="text-xs text-gray-500">
          {category} • {date}
        </div>
        <h3 className="mt-1 text-lg font-semibold">
          <Link href={`/blog/${slug}`}>{title}</Link>
        </h3>
        <p className="mt-1 line-clamp-3 text-sm text-gray-600">{excerpt}</p>
        <div className="mt-3 text-sm font-medium text-secondary">
          <Link href={`/blog/${slug}`}>Read more →</Link>
        </div>
      </div>
    </article>
  );
}
