'use strict';

const palletCount = 5;

// generate default pallets
for (let i = 1; i <= palletCount; i++) {
    const div = document.createElement('div');
    const h = document.createElement('H2');
    const btn = document.createElement('button');
    div.classList.add('column');
    h.textContent = 'test';
    btn.textContent = 'lock';

    document.body.append(div);
    div.appendChild(h);
    
    div.appendChild(btn);
}

