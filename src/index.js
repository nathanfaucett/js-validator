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


validator.matchRule = function(ruleName, data) {
    var rule = rules[ruleName],
        value, length, args;

    if (!rule) return new RuleError(ruleName);

    if ((length = arguments.length) > 2) {
        if (length === 3) {
            value = rule.call(rules, arguments[1], arguments[2]);
        } else if (length === 4) {
            value = rule.call(rules, arguments[1], arguments[2], arguments[3]);
        } else if (length === 5) {
            value = rule.call(rules, arguments[1], arguments[2], arguments[3], arguments[4]);
        } else {
            args = slice.call(arguments, 1);
            value = rule.apply(rules, args);
        }
    } else {
        value = rule(data);
    }

    if (!value) {
        return new RuleError(ruleName, "validation rule failed");
    }

    return null;
};

validator.match = function(ruleSet, data) {
    var errors = [],
        rules, args,
        obj;

    for (var name in data) {
        rules = ruleSet[name];
        obj = data[name];

        if (!rules || !obj) continue;

        for (var ruleName in rules) {
            if (ruleName === "type") ruleName = rules[ruleName];

            args = rules[ruleName];
            args = utils.isArray(args) ? args : [args];
            args.unshift(errors, ruleName, obj);

            matchType.apply(null, args);
        }
    }

    return errors;
};

function matchType(errors, ruleName, data) {
    var rule = rules[ruleName],
        value, args;

    if (rule) {
        args = slice.call(arguments, 1);
        value = validator.matchRule.apply(validator, args);

        if (value) errors.push(value);
    } else {
        errors.push(new RuleError(ruleName));
    }

    return errors;
};
