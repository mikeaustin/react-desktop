import { RawASTNode, ASTNode, Environment } from '../shared';
import { KopiNumber, KopiBoolean } from './classes';

class NumericLiteral extends ASTNode {
  constructor({ value, location }: NumericLiteral) {
    super(location);

    this.value = value;
  }

  value: number;
}

class BooleanLiteral extends ASTNode {
  constructor({ value, location }: BooleanLiteral) {
    super(location);

    this.value = value;
  }

  value: boolean;
}

class Identifier extends ASTNode {
  constructor({ name, location }: Identifier) {
    super(location);

    this.name = name;
  }

  name: string;
}

//

const transform = (rawAstNode: RawASTNode) => {
  switch (rawAstNode.type) {
    case 'NumericLiteral':
      return new NumericLiteral({
        value: rawAstNode.value,
        location: rawAstNode.location,
      } as NumericLiteral);
    case 'BooleanLiteral':
      return new BooleanLiteral({
        value: rawAstNode.value,
        location: rawAstNode.location,
      } as BooleanLiteral);
    case 'Identifier':
      return new Identifier({
        name: rawAstNode.name,
        location: rawAstNode.location,
      } as Identifier);
  }

  throw new Error(`No transform found for '${rawAstNode.type}'`);
};

const evaluate = (astNode: ASTNode, environment: Environment) => {
  if (astNode instanceof NumericLiteral) {
    return new KopiNumber(astNode.value);
  } else if (astNode instanceof BooleanLiteral) {
    return new KopiBoolean(astNode.value);
  } else if (astNode instanceof Identifier) {
    if (!(astNode.name in environment)) {
      throw new Error(`Variable '${astNode.name}' not found in current scope`);
    }

    return environment[astNode.name];
  } else {
    throw new Error(`No visitor found for '${astNode.constructor.name}'`);
  }
};

export {
  transform,
  evaluate,
  NumericLiteral,
  BooleanLiteral,
  KopiNumber,
};
