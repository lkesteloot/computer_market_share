
var COMPUTER_COUNT = gData[0].length;
console.log(COMPUTER_COUNT);
var YEAR_COUNT = gData.length;
var BAR_HEIGHT = 40;
var BAR_SPACING = 20;
var FPS = 10;

var canvas = document.getElementById("graph");
var ctx = canvas.getContext("2d");

var frame = 0;

var lerp = function(u1, u2, t) {
    if (t == 0) {
        // Don't read u2 if t is zero, u2 might be undefined.
        return u1;
    } else {
        var u = [];

        for (var i = 0; i < u1.length; i++) {
            u.push(u1[i] + (u2[i] - u1[i])*t);
        }

        return u;
    }
};

var graphUnits = function(ctx, values) {
    // Clear canvas.
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Figure out max sales.
    var maxUnits = 0;
    for (var i = 0; i < COMPUTER_COUNT; i++) {
        maxUnits = Math.max(maxUnits, values[i]);
    }
    var unitsPerPixel = maxUnits/canvas.width;

    ctx.font = "30px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (var i = 0; i < COMPUTER_COUNT; i++) {
        var units = values[i];
        var y = i*(BAR_HEIGHT + BAR_SPACING);
        var width = units/unitsPerPixel;

        var drawLabel = function() {
            ctx.fillText(gComputerNames[i], canvas.width/2, y + BAR_HEIGHT/2);
        };

        ctx.fillStyle = "#000000";
        drawLabel();

        ctx.save();
            ctx.beginPath();
            ctx.rect(0, y, width, BAR_HEIGHT);
            ctx.clip();

            ctx.fillStyle = "rgb(200, 0, 0)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#ffffff";
            drawLabel();
        ctx.restore();
    }
};

var update = function() {
    var row = Math.floor(frame/FPS);
    var t = frame%FPS/FPS;
    var values = lerp(gData[row], gData[row + 1], t);
    graphUnits(ctx, values);
    if (frame < (YEAR_COUNT - 1)*FPS) {
        frame += 1;
    }
    window.requestAnimationFrame(update);
};

update();

