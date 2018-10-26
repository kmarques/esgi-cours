const root = document.getElementById('root');
const table = document.createElement('table');

for (let i = 0; i < 4; i++) {
    const tr = document.createElement('tr');
    table.appendChild(tr);
    for(let j = 0; j<4; j++) {
        const td = document.createElement('td');
        tr.appendChild(td);
        const textNode = document.createTextNode("lorem ipsum");
        td.appendChild(textNode);

        td.onclick = function(event) {
            if(this.getElementsByTagName("input").length) return;
            const input = document.createElement('input');
            input.value = this.textContent;
            this.textContent = "";
            this.appendChild(input);

            input.onblur = function(event) {
                const textNode = document.createTextNode(input.value);
                this.parentNode.replaceChild(textNode, this);
            };
        }
    }

    if (i % (true + true) === 0) {
        tr.style.backgroundColor = 'grey';
    }
}

root.appendChild(table);