import { useState, useEffect, useRef } from 'react';
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  frontmatterPlugin,
  diffSourcePlugin,
  markdownShortcutPlugin,
  directivesPlugin,
  AdmonitionDirectiveDescriptor,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  InsertCodeBlock,
  ListsToggle,
  CodeToggle,
  Separator,
  InsertAdmonition,
  DiffSourceToggleWrapper,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

interface Props {
  markdown: string;
  onChange: (markdown: string) => void;
}

export default function MDXEditorComponent({ markdown: initialMarkdown, onChange }: Props) {
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      if (e.detail) {
        setMarkdown(e.detail);
        if (editorRef.current?.setMarkdown) {
          editorRef.current.setMarkdown(e.detail);
        }
      }
    };
    window.addEventListener('mdx-editor-update', handler);
    return () => window.removeEventListener('mdx-editor-update', handler);
  }, []);

  const handleChange = (md: string) => {
    setMarkdown(md);
    onChange(md);
    window.postMessage({ type: 'mdx-editor-change', markdown: md }, '*');
  };

  return (
    <div className="bg-white rounded-lg border border-zinc-200">
      <MDXEditor
        ref={editorRef}
        markdown={markdown}
        onChange={handleChange}
        plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin({
          imageUploadHandler: async () => {
            return Promise.resolve('/placeholder.jpg'); // ponytail: add upload when needed
          },
        }),
        tablePlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            js: 'JavaScript',
            ts: 'TypeScript',
            tsx: 'TypeScript JSX',
            jsx: 'JavaScript JSX',
            css: 'CSS',
            html: 'HTML',
            bash: 'Bash',
            python: 'Python',
            json: 'JSON',
            yaml: 'YAML',
            markdown: 'Markdown',
          }
        }),
        directivesPlugin({
          directiveDescriptors: [AdmonitionDirectiveDescriptor],
        }),
        frontmatterPlugin(),
        diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: '' }),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <DiffSourceToggleWrapper>
                <UndoRedo />
                <Separator />
                <BoldItalicUnderlineToggles />
                <CodeToggle />
                <Separator />
                <BlockTypeSelect />
                <Separator />
                <CreateLink />
                <InsertImage />
                <Separator />
                <ListsToggle />
                <Separator />
                <InsertTable />
                <InsertThematicBreak />
                <Separator />
                <InsertCodeBlock />
                <Separator />
                <InsertAdmonition />
              </DiffSourceToggleWrapper>
            </>
          ),
        }),
      ]}
      contentEditableClassName="prose max-w-none"
    />
    </div>
  );
}
