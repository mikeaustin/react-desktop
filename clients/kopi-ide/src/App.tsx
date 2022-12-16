import React, { useState } from 'react';
import { EditorView } from 'codemirror';
import CodeMirror from '@uiw/react-codemirror';

import { View, Stack, Text, Divider } from 'core';
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

function App() {
  const [output, setOutput] = useState<string>('');

  const handleChange = async (source: string, viewUpdate: any) => {
    const value = await interpret(source);

    setOutput(await value.inspect());
  };

  return (
    <Stack horizontal className="App">
      <View flex>
        <CodeMirror height="100%" theme={myTheme} style={{ height: '100%' }} onChange={handleChange} />
      </View>
      <Divider />
      <View flex padding="small" fillColor="white">
        <Text style={{ fontFamily: 'source-code-pro, Menlo, Monaco, Consolas, monospace', fontSize: 14, lineHeight: '20px' }}>{output}</Text>
      </View>
    </Stack>
  );
}

export default App;
