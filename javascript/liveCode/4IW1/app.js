var root = document.getElementById('root');
var table = document.createElement('table');

const onBlur = function(event) {
    const value = this.value;
    const text = document.createTextNode(value);
    input.value = "";
    const td = input.parentNode;
    td.removeChild(input);
    td.appendChild(text);
};

const onClick = function(event) {
    if (this.getElementsByTagName("input").length > 0) return;
    const value = this.innerText;
    input = document.createElement('input');
    input.value = value;
    this.innerText = "";
    input.addEventListener('blur', onBlur);
    this.appendChild(input);
    input.focus();
};

for (let i = 0; i<4; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j<4; j++) {
        const td = document.createElement('td');
        const text = document.createTextNode('lorem ipsum');

        td.addEventListener("click", onClick);
 
        td.appendChild(text);
        tr.appendChild(td);
    }
    if (i % 2 === 0) {
        tr.style.backgroundColor = "grey";
    }
    table.appendChild(tr);
}

root.appendChild(table);