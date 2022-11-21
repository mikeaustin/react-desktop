import { addTraits, KopiValue, KopiCollection, Context } from "../../shared";

import KopiNumber from './KopiNumber';

import KopiIterable from '../../operators/traits/KopiIterable';
import KopiBoolean from "./KopiBoolean";
import { KopiRange } from "../../operators/classes";

class KopiArray extends KopiValue {
  static emptyValue = () => new KopiArray([]);

  elements: Promise<KopiValue>[];

  constructor(elements: Promise<KopiValue>[]) {
    super();

    this.elements = elements;
  }

  override async inspect() {
    const elements = await Promise.all(
      this.elements.map(async element => (await element).inspect())
    );

    return `[${elements.join(', ')}]`;
  }

  override async toJS() {
    return Promise.all(
      this.elements.map(async element => (await element).toJS())
    );
  }

  size() {
    return new KopiNumber(this.elements.length);
  }

  has(index: KopiNumber) {
    return new KopiBoolean(index.value >= 0 && index.value < this.elements.length);
  }

  // TODO: Can't be done with this.elements.includes() since Array stores promises
  // includes(value: KopiValue) {
  //   return new KopiBoolean(false);
  // }

  // TODO: Don't resolve promises for arguments, since they may not need to be
  // Or, pass in values via a tuple or array to keep their promise
  set(index: KopiValue) {
    return (value: KopiValue) => {
      if (index instanceof KopiRange) {
        const elements = [...this.elements];

        const deleteCount = (index.to as KopiNumber).value - (index.from as KopiNumber).value + 1;
        elements.splice((index.from as KopiNumber).value, deleteCount, Promise.resolve(value));

        return new KopiArray(elements);
      } else if (index instanceof KopiNumber) {
        const elements = [...this.elements];

        elements[index.value] = Promise.resolve(value);

        return new KopiArray(elements);
      }
    };
  }

  async '=='(that: KopiArray, context: Context): Promise<KopiBoolean> {
    if (that.elements.length !== this.elements.length) {
      return new KopiBoolean(false);
    }

    for (const [index, thatValue] of that.elements.entries()) {
      const thisValue = this.elements[index];

      if (thisValue === undefined) {
        return new KopiBoolean(false);
      }

      if (!(await (await thatValue).invoke('==', [await thisValue, context]) as KopiBoolean).value) {
        return new KopiBoolean(false);
      }
    }

    return new KopiBoolean(true);
  }

  *iterator() {
    for (const value of this.elements) {
      yield value;
    }
  }

  // TODO: This is not really async, but useful when you don't care about the value
  *[Symbol.asyncIterator]() {
    for (const value of this.elements) {
      yield value;
    }
  }

  append(that: KopiValue) {
    return new KopiArray(this.elements.concat([Promise.resolve(that)]));
  }
}

addTraits([KopiIterable, KopiCollection], KopiArray);

export default KopiArray;
