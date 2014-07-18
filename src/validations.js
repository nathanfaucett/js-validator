var utils = require("utils");


var validations = module.exports,

    slice = Array.prototype.slice,
    toString = Object.prototype.toString,

    EMAIL = /^((([a-z]|\d|[!#\$%&"\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&"\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
    URLISH = /^\s([^\/]+\.)+.+\s*$/g,

    CREDIT_CARD = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,

    ISBN_10_MAYBE = /^(?:[0-9]{9}X|[0-9]{10})$/,
    ISBN_13_MAYBE = /^(?:[0-9]{13})$/,

    IPv4_MAYBE = /^(\d?\d?\d)\.(\d?\d?\d)\.(\d?\d?\d)\.(\d?\d?\d)$/,
    IPv6 = /^::|^::1|^([a-fA-F0-9]{1,4}::?){1,7}([a-fA-F0-9]{1,4})$/,

    ALPHA = /^[a-zA-Z]+$/,
    ALPHA_DASHED = /^[a-zA-Z-_]*$/,
    ALPHA_NUMERIC = /^[a-zA-Z0-9]+$/,
    ALPHA_NUMERIC_DASHED = /^[a-zA-Z0-9-_]*$/,
    NUMERIC = /^-?[0-9]+$/,
    INT = /^(?:-?(?:0|[1-9][0-9]*))$/,
    FLOAT = /^(?:-?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/,
    HEXADECIMAL = /^[0-9a-fA-F]+$/,
    HEX_COLOR = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,

    UUID = {
        "3": /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
        "4": /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
        "5": /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
        all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
    },

    ASCII = /^[\x00-\x7F]+$/,
    MULTIBYTE = /[^\x00-\x7F]/,
    FULLWIDTH = /[^\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/,
    HALFWIDTH = /[\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/,

    SURROGATE_PAIR = /[\uD800-\uDBFF][\uDC00-\uDFFF]/,
    SURROGATE_PAIRS = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,

    BASE_64 = /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=|[A-Za-z0-9+\/]{4})$/,

    SPACES = /[\s-]+/g,
    NOT_NUMBERS = /[^0-9]+/g;

validations.toString = function(obj) {
    if (typeof(obj) === "object" && obj !== null && obj.toString) {
        obj = obj.toString();
    } else if (obj === null || typeof(obj) === "undefined" || (isNaN(obj) && !obj.length)) {
        obj = "";
    } else if (typeof(obj) !== "string") {
        obj += "";
    }

    return obj;
};

validations.toDate = function(date) {
    if (utils.isDate(date)) return data;
    if (utils.isNumber(date)) return new Date(date);
    date = Date.parse(date);
    return !isNaN(date) ? new Date(date) : null;
};

validations.toFloat = function(str) {
    return parseFloat(str);
};

validations.toInt = function(str, radix) {
    return parseInt(str, radix || 10);
};

validations.toBoolean = function(str, strict) {
    if (strict) return str === "1" || str === "true";
    return str !== "0" && str !== "false" && str !== "";
};

validations.equals = function(str, comparison) {
    str = validations.toString(str);

    return str === validations.toString(comparison);
};

validations.contains = function(str, elem) {
    str = validations.toString(str);

    return str.indexOf(validations.toString(elem)) >= 0;
};

validations.matches = function(str, pattern, modifiers) {
    str = validations.toString(str);

    if (!utils.isRegExp(pattern)) {
        pattern = new RegExp(pattern, modifiers);
    }
    return pattern.test(str);
};

validations.isEmail = function(str) {
    str = validations.toString(str);

    return EMAIL.test(str);
};

var defaultURLOptions = {
    protocols: ["http", "https", "ftp"],
    requireTLD: true,
    requireProtocol: false,
    allowUnderscores: false
};
validations.isURL = function(str, options) {
    str = validations.toString(str);

    if (!str || str.length >= 2083) {
        return false;
    }
    options = utils.mixin(options || {}, defaultURLOptions);
    var separators = "-?-?" + (options.allowUnderscores ? "_?" : ""),
        url = new RegExp("^(?!mailto:)(?:(?:" + options.protocols.join("|") + ")://)" + (options.requireProtocol ? "" : "?") + "(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:www.)?)?(?:(?:[a-z\\u00a1-\\uffff0-9]+" + separators + ")*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+" + separators + ")*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" + (options.requireTLD ? "" : "?") + ")|localhost)(?::(\\d{1,5}))?(?:(?:/|\\?|#)[^\\s]*)?$", "i"),
        match = str.match(url),
        port = match ? match[1] : 0;

    return !!(match && (!port || (port > 0 && port <= 65535)));
};

validations.isURLish = function(str) {
    str = validations.toString(str);

    return URLISH.test(str);
};

validations.isIP = function(str, version) {
    str = validations.toString(str);

    version = validations.toString(version);
    var parts;

    if (!version) {
        return validations.isIP(str, 4) || validations.isIP(str, 6);
    } else if (version === "4") {
        if (!IPv4_MAYBE.test(str)) return false;
        parts = str.split(".").sort();
        return parts[3] <= 255;
    }

    return version === "6" && IPv6.test(str);
};

validations.isIPv4 = function(str) {
    return validations.isIP(str, 4);
};

validations.isIPv6 = function(str) {
    return validations.isIP(str, 6);
};

validations.isAlpha = function(str) {
    str = validations.toString(str);

    return ALPHA.test(str);
};

validations.isAlphaDashed = function(str) {
    str = validations.toString(str);

    return ALPHA_DASHED.test(str);
};

validations.isAlphaNumeric = function(str) {
    str = validations.toString(str);

    return ALPHA_NUMERIC.test(str);
};

validations.isAlphaNumericDashed = function(str) {
    str = validations.toString(str);

    return ALPHA_NUMERIC_DASHED.test(str);
};

validations.isNumeric = function(str) {
    str = validations.toString(str);

    return NUMERIC.test(str);
};

validations.isHexadecimal = function(str) {
    str = validations.toString(str);

    return HEXADECIMAL.test(str);
};

validations.isHexColor = function(str) {
    str = validations.toString(str);

    return HEX_COLOR.test(str);
};

validations.isLowercase = function(str) {
    str = validations.toString(str);

    return str === str.toLowerCase();
};

validations.isUppercase = function(str) {
    str = validations.toString(str);

    return str === str.toUpperCase();
};

validations.isInt = function(str) {
    str = validations.toString(str);

    return str !== "" && INT.test(str);
};

validations.isFloat = function(str) {
    str = validations.toString(str);

    return str !== "" && FLOAT.test(str);
};

validations.isDivisibleBy = function(str, num) {
    str = validations.toString(str);

    return validations.toFloat(str) % validations.toInt(num) === 0;
};

validations.isNull = function(str) {
    str = validations.toString(str);

    return str.length === 0;
};

validations.isLength = function(str, min, max) {
    str = validations.toString(str);
    var surrogatePairs = str.match(SURROGATE_PAIRS) || [],
        len = str.length - surrogatePairs.length;

    return len >= min && (typeof(max) === "undefined" || len <= max);
};

validations.isByteLength = function(str, min, max) {
    str = validations.toString(str);

    return str.length >= min && (typeof(max) === "undefined" || str.length <= max);
};

validations.isUUID = function(str, version) {
    str = validations.toString(str);
    var pattern = UUID[version ? version : "all"];

    return pattern && pattern.test(str);
};

validations.isDate = function(str) {
    str = validations.toString(str);

    return !isNaN(Date.parse(str));
};

validations.isAfter = function(str, date) {
    str = validations.toString(str);
    var comparison = validations.toDate(date || new Date()),
        original = validations.toDate(str);

    return !!(original && comparison && original > comparison);
};

validations.isBefore = function(str, date) {
    str = validations.toString(str);
    var comparison = validations.toDate(date || new Date()),
        original = validations.toDate(str);

    return original && comparison && original < comparison;
};

validations.isIn = function(str, options) {
    str = validations.toString(str);

    if (!options || typeof(options.indexOf) !== "function") {
        return false;
    }

    return options.indexOf(str) !== -1;
};

validations.isCreditCard = function(str) {
    str = validations.toString(str);
    var sanitized = str.replace(NOT_NUMBERS, ""),
        sum = 0,
        digit, tmpNum, shouldDouble,
        i;

    if (!CREDIT_CARD.test(sanitized)) return false;

    for (i = sanitized.length - 1; i >= 0; i--) {
        digit = sanitized.substring(i, (i + 1));
        tmpNum = parseInt(digit, 10);

        if (shouldDouble) {
            tmpNum *= 2;
            if (tmpNum >= 10) {
                sum += ((tmpNum % 10) + 1);
            } else {
                sum += tmpNum;
            }
        } else {
            sum += tmpNum;
        }
        shouldDouble = !shouldDouble;
    }
    return !!((sum % 10) === 0 ? sanitized : false);
};

validations.isISBN = function(str, version) {
    str = validations.toString(str);

    version = validations.toString(version);
    if (!version) return validations.isISBN(str, 10) || validations.isISBN(str, 13);

    var sanitized = str.replace(SPACES, ""),
        checksum = 0,
        i, factor;

    if (version === "10") {
        if (!ISBN_10_MAYBE.test(sanitized)) {
            return false;
        }
        for (i = 0; i < 9; i++) {
            checksum += (i + 1) * sanitized[i];
        }
        if (sanitized[9] === "X") {
            checksum += 10 * 10;
        } else {
            checksum += 10 * sanitized[9];
        }
        if ((checksum % 11) === 0) {
            return !!sanitized;
        }
    } else if (version === "13") {
        if (!ISBN_13_MAYBE.test(sanitized)) {
            return false;
        }
        factor = [1, 3];
        for (i = 0; i < 12; i++) {
            checksum += factor[i % 2] * sanitized[i];
        }
        if (sanitized[12] - ((10 - (checksum % 10)) % 10) === 0) {
            return !!sanitized;
        }
    }
    return false;
};

validations.isJSON = function(str) {
    str = validations.toString(str);

    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

validations.isMultibyte = function(str) {
    str = validations.toString(str);

    return MULTIBYTE.test(str);
};

validations.isAscii = function(str) {
    str = validations.toString(str);

    return ASCII.test(str);
};

validations.isFullWidth = function(str) {
    str = validations.toString(str);

    return FULLWIDTH.test(str);
};

validations.isHalfWidth = function(str) {
    str = validations.toString(str);

    return HALFWIDTH.test(str);
};

validations.isVariableWidth = function(str) {
    str = validations.toString(str);

    return FULLWIDTH.test(str) && HALFWIDTH.test(str);
};

validations.isSurrogatePair = function(str) {
    str = validations.toString(str);

    return SURROGATE_PAIR.test(str);
};

validations.isBase64 = function(str) {
    str = validations.toString(str);

    return BASE_64.test(str);
};

validations.extend = function(name, fn) {
    validations[name] = function() {
        var args = slice.call(arguments);
        args[0] = validations.toString(args[0]);
        return fn.apply(validations, args);
    };
};
