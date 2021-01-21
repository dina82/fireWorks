let selectCanvas = document.querySelector('canvas');
selectCanvas.width = window.innerWidth;
selectCanvas.height = window.innerHeight;
let canvas = selectCanvas.getContext('2d');
window.addEventListener('resize', function () {
    selectCanvas.width = window.innerWidth;
    selectCanvas.height = window.innerHeight;
    init()
})
let mouseClick = { x: undefined, y: undefined }
window.addEventListener('click', function (e) {
    mouseClick.x = e.x;
    mouseClick.y = e.y;
    init()
    animation()
})
class CircularMotion {
    constructor(x, y, raduis, angle, color) {
        this.x = x;
        this.y = y;
        this.raduis = raduis;
        this.angle = angle;
        this.color = color;
    }
    drawing() {
        canvas.beginPath();
        canvas.arc(this.x, this.y, this.raduis, 0, Math.PI * 2);
        canvas.fill();
        canvas.fillStyle = `${this.color}`;
        canvas.closePath()
    }
    moving() {
        this.x += this.angle.x;
        this.y += this.angle.y;
        this.drawing()
    }

}

let arr = [];
let colors = ["#00bdff", "#4d39ce", "#088eff"];
function init() {
    for (let i = 0; i < 100; i++) {
        let angle = {
            x: Math.cos(Math.PI * 2 *i/50) ,
            y: Math.sin(Math.PI * 2*i/50) 
        };
        let colorIndex = Math.floor(Math.random() * colors.length + 1)
        let motion = new CircularMotion(mouseClick.x,
            mouseClick.y,
            10, angle, 'red');
        arr.push(motion)
    }
}
function animation() {
    requestAnimationFrame(animation);
    canvas.clearRect(0, 0, selectCanvas.width, selectCanvas.height);
    arr.forEach(element => {
        element.moving()
    });
}
