var utils = require("utils"),
    type = require("type"),
    validations = require("./validations");


var rules = module.exports;


rules.type = function(str, typeStr) {
    var rule = rules[typeStr];
    return rule && type.isFunction(rule) ? rule(str) : false;
};

rules.empty = utils.isEmpty;

rules.not_empty = rules.notempty = rules.notEmpty = function(obj) {
    if (!obj && obj !== 0) {
        obj = "";
    } else if (typeof(obj.toString) !== "undefined") {
        obj = obj.toString();
    } else {
        obj = "" + obj;
    }

    return !validations.isNull(obj);
};

rules.required = function(obj) {
    if (!obj && obj !== 0) {
        obj = "";
    } else if (typeof(obj.toString) !== "undefined") {
        obj = obj.toString();
    } else {
        obj = "" + obj;
    }

    return !validations.isNull(obj);
};

rules["undefined"] = type.isUndefined;

rules.object = type.isObject;

rules.json = function(obj) {
    if (obj === undefined || obj === null) return false;
    try {
        JSON.stringify(obj);
    } catch (e) {
        return false;
    }
    return true;
};

rules.text = type.isString;

rules.string = type.isString;

rules.alpha = validations.isAlpha;

rules.alpha_dashed = rules.alphadashed = rules.alphaDashed = validations.isAlphaDashed;

rules.numeric = validations.isNumeric;

rules.alpha_numeric = rules.alphanumeric = rules.alphaNumeric = validations.isAlphaNumeric;

rules.alpha_numeric_dashed = rules.alphanumericdashed = rules.alphaNumericDashed = validations.isAlphaNumericDashed;

rules.email = validations.isEmail;

rules.url = validations.isURL;

rules.urlish = validations.isURLish;

rules.ip = validations.isIP;

rules.ipv4 = validations.isIPv4;

rules.ipv6 = validations.isIPv6;

rules.credit_card = rules.creditcard = rules.creditCard = validations.isCreditCard;

rules.uuid = validations.isUUID;

rules.uuidv3 = function(obj) {
    return validations.isUUID(obj, 3);
};

rules.uuidv4 = function(obj) {
    return validations.isUUID(obj, 4);
};

rules["int"] = validations.isInt;

rules.integer = validations.isInt;

rules.number = type.isNumber;

rules.finite = type.isFinite;

rules.decimal = validations.isFloat;

rules["float"] = validations.isFloat;

rules.falsey = function(obj) {
    return !obj;
};

rules.truthy = function(obj) {
    return !!obj;
};

rules["null"] = type.isNull;

rules.not_null = rules.notnull = rules.notNull = function(obj) {
    return !validations.isNull(obj);
};

rules.bool = rules["boolean"] = type.isBoolean;

rules.array = type.isArray;

rules.binary = function(obj) {
    return Buffer.isBuffer(obj) || type.isString(obj);
};

rules.date = validations.isDate;

rules.date_time = rules.datetime = validations.isDate;

rules.hexa_decimal = rules.hexadecimal = validations.isHexadecimal;

rules.hex_color = rules.hexcolor = validations.isHexColor;

rules.lowercase = validations.isLowercase;

rules.uppercase = validations.isUppercase;

rules.after = validations.isAfter;

rules.before = validations.isBefore;

rules.equals = validations.equals;

rules.contains = validations.contains;

rules.not_contains = rules.notcontains = rules.notContains = function(obj, str) {
    return !validations.contains(obj, str);
};

rules.length = rules.len = function(obj, min, max) {
    obj = validations.toString(obj);
    return obj.length >= min && (max != null ? obj.length <= max : true);
};

rules["in"] = validations.isIn;

rules.not_in = rules.notIn = function(str, options) {
    return !validations.isIn(str, options);
};

rules.max = function(str, num) {
    var number = parseFloat(str);
    return isNaN(number) || number <= num;
};

rules.min = function(str, num) {
    var number = parseFloat(str);
    return isNaN(number) || number >= num;
};

rules.greater_than = rules.greaterthan = rules.greaterThan = function(str, num) {
    var number = parseFloat(str);
    return isNaN(number) || number > num;
};

rules.less_than = rules.lessthan = rules.lessThan = function(str, num) {
    var number = parseFloat(str);
    return isNaN(number) || number < num;
};

rules.max_length = rules.maxlength = rules.maxLength = function(str, max) {
    return validations.isLength(str, 0, max);
};

rules.min_length = rules.minlength = rules.minLength = function(str, min) {
    return validations.isLength(str, min);
};

rules.regex = function(str, regex) {
    return validations.matches(str, regex);
};

rules.not_regex = rules.notregex = rules.notRegex = function(str, regex) {
    return !validations.matches(str, regex);
};
