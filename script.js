'use strict';

//  
function createNewPallet(){
    // define main elements
    const div = document.createElement('div');
    const h2Hex = document.createElement('H2');
    const h2Rgb = document.createElement('H2');
    const btn = document.createElement('button');

    // set default settings
    div.classList.add('column');
    h2Hex.classList.add('hex');
    h2Rgb.classList.add('rgb');
    btn.innerHTML = `<i class="fa-solid fa-square-minus"></i>
                    <i class="fa-solid fa-square-plus"></i>
                    <i class="fa-solid fa-rotate"></i>
                    <i class="fa-solid fa-lock-open"></i>
                    <i class="fa-solid fa-lock hide"></i>`;
    
    return {div: div,
            hex: h2Hex,
            rgb: h2Rgb,
            btns: btn};
}

// add elements into the body or after element
function addPalett(obj, elem){
    if (elem === undefined){
        document.body.append(obj.div);
    }else{
        document.body.insertBefore(obj.div, elem.nextElementSibling);
    }
    obj.div.appendChild(obj.hex);
    obj.div.appendChild(obj.rgb);
    obj.div.appendChild(obj.btns);
}

// get random color in HEX format
function getRandomHexColor(){
    return Math.floor(Math.random() * 16777215).toString(16).toUpperCase();
}

// set random color
function setRandomColor(div){
    const h2Hex = div.querySelector('.hex');
    const h2Rgb = div.querySelector('.rgb');

    const randomHexColor = getRandomHexColor();
    const rgbColor = convertHexToRgb(randomHexColor);

    div.style.background = `#${randomHexColor}`;
    h2Hex.textContent = `#${randomHexColor}`;
    h2Rgb.textContent = `rgb(${rgbColor.split(' ')[0]},${rgbColor.split(' ')[1]},${rgbColor.split(' ')[2]})`;    

    setElementColor(div, rgbColor);
}

// convert Hex format to Rgb
function convertHexToRgb(hex){
    const red = parseInt(hex.substring(0, 2), 16);
    const green = parseInt(hex.substring(2, 4), 16);
    const blue = parseInt(hex.substring(4, 6), 16);

    return `${red} ${green} ${blue}`;
}

// listener for space button
document.body.addEventListener('keydown', (e) => {
    const divs = document.querySelectorAll('.column');

    if (e.code.toLowerCase() === 'space') {
        divs.forEach(elem => {
            if (!elem.classList.contains('lock')){
                setRandomColor(elem);
            }
        });
    }
});

// body listener
document.body.addEventListener('click', (e) => {
    // lock palett
    if (e.target.classList.contains('fa-lock-open')){
        e.target.classList.toggle('hide');
        e.target.parentElement.querySelector('.fa-lock').classList.toggle('hide');
        e.target.parentElement.querySelector('.fa-rotate').classList.toggle('hide');
        e.target.parentElement.querySelector('.fa-square-minus').classList.toggle('hide');
        e.target.parentElement.parentElement.classList.toggle('lock');
    }
    // unlock palett
    if (e.target.classList.contains('fa-lock')){
        e.target.classList.toggle('hide');
        e.target.parentElement.querySelector('.fa-lock-open').classList.toggle('hide');
        e.target.parentElement.querySelector('.fa-rotate').classList.toggle('hide');
        e.target.parentElement.querySelector('.fa-square-minus').classList.toggle('hide');
        e.target.parentElement.parentElement.classList.toggle('lock');
    }
    // refresh the palett
    if (e.target.classList.contains('fa-rotate')){
        setRandomColor(e.target.parentElement.parentElement);
    }
    // delete current palett
    if (e.target.classList.contains('fa-square-minus')){
        e.target.parentElement.parentElement.remove();
    }
    // add new palett
    if (e.target.classList.contains('fa-square-plus')){
        const newPalett = createNewPallet();
        addPalett(newPalett, e.target.parentElement.parentElement);
        setRandomColor(newPalett.div);
    }
});

// start function for project initiation
function start(){
    const palettCount = 4;

    for (let i = 1; i <= palettCount; i++) {
        addPalett(createNewPallet());    
    }

    const divs = document.querySelectorAll('.column');

    divs.forEach(elem => {
        setRandomColor(elem);
    });
}

// set white or black color in all childs
function setElementColor(elem, color){

    const red = +color.split(' ')[0];
    const green = +color.split(' ')[1];
    const blue = +color.split(' ')[2];
    const luminance = (red * 299 + green * 587 + blue * 114) / 1000;

    for (const item of elem.children) {
        item.style.color = (luminance > 127) ? 'black' : 'white';   
    }
}

// start
start();