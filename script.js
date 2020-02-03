window.onload = function(){

    class Point{
        constructor(x, y){
            this.x = x;
            this.y = y;
        }
    }

    class GraphicLine{
        constructor(startCoord, curveCoord, curveEndCoord){
            this.curveCoord = new Point();
            this.curveEndCoord = new Point();
            this.startCoord = new Point();

            this.startCoord.x = startCoord.x;
            this.startCoord.y = startCoord.y;

            this.curveCoord.x = curveCoord.x;
            this.curveCoord.y = curveCoord.y;

            this.curveEndCoord.x = curveEndCoord.x;
            this.curveEndCoord.y = curveEndCoord.y;
        }

        draw(ctx){
            ctx.moveTo(this.startCoord.x, this.startCoord.y);
            ctx.quadraticCurveTo(this.curveCoord.x, this.curveCoord.y,
                this.curveEndCoord.x, this.curveEndCoord.y);
            ctx.stroke();
        }
    }

    const canv = document.getElementById("canv");
    const ctx = canv.getContext("2d");
    const CANV_WIDTH = canv.width;
    const CANV_HEIGHT = canv.height;
    const CANV_X_CENTER = CANV_WIDTH / 2;
    const CANV_Y_CENTER = CANV_HEIGHT / 2;

    const POINT_CANVAS = 6;
    const SECOND_CANVAS = 10;
    const POINT_PIXEL = CANV_HEIGHT / POINT_CANVAS;
    const SECOND_PIXEL = CANV_WIDTH/ SECOND_CANVAS;
    const START_POINT = new Point(0, CANV_HEIGHT);

    const ANIMATION_FREQ_UPDATE = 10;
    const COUNT_MILLISECOND_SECOND = 1000;
    
    const BACKGROUND_COLOR = "black";
    const START_LINE_WIDTH = 3;
    const START_LINE_CAP = "round";
    const TEXT_LINE_COLOR = "yellow";

    let graphicLine = new GraphicLine(START_POINT, START_POINT, START_POINT);
    
    makeDefaultStyle();
    drawBackground();
    graphicLine.draw(ctx);

    let animInt;
    startAnim();

    function startAnim(){
        animInt = setInterval(drawAnimation, ANIMATION_FREQ_UPDATE);
    }

    graphicLine.curveEndCoord.y = CANV_HEIGHT - (POINT_PIXEL * 2);

    function drawAnimation(){
        ctx.beginPath();
        clearCanvas();
        graphicLine.curveEndCoord.x += ANIMATION_FREQ_UPDATE * SECOND_PIXEL / COUNT_MILLISECOND_SECOND;
        drawBackground();
        graphicLine.draw(ctx);
        if(graphicLine.curveEndCoord.x >= SECOND_PIXEL * 5) clearInterval(animInt);
    }
    
    function makeDefaultStyle(){
        ctx.lineWidth = START_LINE_WIDTH;
        ctx.lineCap = START_LINE_CAP;
        ctx.strokeStyle = TEXT_LINE_COLOR;
    }

    function drawBackground(){
        ctx.fillStyle = BACKGROUND_COLOR;
        ctx.fillRect(0, 0, CANV_WIDTH, CANV_HEIGHT);
    }

    function clearCanvas(){
        ctx.clearRect(0, 0, CANV_WIDTH, CANV_HEIGHT);
    }

}