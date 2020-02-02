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

    const COUNT_MILLISECONDS_SECOND = 1000;

    const COEF_RICING_SPEED_SECOND = 0.35;
    const MILLISECONDS_ANIMATION_UPDATE_FREQ = 10;

    const DISTANCE_BETWEEN_SECONDS = 10;
    const DISTANCE_BETWEEN_POINTS = 6;
    const SECOND_DIFF = CANV_WIDTH / DISTANCE_BETWEEN_SECONDS;
    const POINTS_DIFF = CANV_HEIGHT / DISTANCE_BETWEEN_POINTS;
    const PIXELS_RICING_SPEED_POINTS = COEF_RICING_SPEED_SECOND * POINTS_DIFF;

    const START_GRAPHIC_LINE_COORD = new Point(SECOND_DIFF, CANV_HEIGHT - POINTS_DIFF);
    const FIVE_SECONDS_COORD = new Point((CANV_WIDTH + START_GRAPHIC_LINE_COORD.x) / 2, START_GRAPHIC_LINE_COORD.y);

    const START_LINE_WIDTH = 3.5;
    const START_LINE_CAP = "round";
    const BACKGROUND_COLOR = "black";
    const TEXT_LINE_COLOR = "yellow";

    let graphicLine = new GraphicLine(START_GRAPHIC_LINE_COORD, START_GRAPHIC_LINE_COORD);
    
    makeDefaultStyle();
    drawBackground();

    let graphicInt;
    drawAnimation();

    function drawAnimation(){
        for (let index = 1; index < DISTANCE_BETWEEN_SECONDS + 1; index++) {
            ctx.beginPath();
            ctx.lineTo(START_GRAPHIC_LINE_COORD.x * index, START_GRAPHIC_LINE_COORD.y);
            ctx.stroke();   
        }

        ctx.beginPath();
        console.log((CANV_HEIGHT - START_GRAPHIC_LINE_COORD.y) * 2);
        ctx.lineTo(START_GRAPHIC_LINE_COORD.x, (CANV_HEIGHT) - START_GRAPHIC_LINE_COORD.y * 2);
        ctx.stroke();

        // for (let index = 1; index < DISTANCE_BETWEEN_POINTS + 1; index++) {
        //     ctx.beginPath();
        //     ctx.lineTo(START_GRAPHIC_LINE_COORD.x, (CANV_HEIGHT) - START_GRAPHIC_LINE_COORD.y * index);
        //     ctx.stroke();   
        // }

        // graphicInt = setInterval(drawGraphic, MILLISECONDS_ANIMATION_UPDATE_FREQ);
    }

    function drawGraphic(){
        clearCanvas();
        graphicLine.curveEndCoord.x += MILLISECONDS_ANIMATION_UPDATE_FREQ * (SECOND_DIFF - (SECOND_DIFF / DISTANCE_BETWEEN_SECONDS)) / COUNT_MILLISECONDS_SECOND;
        // graphicLine.curveEndCoord.y -= PIXELS_RICING_SPEED_POINTS;
        if(graphicLine.curveEndCoord.x >= CANV_WIDTH - 5) clearInterval(graphicInt);
        drawBackground();
        graphicLine.draw(ctx);
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