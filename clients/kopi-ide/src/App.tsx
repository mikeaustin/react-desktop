import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from 'codemirror';

import { View, Stack, Text, Divider, Spacer, Button, Input } from 'core';
import { interpret, KopiValue, KopiTuple } from 'kopi-language';

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
  const [output, setOutput] = useState<string[]>([]);

  const handleChange = async (source: string, viewUpdate: any) => {
    setInternalSource(source);
  };

  useLayoutEffect(() => {
    (async () => {
      setOutput([]);

      try {
        const value = await (await interpret(internalSource, async (arg: KopiValue) => {
          const foo = await arg.toString();
          setOutput(output => [...output, foo]);

          return Promise.resolve(KopiTuple.empty);
        })).inspect();

        setOutput(output => [...output, value]);
      } catch (error) {
        setOutput(output => [...output, (error as Error).message]);
      }
    })();
  }, [internalSource]);

  return (
    <View style={{ border: '1px solid #dee2e6', borderRadius: 4, overflow: 'hidden' }}>
      <View padding="medium" fillColor="gray-1">
        <CodeMirror theme={myTheme} value={internalSource} onChange={handleChange} />
      </View>
      <View flex padding="medium" fillColor="white">
        {output.map((line, index) => (
          <View key={index} style={{ padding: '4px 0' }}>
            <Text style={{ font: '14px/20px source-code-pro, Menlo, Monaco, Consolas, monospace' }}>
              {line}
            </Text>
          </View>
        ))}
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
  sections: { title: string, cells: (MarkdownCellData | CodeCellData)[]; }[],
}

interface NotebookProps {
  title: string;
  sections: { title: string, cells: (MarkdownCellData | CodeCellData)[]; }[],
}

function Notebook({ title, sections }: NotebookProps) {
  return (
    <Stack flex padding="large" spacing="xlarge">
      <View>
        <Text fontSize="xlarge" fontWeight="light">{title}</Text>
      </View>
      {sections.map((section, index) => (
        <React.Fragment key={index}>
          <Text fontSize="medium" fontWeight="bold">{section.title}</Text>
          <Stack spacing="medium">
            {section.cells.map((cell, index) => (
              React.createElement(getComponent(cell.type), { ...cell, key: Math.random() })
            ))}
          </Stack>
        </React.Fragment>
      ))}
    </Stack>
  );
}

const initialNotebooks: NotebookData[] = [
  {
    title: 'Basic Kopi Examples', sections: [
      {
        title: 'Factorial Example', cells: [
          {
            type: 'markdown', markdown: `
A basic factorial example
` },
          {
            type: 'code', source: `
factorial (n) = match n (
  0 => 1
  n => n * factorial (n - 1)
)

factorial 5          
` },
        ]
      },
      {
        title: 'Iterator Example', cells: [
          {
            type: 'markdown', markdown: `
A simple iterator example
` },
          {
            type: 'code', source: `
(1..5, "a".."z") | map (n, c) => (c, n * n) | filter (c, n) => 'even n
` },
          {
            type: 'markdown', markdown: `
Another iterable example
` },
          {
            type: 'code', source: `
"abcaba" | split "" | reduce (count = {:}, c) => {
  count | update c (n = 0) => n + 1
}
` },

        ]
      },
    ]
  },
  {
    title: 'Interpreter Example', sections: [{
      title: 'Core Functionality', cells: [
        {
          type: 'markdown', markdown: `
This implements a very simple BASIC interpreter.
` },
        {
          type: 'code', source: `
incrementIndex = index => index + 1
setIndex = index => () => index

get (value) = match (value 0) (
  "'" => value 1..('size value - 1)
  _   => value
)

evaluateAst (statement, indexes) = match statement (
  (lineNo, "PRINT", value) => {
    print (get value)
    incrementIndex
  }
  (lineNo, "GOTO", value) => {
    setIndex (indexes | get value)
  }
)

interpret (source) = {
  program = source | trim | split (String.newlineRegExp) | map (line) => {
    let ([lineNo, command, value] = line | trim | splitOnLimit " " 2 | toArray) =>
      (lineNo: lineNo, command, value)
  } | toArray

  indexes = (0..99, program) | reduce (dict = {:}, index, statement) => {
    dict | set (statement.lineNo) index
  }

  let (index = 0) => {
    match (index == 'size program) (
      true => "Done"
      _    => loop (evaluateAst (program index, indexes) index)
    )
  }
}

source = "
  10 PRINT 'Hello, world.'
  20 GOTO 40
  30 PRINT 'How are you?'
  40 PRINT 'Goodbye.'
"

interpret source
`}
      ]
    }]
  },
];

function App() {
  const [notebooks, setNotebooks] = useState<NotebookData[]>(initialNotebooks);
  const [currentNotebookIndex, setCurrentNotebookIndex] = useState<number>(0);

  return (
    <View className="App">
      <Stack flex horizontal divider fillColor="white">
        <View fillColor="gray-1" style={{ width: 300, padding: 8 }}>
          <Stack spacing="small">
            {notebooks.map((notebook, index) => (
              <React.Fragment key={index}>
                <View style={{ cursor: 'pointer' }} onClick={() => setCurrentNotebookIndex(index)}>
                  <Text fontSize="large" fontWeight="light" style={{ padding: 8 }}>{notebook.title}</Text>
                </View>
                {notebook.sections.map((section, index) => (
                  <Text key={index} fontWeight="bold" style={{ padding: '8px 16px' }}>{section.title}</Text>
                ))}
              </React.Fragment>
            ))}
          </Stack>
        </View>
        <Notebook {...notebooks[currentNotebookIndex]} />
      </Stack>
    </View>
  );
}

export default App;
