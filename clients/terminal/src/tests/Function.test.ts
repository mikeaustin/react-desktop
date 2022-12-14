import { interpret } from '../compiler';

import { KopiNumber } from '../modules/terminals/classes';

test('Factorial', async () => {
  let number = await interpret(`
    fix = f => (x => f (y => x x y)) x => f (y => x x y)

    factorial = fix factorial => n => match n (
      0 => 1
      n => n * factorial (n - 1)
    )

    factorial 5
  `) as KopiNumber;

  expect(number.value).toEqual(120);

  number = await interpret(`
    factorial (n) = match n (
      0 => 1
      n => n * factorial (n - 1)
    )

    factorial 5
  `) as KopiNumber;

  expect(number.value).toEqual(120);

  number = await interpret(`
    factorial (n) = let (i = 1, accum = 1) => {
      match (i > n) (
        true => accum
        _    => loop (i + 1, accum * i)
      )
    }

    factorial 5
  `) as KopiNumber;

  expect(number.value).toEqual(120);
});
