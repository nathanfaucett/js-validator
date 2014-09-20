var errors = module.exports;


errors.type = "is of an invalid type";

errors.empty = "is not empty";

errors.not_empty = errors.notempty = errors.notEmpty = "is empty";

errors.required = "is missing";

errors["undefined"] = "is undefined";

errors.object = "is not an object";

errors.json = "is invalid json";

errors.text = "is an invalid text";

errors.string = "is an invalid string";

errors.alpha = "contains non aplha characters";

errors.alpha_dashed = errors.alphadashed = errors.alphaDashed = "contains non aplha dashed characters";

errors.numeric = "contains non numeric characters";

errors.alpha_numeric = errors.alphanumeric = errors.alphaNumeric = "contains non alpha numeric characters";

errors.alpha_numeric_dashed = errors.alphanumericdashed = errors.alphaNumericDashed = "contains non alpha numeric dashed characters";

errors.email = "is an invalid email";

errors.url = "is an invalid url";

errors.urlish = "is an invalid url";

errors.ip = "is an invalid ip";

errors.ipv4 = "is an invalid ip v4";

errors.ipv6 = "is an invalid ip v6";

errors.credit_card = errors.creditcard = errors.creditCard = "is an invalid credit card number";

errors.uuid = "is an invalid uuid";

errors.uuidv3 = "is an invalid uuid v3";

errors.uuidv4 = "is an invalid uuid v4";

errors["int"] = "is not an integer";

errors.integer = "is not an integer";

errors.number = "is not a number";

errors.finite = "is infinite";

errors.decimal = "is not a deciaml value";

errors["float"] = "is not a deciaml value";

errors.falsey = "is not falsey";

errors.truthy = "is not truthy";

errors["null"] = "is not null";

errors.not_null = errors.notnull = errors.notNull = "is null";

errors.bool = errors["boolean"] = "is not boolean";

errors.array = "is not an array";

errors.binary = "is not binary";

errors.date = "is not a date";

errors.date_time = errors.datetime = "is not a date";

errors.hexa_decimal = errors.hexadecimal = "is an invalid hexadecimal";

errors.hex_color = errors.hexcolor = "is an invalid hex color";

errors.lowercase = "is not lowercase";

errors.uppercase = "is not uppercase";

errors.after = "is not after";

errors.before = "is not before";

errors.equals = "is not equal";

errors.contains = "does not contain";

errors.not_contains = errors.notcontains = errors.notContains = "does contain";

errors.length = errors.len = "is invalid length";

errors["in"] = "is ot in";

errors.not_in = errors.notIn = "is in";

errors.max = "is greater than max";

errors.min = "is less than min";

errors.greater_than = errors.greaterthan = errors.greaterThan = "is greater than min";

errors.less_than = errors.lessthan = errors.lessThan = "is less than min";

errors.max_length = errors.maxlength = errors.maxLength = "is invalid length";

errors.min_length = errors.minlength = errors.minLength = "is invalid length";

errors.regex = "does not match";

errors.not_regex = errors.notregex = errors.notRegex = "matches";
