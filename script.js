window.onload = function(){

    class Point{
        constructor(x, y){
            this.x = x;
            this.y = y;
        }
    }

    class GraphicLine{
        constructor(curveCoord, curveEndCoord){
            this.curveCoord = new Point();
            this.curveEndCoord = new Point();
            this.curveCoord.x = curveCoord.x;
            this.curveCoord.y = curveCoord.y;

            this.curveEndCoord.x = curveEndCoord.x;
            this.curveEndCoord.y = curveEndCoord.y;
        }

        draw(ctx){
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
    
    const BACKGROUND_COLOR = "black";
    const START_LINE_WIDTH = 3;
    const START_LINE_CAP = "round";
    const TEXT_LINE_COLOR = "yellow";

    makeDefaultStyle();
    drawBackground();
    
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