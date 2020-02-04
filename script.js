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

    class AnimationManager{

        startAnimation(){
            xEndCoordInt = setInterval(this.drawXCoord, ANIMATION_FREQ_UPDATE);
            yEndCoordInt = setInterval(this.drawYCoord, ANIMATION_FREQ_UPDATE);
            textCoefInt = setInterval(this.drawCoefText, ANIMATION_FREQ_UPDATE);
        }

        drawXCoord(){
            prepareAnimationFrame();
            graphicLine.curveEndCoord.x += ANIMATION_FREQ_UPDATE * SECOND_PIXEL / COUNT_MILLISECOND_SECOND;
            endAnimationFrame();
            graphicLine.draw(ctx);
            coefText.draw();
            if(graphicLine.curveEndCoord.x >= SECOND_PIXEL * 10 - 5) clearInterval(xEndCoordInt);
        }

        drawYCoord(){
            prepareAnimationFrame();
            graphicLine.curveEndCoord.y -= ANIMATION_FREQ_UPDATE * RICING_SPEED_PIXELS / COUNT_MILLISECOND_SECOND;
            endAnimationFrame();
            graphicLine.draw(ctx);
            coefText.draw();
            if(graphicLine.curveEndCoord.y <= CANV_HEIGHT - (POINT_PIXEL * 6) + 4) clearInterval(yEndCoordInt);
        }

        drawCoefText(){
            prepareAnimationFrame();
            coefText.coefNumber += 0.0035;
            endAnimationFrame();
            graphicLine.draw(ctx);
            coefText.draw();
            if(coefText.coefNumber > 6) clearInterval(textCoefInt);
        }
    }

    class CoefText{
        coefNumber = 0;
        textColor = "white";
        drawCoordinates = new Point();
        fontSize = 0;

        constructor(coefNumber, textColor, drawCoordinates, fontSize){
            this.coefNumber = coefNumber;
            this.textColor = textColor;
            this.drawCoordinates = drawCoordinates;
            this.fontSize = fontSize;
        }

        draw(){
            ctx.fillStyle = this.textColor;
            ctx.font = `${this.fontSize}px Arial`;
            ctx.fillText(`${this.coefNumber.toFixed(2)}X`, this.drawCoordinates.x, this.drawCoordinates.y);
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
    const COEF_TEXT_POINT = new Point(CANV_X_CENTER - POINT_PIXEL, CANV_Y_CENTER);
    const OFFSET_FOR_POINTS = Math.floor(CANV_WIDTH / 70);
    const OFFSET_FOR_SECONDS = Math.floor(CANV_HEIGHT / 45);

    const ANIMATION_FREQ_UPDATE = 10;
    const COUNT_MILLISECOND_SECOND = 1000;
    const POINTS_RICING_SPEED = 0.35;
    const RICING_SPEED_PIXELS = POINTS_RICING_SPEED * POINT_PIXEL;
    
    const BACKGROUND_COLOR = "black";
    const START_LINE_WIDTH = 3;
    const START_LINE_CAP = "round";
    const TEXT_LINE_COLOR = "yellow";
    const COEF_TEXT_COLOR = "white";
    const TEXT_SIZE = 16;
    const COEF_TEXT_SIZE = 48;

    let xEndCoordInt = 0;
    let yEndCoordInt = 0;
    let textCoefInt = 0;
    let graphicLine = new GraphicLine(START_POINT, START_POINT, START_POINT);
    let animManager = new AnimationManager();
    let coefText = new CoefText(0, COEF_TEXT_COLOR, COEF_TEXT_POINT, COEF_TEXT_SIZE);

    makeStartConfig();
    animManager.startAnimation();

    function makeStartConfig(){
        makeDefaultStyle();
        drawBackground();
        graphicLine.draw(ctx);
    }

    function prepareAnimationFrame(){
        ctx.beginPath();
        clearCanvas();
    }

    function endAnimationFrame(){
        drawBackground();
        drawSecondsText(ctx);
        drawPointsText(ctx);
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

    function drawPointsText(ctx){
        ctx.fillStyle = TEXT_LINE_COLOR;
        ctx.font = `${TEXT_SIZE}px Arial`;
        ctx.fillText("3X", OFFSET_FOR_POINTS, CANV_HEIGHT - (POINT_PIXEL * 3));
        ctx.fillText("6X", OFFSET_FOR_POINTS, CANV_HEIGHT - (POINT_PIXEL * 6) + 20);
    }

    function drawSecondsText(ctx){
        ctx.fillStyle = TEXT_LINE_COLOR;
        ctx.font = `${TEXT_SIZE}px Arial`;
        ctx.fillText("5s", SECOND_PIXEL * 5, CANV_HEIGHT - OFFSET_FOR_SECONDS);
        ctx.fillText("10s", SECOND_PIXEL * 10 - 30, CANV_HEIGHT - OFFSET_FOR_SECONDS);
    }

}