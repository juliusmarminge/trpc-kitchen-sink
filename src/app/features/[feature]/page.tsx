'use client';

import * as React from 'react';
import { useEffect } from 'react';
import lazy from 'next/dynamic';
import { type WebContainer } from '@webcontainer/api';
import { cn } from '~/utils/cn';

import { Button } from '~/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

const Editor = lazy(
  async () => (await import('~/app/features/[feature]/editor')).Editor,
  {
    ssr: false,
  },
);

export default function IndexPage() {
  const wc = React.useRef<WebContainer>();
  const iframeRef = React.useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
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
        console.log('Server running at ', url, ' on port ', port);
        if (iframeRef.current && port == 3000) iframeRef.current.src = url;
      });
    })();
  }, []);

  const [files, setFiles] = React.useState<
    Map<string, { name: string; content: string; language: string }>
  >(new Map());
  const [file, setFile] = React.useState('');

  const currentFile = files.get(file);

  async function parseFS() {
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

  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="overflow-hidden rounded-md border border-slate-200 shadow-xl shadow-zinc-800 dark:border-zinc-700">
        <Tabs defaultValue="basic">
          <TabsList className="mx-auto h-12 w-full rounded-none">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="wizard">Multistep Wizard</TabsTrigger>
            <TabsTrigger value="form-action" disabled>
              File Uploads
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="basic"
            className="flex min-h-[700px] gap-4 border-none"
          >
            <div className="h-full w-1/2">
              <div className="flex">
                {Array.from(files.keys()).map((key) => (
                  <Button
                    key={key}
                    className={cn('flex-1')}
                    disabled={key === file}
                    size="sm"
                    onClick={() => selectFile(key)}
                  >
                    {key}
                  </Button>
                ))}
              </div>

              <React.Suspense
                fallback={
                  <div className="h-full min-h-[700px]">Loading editor...</div>
                }
              >
                <Editor
                  isDark={true}
                  fs={wc.current?.fs}
                  file={currentFile}
                  onChange={async (e) => {
                    if (currentFile)
                      await wc.current?.fs.writeFile(currentFile.name, e);
                  }}
                />
              </React.Suspense>
            </div>

            <iframe
              ref={iframeRef}
              className="flex-1 rounded-md border border-zinc-700"
              style={{ backgroundColor: '#25292E' }}
            />
          </TabsContent>
          <TabsContent value="wizard" className="border-none"></TabsContent>
          <TabsContent
            value="form-action"
            className="border-none"
          ></TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
