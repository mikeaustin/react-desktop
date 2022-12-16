import React, { useRef, useState } from 'react';
import { EditorView } from 'codemirror';
import ReactMarkdown from 'react-markdown';
import CodeMirror from '@uiw/react-codemirror';

import { View, Stack, Text, Divider, Spacer, Button } from 'core';
import { interpret } from 'kopi-language';

import './App.css';

const myTheme = EditorView.theme({
  "&": {
    fontSize: "14px",
    background: 'white',
  },
  "&.cm-editor.cm-focused": {
    outline: "none",
  }
});

const markdownComponents = {
  h1: ({ children }: { children: React.ReactNode; }) => (
    <View style={{ marginBottom: 16 }}>
      <Text fontSize="xlarge" fontWeight="semi-bold">{children as string}</Text>
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

function NotebookCell() {
  const [markdown, setMarkdown] = useState(`
    # Hello
  `.trim());
  const [isEditing, setIsEditing] = useState(false);
  const [output, setOutput] = useState<string>('');

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = async (source: string, viewUpdate: any) => {
    const value = await interpret(source);

    setOutput(await value.inspect());
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

  return (
    <View padding="medium" fillColor="white">
      <View>
        {isEditing ? (
          <View>
            <textarea ref={inputRef} rows={5} defaultValue={markdown} onChange={(event: any) => setMarkdown(event.target.value.trim())} />
            <Button solid primary title="Done" onClick={handleEditDoneClick} />
          </View>
        ) : (
          <View style={{ display: 'block' }} onClick={handleEditMarkdownClick}>
            <ReactMarkdown components={markdownComponents} children={markdown} />
          </View>
        )}
      </View>
      {/* <Spacer size="large" /> */}
      <CodeMirror /*height="100%"*/ theme={myTheme} /*style={{ height: '100%' }}*/ onChange={handleChange} />
      <View flex padding="small" fillColor="white">
        <Text style={{ fontFamily: 'source-code-pro, Menlo, Monaco, Consolas, monospace', fontSize: 14, lineHeight: '20px' }}>{output}</Text>
      </View>
    </View>
  );
}

function App() {
  const [markdown, setMarkdown] = useState(`
    # Hello
  `.trim() + '\n');
  const [isEditing, setIsEditing] = useState(false);
  const [output, setOutput] = useState<string>('');

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = async (source: string, viewUpdate: any) => {
    const value = await interpret(source);

    setOutput(await value.inspect());
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

  return (
    <Stack horizontal className="App">
      <View flex>
        <NotebookCell />
        <NotebookCell />
      </View>
      <Divider />
      <View flex padding="small" fillColor="white">
        <Text style={{ fontFamily: 'source-code-pro, Menlo, Monaco, Consolas, monospace', fontSize: 14, lineHeight: '20px' }}>{output}</Text>
      </View>
    </Stack>
  );
}

export default App;
