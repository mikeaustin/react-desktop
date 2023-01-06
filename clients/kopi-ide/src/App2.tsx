import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { View, Stack, Text, Divider, Spacer, Button, Input } from 'core';
import { interpret, KopiValue, KopiTuple } from 'kopi-language';

import './App.css';


function Editor({ html }: { html: string; }) {
  const rootElementRef = useRef<HTMLDivElement>(null);

  const handleChange = async (mutations: MutationRecord[]) => {
    console.log(mutations);

    for (const mutation of mutations) {
      if (mutation.addedNodes.length > 0) {
        for (const node of mutation.addedNodes) {
          if (node.nodeName === 'CODE') {
            if (node?.firstChild?.textContent && node?.lastChild) {
              const value = await (await interpret(node.firstChild.textContent, async (arg: KopiValue) => {
                console.log(await arg.toString());

                return Promise.resolve(KopiTuple.empty);
              })).inspect();

              (node as Element).setAttribute('value', value);
            }
          }
        }
      } else if (mutation.target.parentNode?.nodeName === 'CODE') {
        if (mutation.target.textContent) {
          try {
            const value = await (await interpret(mutation.target.textContent, async (arg: KopiValue) => {
              console.log(await arg.toString());

              return Promise.resolve(KopiTuple.empty);
            })).inspect();

            (mutation.target.parentNode as Element).setAttribute('value', value);
          } catch (error) {
            (mutation.target.parentNode as Element).setAttribute('value', (error as Error).message);
          }
        }
      }
    }
  };

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

      if (event.key === '`' && selection.focusNode.nodeName === 'P' && selection.focusOffset === 0) {
        event.preventDefault();

        let range = selection?.getRangeAt(0);

        range.selectNode(range.commonAncestorContainer);
        range.deleteContents();
        const code = document.createElement('code');
        const br = document.createElement('br');
        code.appendChild(br);
        range.insertNode(code);

        range = new Range();

        range.setStart(code, 0);

        selection.removeAllRanges();
        selection.addRange(range);

        return;
      }

      if (event.key === '=' && selection.focusNode.nodeName === 'P' && selection.focusOffset === 0) {
        event.preventDefault();

        let range = selection?.getRangeAt(0);

        range.selectNode(range.commonAncestorContainer);
        range.deleteContents();
        const hr = document.createElement('hr');
        range.insertNode(hr);

        if (hr.nextSibling) {
          range.setStart(hr.nextSibling, 0);
        }

        return;
      }

      if (event.key === 'Enter') {
        if (selection.focusNode?.nodeName === 'CODE' || selection.focusNode?.parentNode?.nodeName === 'CODE') {
          event.preventDefault();

          let range = selection?.getRangeAt(0);

          range.deleteContents();
          const newline = document.createTextNode('\n');
          range.insertNode(newline);
          newline.parentNode?.normalize();

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
        childList: true,
        subtree: true,
        characterData: true,
      });
    }

    if (rootElementRef.current) {
      rootElementRef.current.innerHTML = html;
    }

    return () => {
      mutationObserver.disconnect();
    };
  }, [html]);

  return (
    <View flex fillColor="white" style={{ scrollSnapAlign: 'start', minWidth: 768, overflowY: 'auto', padding: 32 }}>
      <Text fontSize="xlarge" fontWeight="light">Basic Kopi Examples</Text>
      <Spacer size="xlarge" />
      <div autoCorrect="false" spellCheck="false" ref={rootElementRef} contentEditable className="editor" onKeyDown={handleKeyDown} />
    </View>
  );
}

const basicKopiExamples =
  '<h3>Factorial</h3>' +
  '<p>Lorem ipsum dolor sit amet, <code class="inline">consectetur</code> adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>' +
  '<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>' +
  '<code id="A1">factorial (n) = match n (\n  0 => 1\n  n => n * factorial (n - 1)\n)\n\nfactorial 5<br /></code>' +
  '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>' +
  '<ul>' +
  '<li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>' +
  '<li>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</li>' +
  '</ul>' +
  '<hr />' +
  '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>' +
  '<h3>Iterables</h3>' +
  '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit<br /></p>' +
  `<code id="A2">(1..3, "a".."z") | map (n, c) => (c, n * n)<br /></code>` +
  '<table>' +
  '<tr><td>td</td><td>td</td></tr>' +
  '<tr><td>td</td><td>td</td></tr>' +
  '</table>' +
  '<p><br /></p>';

const interpreterExamples =
  '<h3>Interpreter</h3>' +
  '<p>Lorem ipsum dolor sit amet, <code class="inline">consectetur</code> adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>' +
  '<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>' +
  `<code id="A1">incrementIndex = index => index + 1
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

  interpret source<br /></code>` +
  '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>';

function App() {
  return (
    <View horizontal className="App">
      <View padding="small" fillColor="gray-1" style={{ minWidth: 256 }}>
        <Spacer size="small" />
        <Text fontSize="medium" fontWeight="semi-bold" style={{ marginLeft: 8 }}>Basic Kopi Examples</Text>
        <Spacer size="medium" />
        <View padding="small" fillColor="gray-3" style={{ padding: '8px 16px', borderRadius: 4 }}>
          <Text fontWeight="semi-bold">Heading 1</Text>
        </View>
        <View padding="small" style={{ padding: '8px 16px', borderRadius: 4 }}>
          <Text fontWeight="semi-bold">Heading 2</Text>
        </View>
        <View padding="small" style={{ padding: '8px 16px', borderRadius: 4 }}>
          <Text fontWeight="semi-bold">Heading 3</Text>
        </View>
      </View>
      <Divider />
      <Stack horizontal divider style={{ overflowX: 'auto', scrollSnapType: 'x mandatory' }}>
        <Editor html={basicKopiExamples} />
        <Editor html={interpreterExamples} />
      </Stack>
    </View>
  );
}

export default App;
