import { notFound } from 'next/navigation';
import { allDocs } from 'contentlayer/generated';

import { Breadcrumbs } from './breadcrumbs';
import { MdxComponent } from './mdx-components';
import Pagination from './pagination';

export async function generateStaticParams() {
  const slugs = allDocs.map((doc) => ({
    slug: doc.slug.split('/'),
  }));

  return slugs;
}

export default function DocsPage({ params }: { params: { slug: string[] } }) {
  const slug = params.slug.join('/');
  const doc = allDocs.find((doc) => doc.slug === slug);
  if (!doc) notFound();

  return (
    <div className="space-y-4">
      <Breadcrumbs slug={params.slug} />
      <MdxComponent code={doc.body.code} />
      <Pagination pathname={`/docs/${slug}`} />
    </div>
  );
}
