import { notFound, redirect } from 'next/navigation';
import { allDocs } from 'contentlayer/generated';

import { MdxComponent } from '../use-mdx';

export async function generateStaticParams() {
  const slugs = allDocs.map((doc) => ({
    slug: doc.slug.split('/'),
  }));

  return slugs;
}

export default function DocsPage({ params }: { params: { slug?: string[] } }) {
  if (!params.slug) redirect('/docs/introduction');
  const slug = params.slug.join('/');
  const doc = allDocs.find((doc) => doc.slug === slug);
  if (!doc) notFound();

  return <MdxComponent code={doc.body.code} />;
}
