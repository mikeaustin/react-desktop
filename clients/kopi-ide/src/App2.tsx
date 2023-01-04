import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { View, Stack, Text, Divider, Spacer, Button, Input } from 'core';
import { interpret, KopiValue, KopiTuple } from 'kopi-language';

import './App.css';


function App() {
  const rootElementRef = useRef<HTMLDivElement>(null);

  const handleChange = async (mutations: MutationRecord[]) => {
    console.log(mutations);

    for (const mutation of mutations) {
      if (mutation.target.parentNode?.nodeName === 'CODE') {
        console.log('here', mutation.target.textContent);

        if (mutation.target.textContent && mutation.target.parentNode.lastChild) {
          try {
            const value = await interpret(mutation.target.textContent);

            mutation.target.parentNode.lastChild.textContent = await value.inspect();
          } catch (error) {
            mutation.target.parentNode.lastChild.textContent = (error as Error).message;
          }
        }
      }
    }
  };

  useLayoutEffect(() => {
    const mutationObserver = new MutationObserver(handleChange);

    if (rootElementRef.current) {
      mutationObserver.observe(rootElementRef.current, {
        subtree: true,
        characterData: true,
      });
    }

    return () => {
      mutationObserver.disconnect();
    };
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const selection = window.getSelection();

    console.log(selection?.focusNode?.parentNode?.nodeName);

    if ((selection && selection.focusNode)) {
      if (event.key === '-' && selection.focusNode.nodeName === 'P' && selection.focusOffset === 0) {
        event.preventDefault();

        let range = selection?.getRangeAt(0);

        range.selectNode(range.commonAncestorContainer);
        range.deleteContents();
        const ul = document.createElement('ul');
        const li = document.createElement('li');
        ul.appendChild(li);
        range.insertNode(ul);

        range = new Range();

        range.collapse();
        range.setStart(ul, 0);

        selection.removeAllRanges();
        selection.addRange(range);

        return;
      }

      if (event.key === '=' && selection.focusNode.nodeName === 'P' && selection.focusOffset === 0) {
        event.preventDefault();

        let range = selection?.getRangeAt(0);

        range.selectNode(range.commonAncestorContainer);
        range.deleteContents();
        const node = document.createElement('hr');
        range.insertNode(node);

        if (node.nextSibling) {
          range.setStart(node.nextSibling, 0);
        }

        return;
      }

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
  };

  useEffect(() => {
    const mutationObserver = new MutationObserver(handleChange);

    if (rootElementRef.current) {
      mutationObserver.observe(rootElementRef.current, {
        subtree: true,
        characterData: true,
      });
    }

    if (rootElementRef.current) {
      rootElementRef.current.innerHTML =
        '<h3>Factorial</h3>' +
        '<p>Lorem ipsum dolor sit amet, <code class="inline">consectetur</code> adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>' +
        '<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>' +
        '<code>factorial (n) = match n (\n  0 => 1\n  n => n * factorial (n - 1)\n)\n\nfactorial 5<br /><div contenteditable="false">result</div><pre contenteditable="false">120</pre></code>' +
        '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>' +
        '<ul>' +
        '<li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>' +
        '<li>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</li>' +
        '</ul>' +
        '<hr />' +
        '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>' +
        '<h3>Heading 2</h3>' +
        '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit<br /></p>' +
        `<code>1..10 | map '(toFixed 2)<br /><pre></pre></code>` +
        '<p><br /></p>';
    }

    return () => {
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <View horizontal className="App">
      <View padding="medium" fillColor="gray-1" style={{ minWidth: 256 }}>
        <Text fontSize="medium" fontWeight="light">Basic Kopi Examples</Text>
        <Spacer size="medium" />
        <Text fontWeight="bold" style={{ marginLeft: 16 }}>Heading 1</Text>
        <Spacer size="medium" />
        <Text fontWeight="bold" style={{ marginLeft: 16 }}>Heading 2</Text>
        <Spacer size="medium" />
        <Text fontWeight="bold" style={{ marginLeft: 16 }}>Heading 3</Text>
      </View>
      <Divider />
      <View flex padding="large" style={{ padding: 32, overflow: 'auto' }}>
        <Text fontSize="large" fontWeight="light">Basic Kopi Examples</Text>
        <Spacer size="xlarge" />
        <div autoCorrect="false" spellCheck="false" ref={rootElementRef} contentEditable className="editor" onKeyDown={handleKeyDown} />
      </View>
    </View>
  );
}

export default App;
