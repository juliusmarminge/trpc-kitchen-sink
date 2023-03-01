type NavItem = {
  title: string;
  href?: string;
  label?: string;
};

export const navItems: NavItem[] = [
  {
    title: 'Documentation',
    href: '/docs',
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

export const docSidebar = [
  { title: 'Introduction', href: '/docs/introduction' },
  { title: 'useQuery', href: '/docs/react/use-query' },
];
