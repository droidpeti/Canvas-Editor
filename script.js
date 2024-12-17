const canvas = document.getElementById("Canvas");
const ctx = canvas.getContext("2d");
const imageLoader = document.getElementById("imageLoader");

function saveImage(){
    let canvasUrl = canvas.toDataURL("image/jpeg", 0.5);
    console.log(canvasUrl);
    const createEl = document.createElement('a');
    createEl.href = canvasUrl;
    createEl.download = "meno_webes_paint";
    createEl.click();
    createEl.remove();
}

function importIMG() {
    let file = imageLoader.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        }
        img.src = event.target.result;
    }
}

function rotate90() {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = canvas.height;
    tempCanvas.height = canvas.width;

    tempCtx.translate(tempCanvas.width / 2, tempCanvas.height / 2);
    tempCtx.rotate(Math.PI / 2);
    tempCtx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);

    canvas.width = tempCanvas.width;
    canvas.height = tempCanvas.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(tempCanvas, 0, 0);
}

function rotate270() 
{
    rotate90();
    rotate90();
    rotate90();
}

function mirror() {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    tempCtx.translate(tempCanvas.width, 0);
    tempCtx.scale(-1, 1);
    tempCtx.drawImage(canvas, 0, 0);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(tempCanvas, 0, 0);
}

function grayScale() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];
        const gray = 0.3 * red + 0.59 * green + 0.11 * blue;

        data[i] = gray;       // Red
        data[i + 1] = gray;   // Green
        data[i + 2] = gray;   // Blue
    }

    ctx.putImageData(imageData, 0, 0);
}