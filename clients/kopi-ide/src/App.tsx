import React, { useEffect, useRef, useState } from 'react';
import { EditorView } from 'codemirror';
import ReactMarkdown from 'react-markdown';
import CodeMirror from '@uiw/react-codemirror';

import { View, Stack, Text, Divider, Spacer, Button, Input } from 'core';
import { interpret } from 'kopi-language';

import './App.css';

const myTheme = EditorView.theme({
  "&": {
    fontSize: "14px",
    // background: 'white',
  },
  "&.cm-editor.cm-focused": {
    outline: "none",
  },
  "&.cm-editor .cm-activeLine": {
    background: "none",
  },
  "&.cm-editor .cm-gutters": {
    display: "none",
  },
  "&.cm-editor .cm-content": {
    padding: 0,
  },
  "&.cm-editor .cm-line": {
    padding: 0,
  },
});

const markdownComponents = {
  h1: ({ children }: { children: React.ReactNode; }) => (
    <View style={{ marginBottom: 16 }}>
      <Text fontSize="medium" fontWeight="extra-bold">{children as string}</Text>
    </View>
  ),
  h2: ({ children }: { children: React.ReactNode; }) => (
    <View style={{ marginBottom: 24 }}>
      <Text fontSize="large" fontWeight="semi-bold" >{children as string}</Text>
    </View>
  ),
  p: ({ children }: { children: React.ReactNode; }) => (
    <View style={{ marginTop: 24 }}>
      <Text fontSize="medium">{children as string}</Text>
    </View>
  ),
  strong: ({ children }: { children: React.ReactNode; }) => (
    <Text /*textParent*/ fontWeight="bold">{children as string}</Text>
  ),
};

interface NotebookCellProps {
  markdown: string;
  source: string;
}

const iterableCell = {
  markdown: `
# Iterable Example

An simple iterator example
`,
  source: `
(1..5, "a".."z") | map (n, c) => (c, n * n) | filter (c, n) => 'even n
`
};

const factorialCell = {
  markdown: `
# Factorial Example

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

function NotebookCell({ markdown, source }: NotebookCellProps) {
  const [internalMarkdown, setInternalMarkdown] = useState(markdown.trim() + '\n');
  const [internalSource, setInternalSource] = useState(source.trim());
  const [isEditing, setIsEditing] = useState(false);
  const [output, setOutput] = useState<string>('');

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = async (source: string, viewUpdate: any) => {
    setInternalSource(source);
  };

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
    setIsEditing(false);
  };

  useEffect(() => {
    (async () => {
      const value = await interpret(internalSource);

      setOutput(await value.inspect());
    })();
  }, [internalSource]);

  return (
    <View padding="medium" fillColor="white">
      <View>
        {isEditing ? (
          <View>
            <textarea ref={inputRef} rows={5} value={internalMarkdown} onChange={(event: any) => setInternalMarkdown(event.target.value.trim() + '\n')} />
            <Spacer size="small" />
            <View horizontal>
              <Button solid primary title="Save" onClick={handleEditDoneClick} />
            </View>
          </View>
        ) : (
          <View style={{ display: 'block' }} onClick={handleEditMarkdownClick}>
            <ReactMarkdown components={markdownComponents} children={internalMarkdown} />
          </View>
        )}
      </View>
      <Spacer size="large" />
      <View style={{ border: '1px solid #dee2e6', borderRadius: 4, overflow: 'hidden' }}>
        <View padding="medium" fillColor="gray-1">
          <CodeMirror /*height="100%"*/ theme={myTheme} value={internalSource} /*style={{ height: '100%' }}*/ onChange={handleChange} />
        </View>
        {/* <Spacer size="small" /> */}
        <View flex padding="medium" fillColor="white">
          <Text style={{ fontFamily: 'source-code-pro, Menlo, Monaco, Consolas, monospace', fontSize: 14, lineHeight: '20px' }}>{output}</Text>
        </View>
      </View>
    </View>
  );
}

function App() {
  return (
    <View flex className="App">
      <NotebookCell markdown={iterableCell.markdown} source={iterableCell.source} />
      <NotebookCell markdown={factorialCell.markdown} source={factorialCell.source} />
    </View>
  );
}

export default App;
