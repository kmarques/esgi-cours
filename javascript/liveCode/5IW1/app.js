let table = document.createElement('table');
let rootDiv = document.getElementById('root');

rootDiv.appendChild(table);

for (let i=0; i< 4; i++) {
    let tr = document.createElement('tr');
    for (let j= 0; j<4; j++) {
        let td = document.createElement('td');
        const text = document.createTextNode('lorem ipsum');
        td.appendChild(text);
        tr.appendChild(td);
    }
    if(i%2 === 0) {
        tr.style.backgroundColor = "grey";
    }
    table.appendChild(tr);
}

document.querySelectorAll('td').forEach((elem)=> {
    elem.addEventListener('click', function() {
        if (this.getElementsByTagName('input').length) return;
        let text = this.innerText;
        let input = document.createElement('input');
        input.value = text;
        this.innerText = "";
        this.appendChild(input);

        input.addEventListener('blur', function() {
            let value = this.value;
            let parent = this.parentNode;
            parent.removeChild(this);
            const text = document.createTextNode(value);
            parent.appendChild(text);
        });
    });
});