let selectCanvas = document.querySelector('canvas');
selectCanvas.width = window.innerWidth;
selectCanvas.height = window.innerHeight;
let canvas = selectCanvas.getContext('2d');
window.addEventListener('resize', function () {
    selectCanvas.width = window.innerWidth;
    selectCanvas.height = window.innerHeight;
    init()
})
let mouseClick={x: undefined, y:undefined}
window.addEventListener('click', function (e) {
    mouseClick.x=e.x;
    mouseClick.y=e.y;
init()

    animation()
})
class CircularMotion {
    constructor(x, y, raduis, color) {
        this.x = x;
        this.y = y;
        this.raduis = raduis;
        this.color = color
    }
    drawing() {
        canvas.beginPath();
        canvas.arc(this.x, this.y, this.raduis, 0 , Math.PI*2);
        canvas.fill();
        canvas.fillStyle = `${this.color}`;
        canvas.closePath()
    }
    moving() {
    }
    
}

let motion;
let arr = [];
let colors = ["#00bdff", "#4d39ce", "#088eff"];
function init() {
    // for (let i = 0; i < 130; i++) {
        let angle = Math.random() * .05;
        let colorIndex = Math.floor(Math.random() * colors.length + 1)
        motion = new CircularMotion(mouseClick.x,mouseClick.y, 20, 'red');
    // }
}
function animation() {
    requestAnimationFrame(animation);
    canvas.clearRect(0, 0, selectCanvas.width, selectCanvas.height);
    motion.drawing()
}
