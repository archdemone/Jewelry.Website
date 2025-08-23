import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { notFound } from 'next/navigation';
import { ArticleJsonLd, BreadcrumbsJsonLd } from '@/components/seo/JsonLd';
import Image from 'next/image';

const posts = {
  'care-tips': {
    title: 'Essential Jewelry Care Tips',
    date: '2025-01-05',
    author: 'Aurora Team',
    image: '/images/blog/care.jpg',
    content: '<p>Learn how to keep your jewelry looking brand new with simple at-home care.</p>',
  },
  'ring-sizing': {
    title: 'How to Find Your Ring Size',
    date: '2025-01-02',
    author: 'Aurora Team',
    image: '/images/blog/size.jpg',
    content: '<p>Measure accurately at home or with our printable sizer.</p>',
  },
} as const;

type Params = { params: { slug: keyof typeof posts } };

export default function BlogPostPage({ params }: Params) {
  const post = posts[params.slug];
  if (!post) return notFound();
  return (
    <>
      <Header />
      <main className="container py-10">
        <ArticleJsonLd
          article={{
            title: post.title,
            slug: params.slug,
            date: post.date,
            image: post.image,
            author: post.author,
          }}
        />
        <BreadcrumbsJsonLd
          items={[
            { name: 'Home', item: 'https://yourjewelrystore.com' },
            { name: 'Blog', item: 'https://yourjewelrystore.com/blog' },
            { name: post.title, item: `https://yourjewelrystore.com/blog/${params.slug}` },
          ]}
        />
        <article className="mx-auto max-w-3xl">
          {post.image && (
            <div className="relative h-64 w-full">
              <Image              src={post.image}              alt={post.title}
                fill
                className="rounded-md object-cover"
                sizes="100vw"
                priority
              />
            </div>
          )}
          <h1 className="mt-4 text-3xl font-[var(--font-serif)] font-semibold text-secondary">
            {post.title}
          </h1>
          <div className="mt-1 text-sm text-gray-500">
            By {post.author} • {new Date(post.date).toLocaleDateString()}
          </div>
          <div
            className="prose prose-sm mt-6 max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className="mt-8 rounded-md border p-4">
            <p className="text-sm">Enjoyed this article? Subscribe to our newsletter for more.</p>
            <a href="#" className="text-sm font-medium text-secondary underline">
              Subscribe
            </a>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
