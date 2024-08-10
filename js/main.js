register()

function paintColor(item, color, drawing) {
    if (drawing) {
        item.style.backgroundColor = color        
    }
}

function registerGridSize() {
    registerGrid()

    let size = document.querySelector('#size')
    let valueDisplay = document.querySelector('.main .left .size .value')

    valueDisplay.textContent = size.value

    size.addEventListener('input', () => {
        console.log(size.value)
        valueDisplay.textContent = size.value
        
        registerGrid(size.value)
    })
}

function registerGrid(size = 10) {
    let canvas = document.querySelector('#canvas');
    Array.from(canvas.children).forEach(c => c.remove());
    
    let drawing = false;
    canvas.addEventListener('mousedown', () => {
        drawing = true;
        console.log('Mouse down, drawing');
    });
    canvas.addEventListener('mouseup', () => {
        drawing = false;
        console.log('Mouse up, not drawing');
    });
    
    const canvasSize = 400;
    const itemsPerSide = Math.floor(canvasSize / size);
    const adjustedSize = canvasSize / itemsPerSide;
    const totalItems = itemsPerSide * itemsPerSide;

    for (let i = 0; i < totalItems; i++) {
        let item = document.createElement('div');
        item.style.cssText = `
            width: ${adjustedSize}px;
            height: ${adjustedSize}px;
            flex: 0 0 ${adjustedSize}px;
        `;
        item.classList.add('canvasItem');
        item.draggable = false;

        item.addEventListener('mouseover', () => {
            let color = document.querySelector('#colorPicker').value;

            if(toolType == 'eraser'){
                color = 'transparent';
            }
            if(toolType == 'rainbow'){
                color = getRandomColor();
            }

            paintColor(item, color, drawing);
        });
    
        canvas.appendChild(item);
    }
}

function getRandomColor() {
    return `#${Math.floor(Math.random()*16777215).toString(16)}`
}

function registerColorPicker() {
    let colorIndicator = document.querySelector('#colorIndicator')
    let colorPicker = document.querySelector('#colorPicker')

    colorIndicator.addEventListener('click', () => {
        colorPicker.click()
    })

    colorPicker.addEventListener('input', () => {
        colorIndicator.style.backgroundColor = colorPicker.value
    })
}

var toolType = 'pen'

function registerDrawButtons() {
    let pen = document.querySelector('#penButton')
    let rainbow = document.querySelector('#rainbowPenButton')
    let eraser = document.querySelector('#eraserButton')
    let reset = document.querySelector('#resetButton')
    
    pen.style.backgroundColor = '#5db4ff'

    pen.addEventListener('click', () => {
        eraser.style.backgroundColor = 'transparent'
        pen.style.backgroundColor = '#5db4ff'
        rainbow.style.backgroundColor = 'transparent'
        toolType = 'pen'
    })

    eraser.addEventListener('click', () => {
        pen.style.backgroundColor = 'transparent'
        eraser.style.backgroundColor = '#5db4ff'
        rainbow.style.backgroundColor = 'transparent'
        toolType = 'eraser'
    })

    rainbow.addEventListener('click', () => {
        pen.style.backgroundColor = 'transparent'
        eraser.style.backgroundColor = 'transparent'
        rainbow.style.backgroundColor = '#5db4ff'
        toolType = 'rainbow'
    })

    reset.addEventListener('click', () => {
        let items = document.querySelectorAll('.canvasItem')
        items.forEach(i => i.style.backgroundColor = 'transparent')
    }) 
}

function register() {
    registerGridSize()
    registerColorPicker()
    registerDrawButtons()
}