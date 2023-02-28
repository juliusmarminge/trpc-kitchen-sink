import path from 'path';
import {
  defineComputedFields,
  defineDocumentType,
  makeSource,
} from 'contentlayer/source-files';
import rehypePrettyCode from 'rehype-pretty-code';
import { getHighlighter, loadTheme } from 'shiki';

const Doc = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: './**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
  },
  computedFields: defineComputedFields({
    slug: {
      type: 'string',
      resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
    slugAsParams: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
    },
  }),
}));

export default makeSource({
  contentDirPath: './docs',
  documentTypes: [Doc],
  mdx: {
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          getHighlighter: async () => {
            const theme = await loadTheme(
              path.join(process.cwd(), './src/styles/shiki-dark.json'),
            );
            return await getHighlighter({ theme });
          },
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push('line--highlighted');
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ['word--highlighted'];
          },
        },
      ],
    ],
  },
});
