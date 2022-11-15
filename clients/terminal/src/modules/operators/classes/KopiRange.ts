import { KopiValue, Trait } from "../../shared";
import { Applicative, Enumerable, Comparable } from "../../shared";

import { KopiNumber } from '../../terminals/classes';

import KopiIterable from '../traits/KopiIterable';

const assertTrait = async (value: KopiValue, variableName: string, traits: Function[], errors: string[]) => {
  for (const trait of traits) {
    const constructorTraits = (value.constructor as typeof KopiValue).traits;

    if (!constructorTraits.includes(trait)) {
      errors.push(`'${variableName}' value '${await value.inspect()}' is missing trait '${trait.constructor.name}'`);
    }
  }
};

class KopiRange extends KopiValue {
  static override traits = [Applicative];

  constructor(from: Promise<KopiValue>, to: Promise<KopiValue>, stride?: Promise<KopiNumber>) {
    super();

    this.from = from;
    this.to = to;
    this.stride = stride ?? Promise.resolve(new KopiNumber(1));
  }

  override async inspect() {
    return `${await (await this.from).inspect()}..${await (await this.to).inspect()}`;
  }

  async apply(thisArg: KopiValue, [by]: [KopiNumber]) {
    return new KopiRange(this.from, this.to, Promise.resolve(by));
  }

  async *[Symbol.asyncIterator]() {
    const [from, _to] = [await this.from, await this.to];
    // const op = from > to ? '>=' : '<=';

    let errors: string[] = [];

    assertTrait(from, 'from', [Enumerable, Comparable], errors);
    assertTrait(_to, 'to', [Enumerable, Comparable], errors);

    if (errors.length > 0) {
      throw new Error(`Range.iterator(): 'from' or 'to' values are missing traits:\n${errors.join('\n')}`);
    }

    const to = (_to as unknown as Enumerable).succ(await this.stride);

    for (
      let current = from;
      ((current as unknown as Comparable).compare.apply(current, [to]) as KopiNumber).value < 0;
      // ((current as unknown as Comparable)['<'].apply(new KopiTuple([]), [to]) as KopiBoolean).value;
      current = (current as unknown as Enumerable).succ(await this.stride)
    ) {
      yield current;
    }
  }

  from: Promise<KopiValue>;
  to: Promise<KopiValue>;
  stride: Promise<KopiNumber>;
}

for (const name of Object.getOwnPropertyNames(KopiIterable.prototype)) {
  if (name !== 'constructor') {
    (KopiRange.prototype as any)[name] = (KopiIterable.prototype as any)[name];
  }
}

export default KopiRange;
