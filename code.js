
var COMPUTER_COUNT = gData[0].length;
var YEAR_COUNT = gData.length;
var BAR_HEIGHT = 40;
var BAR_SPACING = 20;
var TOP_MARGIN = 30;
var RIGHT_MARGIN = 20;
var FRAMES_PER_YEAR = 60;

var canvas = document.getElementById("graph");
var ctx = canvas.getContext("2d");
var yearSelector = document.getElementById("yearSelector");
yearSelector.min = gYears[0];
yearSelector.max = gYears[gYears.length - 1];
yearSelector.value = gYears[0];

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

var graphUnits = function(ctx, year, values) {
    // Clear canvas.
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Figure out max sales.
    var maxUnits = 0;
    for (var i = 0; i < COMPUTER_COUNT; i++) {
        maxUnits = Math.max(maxUnits, values[i]);
    }
    var unitsPerPixel = maxUnits/(canvas.width - RIGHT_MARGIN);

    if (maxUnits > 0) {
        // Figure out grid parameters.
        var zeros = Math.floor(Math.log10(maxUnits));
        var majorStep = Math.pow(10, zeros);
        var minorStep = majorStep/10;

        // Figure out grid colors.
        let dark = (majorStep - maxUnits/10)/(maxUnits*0.9);
        let majorGray = Math.max(Math.min(127, Math.floor((1 - dark)*128)), 0);
        let minorGridGray = 128 + majorGray;
        let majorColor = "rgb(" + majorGray + "," + majorGray + "," + majorGray + ")";
        let minorGridColor = "rgb(" + minorGridGray + "," + minorGridGray + "," + minorGridGray + ")";
        let minorLabelGray = Math.min(128 + majorGray*2, 255);
        let minorLabelColor = "rgb(" + minorLabelGray + "," + minorLabelGray + "," + minorLabelGray + ")";

        // Fonts for units.
        ctx.font = "20px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Draw grid.
        var i = 0;
        while (true) {
            let units = i*minorStep;
            if (units > maxUnits) {
                break;
            }
            let x = units/unitsPerPixel;
            ctx.strokeStyle = i % 10 == 0 ? majorColor : minorGridColor;
            ctx.beginPath();
            ctx.moveTo(x, TOP_MARGIN);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();

            // Draw unit.
            if (i > 0 /*&& i % 10 == 0*/) {
                let label;
                if (units >= 1000000) {
                    label = (units/1000000) + "m";
                } else if (units >= 1000) {
                    label = (units/1000) + "k";
                } else {
                    label = units;
                }
                if (i % 10 == 0 || minorLabelGray < 255)  {
                    ctx.fillStyle = i % 10 == 0 ? majorColor : minorLabelColor;
                    ctx.fillText(label, x, TOP_MARGIN/2);
                }
            }

            i += 1;
        }
    }

    // Draw bars and labels.
    ctx.font = "30px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (var i = 0; i < COMPUTER_COUNT; i++) {
        var units = values[i];
        var y = TOP_MARGIN + i*(BAR_HEIGHT + BAR_SPACING);
        var width = unitsPerPixel === 0 ? 0 : units/unitsPerPixel;

        // Draw computer name.
        var drawLabel = function() {
            ctx.fillText(gComputerNames[i], (canvas.width - RIGHT_MARGIN)/2, y + BAR_HEIGHT/2);
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

    // Draw year.
    ctx.fillStyle = "rgb(0, 0, 0, 0.07)";
    ctx.font = "300px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(year, (canvas.width - RIGHT_MARGIN)/2, TOP_MARGIN + (canvas.height - TOP_MARGIN)/2);
};

var userIsAdjusting = false;

// Animation callback.
var update = function() {
    if (userIsAdjusting) {
        return;
    }

    var row = Math.floor(frame/FRAMES_PER_YEAR);
    var t = frame%FRAMES_PER_YEAR/FRAMES_PER_YEAR;
    var values = lerp(gData[row], gData[row + 1], t);
    yearSelector.value = gYears[row];
    graphUnits(ctx, gYears[row], values);
    if (frame < (YEAR_COUNT - 1)*FRAMES_PER_YEAR) {
        frame += 1;
    }
    window.requestAnimationFrame(update);
};

// Start the animation process.
update();

// Let the user set the year.
yearSelector.addEventListener("input", function() {
    userIsAdjusting = true;
    var year = parseInt(yearSelector.value);
    var row = gYears.indexOf(year);
    if (row !== -1) {
        graphUnits(ctx, year, gData[row]);
    }
});

