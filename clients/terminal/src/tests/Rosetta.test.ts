import { interpret } from '../compiler';

import { KopiNumber, KopiString, KopiArray, KopiTuple } from '../modules/terminals/classes';

describe('Rosetta Code', () => {

  test('FizzBuzz', async () => {
    let array = await interpret(`
      fizzBuzz (n) = 1..n | map (n) => match (n % 3, n % 5) (
        (0, 0) => "FizzBuzz"
        (0, _) => "Fizz"
        (_, 0) => "Buzz"
        _      => n
      ) | toArray

      fizzBuzz 15
    `) as KopiArray;

    expect(await Promise.all(array.elements)).toEqual([
      new KopiNumber(1),
      new KopiNumber(2),
      new KopiString('Fizz'),
      new KopiNumber(4),
      new KopiString('Buzz'),
      new KopiString('Fizz'),
      new KopiNumber(7),
      new KopiNumber(8),
      new KopiString('Fizz'),
      new KopiString('Buzz'),
      new KopiNumber(11),
      new KopiString('Fizz'),
      new KopiNumber(13),
      new KopiNumber(14),
      new KopiString('FizzBuzz'),
    ]);
  });

  test('Calculating E', async () => {
    var tuple = await interpret(`
      e1 = 1..20 | reduce ((e = 1, f = 1), i) =>
        let (f = f * i) => (e + 1 / f, f)

      e2 = let (i = 1, f = 1, e = 1) => {
        f = f * i
        e = e + 1 / f

        match i (
          20 => e
          _  => loop (i + 1, f, e)
        )
      }

      factorial (n) = match n (
        0 => 1
        n => n * factorial (n - 1)
      )

      e3 = 0..20 | map (n) => 1 / factorial n | sum

      factorial = let (
        cache = [1] ++ (1..20 | scan (n = 1, i) => n * i | toArray)
      ) => {
        (n) => cache.(n)
      }

      e4 = 0..20 | map (i) => 1 / factorial i | sum

      (e1.0, e2, e3, e4)
    `) as KopiTuple;

    const fields = await Promise.all(tuple.fields) as [KopiNumber, KopiNumber, KopiNumber, KopiNumber];

    expect(fields[0].value).toBeCloseTo(2.7182818284590455);
    expect(fields[1].value).toBeCloseTo(2.7182818284590455);
    expect(fields[2].value).toBeCloseTo(2.7182818284590455);
    expect(fields[3].value).toBeCloseTo(2.7182818284590455);
  });

});
