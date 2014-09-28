var type = require("type"),
    rules = require("./rules"),
    validations = require("./validations");


var validator = module.exports,
    slice = Array.prototype.slice;


validator.rules = rules;
validator.validations = validations;


validator.match = function(ruleName, data, args) {
    var rule = rules[ruleName],
        value, length;

    if (!rule) throw new Error("validator.match(ruleName, data, args) no ruled defined named " + ruleName);

    if (arguments.length > 2) {
        if (type.isArray(args)) {
            args = args.slice();
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
        value = rules[ruleName](data);
    }

    if (!value) {
        return {
            rule: ruleName,
            data: data,
            args: args ? args.slice(1) : null
        };
    }

    return null;
};
