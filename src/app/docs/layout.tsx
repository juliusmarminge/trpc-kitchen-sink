import { DocsSidebarNav } from '~/components/sidebar-nav';

export default function DocsLayout(props: { children: React.ReactNode }) {
  return (
    <div className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r border-r-zinc-100 py-10 dark:border-r-zinc-700 md:sticky md:block">
        <DocsSidebarNav
          pathname={`/docs/main/introduction`}
          items={[
            { title: 'Introduction', href: '/docs/main/introduction' },
            { title: 'useQuery', href: '/docs/react/use-query' },
          ]}
        />
      </aside>
      <div className="py-10">{props.children}</div>
    </div>
  );
}
