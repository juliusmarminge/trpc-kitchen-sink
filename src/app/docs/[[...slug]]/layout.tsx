import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import { allDocs } from 'contentlayer/generated';
import { docSidebar } from '~/app/site.config';
import { docsParams } from '~/utils/zodParams';

import { DocsSidebarNav } from '~/components/sidebar-nav';

export async function generateMetadata({
  params,
}: {
  params: { slug?: string[] };
}): Promise<Metadata> {
  const slug = params.slug?.join('/');
  const doc = allDocs.find((doc) => doc.slug === slug);

  const ogUrl = `/docs/open-graph?${docsParams.toSearchString({
    title: doc?.title ?? 'tRPC | Not Found',
    description: doc?.description ?? '',
    url: doc?.slug ?? 'trpc.io',
  })}`;

  return {
    title: `${params.slug}`,
    openGraph: {
      images: ogUrl,
    },
  };
}

export default function DocsLayout(props: {
  children: React.ReactNode;
  params: { slug?: string[] };
}) {
  if (!props.params.slug) redirect('/docs/introduction');

  return (
    <div className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r border-r-zinc-100 py-10 dark:border-r-zinc-700 md:sticky md:block">
        <DocsSidebarNav
          pathname={`/docs/${props.params.slug.join('/')}`}
          items={docSidebar}
        />
      </aside>
      <div className="py-10">{props.children}</div>
    </div>
  );
}
