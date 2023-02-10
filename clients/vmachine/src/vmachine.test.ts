import { render, screen } from '@testing-library/react';

describe('Jump Instructions', () => {
  const flags = [0b00, 0b01, 0b10, 0b11];

  test('JEQ', () => {
    expect(flags.map(bits => (bits & 0b10) === 0b10)).toEqual([false, false, true, true]);
    // console.log('JNE', ...flags.map(bits => (bits & 0b10) == 0b00));
    // console.log('JLT', ...flags.map(bits => (bits) == 0b00));
    // console.log('JGT', ...flags.map(bits => (bits) == 0b01));
    // console.log('JLT', ...flags.map(bits => (bits ^ 0b01) != 0b00));
    // console.log('JGT', ...flags.map(bits => (bits) != 0b00));

    // expect(linkElement).toBeInTheDocument();
  });

});
