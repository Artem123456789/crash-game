window.onload = function(){

    class Point{
        constructor(x, y){
            this.x = x;
            this.y = y;
        }
    }

    class GraphicLine{
        constructor(firstCoord, endCoord){
            this.firstCoord = new Point();
            this.endCoord = new Point();
            this.firstCoord.x = firstCoord.x;
            this.firstCoord.y = firstCoord.y;

            this.endCoord.x = endCoord.x;
            this.endCoord.y = endCoord.y;
        }

        draw(ctx){
            ctx.quadraticCurveTo(this.firstCoord.x, this.firstCoord.y,
                this.endCoord.x, this.endCoord.y);
            ctx.stroke();
        }
    }

    const canv = document.getElementById("canv");
    const ctx = canv.getContext("2d");
    const CANV_WIDTH = canv.width;
    const CANV_HEIGHT = canv.height;
    const CANV_X_CENTER = CANV_WIDTH / 2;
    const CANV_Y_CENTER = CANV_HEIGHT / 2;
    const START_LINE_COORD = new Point(0, CANV_HEIGHT);
    let curvePoint = new Point(START_LINE_COORD.x, START_LINE_COORD.y);
    let curveEndPoint = new Point(START_LINE_COORD.x, START_LINE_COORD.y);
    let graphicLine = new GraphicLine(curvePoint, curveEndPoint);
    let xCoordInt;
    let yCoordInt;
    let curveAngleInt;
    ctx.lineWidth = 3.5;
    ctx.lineCap = "round";
    drawAnimation();

    function drawAnimation(){
        xCoordInt = setInterval(increaseGraphicXCoord, 10);
        yCoordInt = setInterval(increaseGraphicYCoord, 10);
        setTimeout(function(){
            curveAngleInt = setInterval(changeCurveAngleAfter, 10);
        }, 10000);
    }

    function beginAnimation(){
        clearCanvas(ctx);
        ctx.beginPath();
        ctx.moveTo(START_LINE_COORD.x, START_LINE_COORD.y);
    }

    function increaseGraphicXCoord(){
        beginAnimation();
        drawSecondsText();
        graphicLine.endCoord.x += 0.5;
        graphicLine.draw(ctx);
        ctx.stroke();
        changeCurveAngle();
        if(graphicLine.endCoord.x >= CANV_WIDTH - 10) clearInterval(xCoordInt);
    }

    function increaseGraphicYCoord(){
        beginAnimation();
        drawSecondsText();
        graphicLine.endCoord.y -= 0.25;
        graphicLine.draw(ctx);
        ctx.stroke();
        if(graphicLine.endCoord.y <= 30) clearInterval(yCoordInt);
    }

    function changeCurveAngle(){
        graphicLine.firstCoord.x += 0.3;
        graphicLine.firstCoord.y -= 0.01;
    }

    function changeCurveAngleAfter(){
        beginAnimation();
        drawSecondsText();
        graphicLine.firstCoord.x += 0.1;
        graphicLine.firstCoord.y += 0.01;
        graphicLine.draw(ctx);
        ctx.stroke();
        if(graphicLine.firstCoord.x >= CANV_WIDTH - 10) clearInterval(curveAngleInt);
    }

    function clearCanvas(ctx){
        ctx.clearRect(0, 0, CANV_WIDTH, CANV_HEIGHT);
    }

    function drawSecondsText(){
        ctx.font = "17px Arial";
        ctx.fillText("0s", 5, 20);
        ctx.fillText("5s", CANV_X_CENTER, 20);
        ctx.fillText("10s", CANV_WIDTH - 30, 20);
    }

}