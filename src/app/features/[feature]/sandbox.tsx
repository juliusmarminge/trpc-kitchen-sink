'use client';

import * as React from 'react';
import { lazy } from 'react';
import { type WebContainer } from '@webcontainer/api';

import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group';

const Editor = lazy(() => import('./editor'));

export function Sandbox() {
  const wc = React.useRef<WebContainer>();

  const [iframeSrc, setIframeSrc] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      const instance = await import('~/utils/web-container').then(
        (mod) => mod.wc,
      );
      wc.current = instance;

      const installProgress = await instance.spawn('pnpm', [
        'create',
        'next-app',
        '.',
        '-e',
        'https://github.com/juliusmarminge/wc-test',
      ]);
      if (await installProgress.exit) console.log('Failed to scaffold app');

      await parseFS();

      await instance.spawn('pnpm', ['-F', 'server', 'dev']);
      await instance.spawn('pnpm', ['-F', 'client', 'dev']);

      instance.on('server-ready', (port, url) => {
        // don't mount the server app
        if (port == 3000) setIframeSrc(url);
      });
    })();
  }, []);

  const [files, setFiles] = React.useState<
    Map<string, { name: string; content: string; language: string }>
  >(new Map());
  const [file, setFile] = React.useState('');

  const currentFile = files.get(file);

  async function parseFS() {
    // FIXME: refactor needed
    const fs = wc.current?.fs;
    if (!fs) return;

    const serverts = await fs.readFile('server/index.ts', 'utf-8');
    const clientts = await fs.readFile('client/src/Greeting.tsx', 'utf-8');
    const trpcts = await fs.readFile('client/src/utils/trpc.ts', 'utf-8');

    setFiles((files) => {
      files.set('server.ts', {
        name: 'server/index.ts',
        content: serverts,
        language: 'typescript',
      });

      files.set('client.tsx', {
        name: 'client/src/Greeting.tsx',
        content: clientts,
        language: 'typescript',
      });

      files.set('utils.ts', {
        name: 'client/src/utils/trpc.ts',
        content: trpcts,
        language: 'typescript',
      });

      return new Map(files);
    });

    setFile('server.ts');
  }

  async function selectFile(name: string) {
    // whatever
    setFile(name);
  }

  const Loading = () => {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center text-xl">Loading...</div>
      </div>
    );
  };

  if (!wc.current || !iframeSrc) return <Loading />;

  return (
    <div className="flex gap-4">
      <div className="h-full w-1/2">
        <div className="flex flex-col items-center">
          <ToggleGroup
            type="single"
            defaultValue="server.ts"
            onValueChange={(val) => selectFile(val)}
          >
            {Array.from(files.keys()).map((key) => (
              <ToggleGroupItem key={key} value={key}>
                {key}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <Editor
            isDark={true}
            fs={wc.current?.fs}
            file={currentFile}
            onChange={async (e) => {
              if (currentFile)
                await wc.current?.fs.writeFile(currentFile.name, e);
            }}
          />
        </div>
      </div>
      <iframe
        src={iframeSrc}
        className="flex-1 rounded-md border border-zinc-700"
        style={{ backgroundColor: '#25292E' }}
      />
    </div>
  );
}
