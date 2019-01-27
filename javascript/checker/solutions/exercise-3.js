String.prototype.ucfirst = function() {
    if (this.length === 0) return this;
    return this.charAt(0).toUpperCase() + this.substr(1);
}
console.log("Ucfirst");
console.log("".ucfirst());
console.log("t".ucfirst());
console.log("test".ucfirst());
console.log("teSTE".ucfirst());

String.prototype.capitalize = function() {
    if (this.length === 0) return this;

    array = this.split(" ");
    return array
            .map((item) => item.charAt(0).toUpperCase() + item.substr(1).toLowerCase())
            .join(" ");
}
console.log("Capitalize");
console.log("test".capitalize());
console.log(" test".capitalize());
console.log("ipsum DOLOR".capitalize());
console.log("sit 8met consectetur".capitalize());
console.log("_dipiscing elit".capitalize());

String.prototype.camelCase = function() {
    return this.capitalize().replace(/[^a-z-A-Z0-9]+/g, "");
}

console.log("CamelCase");
console.log("toggle case is the coolest".camelCase());
console.log("toggleCase is the coolest".camelCase());
console.log("ToggleCase is the 3oolest".camelCase());
console.log("ToggleCaseIsTheCoolest".camelCase());
console.log("ToggleCase is_the coolest".camelCase());
console.log(" toggleCase".camelCase());

String.prototype.snake_case = function() {
    if (this.length === 0) return this;

    return this.toLowerCase().replace(/[^a-z-A-Z0-9]+/g, "_");
}

console.log("Snake_case");
console.log("toggle case is the coolest".snake_case());
console.log("toggleCase is the coolest".snake_case());
console.log("ToggleCase is the 3oolest".snake_case());
console.log("ToggleCaseIsTheCoolest".snake_case());
console.log("ToggleCase is_the coolest".snake_case());
console.log(" toggleCase".snake_case());

String.prototype.leet = function() {
    if (this.length === 0) return this;

    return this.replace(/[aeiou]/ig, function(item) {
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
console.log("anaconda".leet());
console.log("anacoNDa".leet());
console.log("leet".leet());
console.log("yoda".leet());
console.log("evaluation".leet());
console.log("mon travail".leet());
console.log(" ".leet());

String.prototype.verlan = function() {
    if (this.length === 0) return this;

    return this.split(" ").map(
            word => word.split("").reverse().join("")
        ).join(" ");
}

console.log("Verlan");
console.log("anaconda".verlan());
console.log("kayak".verlan());
console.log("yoda m Luke".verlan());
console.log("70da m L(_)k3".verlan());
console.log(" ".verlan());

String.prototype.yoda = function() {
    if (this.length === 0) return this;

    return this.split(" ").reverse().join(" ");
}

console.log("Yoda");
console.log("anaconda".yoda());
console.log("yoda m Luke".yoda());
console.log("Inverser la position des mots d’une phrase".yoda());
console.log(" ".yoda());

String.prototype.vig = function(code) {
    if (this.length === 0) return this;

    while (code.length < this.length) {
        code += code;
    };
    code = code.substr(0, this.length);
    let codeIndex = 0;
    
    return this.split("").map((letter, index) => {
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
console.log("anticonstitutionnellement".vig("foo"));
console.log("antiConstiTutioNnellement".vig("foo"));
console.log("une phrase tres tres longue mais qui ne veut absolument rien dire car c est juste un test".vig("nawakdecheznawak"));
console.log(" ".vig("test"));

Object.prototype.prop_access = function(path) {
    if(!path) return this;
    const pathArray = path.split(".");
    let object = this;
    for (let i = 0; i< pathArray.length; i++) {
        object = object[pathArray[i]];
        if(object === undefined) {
            console.log(pathArray.slice(0, i+1).join('.') + " not exist");
            return null;
        }
    }
    
    return object;
}

console.log({
    "animal":{
        "type":{
            "name": "dog"
        }
    }
}.prop_access("animal.type.name"));
console.log({
    "animal":
    {
        "type":{
            "name": "dog"
        }
    }
}.prop_access("animal.type"));
console.log({
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
}.prop_access("animals.1.type"));
console.log({"animal":{"type":{"name": "dog"}}}.prop_access("animal.gender"));
console.log({"animal":{"type":{"name": "dog"}}}.prop_access(""));
console.log({"animal":{"type":{"name": "dog"}}}.prop_access(null));