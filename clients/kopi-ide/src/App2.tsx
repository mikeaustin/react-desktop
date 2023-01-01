import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { View, Stack, Text, Divider, Spacer, Button, Input } from 'core';
import { interpret, KopiValue, KopiTuple } from 'kopi-language';

import './App.css';


function App() {
  const rootElementRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const selection = window.getSelection();

    console.log(selection?.focusNode?.parentNode?.nodeName);

    if ((selection && selection.focusNode)) {
      if (event.key === 'Enter') {
        if (selection.focusNode?.nodeName === 'CODE' || selection.focusNode?.parentNode?.nodeName === 'CODE') {
          event.preventDefault();

          let range = selection?.getRangeAt(0);

          range.deleteContents();
          const node = document.createTextNode('\n');
          range.insertNode(node);
          node.parentNode?.normalize();

          range = document.createRange();

          range.collapse();
          range.setStart(selection.focusNode, selection.focusOffset);

          selection.removeAllRanges();
          selection.addRange(range);
        }

        return;
      }
    }

    // if (selection && selection.focusNode && event.key.length === 1) {
    //   event.preventDefault();

    //   let range = selection?.getRangeAt(0);

    //   range.deleteContents();
    //   const node = document.createTextNode(event.key);
    //   range.insertNode(node);
    //   node.parentNode?.normalize();

    //   range = document.createRange();

    //   range.collapse();
    //   range.setStart(selection.focusNode, selection.focusOffset);

    //   selection.removeAllRanges();
    //   selection.addRange(range);
    // }
  };

  useEffect(() => {
    if (rootElementRef.current) {
      rootElementRef.current.innerHTML =
        '<h3>Heading</h3>' +
        '<p>Lorem ipsum dolor sit amet, <code class="inline">consectetur</code> adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>' +
        '<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>' +
        '<code>factorial (n) = match n (\n  0 => 1\n  n => n * factorial (n - 1)\n)<br /></code>' +
        '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit<br /></p>' +
        '<ul>' +
        '<li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>' +
        '<li>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</li>' +
        '</ul>' +
        '<hr />' +
        '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit<br /></p>' +
        '<h3>Heading</h3>' +
        '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit<br /></p>';
    }
  }, []);

  return (
    <View className="App">
      <div autoCorrect="false" spellCheck="false" ref={rootElementRef} contentEditable className="editor" onKeyDown={handleKeyDown} />
    </View>
  );
}

export default App;
