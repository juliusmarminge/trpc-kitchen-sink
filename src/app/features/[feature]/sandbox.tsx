'use client';

import * as React from 'react';
import { lazy } from 'react';
import { type WebContainer } from '@webcontainer/api';

import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group';

const Editor = lazy(() => import('./editor'));

const SkeletonLoader = (props: { state: string }) => {
  return (
    <div className="flex h-full min-h-[600px] items-center justify-center">
      <div className="text-center text-xl">{props.state}</div>
    </div>
  );
};

export function Sandbox() {
  const wc = React.useRef<WebContainer>();
  const [iframeSrc, setIframeSrc] = React.useState<string | null>(null);
  const [loadingState, setLoadingState] = React.useState(
    '[1/5]: Booting up...',
  );

  React.useEffect(() => {
    (async () => {
      const instance = await import('~/utils/web-container').then(
        (mod) => mod.wc,
      );
      wc.current = instance;

      instance.fs
        .readFile('package.json', 'utf-8')
        .then((res) => {
          console.log('App exists', JSON.parse(res).name);
          setLoadingState(
            "App exists, let's start it up...Reload required for now...",
          );
          // TODO: Handle this case cause
        })
        .catch(async () => {
          setLoadingState('[2/5]: Initializing project...');
          // init tool launches faster using pnpm,
          // but the symlinks it creates seems to not play nice with Monaco
          // so we start the initer using pnpm and then install deps using npm
          const installProgress = await instance.spawn('pnpm', [
            'create',
            'next-app',
            '.',
            '-e',
            'https://github.com/juliusmarminge/wc-test',
            '--use-npm',
          ]);
          installProgress.output.pipeTo(
            new WritableStream({
              write: (chunk) => {
                if (chunk.includes('Downloading files')) {
                  setLoadingState('[3/5]: Downloading files...');
                } else if (chunk.includes('Installing packages')) {
                  setLoadingState('[4/5]: Installing dependencies...');
                }
              },
            }),
          );
          if (await installProgress.exit) {
            console.log('Installation failed');
            setLoadingState(
              'Installation failed. Please refresh the page to try again.',
            );
          }

          setLoadingState('[5/5]: Starting application...');
          parseFS();

          await Promise.all([
            instance.spawn('pnpm', ['-F', 'server', 'dev']),
            instance.spawn('pnpm', ['-F', 'client', 'dev']),
          ]);
          // await instance.spawn('pnpm', ['-F', 'server', 'dev']);
          // await instance.spawn('pnpm', ['-F', 'client', 'dev']);

          instance.on('server-ready', (port, url) => {
            // don't mount the server app
            if (port == 3000) setIframeSrc(url);
          });
        });
    })();
    // TODO: find some way to keep the wc alive when navigating away
    // return () => {
    //   wc.current?.teardown();
    // };
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

    const [serverts, maintsx, clientts, trpcts] = await Promise.all([
      fs.readFile('server/index.ts', 'utf-8'),
      fs.readFile('client/src/main.tsx', 'utf-8'),
      fs.readFile('client/src/Greeting.tsx', 'utf-8'),
      fs.readFile('client/src/utils/trpc.ts', 'utf-8'),
    ]);

    setFiles((files) => {
      files.set('server.ts', {
        name: 'server/index.ts',
        content: serverts,
        language: 'typescript',
      });

      files.set('main.tsx', {
        name: 'client/src/main.tsx',
        content: maintsx,
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

  if (!wc.current || !iframeSrc) return <SkeletonLoader state={loadingState} />;

  return (
    <div className="flex gap-4">
      <div className="h-full w-1/2">
        <div className="flex flex-col items-center">
          <ToggleGroup
            type="single"
            defaultValue={file}
            size="sm"
            className="w-full rounded-b-none"
            onValueChange={(val) => selectFile(val)}
          >
            {Array.from(files.keys()).map((key) => (
              <ToggleGroupItem
                key={key}
                value={key}
                className="h-6 flex-1"
                variant="outline"
              >
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
