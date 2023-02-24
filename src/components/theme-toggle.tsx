import * as React from 'react';
import { Moon, SunMedium } from 'lucide-react';

import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { SystemIcon } from './icons';

type Theme = 'light' | 'dark' | 'system';

const getSystemTheme = (e?: MediaQueryListEvent | MediaQueryList) => {
  if (!e) e = window.matchMedia('(prefers-color-scheme: dark)');
  return e.matches ? 'dark' : 'light';
};

const getStorageTheme = () =>
  typeof window !== 'undefined'
    ? (window.localStorage.getItem('theme') as Theme)
    : undefined;

export function ThemeToggle() {
  const [theme, _setTheme] = React.useState<Theme>(
    () => getStorageTheme() ?? 'system',
  );

  const onSelectTheme = (theme: Theme) => {
    _setTheme(theme);
    window.localStorage.setItem('theme', theme);
    if (theme === 'system') theme = getSystemTheme();
    if (theme === 'light') document.documentElement.classList.remove('dark');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  };

  React.useLayoutEffect(() => {
    const theme = getStorageTheme();
    if (theme) onSelectTheme(theme);
  }, []);

  React.useEffect(() => {
    const changeHandler = (e: MediaQueryListEvent) => {
      onSelectTheme(e.matches ? 'dark' : 'light');
    };

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    prefersDark.addEventListener('change', changeHandler);
    return () => {
      prefersDark.removeEventListener('change', changeHandler);
    };
  }, [theme]);

  const triggerIcon = {
    dark: <Moon />,
    light: <SunMedium />,
    system: <SystemIcon className="h-6 w-6" />,
  }[theme];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-zinc-700 dark:text-zinc-400"
        >
          {triggerIcon}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount>
        <DropdownMenuItem onClick={() => onSelectTheme('light')}>
          <SunMedium className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSelectTheme('dark')}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSelectTheme('system')}>
          <SystemIcon className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
