"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.evaluate = exports.transform = void 0;
var shared_1 = require("../shared");
var classes_1 = require("../terminals/classes");
var OperatorExpression = /** @class */ (function (_super) {
    __extends(OperatorExpression, _super);
    function OperatorExpression(_a) {
        var operator = _a.operator, leftExpression = _a.leftExpression, rightExpression = _a.rightExpression, location = _a.location;
        var _this = _super.call(this, location) || this;
        _this.operator = operator;
        _this.leftExpression = leftExpression;
        _this.rightExpression = rightExpression;
        return _this;
    }
    return OperatorExpression;
}(shared_1.ASTNode));
var TupleExpression = /** @class */ (function (_super) {
    __extends(TupleExpression, _super);
    function TupleExpression(_a) {
        var elements = _a.elements, location = _a.location;
        var _this = _super.call(this, location) || this;
        _this.elements = elements;
        return _this;
    }
    return TupleExpression;
}(shared_1.ASTNode));
var ApplyExpression = /** @class */ (function (_super) {
    __extends(ApplyExpression, _super);
    function ApplyExpression(_a) {
        var expression = _a.expression, argument = _a.argument, location = _a.location;
        var _this = _super.call(this, location) || this;
        _this.expression = expression;
        _this.argument = argument;
        return _this;
    }
    return ApplyExpression;
}(shared_1.ASTNode));
var FunctionExpression = /** @class */ (function (_super) {
    __extends(FunctionExpression, _super);
    function FunctionExpression(_a) {
        var parameters = _a.parameters, bodyExpression = _a.bodyExpression, location = _a.location;
        var _this = _super.call(this, location) || this;
        _this.parameters = parameters;
        _this.bodyExpression = bodyExpression;
        return _this;
    }
    return FunctionExpression;
}(shared_1.ASTNode));
var transform = function (next, transform) { return function (rawAstNode) {
    switch (rawAstNode.type) {
        case 'OperatorExpression':
            return new OperatorExpression({
                operator: rawAstNode.operator,
                leftExpression: transform(rawAstNode.leftExpression),
                rightExpression: transform(rawAstNode.rightExpression),
                location: rawAstNode.location
            });
        case 'FunctionExpression':
            return new FunctionExpression({
                parameters: rawAstNode.parameters,
                bodyExpression: transform(rawAstNode.bodyExpression),
                location: rawAstNode.location
            });
        case 'TupleExpression':
            return new TupleExpression({
                elements: rawAstNode.elements.map(function (element) { return transform(element); }),
                location: rawAstNode.location
            });
        case 'ApplyExpression':
            return new ApplyExpression({
                expression: transform(rawAstNode.expression),
                argument: transform(rawAstNode.argument),
                location: rawAstNode.location
            });
        default:
            return next(rawAstNode);
    }
}; };
exports.transform = transform;
var evaluate = function (next, evaluate) {
    return function (astNode, environment) {
        if (astNode instanceof OperatorExpression) {
            var leftValue = evaluate(astNode.leftExpression, environment);
            var rightValue = evaluate(astNode.rightExpression, environment);
            if (astNode.operator in leftValue) {
                return leftValue[astNode.operator](rightValue);
            }
            else {
                throw new Error("".concat(leftValue, " doesn't have a method '").concat(astNode.operator, "'"));
            }
        }
        else if (astNode instanceof TupleExpression) {
            return new classes_1.KopiTuple(astNode.elements.map(function (element) { return evaluate(element, environment); }));
        }
        else if (astNode instanceof FunctionExpression) {
            return new classes_1.KopiFunction(astNode.parameters, astNode.bodyExpression, environment);
        }
        else if (astNode instanceof ApplyExpression) {
            var func = evaluate(astNode.expression, environment);
            if ('apply' in func) {
                return func
                    .apply(undefined, [evaluate(astNode.argument, environment)], evaluate);
            }
            else {
                throw new Error("No apply() method found");
            }
        }
        else {
            return next(astNode, environment);
        }
    };
};
exports.evaluate = evaluate;
