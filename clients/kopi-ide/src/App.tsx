import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from 'codemirror';

import { View, Stack, Text, Divider, Spacer, Button, Input } from 'core';
import { interpret } from 'kopi-language';

import './App.css';

const file = unified().use(remarkParse).parse(`
## Iterable Example

An simple iterator example

    (1..5, "a".."z") | map (n, c) => (c, n * n) | filter (c, n) => 'even n

## Factorial Example

A basic factorial example

    factorial (n) = match n (
      0 => 1
      n => n * factorial (n - 1)
    )

    factorial 5
`);

console.log(file);

const myTheme = EditorView.theme({
  '&': {
    // fontSize: '14px',
    // font: 'source-code-pro, Menlo, Monaco, Consolas, monospace',
  },
  '&.cm-editor.cm-focused': {
    outline: 'none',
  },
  '&.cm-editor .cm-activeLine': {
    background: 'none',
  },
  '&.cm-editor .cm-gutters': {
    display: 'none',
  },
  '&.cm-editor .cm-content': {
    padding: 0,
  },
  '&.cm-editor .cm-line': {
    padding: 0,
  },
  '&.cm-editor .cm-scroller': {
    font: '14px/20px source-code-pro, Menlo, Monaco, Consolas, monospace',
  },
});

const markdownComponents = {
  h1: ({ children }: { children: React.ReactNode; }) => (
    <View style={{ marginBottom: 24 }}>
      <Text fontSize="large" fontWeight="semi-bold" >{children as string}</Text>
    </View>
  ),
  h2: ({ children }: { children: React.ReactNode; }) => (
    <View style={{ marginBottom: 24 }}>
      <Text fontSize="medium" fontWeight="bold">{children as string}</Text>
    </View>
  ),
  p: ({ children }: { children: React.ReactNode; }) => (
    <View style={{ marginTop: 15 }}>
      <Text>{children as string}</Text>
    </View>
  ),
  strong: ({ children }: { children: React.ReactNode; }) => (
    <Text /*textParent*/ fontWeight="bold">{children as string}</Text>
  ),
};

const iterableCell = {
  markdown: `
## Iterable Example

An simple iterator example
`,
  source: `
(1..5, "a".."z") | map (n, c) => (c, n * n) | filter (c, n) => 'even n
`
};

const factorialCell = {
  markdown: `
## Factorial Example

A basic factorial example
`,
  source: `
factorial (n) = match n (
  0 => 1
  n => n * factorial (n - 1)
)

factorial 5
`
};

interface MarkdownCellData {
  type: string;
  markdown: string;
}

interface CodeCellData {
  type: string;
  source: string;
}

interface MarkdownCellProps {
  markdown: string;
}

function MarkdownCell({ markdown }: MarkdownCellProps) {
  const [internalMarkdown, setInternalMarkdown] = useState(markdown.trim() + '\n');
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleEditMarkdownClick = () => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.selectionStart = inputRef.current.value.length;
      }
    });

    setIsEditing(true);
  };

  const handleEditDoneClick = () => {
    setInternalMarkdown(internalMarkdown => internalMarkdown.trim() + '\n');

    setIsEditing(false);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = inputRef.current.value.split('\n').length * 20 + 'px';
    }
  }, [internalMarkdown]);

  return (
    <View>
      <View>
        <View style={{ display: isEditing ? '' : 'none' }}>
          <textarea
            ref={inputRef}
            value={internalMarkdown}
            style={{ font: "14px/20px -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Consolas', 'Droid Sans', 'Helvetica Neue', sans-serif" }}
            onChange={(event: any) => setInternalMarkdown(event.target.value)}
          />
          <Spacer size="small" />
          <View horizontal>
            <Button solid primary title="Save" onClick={handleEditDoneClick} />
          </View>
        </View>
        <View style={{ display: isEditing ? 'none' : 'block' }} onClick={handleEditMarkdownClick}>
          <ReactMarkdown components={markdownComponents} children={internalMarkdown} />
        </View>
      </View>
    </View>
  );
}

interface CodeCellProps {
  source: string;
}

function CodeCell({ source }: CodeCellProps) {
  const [internalSource, setInternalSource] = useState(source.trim());
  const [output, setOutput] = useState<string>('');

  const handleChange = async (source: string, viewUpdate: any) => {
    setInternalSource(source);
  };

  useEffect(() => {
    (async () => {
      try {
        const value = await interpret(internalSource);

        setOutput(await value.inspect());
      } catch (error) {
        setOutput((error as Error).message);
      }

    })();
  }, [internalSource]);

  return (
    <View style={{ border: '1px solid #dee2e6', borderRadius: 4, overflow: 'hidden' }}>
      <View padding="medium" fillColor="gray-1">
        <CodeMirror theme={myTheme} value={internalSource} onChange={handleChange} />
      </View>
      <View flex padding="medium" fillColor="white">
        <Text style={{ font: '14px/20px source-code-pro, Menlo, Monaco, Consolas, monospace' }}>{output}</Text>
      </View>
    </View>
  );
}

const getComponent = (type: string): React.ComponentType<any> => {
  switch (type) {
    case 'markdown': return MarkdownCell;
    case 'code': return CodeCell;
  }

  throw new Error();
};

interface NotebookData {
  title: string;
  cells: (MarkdownCellData | CodeCellData)[];
}

interface NotebookProps {
  title: string;
  cells: (MarkdownCellData | CodeCellData)[];
}

function Notebook({ title, cells }: NotebookProps) {
  return (
    <Stack flex padding="large" spacing="xlarge">
      <View>
        <Text fontSize="xlarge" fontWeight="light">{title}</Text>
      </View>
      {cells.map((cell, index) => (
        React.createElement(getComponent(cell.type), { ...cell, key: index })
      ))}
    </Stack>
  );
}

const initialCells: (MarkdownCellData | CodeCellData)[] = [
  { type: 'markdown', markdown: factorialCell.markdown },
  { type: 'code', source: factorialCell.source },
  { type: 'markdown', markdown: iterableCell.markdown },
  { type: 'code', source: iterableCell.source },
  { type: 'markdown', markdown: `Another iterable example` },
  {
    type: 'code', source: `
"abcaba" | split "" | reduce (count = {:}, c) => {
  count | update c (n = 0) => n + 1
}
` },
];

const initialNotebooks: NotebookData[] = [
  { title: 'Basic Kopi Examples', cells: initialCells },
  { title: '', cells: [] },
];

function App() {
  const [notebooks, setNotebooks] = useState<NotebookData[]>(initialNotebooks);
  const [currentNotebookIndex, setCurrentNotebookIndex] = useState<number>(0);

  return (
    <View className="App">
      <Stack flex horizontal divider fillColor="white">
        <View fillColor="gray-1" style={{ width: 300, padding: 8 }}>
          {notebooks.map((notebook, index) => (
            <React.Fragment key={index}>
              <Text fontSize="large" fontWeight="light" style={{ padding: 8 }}>{notebook.title}</Text>
              {/* {notebook.sections.map(cell => (
                <Text>xxx</Text>
              ))} */}
            </React.Fragment>
          ))}
        </View>
        <Notebook {...notebooks[currentNotebookIndex]} />
      </Stack>
    </View>
  );
}

export default App;
