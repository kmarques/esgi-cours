function ucfirst(string) {
    if (typeof string !== "string") return "";
    if (string.length === 0) return string;
    return string.charAt(0).toUpperCase() + string.substr(1);
}
console.log("Ucfirst");
console.log(ucfirst({}));
console.log(ucfirst(""));
console.log(ucfirst("t"));
console.log(ucfirst("test"));
console.log(ucfirst("teSTE"));

function capitalize(string) {
    if (typeof string !== "string") return "";
    if (string.length === 0) return string;

    array = string.split(" ");
    return array
            .map((item) => item.charAt(0).toUpperCase() + item.substr(1).toLowerCase())
            .join(" ");
}
console.log("Capitalize");
console.log(capitalize("test"));
console.log(capitalize(" test"));
console.log(capitalize("ipsum DOLOR"));
console.log(capitalize("sit 8met consectetur"));
console.log(capitalize("_dipiscing elit"));
console.log(capitalize({}));

function camelCase(string) {
    return capitalize(string).replace(/[^a-z-A-Z0-9]+/g, "");
}

console.log("CamelCase");
console.log(camelCase("toggle case is the coolest"));
console.log(camelCase("toggleCase is the coolest"));
console.log(camelCase("ToggleCase is the 3oolest"));
console.log(camelCase("ToggleCaseIsTheCoolest"));
console.log(camelCase("ToggleCase is_the coolest"));
console.log(camelCase(" toggleCase"));
console.log(camelCase({}));

function snake_case(string) {
    if (typeof string !== "string") return "";
    if (string.length === 0) return string;

    return string.toLowerCase().replace(/[^a-z-A-Z0-9]+/g, "_");
}

console.log("Snake_case");
console.log(snake_case("toggle case is the coolest"));
console.log(snake_case("toggleCase is the coolest"));
console.log(snake_case("ToggleCase is the 3oolest"));
console.log(snake_case("ToggleCaseIsTheCoolest"));
console.log(snake_case("ToggleCase is_the coolest"));
console.log(snake_case(" toggleCase"));
console.log(snake_case({}));

function leet(string) {
    if (typeof string !== "string") return "";
    if (string.length === 0) return string;

    return string.replace(/[aeiou]/ig, function(item) {
        switch(item) {
            case 'a':
            case 'A':
                return 4;
            case 'e':
            case 'E':
                return 3;
            case 'i':
            case 'I':
                return 1;
            case 'o':
            case 'O':
                return 0;
            case 'u':
            case 'U':
                return '(_)';
        }
    });
}

console.log("Leet");
console.log(leet("anaconda"));
console.log(leet("anacoNDa"));
console.log(leet("leet"));
console.log(leet("yoda"));
console.log(leet("evaluation"));
console.log(leet("mon travail"));
console.log(leet(" "));
console.log(leet({}));

function verlan(string) {
    if (typeof string !== "string") return "";
    if (string.length === 0) return string;

    return string.split(" ").map(
            word => word.split("").reverse().join("")
        ).join(" ");
}

console.log("Verlan");
console.log(verlan("anaconda"));
console.log(verlan("kayak"));
console.log(verlan("yoda m Luke"));
console.log(verlan("70da m L(_)k3"));
console.log(verlan(" "));
console.log(verlan({}));


function yoda(string) {
    if (typeof string !== "string") return "";
    if (string.length === 0) return string;

    return string.split(" ").reverse().join(" ");
}

console.log("Yoda");
console.log(yoda("anaconda"));
console.log(yoda("yoda m Luke"));
console.log(yoda("Inverser la position des mots d’une phrase"));
console.log(yoda(" "));
console.log(yoda({}));

function vig(string, code) {
    if (typeof string !== "string") return "";
    if (string.length === 0) return string;

    while (code.length < string.length) {
        code += code;
    };
    code = code.substr(0, string.length);
    let codeIndex = 0;
    
    return string.split("").map((letter, index) => {
        letter = letter.toLowerCase();
        const aCode = "a".charCodeAt(0);
        const letterNumber = letter.charCodeAt(0) - aCode; // [0-25]
        
        if (letterNumber<0 || letterNumber> 25) return letter;

        const codeNumber = code.charCodeAt(codeIndex) - aCode; // [0-25]
        codeIndex++;

        return String.fromCharCode(((letterNumber + codeNumber) % 26) + aCode);
    }).join("");
}

console.log("Vig");
console.log(vig("anticonstitutionnellement", "foo"));
console.log(vig("antiConstiTutioNnellement", "foo"));
console.log(vig("une phrase tres tres longue mais qui ne veut absolument rien dire car c est juste un test", "nawakdecheznawak"));
console.log(vig(" ", "test"));
console.log(vig({}, "test"));

function prop_access(object, path) {
    object = object || {};
    if(!path) return object;
    const pathArray = path.split(".");

    for (let i = 0; i< pathArray.length; i++) {
        object = object[pathArray[i]];
        if(object === undefined) {
            console.log(pathArray.slice(0, i+1).join('.') + " not exist");
            return null;
        }
    }
    
    return object;
}

console.log(prop_access({
    "animal":{
        "type":{
            "name": "dog"
        }
    }
}, 
"animal.type.name"));
console.log(prop_access({
    "animal":
    {
        "type":{
            "name": "dog"
        }
    }
}, "animal.type"
));
console.log(prop_access({
    "animals":[
    {
        "type":{
            "name": "dog"
        }
    },
    {
        "type":{
            "name": "cat"
        }
    }
   ]
}, "animals.1.type"
));
console.log(prop_access(
    {"animal":{"type":{"name": "dog"}}}, "animal.gender"
));
console.log(prop_access(
    {"animal":{"type":{"name": "dog"}}}, ""
));
console.log(prop_access(
    null, "test"
));
console.log(prop_access(
    {"animal":{"type":{"name": "dog"}}}, null
));