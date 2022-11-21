import { Context, KopiValue, KopiCollection, KopiTrait } from "../../shared";
import { KopiBoolean, KopiFunction, KopiNumber, KopiTuple, KopiArray, KopiStream, KopiDict } from '../../terminals/classes';
import { KopiStream2 } from "../../terminals/classes/KopiStream";

abstract class KopiIterable extends KopiTrait {
  // static emptyValue() { return new KopiValue(); };
  abstract [Symbol.asyncIterator](): AsyncIterator<KopiValue>;

  async toArray() {
    const values: Promise<KopiValue>[] = [];

    const iter = this[Symbol.asyncIterator]();
    let result = iter.next();

    while (!(await result).done) {
      values.push((await result).value);

      result = iter.next();
    }

    return new KopiArray(values);
  }

  async toDict() {
    const values: [key: KopiValue, value: Promise<KopiValue>][] = [];

    for await (const tuple of this) {
      const fields = tuple.fields;

      if (fields[0] && fields[1]) {
        values.push([await fields[0], fields[1]]);
      }
    }

    return new KopiDict(values);
  }

  //

  async reduce(func: KopiFunction, context: Context): Promise<KopiValue> {
    let accum: Promise<KopiValue> = Promise.resolve(KopiTuple.empty);

    const iter = this[Symbol.asyncIterator]();
    let result = iter.next();

    while (!(await result).done) {
      accum = func.apply(KopiTuple.empty, [new KopiTuple([accum, (await result).value]), context]);

      result = iter.next();
    }

    return accum;
  }

  async each(func: KopiFunction, context: Context): Promise<KopiValue> {
    for await (const value of this) {
      func.apply(KopiTuple.empty, [value, context]);
    }

    return KopiTuple.empty;
  }

  async map(func: KopiFunction, context: Context): Promise<KopiStream> {
    const generator = async function* (this: KopiIterable) {
      for await (const value of this) {
        yield func.apply(KopiTuple.empty, [value, context]);
      }
    }.apply(this);

    return new KopiStream(generator);
  }

  // async map2(func: KopiFunction, context: Context): Promise<InstanceType<ReturnType<typeof KopiStream2>>> {
  //   const generator = async function* (this: KopiIterable) {
  //     for await (const value of this) {
  //       yield func.apply(KopiTuple.empty, [value, context]);
  //     }
  //   }.apply(this);

  //   return new (KopiStream2(KopiIterable.emptyValue() as unknown as KopiCollection))(generator);
  // }

  async flatMap(func: KopiFunction, context: Context): Promise<KopiStream> {
    const generator = async function* (this: KopiIterable) {
      for await (const value of this) {
        yield* (await func.apply(KopiTuple.empty, [value, context]) as KopiStream);
      }
    }.apply(this);

    return new KopiStream(generator);
  }

  async filter(func: KopiFunction, context: Context): Promise<KopiStream> {
    const generator = async function* (this: KopiIterable) {
      for await (const value of this) {
        if ((await func.apply(KopiTuple.empty, [value, context]) as KopiBoolean).value) {
          yield value;
        }
      }
    }.apply(this);

    return new KopiStream(generator);
  }

  //

  async find(func: KopiFunction, context: Context): Promise<KopiValue> {
    for await (const value of this) {
      if ((await func.apply(KopiTuple.empty, [value, context]) as KopiBoolean).value) {
        return value;
      }
    }

    return KopiTuple.empty;
  }

  async includes(value: KopiValue, context: Context): Promise<KopiBoolean> {
    for await (const _value of this) {
      if (((value as any)['=='].apply(value, [await _value, context]) as KopiBoolean).value) {
        return new KopiBoolean(true);
      }
    }

    return new KopiBoolean(false);
  }

  async count(func: KopiFunction, context: Context): Promise<KopiNumber> {
    var count = 0;

    const iter = this[Symbol.asyncIterator]();
    let result = iter.next();

    while (!(await result).done) {
      if ((await func.apply(KopiTuple.empty, [(await result).value, context]) as KopiBoolean).value) {
        count += 1;
      }

      result = iter.next();
    }

    return new KopiNumber(count);
  }

  take(count: KopiNumber) {
    let index = 0;

    const generator = async function* (this: KopiIterable) {
      for await (const value of this) {
        if (index++ < count.value) {
          yield value;
        } else {
          break;
        }
      }
    }.apply(this);

    return new KopiStream(generator);
  }

  skip(count: KopiNumber) {
    let index = 0;

    const generator = async function* (this: KopiIterable) {
      for await (const value of this) {
        if (!(index++ < count.value)) {
          yield value;
        }
      }
    }.apply(this);

    return new KopiStream(generator);
  }

  async some(func: KopiFunction, context: Context): Promise<KopiBoolean> {
    for await (const value of this) {
      if ((await func.apply(KopiTuple.empty, [value, context]) as KopiBoolean).value) {
        return new KopiBoolean(true);
      }
    }

    return new KopiBoolean(false);
  }

  async every(func: KopiFunction, context: Context): Promise<KopiBoolean> {
    for await (const value of this) {
      if (!(await func.apply(KopiTuple.empty, [value, context]) as KopiBoolean).value) {
        return new KopiBoolean(false);
      }
    }

    return new KopiBoolean(true);
  }

  async cycle() {
    const values = await this.toArray();

    const generator = async function* (this: KopiIterable) {
      while (true) {
        for await (const value of values) {
          yield value;
        }
      }
    }.apply(this);

    return new KopiStream(generator);
  }

  async splitEvery(count: KopiNumber) {
    const constructorTraits = (this.constructor as typeof KopiValue).traits;

    if (!constructorTraits.includes(KopiCollection)) {
      throw new Error(`KopiIterable.splitEvery(): 'this' value '${await (this as unknown as KopiValue).inspect()}' of type '${(this as unknown as KopiValue).constructor.name}' does not conform to trait 'KopiCollection'\n  Trait 'KopiCollection' implements methods 'static emptyValue()' and 'append()'`);
    }

    let values: KopiValue = (this.constructor as typeof KopiCollection).emptyValue();
    let index = 0;
    let length = 0;

    const generator = async function* (this: KopiIterable) {
      const iter = this[Symbol.asyncIterator]();
      let result = iter.next();

      while (!(await result).done) {
        if (length > 0 && index % count.value === 0) {
          yield values;

          values = (this.constructor as typeof KopiCollection).emptyValue();
          length = 0;
        }

        values = await (values as unknown as KopiCollection).append((await result).value);

        ++index;
        ++length;

        result = iter.next();
      }

      if (length !== 0) {
        yield values;
      }
    }.apply(this);

    return new KopiStream(generator);
  }

}

export default KopiIterable;
