var utils = require("utils"),
    rules = require("./rules"),
    validations = require("./validations");


var validator = module.exports,
    slice = Array.prototype.slice;


function RuleError(rule, message) {

    Error.call(this);

    this.name = rule;
    this.message = rule + ": " + (message || "Unknown rule");
    Error.captureStackTrace(this, this.constructor);

    return this;
}
RuleError.prototype = Object.create(Error.prototype);
RuleError.prototype.constructor = RuleError;


validator.rules = rules;
validator.validations = validations;
validator.RuleError = RuleError;


validator.match = function(ruleName, data, args) {
    var rule = rules[ruleName],
        value, length;

    if (!rule) return new RuleError(ruleName);

    if (arguments.length > 2) {
        if (utils.isArray(args)) {
            args.unshift(data);
        } else {
            args = slice.call(arguments, 1);
        }
        length = args.length;

        if (length === 2) {
            value = rule.call(rules, args[0], args[1]);
        } else if (length === 3) {
            value = rule.call(rules, args[0], args[1], args[2]);
        } else if (length === 4) {
            value = rule.call(rules, args[0], args[1], args[2], args[3]);
        } else {
            value = rule.apply(rules, args);
        }
    } else {
        value = rule(data);
    }

    if (!value) return new RuleError(ruleName, "validation rule failed");

    return null;
};
