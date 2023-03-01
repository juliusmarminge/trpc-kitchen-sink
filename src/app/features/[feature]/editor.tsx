'use client';

import * as React from 'react';
import MonacoEditor, { loader } from '@monaco-editor/react';
import { type FileSystemAPI } from '@webcontainer/api';
import { languages, type editor } from 'monaco-editor';

import ghDark from '~/styles/monaco-dark.json';
import ghLight from '~/styles/monaco-light.json';

type EditorProps = {
  file?: {
    name: string;
    content: string;
    language: string;
  };
  fs: FileSystemAPI | undefined;
  onChange: (code: string) => void;
  isDark: boolean;
};

export default function Editor(props: EditorProps) {
  const editor = React.useRef<editor.IStandaloneCodeEditor>();
  const [theme, setTheme] = React.useState('github-dark');

  React.useEffect(() => {
    loader.init().then((monaco) => {
      monaco.editor.defineTheme(
        'github-dark',
        ghDark as editor.IStandaloneThemeData,
      );
      monaco.editor.defineTheme(
        'github-light',
        ghLight as editor.IStandaloneThemeData,
      );

      const compilerOptions: languages.typescript.CompilerOptions = {
        strict: true,
        target: languages.typescript.ScriptTarget.ESNext,
        module: languages.typescript.ModuleKind.ESNext,
        moduleResolution: languages.typescript.ModuleResolutionKind.NodeJs,
        jsx: languages.typescript.JsxEmit.Preserve,
        jsxImportSource: 'react',
        typeRoots: ['node_modules/@types'],
        allowNonTsExtensions: true,
      };

      monaco.languages.typescript.typescriptDefaults.setCompilerOptions(
        compilerOptions,
      );
    });
  }, []);

  React.useEffect(() => {
    if (!props.fs) return;
    // load all files from the wc's filesystem into monaco

    loader.init().then((monaco) => {
      async function loadFiles(dir = '.') {
        const files = await props.fs!.readdir(dir, { withFileTypes: true });
        console.log('In dir:', dir);
        console.log(files);

        for (const file of files) {
          if (file.name === '.pnpm') continue;

          console.log('file: ', `${dir}/${file.name}`);
          if (file.isDirectory()) loadFiles(`${dir}/${file.name}`);
          else if (
            file.isFile() &&
            (file.name.includes('.ts') || file.name === 'package.json')
          ) {
            const content = await props.fs!.readFile(
              `${dir}/${file.name}`,
              'utf-8',
            );

            console.log('adding extra lib', `${dir}/${file.name}`);
            monaco.languages.typescript.typescriptDefaults.addExtraLib(
              content,
              `file:///${dir}/${file.name}`,
            );
          }
        }
      }
      // FIXME: Why doesn't recursion on root folder just work?
      // loadFiles('.');

      loadFiles('node_modules');
      loadFiles('server');
      loadFiles('client/src');
      loadFiles('client/node_modules/@trpc');

      loadFiles('server/node_modules/zod');
      loadFiles('server/node_modules/@trpc/server');
      loadFiles('server/node_modules/@trpc/server/dist');
      loadFiles('server/node_modules/@trpc/server/dist/core');
      loadFiles('server/node_modules/@trpc/server/dist/internals');
      loadFiles('server/node_modules/@types/node');
    });
  }, [props.fs]);

  React.useEffect(() => {
    setTheme(props.isDark ? 'github-dark' : 'github-light');
  }, [props.isDark]);

  if (typeof window === 'undefined') return null;

  return (
    <MonacoEditor
      onChange={(e) => {
        if (e) props.onChange(e);
      }}
      className="h-full min-h-[600px]"
      options={{ minimap: { enabled: false }, tabSize: 2 }}
      onMount={(e) => (editor.current = e)}
      theme={theme}
      {...(props.file
        ? {
            path: props.file.name,
            language: props.file.language,
            defaultValue: props.file.content,
          }
        : {})}
    />
  );
}
