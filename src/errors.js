var errors = module.exports;


errors.type = "invalid type";

errors.empty = "not empty";

errors.not_empty = errors.notempty = errors.notEmpty = "is empty";

errors.required = "is missing";

errors["undefined"] = "is undefined";

errors.object = "is not an object";

errors.json = "invalid json";

errors.text = "invalid text";

errors.string = "invalid string";

errors.alpha = "string contains non aplha characters";

errors.alpha_dashed = errors.alphadashed = errors.alphaDashed = "string contains non aplha dashed characters";

errors.numeric = "string contains non numeric characters";

errors.alpha_numeric = errors.alphanumeric = errors.alphaNumeric = "string contains non alpha numeric characters";

errors.alpha_numeric_dashed = errors.alphanumericdashed = errors.alphaNumericDashed = "string contains non alpha numeric dashed characters";

errors.email = "invalid email";

errors.url = "invalid url";

errors.urlish = "invalid url";

errors.ip = "invalid ip";

errors.ipv4 = "invalid ip v4";

errors.ipv6 = "invalid ip v6";

errors.credit_card = errors.creditcard = errors.creditCard = "invalid credit card number";

errors.uuid = "invalid uuid";

errors.uuidv3 = "invalid uuid v3";

errors.uuidv4 = "invalid uuid v4";

errors["int"] = "not a integer";

errors.integer = "not a integer";

errors.number = "not a number";

errors.finite = "is infinite";

errors.decimal = "not a deciaml value";

errors["float"] = "not a deciaml value";

errors.falsey = "is not falsey";

errors.truthy = "is not truthy";

errors["null"] = "is not null";

errors.not_null = errors.notnull = errors.notNull = "is null";

errors.bool = errors["boolean"] = "not boolean";

errors.array = "not an array";

errors.binary = "not binary";

errors.date = "not a date";

errors.date_time = errors.datetime = "not a date";

errors.hexa_decimal = errors.hexadecimal = "invalid hexadecimal";

errors.hex_color = errors.hexcolor = "invalid hex color";

errors.lowercase = "not lowercase";

errors.uppercase = "not uppercase";

errors.after = "not after";

errors.before = "not before";

errors.equals = "not equal";

errors.contains = "does not contain";

errors.not_contains = errors.notcontains = errors.notContains = "does contain";

errors.length = errors.len = "invalid length";

errors["in"] = "not in";

errors.not_in = errors.notIn = "is in";

errors.max = "greater than max";

errors.min = "less than min";

errors.greater_than = errors.greaterthan = errors.greaterThan = "greater than min";

errors.less_than = errors.lessthan = errors.lessThan = "less than min";

errors.max_length = errors.maxlength = errors.maxLength = "invalid length";

errors.min_length = errors.minlength = errors.minLength = "invalid length";

errors.regex = "does not match";

errors.not_regex = errors.notregex = errors.notRegex = "matches";
