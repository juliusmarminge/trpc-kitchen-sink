import { type Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { allDocs } from 'contentlayer/generated';

import { MdxComponent } from '../use-mdx';

export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: `${params.slug}`,
  };
}

export async function generateStaticParams() {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams.split('/'),
  }));
}

export default function DocsPage({ params }: { params: { slug?: string[] } }) {
  if (!params.slug) redirect('/docs/introduction');
  const slug = params.slug.join('/');
  const doc = allDocs.find((doc) => doc.slugAsParams === slug);
  if (!doc) notFound();

  return <MdxComponent code={doc.body.code} />;
}
