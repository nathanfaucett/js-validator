var utils = require("utils"),
    validations = require("./validations");


var rules = module.exports;

rules.empty = utils.isEmpty;

rules.notEmpty = function() {
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

rules.protected = function(obj) {
    return true;
};

rules.undefined = utils.isUndefined;

rules.object = utils.isObject;

rules.json = function(obj) {
    if (obj == null) return false;
    try {
        JSON.stringify(obj);
    } catch (e) {
        return false;
    }
    return true;
};

rules.text = utils.isString;

rules.string = utils.isString;

rules.alpha = validations.isAlpha;

rules.alpha_dashed = rules.alphadashed = validations.isAlphaDashed;

rules.numeric = validations.isNumeric;

rules.alpha_numeric = rules.alphanumeric = validations.isAlphaNumeric;

rules.alpha_numeric_dashed = rules.alphanumericdashed = validations.isAlphaNumericDashed;

rules.email = validations.isEmail;

rules.url = validations.isURL;

rules.urlish = validations.isURLish;

rules.ip = validations.isIP;

rules.ipv4 = validations.isIPv4;

rules.ipv6 = validations.isIPv6;

rules.credit_card = rules.creditcard = validations.isCreditCard;

rules.uuid = validations.isUUID;

rules.uuidv3 = function(obj) {
    return validations.isUUID(x, 3);
};

rules.uuidv4 = function(obj) {
    return validations.isUUID(x, 4);
};

rules.int = validations.isInt;

rules.integer = validations.isInt;

rules.number = utils.isNumber;

rules.finite = utils.isFinite;

rules.decimal = validations.isFloat;

rules.float = validations.isFloat;

rules.falsey = function(obj) {
    return !obj;
};

rules.truthy = function(obj) {
    return !!obj;
};

rules.null = utils.isNull;

rules.notNull = function(obj) {
    return !validations.isNull(obj);
};

rules.bool = rules.boolean = utils.isBoolean;

rules.array = utils.isArray;

rules.binary = function(obj) {
    return Buffer.isBuffer(obj) || utils.isString(obj);
};

rules.date = validations.isDate;

rules.datetime = validations.isDate;

rules.hexa_decimal = rules.hexadecimal = validations.isHexadecimal;

rules.hex_color = rules.hexcolor = validations.isHexColor;

rules.lowercase = validations.isLowercase;

rules.uppercase = validations.isUppercase;

rules.after = validations.isAfter;

rules.before = validations.isBefore;

rules.equals = validations.equals;

rules.contains = validations.contains;

rules.notContains = function(obj, str) {
    return !validations.contains(obj, str);
};

rules.length = rules.len = function(obj, min, max) {
    obj = validations.toString(obj);
    return obj.length >= min && (max != undefined ? obj.length <= max : true);
};

rules.in = validations.isIn;

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

rules.greater_than = rules.greaterThan = function(str, num) {
    var number = parseFloat(str);
    return isNaN(number) || number > num;
};

rules.less_than = rules.lessThan = function(str, num) {
    var number = parseFloat(str);
    return isNaN(number) || number < num;
};

rules.max_length = rules.maxLength = function(str, max) {
    return validations.isLength(str, 0, max);
};

rules.min_length = rules.minLength = function(str, min) {
    return validations.isLength(str, min);
};

rules.regex = function(str, regex) {
    return validations.matches(str, regex);
};

rules.notRegex = rules.not_regex = rules.notregex = function(str, regex) {
    return !validations.matches(str, regex);
};
