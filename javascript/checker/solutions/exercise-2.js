function type_check_v1(data, type) {
    switch(typeof data) {
        case "number":
        case "string":
        case "boolean":
        case "undefined":
        case "function":
            return type === typeof data;
        case "object":
            switch(type) {
                case "null":
                    return data === null;
                case "array":
                    return Array.isArray(data);
                default:
                    return data !== null && !Array.isArray(data);
            }

    }
    
    return false;
}
console.log("TypeCheck V1");
console.log(type_check_v1(1, "number") === true);
console.log(type_check_v1("string", "number") === false);
console.log(type_check_v1(true, "number") === false);
console.log(type_check_v1({ "prop1": 1 }, "object") === true);
console.log(type_check_v1(null, "null") === true);
console.log(type_check_v1(undefined, "undefined") === true);
console.log(type_check_v1("string", "string") === true);
console.log(type_check_v1([1, 2, 3], "array") === true);
console.log(type_check_v1(() => {}, "function") === true);
console.log(type_check_v1([1, 2, 3], "object") === false);

function type_check_v2(data, conf) {
    for (let key of Object.keys(conf)) {
        switch (key) {
            case 'type':
                if (!type_check_v1(data, conf[key])) return false;
                break;
            case 'value':
                if (JSON.stringify(data) !== JSON.stringify(conf[key])) return false;
                break;
            case 'enum':
                let valid = false;
                for (let value of conf[key]) {
                    valid = type_check_v2(data, {value});
                    if (valid) break;
                }
                if(!valid) return false;
        }
    }

    return true;
}

console.log("TypeCheck V2");
console.log(type_check_v2(1, { type: "number", value: 1 }) === true);
console.log(type_check_v2(1, { type: "number", value: 3 }) === false);
console.log(type_check_v2(1, { type: "object", value: 1 }) === false);
console.log(type_check_v2("string", { type: "string", enum: ["string1", "string2"] }) === false);
console.log(type_check_v2({ bar: "foo" }, { type: "object", value: { bar: "foo" } }) === true);
console.log(type_check_v2({ bar: "foo" }, { type: "object", value: { bar: "value" } }) === false);

function type_check(data, conf) {
    for (let key of Object.keys(conf)) {
        switch (key) {
            case 'type':
            case 'value':
            case 'enum':
                let newConf = {};
                newConf[key] = conf[key];
                if (!type_check_v2(data, newConf)) return false;
                break;
            case 'properties':
                for (let prop of Object.keys(conf[key])) {
                    if (data[prop] === undefined) return false;
                    if (!type_check(data[prop], conf[key][prop])) return false;
                }
                break;
        }
    }

    return true;
}

console.log("TypeCheck V3");
console.log(type_check(
    1,
    { type: "number", value: 1 }
) === true);
console.log(type_check(
    1,
                { type: "number", value: 3 }
) === false);
console.log(type_check(
    1,
                { type: "object", value: 1 }
) === false);
console.log(type_check(
    "string",
                { type: "string", enum: ["string1", "string2"] }
) === false);
console.log(type_check(
    { bar: "foo" },
                { type: "object", value: { bar: "foo" } }
) === true);
console.log(type_check(
    { bar: "foo" },
                { type: "object", value: { bar: "value" } }
) === false);
console.log(type_check(
    { 
        toto: { 
            fi: 3, 
            fa: { 
                trim: " test " 
            } 
        } 
},
{
    type: "object", 
    properties: {
        toto: {
            type: "object",
            properties: {
                fi: { value: 3 },
                fa: { enum: [3, "string", { trim: " test " }] }
            }
        }
    }
}
) === true);