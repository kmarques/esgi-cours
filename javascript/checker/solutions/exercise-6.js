const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const timer = (resolve, reject) => {
    setTimeout(()=> reject("Timeout"), 7000);
};

const getStudents = resolve => {
    setTimeout(() => resolve(
        [ { name: "Dupont", cours: [ 1, 3, 5 ] }, { name: "Lea", cours: [ 2, 4 ] }, { name: "Charles", cours: [ 1 ] } ]
    ), getRandomInt(1, 2));
}

const getCourses = resolve => {
    setTimeout(() => resolve(
        [ { id: 1, name: "JS" }, { id: 2, name: "PHP" }, { id: 3, name: "C#" }, { id: 4, name: "F#" }, { id: 5, name: "CSS" } ]
    ), getRandomInt(2, 4));
}

const process = resolve => {
    Promise.all([new Promise(getStudents), new Promise(getCourses)]).then(([students, courses]) => {
        setTimeout(() => {
            let result = students.map(student => {
                student.cours = student.cours.map(id => courses.find(course => course.id === id));
                return student;
            });
            resolve(result);
        }, getRandomInt(1, 4));
    });
}

Promise.race([
    new Promise(timer), 
    new Promise(process)
]).then(
    (result) => console.log("Merge OK"), 
    (e) => console.log(e)
);