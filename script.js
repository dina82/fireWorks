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
    constructor(x, y, raduis, velocity, color) {
        this.x = x;
        this.y = y;
        this.raduis = raduis;
        this.velocity = velocity;
        this.color = color;
        this.opacity = 1;
    }
    drawing() {
        canvas.save()
        canvas.globalAlpha = this.opacity
        canvas.beginPath();
        canvas.arc(this.x, this.y, this.raduis, 0, Math.PI * 2);
        canvas.fillStyle = this.color;
        canvas.fill();
        canvas.closePath();
        canvas.restore()



    }
    moving() {
        this.x += this.velocity.x;
        this.y += this.velocity.y + .65;
        this.drawing()
        this.opacity -= .005;
    }
}

let arr = [];
function init() {
    for (let i = 0; i < 400; i++) {
        let angle = Math.PI * 2 * i / 400;
        let velocity = {
            x: Math.cos(angle) * 10 * Math.random(),
            y: Math.sin(angle) * 10 * Math.random()
        };
        let color = `hsl(${Math.random() * 200}, 50%,50%)`;
        let motion = new CircularMotion(mouseClick.x,
            mouseClick.y,
            5, velocity, color);
        arr.push(motion)
    }
}
function animation() {
    requestAnimationFrame(animation);
    canvas.fillStyle = 'rgba(0, 0, 0, .05)';
    canvas.fillRect(0, 0, selectCanvas.width, selectCanvas.height);
    arr.forEach(element => {
        if (element.opacity > 0) {
            element.moving()
        } else {
            element.opacity = 0
        }
    });
}
