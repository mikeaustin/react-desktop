import { KopiValue } from "../../shared";
import { Numeric, Equatable, Enumerable } from "../../shared";
import Comparable from '../../operators/traits/KopiComparable';

import KopiString from './KopiString';
import KopiBoolean from './KopiBoolean';
import KopiTuple from './KopiTuple';

class KopiNumber extends KopiValue {
  static override traits = [Numeric, Equatable, Enumerable, Comparable];

  constructor(value: number) {
    super();

    this.value = value;
  }

  // Core methods

  override valueOf() {
    return this.value;
  }

  override async inspect() {
    return `${this.value}`;
  }

  // Numeric methods

  '+'(that: KopiNumber) {
    return new KopiNumber(this.value + that.value);
  }

  '-'(that: KopiNumber) {
    return new KopiNumber(this.value - that.value);
  }

  '*'(that: KopiNumber) {
    return new KopiNumber(this.value * that.value);
  }

  '/'(that: KopiNumber) {
    return new KopiNumber(this.value / that.value);
  }

  '%'(that: KopiNumber) {
    return new KopiNumber(this.value % that.value);
  }

  negate() {
    return new KopiNumber(-this.value);
  }

  // Enumerable methods

  succ(count: KopiNumber) {
    if (count instanceof KopiTuple && count.fields.length === 0) {
      count = new KopiNumber(1);
    }

    return new KopiNumber(this.value + count.value);
  }

  // Comparable methods

  compare(that: KopiNumber) {
    if (this.value < that.value) {
      return new KopiNumber(-1);
    } else if (this.value > that.value) {
      return new KopiNumber(+1);
    }

    return new KopiNumber(0);
  }

  // General methods

  even(): KopiBoolean {
    return new KopiBoolean(this.value % 2 === 0);
  }

  odd(): KopiBoolean {
    return new KopiBoolean(this.value % 2 !== 0);
  }

  round() {
    return new KopiNumber(Math.round(this.value));
  }

  sin() {
    return new KopiNumber(Math.sin(this.value));
  }

  cos() {
    return new KopiNumber(Math.cos(this.value));
  }

  toFixed(digits: KopiNumber) {
    return new KopiString(this.value.toFixed(digits.value));
  }

  test(a: KopiNumber) {
    return (b: KopiNumber) => new KopiNumber((this.value + a.value) * b.value);
  }

  value: number;
}

for (const name of Object.getOwnPropertyNames(Comparable.prototype)) {
  if (name !== 'constructor') {
    (KopiNumber.prototype as any)[name] = (Comparable.prototype as any)[name];
  }
}

export default KopiNumber;
