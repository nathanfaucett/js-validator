var utils = require("utils"),
    validator = require("./");


var rules = module.exports,
    toString = Object.prototype.toString,

    EMAIL = /^((([a-z]|\d|[!#\$%&"\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&"\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,

    CREDIT_CARD = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,

    ISBN_10_MAYBE = /^(?:[0-9]{9}X|[0-9]{10})$/,
    ISBN_13_MAYBE = /^(?:[0-9]{13})$/,

    IPv4_MAYBE = /^(\d?\d?\d)\.(\d?\d?\d)\.(\d?\d?\d)\.(\d?\d?\d)$/,
    IPv6 = /^::|^::1|^([a-fA-F0-9]{1,4}::?){1,7}([a-fA-F0-9]{1,4})$/,

    ALPHA = /^[a-zA-Z]+$/,
    ALPHA_NUMERIC = /^[a-zA-Z0-9]+$/,
    NUMERIC = /^-?[0-9]+$/,
    INT = /^(?:-?(?:0|[1-9][0-9]*))$/,
    FLOAT = /^(?:-?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/,
    HEXA_DECIMAL = /^[0-9a-fA-F]+$/,
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

rules.equals = function(str, comparison) {
    return str === comparison;
};

rules.contains = function(str, elem) {
    return str.indexOf(validator.toString(elem)) !== -1;
};

rules.matches = function(str, pattern, modifiers) {
    if (!utils.isRegExp(pattern)) {
        pattern = new RegExp(pattern, modifiers);
    }
    return pattern.test(str);
};

rules.email = function(str) {
    return EMAIL.test(str);
};

var defaultURLOptions = {
    protocols: ["http", "https", "ftp"],
    requireTLD: true,
    requireProtocol: false,
    allowUnderscores: false
};
rules.url = function(str, options) {
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

rules.ip = function(str, version) {
    version = validator.toString(version);
    var parts;

    if (!version) {
        return rules.isIP(str, 4) || rules.isIP(str, 6);
    } else if (version === "4") {
        if (!IPv4_MAYBE.test(str)) return false;
        parts = str.split(".").sort();
        return parts[3] <= 255;
    }

    return version === "6" && IPv6.test(str);
};

rules.string = utils.isString;

rules.text = utils.isString;

rules.alpha = function(str) {
    return ALPHA.test(str);
};

rules.alphanumeric = function(str) {
    return ALPHA_NUMERIC.test(str);
};

rules.numeric = function(str) {
    return utils.isNumber(str) || NUMERIC.test(str);
};

rules.hexadecimal = function(str) {
    return HEXA_DECIMAL.test(str);
};

rules.hexColor = function(str) {
    return HEX_COLOR.test(str);
};

rules.lowercase = function(str) {
    return str === str.toLowerCase();
};

rules.uppercase = function(str) {
    return str === str.toUpperCase();
};

rules.int = function(str) {
    return utils.isInteger(str) || (str !== "" && INT.test(str));
};

rules.integer = rules.int;

rules.float = function(str) {
    return utils.isDecimal(str) || (str !== "" && FLOAT.test(str));
};

rules.divisibleBy = function(str, num) {
    if (utils.isNumber(str) && utils.isNumber(num)) return str % num === 0;
    return validator.toFloat(str) % validator.toInt(num) === 0;
};

rules.null = function(str) {
    return str.length === 0;
};

rules.length = function(str, min, max) {
    var surrogatePairs = str.match(SURROGATE_PAIRS) || [],
        len = str.length - surrogatePairs.length;

    return len >= min && (typeof(max) === "undefined" || len <= max);
};

rules.byteLength = function(str, min, max) {
    return str.length >= min && (typeof(max) === "undefined" || str.length <= max);
};

rules.minLength = function(str, min) {
    return str.length >= max;
};

rules.maxLength = function(str, max) {
    return str.length <= max;
};

rules.uuid = function(str, version) {
    var pattern = UUID[version ? version : "all"];
    return pattern && pattern.test(str);
};

rules.date = function(str) {
    return !isNaN(Date.parse(str));
};

rules.datetime = rules.date;

rules.time = rules.date;

rules.after = function(str, date) {
    var comparison = validator.toDate(date || new Date()),
        original = validator.toDate(str);

    return !!(original && comparison && original > comparison);
};

rules.before = function(str, date) {
    var comparison = validator.toDate(date || new Date()),
        original = validator.toDate(str);

    return original && comparison && original < comparison;
};

rules.in = function(str, options) {
    if (!options || typeof(options.indexOf) !== "function") {
        return false;
    }

    return options.indexOf(str) !== -1;
};

rules.creditCard = function(str) {
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

rules.isbn = function(str, version) {
    version = validator.toString(version);
    if (!version) return rules.isISBN(str, 10) || rules.isISBN(str, 13);

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

rules.json = function(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

rules.multibyte = function(str) {
    return MULTIBYTE.test(str);
};

rules.ascii = function(str) {
    return ASCII.test(str);
};

rules.fullWidth = function(str) {
    return FULLWIDTH.test(str);
};

rules.halfWidth = function(str) {
    return HALFWIDTH.test(str);
};

rules.variableWidth = function(str) {
    return FULLWIDTH.test(str) && HALFWIDTH.test(str);
};

rules.surrogatePair = function(str) {
    return SURROGATE_PAIR.test(str);
};

rules.base64 = function(str) {
    return BASE_64.test(str);
};
