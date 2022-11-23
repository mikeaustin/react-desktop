import * as parser from '../lib/parser';

import { transform, evaluate, environment } from '../compiler';
import { KopiArray, KopiBoolean, KopiDict, KopiNumber, KopiStream, KopiString, KopiTuple } from '../modules/terminals/classes';
import { KopiRange } from '../modules/operators/classes';

async function interpret(source: string) {
  var ast = parser.parse(source);

  return evaluate(transform(ast), environment, () => { });
}

describe('Collection', () => {
  test('get', async () => {
    var string = await interpret(`
      "foo" | get 0
    `) as KopiString;

    expect(string).toEqual(new KopiString('f'));

    var string = await interpret(`
      ["f", "o", "o"] | get 0
    `) as KopiString;

    expect(string).toEqual(new KopiString('f'));

    var string = await interpret(`
      { 0: "f", 1: "o", 2: "o" } | get 0
    `) as KopiString;

    expect(string).toEqual(new KopiString('f'));
  });

  test('set', async () => {
    var string = await interpret(`
      "abc" | set 1 "e"
    `) as KopiString;

    expect(string).toEqual(new KopiString('aec'));

    var array = await interpret(`
      ["a", "b", "c"] | set 1 "e"
    `) as KopiArray;

    expect(await Promise.all(array.elements)).toEqual([
      new KopiString('a'),
      new KopiString('e'),
      new KopiString('c'),
    ]);

    var dict = await interpret(`
      { 0: "f", 1: "o", 2: "o" } | set 1 "e"
    `) as KopiDict;

    expect(dict).toEqual(new KopiDict([
      [new KopiNumber(0), Promise.resolve(new KopiString("a"))],
      [new KopiNumber(1), Promise.resolve(new KopiString("e"))],
      [new KopiNumber(2), Promise.resolve(new KopiString("c"))],
    ]));
  });

  test('remove', async () => {
    var string = await interpret(`
      "abc" | remove 1
    `) as KopiString;

    expect(string).toEqual(new KopiString('ac'));

    var array = await interpret(`
      ["a", "b", "c"] | remove 1
    `) as KopiArray;

    expect(await Promise.all(array.elements)).toEqual([
      new KopiString('a'),
      new KopiString('c'),
    ]);

    var dict = await interpret(`
      { 0: "f", 1: "o", 2: "o" } | remove 1
    `) as KopiDict;

    expect(dict).toEqual(new KopiDict([
      [new KopiNumber(0), Promise.resolve(new KopiString("a"))],
      [new KopiNumber(2), Promise.resolve(new KopiString("c"))],
    ]));
  });
});
