import { interpret } from '../compiler';

import { KopiArray, KopiBoolean, KopiString } from '../modules/terminals/classes';

test('Testing', async () => {
  var string = await interpret(`
    "foo" ++ "bar"
  `) as KopiString;

  expect(string).toEqual(new KopiString('foobar'));

  var string = await interpret(`
    1..3 | map '(toFixed 2) | toArray
  `) as KopiString;

  expect(string).toEqual(new KopiArray([
    new KopiString('1.00'),
    new KopiString('2.00'),
    new KopiString('3.00'),
  ]));

  var boolean = await interpret(`
    (1, "2", [true, 'bar, 1..5]) == (1, "2", [true, 'bar, 1..5])
  `) as KopiString;

  expect(boolean).toEqual(new KopiBoolean(true));

  var boolean = await interpret(`
    (1, 2) == (1, 3)
  `) as KopiString;

  expect(boolean).toEqual(new KopiBoolean(false));

  var string = await interpret(`
    extend String (
      capitalize2: (n) => 'toUpperCase this.(0..1) ++ this.(1..3)
      capitalize3: (n) => 'toUpperCase (this 0..1) ++ (this 1..3)
    )

    "foo" | capitalize3
  `) as KopiString;

  expect(string).toEqual(new KopiString('Foo'));

  var array = await interpret(`
    [1, 2, 3] | get 1..3
  `) as KopiString;


  // var object = await interpret(`
  //   timer () | map (n) => n / 1000 | take 3 | each (n) => {
  //     print n
  //   }
  // `) as KopiStream;

  // var string = await interpret(`
  //   o = Observer 5

  //   oo = o | map (n) => {
  //     print "here"
  //     sleep 0.1
  //   }

  //   print "zzz 1"

  //   oo | take 2 | each (n) => print n

  //   print "zzz 2"

  //   o | set 10
  //   o | set 10
  // `) as KopiString;
});
