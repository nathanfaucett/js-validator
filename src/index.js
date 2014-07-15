var utils = require("utils"),
    rules = require("./rules");


var validator = module.exports,
    slice = Array.prototype.slice;


validator.toString = function(obj) {
    if (typeof(obj) === "object" && obj !== null && obj.toString) {
        obj = obj.toString();
    } else if (obj === null || typeof(obj) === "undefined" || (isNaN(obj) && !obj.length)) {
        obj = "";
    } else if (typeof(obj) !== "string") {
        obj += "";
    }

    return obj;
};

validator.toDate = function(date) {
    if (utils.isDate(date)) return data;
    date = Date.parse(date);
    return !isNaN(date) ? new Date(date) : null;
};

validator.toFloat = function(str) {
    return +str;
};

validator.toInt = function(str, radix) {
    return parseInt(str, radix || 10);
};

validator.toBoolean = function(str, strict) {
    if (strict) return str === "1" || str === "true";
    return str !== "0" && str !== "false" && str !== "";
};

validator.validate = function(ruleName, str) {
    var rule = rules[ruleName],
        value;

    if (!rule) throw new Error("validator.validate(ruleName, str[, ruleArgs...])");

    if (arguments.length > 2) {
        args = slice.call(arguments, 1);
        value = rule.apply(rules, args);
    } else {
        value = rule(str);
    }

    return value;
};

validator.rules = rules;
