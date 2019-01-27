function UndefinedPropertyError(path, property, object) {
    var instance = new Error(`Property '${property}' not exist for path '${path}', expected one of : ` + JSON.stringify(object));
    Object.setPrototypeOf(
              instance, Object.getPrototypeOf(this)
    );
    if (Error.captureStackTrace) {
      Error.captureStackTrace(instance, UndefinedPropertyError);
    }
    return instance;
}


Object.prototype.prop_access = function(path) {
    if(!path) return this;
    const pathArray = path.split(".");
    let object = this;
    for (let i = 0; i< pathArray.length; i++) {
        let newObject = object[pathArray[i]];
        if (newObject === undefined) {
            throw new UndefinedPropertyError(
                pathArray.slice(0, i+1).join('.'), 
                pathArray[i],
                Object.keys(object)
            );
        }
        object = newObject;
    }
    
    return object;
}

function test (object, path) {
    try {
        console.log(JSON.stringify(object.prop_access(path)));
    } catch(e) {
        if(e instanceof UndefinedPropertyError) {
            console.log("Exception caught");
        }
    }
}

test({"animal":{"type":{"name": "dog"}}}, "animal.gender");
test({"animal":{"type":{"name": "dog"}}}, "");
test({"animal":{"type":{"name": "dog"}}}, null);