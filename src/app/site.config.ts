import { type Route } from 'next';

type NavItem<T extends string> = {
  title: string;
  href?: Route<T>;
  label?: string;
};

// FIXME: Type these with staitc route types
export const navItems: NavItem<any>[] = [
  {
    title: 'Documentation',
    href: '/docs/introduction',
  },
  {
    title: 'Examples',
    href: '/features/forms',
  },
  {
    title: 'Learn',
    label: 'Coming',
  },
];

type DocItem = {
  title: string;
  href: Route;
};

export const docSidebar: Record<string, DocItem[]> = {
  Introduction: [{ title: 'Introduction', href: '/docs/introduction' }],
  React: [
    { title: 'Usage with React', href: '/docs/react' },
    { title: 'useQuery', href: '/docs/react/use-query' },
    { title: 'useMutation', href: '/docs/react/use-mutation' },
  ],
};
