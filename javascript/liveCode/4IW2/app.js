const table = document.createElement("table");
const root = document.getElementById("root");

function onBlur(event) {
    const input = this;
    const value = input.value;
    const text = document.createTextNode(value);
    this.parentNode.appendChild(text);
    this.parentNode.removeChild(this);
}

function onClick(event) {
    if (this.getElementsByTagName('input').length > 0) {
        return;
    }
    const value = this.innerText;
    const input = document.createElement('input');
    input.value = value;
    input.addEventListener('blur', onBlur);

    this.innerText = "";
    this.appendChild(input);
    input.focus();
}

for(let i = 0; i < 4; i++) {
    const tr = document.createElement("tr");

    if(i % 2 === 0) {
        tr.style.backgroundColor = "grey";
    }
    
    for(let j = 0; j < 4; j++) {
        const td = document.createElement("td");
        const text = document.createTextNode('lorem ipsum');
        td.appendChild(text);
        td.addEventListener('click', onClick);
        tr.appendChild(td);
    }
    table.appendChild(tr);
}

root.appendChild(table);