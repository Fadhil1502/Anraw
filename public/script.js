if("serviceWorker" in navigator){
    navigator.serviceWorker.register("/sw.js")
}

window.addEventListener("load", function(){
    setTimeout(function(){
        document.getElementById("container").removeChild(document.getElementById("loading"));
        document.getElementsByTagName("body")[0].style.overflow = "visible";
        
        if(document.getElementById("example") != null){
            generateExample();
        }
        if(document.getElementById("generate") != null){
            background();

            document.getElementById("input1").addEventListener("input", function(){
                for(var y = 0; y < 4; y++){
                    document.getElementsByName("amount")[y].value = (y + 1);
                }

                colorCode();

                document.getElementById("one").checked = true;
                document.getElementById("two").checked = false;
                document.getElementById("three").checked = false;
                document.getElementById("four").checked = false;

                for(var z = 2; z < 8; z++){
                    if(document.getElementById("color" + z) != null){
                        document.getElementById("allColor").removeChild(document.getElementById("color" + z));
                    }
                }

                document.getElementById("svgN1").setAttribute("onclick", "move(-1)");
                document.getElementById("svgP1").setAttribute("onclick", "move(1)");

                for(var x = 1; x < 8; x++){
                    document.getElementById("ball" + x).style.background = document.getElementById("input1").value;
                }
            })
        }
        if(document.getElementById("save") != null && document.getElementById("saveN") == null){
            sessionStorage.clear();

            document.getElementById("save").style.display = "";

            CCC();
        }
        if(document.getElementById("saveN") != null && sessionStorage.getItem("temporaryData") != null){
            setCode();
        }
        if(document.getElementById("post") != null){
            generateCandidate();
        }
        if(document.getElementById("gallery") != null){
            startGallery();

            window.addEventListener("scroll", function(){
                if(window.scrollY == document.documentElement.scrollHeight - window.innerHeight && document.getElementById("MA").value == 0){
                    botPalette();
                }
            })
        }
        if(document.getElementById("anrawTimeDiv") != null){
            setAnrawTime();
        }
    }, 1000)
})

function outro(){
    var div = document.createElement("div");
    var h1 = document.createElement("h1");
    var load = document.createTextNode("Please wait");

    div.setAttribute("id", "outro");
    h1.setAttribute("style", "color: var(--font-color); opacity: 0%; transition: 0.5s");

    h1.appendChild(load);
    div.appendChild(h1);

    document.getElementsByTagName("body")[0].appendChild(div);
    document.getElementsByTagName("body")[0].style.overflow = "hidden";

    setTimeout(function(){
        document.getElementById("outro").style.opacity = "100%";

        setTimeout(function(){
            document.getElementById("outro").getElementsByTagName("h1")[0].style.opacity = "100%";
        }, 7000)
    }, 1);
}

// Landing Page Script
function generateExample(){
    document.getElementById("exampleColors").innerHTML = "";

    var example = document.getElementById("exampleTitle").value.split(" ")[1];

    if(window.screen.width <= 425){
        var exampleWidth = (window.screen.width - 25) - 25;
    }
    else if(window.screen.width <= 1024){
        var exampleWidth = ((window.screen.width - 50) / 2) - 25;
    }
    else{
        var exampleWidth = ((window.screen.width - 100) / 2) - 25;
    }

    var amount = Math.floor(Math.random() * 7) + 1;
    var mainHue = Math.floor(Math.random() * 361);
    var mainSaturation = Math.floor(Math.random() * 101) / 100;
    var mainLightness = Math.floor(Math.random() * 101) / 100;
    
    example++
    
    var string1 = "setTempData('E" + example + "')";

    if(amount > 4){
        var alt = Math.floor(Math.random() * 4) + 1;
    }
    if(amount == 3 || alt == 3){
        var deg = Math.floor(Math.random() * 181);
    }
    if(amount == 4 || alt == 4){
        var deg = Math.floor(Math.random() * 91);
    }

    for(var y = 0; y < amount; y++){
        var hue = mainHue;
        var saturation = mainSaturation;
        var lightness = mainLightness;
        var div = document.createElement("div");
        var input = document.createElement("input");
        var string2 = "copyPaletteColorCode('E" + example + "C" + (y + 1) +"')";

        if(y > 0){
            if(amount == 2 || alt == 2){
                hue += 180;
            }
            else if(amount == 3 || alt == 3){
                if(y == 1){
                    hue += deg;
                }
                if(y == 2){
                    hue -= deg; 
                }
            }
            else if(amount == 4 || alt == 4){
                if(deg % 2 == 0){
                    if(y == 1){
                        hue += deg;
                    }
                    if(y == 2){
                        hue -= deg + 90;
                    }
                    if(y == 3){
                        hue += 180;
                    }
                }
                else{
                    if(y == 1){
                        hue += deg + 90;
                    }
                    if(y == 2){
                        hue -= deg;
                    }
                    if(y == 3){
                        hue += 180;
                    }
                }
            }
            if(amount > 4){
                var ToF = Math.floor(Math.random() * 2);

                if(ToF){
                    lightness = Math.floor(Math.random() * 101) / 100;
                }
                else{
                    if(y >= alt){
                        lightness = Math.floor(Math.random() * 101) / 100;
                    }
                }
            }
        }
        
        var c = (1 - Math.abs(2 * lightness - 1)) * saturation;
        var x = c * (1 - Math.abs((hue / 60) % 2 - 1));
        var m = lightness - c/2;
        var red = 0;
        var green = 0; 
        var blue = 0; 

        if (0 <= hue && hue < 60){
            red = c; green = x; blue = 0;
        } else if (60 <= hue && hue < 120){
            red = x; green = c; blue = 0;
        } else if (120 <= hue && hue < 180){
            red = 0; green = c; blue = x;
        } else if (180 <= hue && hue < 240){
            red = 0; green = x; blue = c;
        } else if (240 <= hue && hue < 300){
            red = x; green = 0; blue = c;
        } else if (300 <= hue){
            red = c; newGreen = 0; blue = x;
        }
        
        red = Math.round((red + m) * 255).toString(16);
        green = Math.round((green + m) * 255).toString(16);
        blue = Math.round((blue + m) * 255).toString(16);

        if (red.length == 1){
            red = "0" + red;
        }
        if (green.length == 1){
            green = "0" + green;
        }
        if (blue.length == 1){
            blue = "0" + blue;
        }

        var hex = "#" + red + green + blue;

        div.setAttribute("style", "width: " + (exampleWidth / amount) + "px; background: " + hex + ";");

        input.setAttribute("type", "text");
        input.setAttribute("value", hex);
        input.setAttribute("readonly", "");
        input.setAttribute("onclick", string2);
        input.setAttribute("id", "E" + example + "C" + (y + 1));

        document.getElementById("exampleColors").appendChild(div).appendChild(input);
    }

    document.getElementById("exampleTitle").value = "Example " + example;
    document.getElementById("exampleSave").setAttribute("onclick", string1);
}

function setAnrawCode(){
    var anrawCode = document.getElementById("anrawCodeLP").value.split("#");
    var temporaryData = [];

    if(document.getElementById("anrawCodeLP").value == ""){
        document.getElementById("anrawCodeLP").value = "5#ffffff#00ff95#ff9500#9500ff#0d0d0d";
    }
    else{
        if(Number.isInteger(parseInt(anrawCode[0])) && anrawCode[0] <= 7){
            if((parseInt(anrawCode[0]) + 1) == anrawCode.length){
                for(var x = 1; x <= anrawCode[0]; x++){
                    if(!isNaN(Number('0x' + anrawCode[x]))){
                        temporaryData.push("#" + anrawCode[x]);
                    }
                    else{
                        if(x == 1){
                            var num = "st";
                        }
                        else if(x == 2){
                            var num = "nd";
                        }
                        else if(x == 3){
                            var num = "rd";
                        }
                        else{
                            var num = "th";
                        }
    
                        document.getElementById("errorCodeLP").innerText = "the " + x + num + " code is not the color code!";
                    }
                }
    
                if(num == null){
                    temporaryData[7] = anrawCode[0];
            
                    sessionStorage.setItem("temporaryData", JSON.stringify(temporaryData));

                    window.location.href = "/save";
                
                    document.getElementById("container").removeChild(document.getElementById("saveN"));
                    document.getElementById("container").removeChild(document.getElementsByTagName("header")[0]);
                    document.getElementById("container").removeChild(document.getElementsByTagName("footer")[0]);
                    document.getElementById("save").style.display = "";

                    CCC();
                }
            }
            else{
                document.getElementById("errorCodeLP").innerText = "The first letter with the number of color codes does not match!";
            }
        }
        else{
            document.getElementById("errorCodeLP").innerText = "The first letter must be a number, less than 7 and followed by #!";
        }
    }
}
// Landing Page Script

// Generator Script
function background(){
    for(var x = 1; x < 8; x++){
        var wnh = Math.floor(Math.random() * 375);
        var vw = window.screen.width;
        var vh = window.screen.height;
        var div = document.createElement("div");

        div.setAttribute("class", "background-ball");
        div.setAttribute("style", "width: " + wnh + "px; height: " + wnh + "px; background: #ff9500; top: " + Math.floor(Math.random() * vh) + "px; left: " + Math.floor(Math.random() * vw) + "px;");
        div.setAttribute("id", "ball" + x);

        document.getElementById("generate").appendChild(div);
    }
}

function Reset(){
    window.scrollTo({ top: 0, behavior: "smooth" });

    for(var y = 0; y < 4; y++){
        document.getElementsByName("amount")[y].value = (y + 1);
    }

    document.getElementById("colorAmount").innerHTML = "<div class='color' style='background: #ff9500;'></div>";
    document.getElementById("finishInput").style.background = "#ff9500";

    for(var z = 2; z < 9; z++){
        if(document.getElementById("color" + z) != null){
            document.getElementById("allColor").removeChild(document.getElementById("color" + z));
        }
    }
    // for(var x = 1; x < 8; x++){
    //     document.getElementById("generate").removeChild(document.getElementById("ball" + x));
    // }

    background();
}

function colorCode(code){
    for(var y = 0; y < 4; y++){
        document.getElementsByName("amount")[y].value = (y + 1);
    }

    if(code == "hex"){
        var newHex = document.getElementById("mainColorHex").value;

        if(newHex.length == 3){
            newHex = newHex[0] + newHex[0] + newHex[1] + newHex[1] + newHex[2] + newHex[2];
        }
        else if(newHex.length == 6){
            newHex = document.getElementById("mainColorHex").value;
        }
        else{
            newHex = document.getElementById("input1").value.split("#")[1];
        }

        document.getElementById("input1").value = "#" + newHex;
    }
    else if(code == "rgb"){
        var newRed = parseInt(document.getElementById("mainColorRGB1").value).toString(16);
        var newGreen = parseInt(document.getElementById("mainColorRGB2").value).toString(16);
        var newBlue = parseInt(document.getElementById("mainColorRGB3").value).toString(16);
      
        if (newRed.length == 1){
            newRed = "0" + newRed;
        }
        if (newGreen.length == 1){
            newGreen = "0" + newGreen;
        }
        if (newBlue.length == 1){
            newBlue = "0" + newBlue;
        }

        document.getElementById("input1").value = "#" + newRed + newGreen + newBlue;
    }
    else if(code == "hsl"){
        var newHue = document.getElementById("mainColorHSL1").value;
        var newSaturation = document.getElementById("mainColorHSL2").value / 100;
        var newLightness = document.getElementById("mainColorHSL3").value / 100;

        var c = (1 - Math.abs(2 * newLightness - 1)) * newSaturation;
        var x = c * (1 - Math.abs((newHue / 60) % 2 - 1));
        var m = newLightness - c/2;
        var newRed = 0;
        var newGreen = 0; 
        var newBlue = 0; 

        if (0 <= newHue && newHue < 60){
            newRed = c; newGreen = x; newBlue = 0;
        } else if (60 <= newHue && newHue < 120){
            newRed = x; newGreen = c; newBlue = 0;
        } else if (120 <= newHue && newHue < 180){
            newRed = 0; newGreen = c; newBlue = x;
        } else if (180 <= newHue && newHue < 240){
            newRed = 0; newGreen = x; newBlue = c;
        } else if (240 <= newHue && newHue < 300){
            newRed = x; newGreen = 0; newBlue = c;
        } else if (300 <= newHue){
            newRed = c; newGreen = 0; newBlue = x;
        }
        
        newRed = Math.round((newRed + m) * 255).toString(16);
        newGreen = Math.round((newGreen + m) * 255).toString(16);
        newBlue = Math.round((newBlue + m) * 255).toString(16);

        if (newRed.length == 1){
            newRed = "0" + newRed;
        }
        if (newGreen.length == 1){
            newGreen = "0" + newGreen;
        }
        if (newBlue.length == 1){
            newBlue = "0" + newBlue;
        }

        document.getElementById("input1").value = "#" + newRed + newGreen + newBlue;
    }

    var hex = document.getElementById("input1").value;
    document.getElementById("colorAmount").innerHTML = "<div class='color' style='background: " + hex + ";'></div>";


    document.getElementById("mainColorHex").value = hex.split("#")[1];

    var red = parseInt ("0x" + hex[1] + hex[2]);
    var green = parseInt("0x" + hex[3] + hex[4]);
    var blue = parseInt("0x" + hex[5] + hex[6]);

    document.getElementById("mainColorRGB1").value = red;
    document.getElementById("mainColorRGB2").value = green;
    document.getElementById("mainColorRGB3").value = blue;

    red /= 255;
    green /= 255;
    blue /= 255;

    var cmin = Math.min(red, green, blue);
    var cmax = Math.max(red, green, blue);
    var delta = cmax - cmin;
    var hue = 0;
    var saturation = 0;
    var lightness = 0;

    if (delta == 0){
        hue = 0;
    }
    else if (cmax == red){
        hue = ((green - blue) / delta) % 6;
    }
    else if (cmax == green){
        hue = (blue - red) / delta + 2;
    }
    else{
        hue = (red - green) / delta + 4;
    }

    hue = Math.round(hue * 60);

    if (hue < 0){
        hue += 360;
    }

    lightness = (cmax + cmin) / 2;
    saturation = delta == 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));
    saturation = +(saturation * 100).toFixed(0);
    lightness = +(lightness * 100).toFixed(0);

    document.getElementById("mainColorHSL1").value = hue;
    document.getElementById("mainColorHSL2").value = saturation;
    document.getElementById("mainColorHSL3").value = lightness;

    document.getElementById("finishInput").style.background = document.getElementById("input1").value;

    for(var z = 2; z < 9; z++){
        if(document.getElementById("color" + z) != null){
            document.getElementById("allColor").removeChild(document.getElementById("color" + z));
        }
    }
    for(var x = 1; x < 8; x++){
        document.getElementById("ball" + x).style.background = document.getElementById("input1").value;
    }

    document.getElementById("one").checked = true;
}

function random(things){
    if(things == "color"){
        for(var x = 0; x < 4; x++){
            document.getElementsByName("amount")[x].value = (x + 1);
        }

        var randomHex = "";

        for(var hexLength = 0; hexLength < 6; hexLength++){
            var candidateRandomHex = Math.floor(Math.random() * 16);
            
            if(candidateRandomHex == 10){
                candidateRandomHex = "a";
            }
            else if(candidateRandomHex == 11){
                candidateRandomHex = "b";
            }
            else if(candidateRandomHex == 12){
                candidateRandomHex = "c";
            }
            else if(candidateRandomHex == 13){
                candidateRandomHex = "d";
            }
            else if(candidateRandomHex == 14){
                candidateRandomHex = "e";
            }
            else if(candidateRandomHex == 15){
                candidateRandomHex = "f";
            }
            
            randomHex += candidateRandomHex;
        }

        document.getElementById("input1").value = "#" + randomHex;

        colorCode();

        document.getElementById("colorAmount").innerHTML = "<div class='color' style='background: #" + randomHex + ";'></div>";
        document.getElementById("one").checked = true;
        document.getElementById("two").checked = false;
        document.getElementById("three").checked = false;
        document.getElementById("four").checked = false;
        document.getElementById("finishInput").style.background = document.getElementById("input1").value;
        
        for(var z = 2; z < 8; z++){
            if(document.getElementById("color" + z) != null){
                document.getElementById("allColor").removeChild(document.getElementById("color" + z));
            }
        }

        document.getElementById("svgN1").setAttribute("onclick", "move(-1)");
        document.getElementById("svgP1").setAttribute("onclick", "move(1)");

        for(var x = 1; x < 8; x++){
            document.getElementById("ball" + x).style.background = document.getElementById("input1").value;
        }
    }
    if(things == "amount"){
        var randomAmount = Math.floor(Math.random() * 5)

        if(randomAmount == 0 || randomAmount == 5){
            random("amount");
        }
        else{
            addColor(randomAmount);
        }
    }
    if(things == "finish"){
        for(var y = 1; y < document.getElementById("allColor").childNodes.length; y++){
            if(document.getElementById("lock" + y) != null){
                if(document.getElementById("lock" + y).checked == false){
                    var randomHex = document.getElementById("input" + (y + 1)).value;
    
                    var randomRed = parseInt ("0x" + randomHex[1] + randomHex[2]);
                    var randomGreen = parseInt("0x" + randomHex[3] + randomHex[4]);
                    var radnomBlue = parseInt("0x" + randomHex[5] + randomHex[6]);
    
                    randomRed /= 255;
                    randomGreen /= 255;
                    radnomBlue /= 255;
    
                    var cmin = Math.min(randomRed, randomGreen, radnomBlue);
                    var cmax = Math.max(randomRed, randomGreen, radnomBlue);
                    var delta = cmax - cmin;
                    var hue = 0;
                    var saturation = 0;
                    var lightness = 0;
    
                    if (delta == 0){
                        hue = 0;
                    }
                    else if (cmax == randomRed){
                        hue = ((randomGreen - radnomBlue) / delta) % 6;
                    }
                    else if (cmax == randomGreen){
                        hue = (radnomBlue - randomRed) / delta + 2;
                    }
                    else{
                        hue = (randomRed - randomGreen) / delta + 4;
                    }
    
                    hue = Math.round(hue * 60);
    
                    if (hue < 0){
                        hue += 360;
                    }
    
                    lightness = (cmax + cmin) / 2;
                    saturation = delta == 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));
                    saturation = +(saturation * 100).toFixed(0);
                    lightness = +(lightness * 100).toFixed(0);
    
                    if(lightness > 50){
                        lightness -= Math.floor(Math.random() * hue);
                    }
                    else{
                        lightness += Math.floor(Math.random() * hue);
                    }
    
                    if(lightness < 0){
                        lightness = Math.abs(lightness);
                    }
    
                    while(lightness > 100){
                        lightness -= 100
                    }

                    if(lightness == 0 || lightness == 100){
                        lightness = 50;
                    }
    
                    saturation /= 100;
                    lightness /= 100;
    
                    var c = (1 - Math.abs(2 * lightness - 1)) * saturation;
                    var x = c * (1 - Math.abs((hue / 60) % 2 - 1));
                    var m = lightness - c / 2;
                    var newRed = 0;
                    var newGreen = 0; 
                    var newBlue = 0; 
    
                    if (0 <= hue && hue < 60){
                        newRed = c; newGreen = x; newBlue = 0;
                    } else if (60 <= hue && hue < 120){
                        newRed = x; newGreen = c; newBlue = 0;
                    } else if (120 <= hue && hue < 180){
                        newRed = 0; newGreen = c; newBlue = x;
                    } else if (180 <= hue && hue < 240){
                        newRed = 0; newGreen = x; newBlue = c;
                    } else if (240 <= hue && hue < 300){
                        newRed = x; newGreen = 0; newBlue = c;
                    } else if (300 <= hue){
                        newRed = c; newGreen = 0; newBlue = x;
                    }
                    
                    newRed = Math.round((newRed + m) * 255).toString(16);
                    newGreen = Math.round((newGreen + m) * 255).toString(16);
                    newBlue = Math.round((newBlue + m) * 255).toString(16);
    
                    if (newRed.length == 1){
                        newRed = "0" + newRed;
                    }
                    if (newGreen.length == 1){
                        newGreen = "0" + newGreen;
                    }
                    if (newBlue.length == 1){
                        newBlue = "0" + newBlue;
                    }
    
                    document.getElementById("input" + (y + 1)).value = "#" + newRed + newGreen + newBlue;
                }
            }
        }
    }
}

function addColor(amount){
    for(var y = 0; y < 4; y++){
        document.getElementsByName("amount")[y].value = (y + 1);
    }

    var baseColor = document.getElementById("input1").value;
    var baseRed = parseInt ("0x" + baseColor[1] + baseColor[2]);
    var baseGreen = parseInt("0x" + baseColor[3] + baseColor[4]);
    var baseBlue = parseInt("0x" + baseColor[5] + baseColor[6]);

    baseRed /= 255;
    baseGreen /= 255;
    baseBlue /= 255;

    var cmin = Math.min(baseRed, baseGreen, baseBlue);
    var cmax = Math.max(baseRed, baseGreen, baseBlue);
    var delta = cmax - cmin;
    var baseHue = 0;
    var baseSaturation = 0;
    var baseLightness = 0;

    if (delta == 0){
        baseHue = 0;
    }
    else if (cmax == baseRed){
        baseHue = ((baseGreen - baseBlue) / delta) % 6;
    }
    else if (cmax == baseGreen){
        baseHue = (baseBlue - baseRed) / delta + 2;
    }
    else{
        baseHue = (baseRed - baseGreen) / delta + 4;
    }

    baseHue = Math.round(baseHue * 60);

    if (baseHue < 0){
        baseHue += 360;
    }

    baseLightness = (cmax + cmin) / 2;
    baseSaturation = delta == 0 ? 0 : delta / (1 - Math.abs(2 * baseLightness - 1));
    baseSaturation = +(baseSaturation * 100).toFixed(0);
    baseLightness = +(baseLightness * 100).toFixed(0);

    if(amount == 1){
        document.getElementById("one").checked = true;
    }
    else if(amount == 2){
        var add = 180;

        document.getElementById("two").checked = true;
    }
    else if(amount == 3){
        var deg = Math.floor(Math.random() * 181);
        var add = deg;
        var subtract = deg;

        document.getElementById("three").checked = true;
    }
    else if(amount == 4){
        var deg = Math.floor(Math.random() * 91);

        if(deg % 2 == 0){
            var add = deg;
            var subtract = deg + 90;
        }
        else{
            var add = deg + 90;
            var subtract = deg;
        }

        document.getElementById("four").checked = true;
    }
    
    var addColor = baseHue + add;
    var subtractColor = baseHue - subtract;
    var degColor = baseHue + 180;
    var color = ["hsl(" + baseHue + ", " + baseSaturation + "%, " + baseLightness + "%)", "hsl(" + addColor + ", " + baseSaturation + "%, " + baseLightness + "%)", "hsl(" + subtractColor + ", " + baseSaturation + "%, " + baseLightness + "%)", "hsl(" + degColor + ", " + baseSaturation + "%, " + baseLightness + "%)"];

    document.getElementById("colorAmount").innerHTML = "";

    for(var x = 0; x < amount; x++){
        var div = document.createElement("div");

        div.setAttribute("class", "color");
    
        div.style.background = color[x];
    
        document.getElementById("colorAmount").appendChild(div);
    } 
    for(var z = 2; z < 8; z++){
        if(document.getElementById("color" + z) != null){
            document.getElementById("allColor").removeChild(document.getElementById("color" + z));
        }
    }

    document.getElementById("svgN1").setAttribute("onclick", "move(-1)");
    document.getElementById("svgP1").setAttribute("onclick", "move(1)");

    if(addColor > 360){
        addColor -= 360;
    }
    else if(addColor < 0){
        addColor += 360;
    }
    if(subtractColor > 360){
        subtractColor -= 360;
    }
    else if(subtractColor < 0){
        subtractColor += 360;
    }
    if(degColor > 360){
        degColor -= 360;
    }
    else if(degColor < 0){
        degColor += 360;
    }

    var finishBaseHue = [addColor, subtractColor, degColor];

    for(var y = 1; y < amount; y++){
        var div1 = document.createElement("div");
        var div2 = document.createElement("div");
        var input = document.createElement("input");

        var finishHue = finishBaseHue[(y - 1)];
        var finishSaturation = baseSaturation / 100;
        var finishLightness = baseLightness / 100;

        var finishc = (1 - Math.abs(2 * finishLightness - 1)) * finishSaturation;
        var finishx = finishc * (1 - Math.abs((finishHue / 60) % 2 - 1));
        var finishm = finishLightness - finishc / 2;
        var finishRed = 0;
        var finishGreen = 0; 
        var finishBlue = 0; 
    
        if (0 <= finishHue && finishHue < 60){
            finishRed = finishc; finishGreen = finishx; finishBlue = 0;
        } else if (60 <= finishHue && finishHue < 120){
            finishRed = finishx; finishGreen = finishc; finishBlue = 0;
        } else if (120 <= finishHue && finishHue < 180){
            finishRed = 0; finishGreen = finishc; finishBlue = finishx;
        } else if (180 <= finishHue && finishHue < 240){
            finishRed = 0; finishGreen = finishx; finishBlue = finishc;
        } else if (240 <= finishHue && finishHue < 300){
            finishRed = finishx; finishGreen = 0; finishBlue = finishc;
        } else if (300 <= finishHue){
            finishRed = finishc; finishGreen = 0; finishBlue = finishx;
        }
        
        finishRed = Math.round((finishRed + finishm) * 255).toString(16);
        finishGreen = Math.round((finishGreen + finishm) * 255).toString(16);
        finishBlue = Math.round((finishBlue + finishm) * 255).toString(16);

        if (finishRed.length == 1){
            finishRed = "0" + finishRed;
        }
        if (finishGreen.length == 1){
            finishGreen = "0" + finishGreen;
        }
        if (finishBlue.length == 1){
            finishBlue = "0" + finishBlue;
        }

        div1.setAttribute("id", "color" + (y + 1));
        div1.setAttribute("class", "finish-color");
        div2.setAttribute("class", "input-color");
        input.setAttribute("type", "color");
        input.setAttribute("name", "color" + (y + 1));
        input.setAttribute("id", "input" + (y + 1));
        input.setAttribute("value", "#" + finishRed + finishGreen + finishBlue);
    
        document.getElementById("allColor").appendChild(div1).appendChild(div2).appendChild(input);
        div2.innerHTML += "<div class='button button-ncta-ball' onclick='removeFinish(" + (y + 1) + ")' style='position: absolute; right: 0; top: 0; width: 37.5px; height: 37.5px; padding: 0; text-align: center;'><svg xmlns='http://www.w3.org/2000/svg' height='37.5px' viewBox='0 0 25 25' width='37.5px' fill='var(--background-white)'><path d='M0 0h24v24H0V0z' fill='none'/><path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z'/></svg></div>"
        document.getElementById("color" + (y + 1)).innerHTML += "<div class='color-setting'><div onclick='move(-" + (y + 1) + ")' id='svgN" + (y + 1) + "'><svg xmlns='http://www.w3.org/2000/svg' height='37.5px' viewBox='0 0 25 25' width='37.5px' fill='var(--background-white)' class='button button-lcta-ball'><path d='M0 0h24v24H0V0z' fill='none' opacity='.87'/><path d='M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z'/></svg></div><input type='checkbox' name='lock' id='lock" + y + "'><label for='lock" + y + "'><svg xmlns='http://www.w3.org/2000/svg' height='37.5px' viewBox='0 0 25 25' width='37.5px' fill='#ffffff' class='button button-lcta-ball'><g fill='none'><path d='M0 0h24v24H0V0z'/><path d='M0 0h24v24H0V0z' opacity='.87'/></g><path d='M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z'/></svg></label><div onclick='move(" + (y + 1) + ")' id='svgP" + (y + 1) + "'><svg xmlns='http://www.w3.org/2000/svg' height='37.5px' viewBox='0 0 25 25' width='37.5px' fill='#ffffff' style='transform: rotate(180deg);' class='button button-lcta-ball'><path d='M0 0h24v24H0V0z' fill='none' opacity='.87'/><path d='M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z'/></svg></div></div>"
    }
    for(var x = 1; x < 8; x++){
        if(amount == 1){
            document.getElementById("ball" + x).style.background = document.getElementById("input1").value;
        }
        else if(amount == 2){
            if(x < 5){
                document.getElementById("ball" + x).style.background = document.getElementById("input1").value;
            }
            else{
                document.getElementById("ball" + x).style.background = document.getElementById("input2").value;
            }
        }
        else if(amount == 3){
            if(x < 3){
                document.getElementById("ball" + x).style.background = document.getElementById("input1").value;
            }
            else if(x < 5){
                document.getElementById("ball" + x).style.background = document.getElementById("input2").value;
            }
            else{
                document.getElementById("ball" + x).style.background = document.getElementById("input3").value;
            }
        }
        else if(amount == 4){
            if(x < 4){
                document.getElementById("ball" + x).style.background = document.getElementById("input1").value;
            }
            else if(x < 5){
                document.getElementById("ball" + x).style.background = document.getElementById("input2").value;
            }
            else if(x < 6){
                document.getElementById("ball" + x).style.background = document.getElementById("input3").value;
            }
            else{
                document.getElementById("ball" + x).style.background = document.getElementById("input4").value;
            }
        }
    }
}

function move(id){
    var oldParent = document.getElementById("allColor").childNodes;
    var newParent = [];
    var done = [];

    for(var x = 0; x < oldParent.length; x++){
        if(oldParent[x].nodeName != "#text"){
            newParent.push(oldParent[x]);
        }
    }

    if(id < 0){
        var validID = Math.abs(id);
        var element = newParent[(validID - 1)];
        newParent.splice((validID - 1), 1);

        if(1 == validID){
            newParent.splice(newParent.length, 0, element);
        }
        else{
            newParent.splice((validID - 2), 0, element);
        }
    }
    else{
        var validID = id;
        var element = newParent[(validID - 1)];
        newParent.splice((validID - 1), 1);

        if((newParent.length + 1) == validID){
            newParent.splice(0, 0, element);
        }
        else{
            newParent.splice(validID, 0, element);
        }
    }

    document.getElementById("allColor").innerHTML = "";
    
    for(var y = 0; y < newParent.length; y++){
        document.getElementById("allColor").appendChild(newParent[y]);

        for(var z = 0; z < newParent.length; z++){
            if(document.getElementById("svgP" + (z + 1)) != null && document.getElementById("svgN" + (z + 1)) != null && !done.includes(z)){
                document.getElementById("svgP" + (z + 1)).setAttribute("onclick", "move(" + (y + 1) + ")");
                document.getElementById("svgN" + (z + 1)).setAttribute("onclick", "move(-" + (y + 1) + ")");
                document.getElementById("input" + (z + 1)).setAttribute("name", "color" + (y + 1));

                done.push(z);
            }
        }
    }
}

function addNewColor(){
    var allHex = [];

    for(var x = 1; x < 8; x++){
        if(document.getElementById("input" + x) != null){
            allHex.push(document.getElementById("input" + x).value)
        }
    }

    var pickHex = Math.floor(Math.random() * allHex.length);

    var allRed = parseInt ("0x" + allHex[pickHex][1] + allHex[pickHex][2]);
    var allGreen = parseInt("0x" + allHex[pickHex][3] + allHex[pickHex][4]);
    var allBlue = parseInt("0x" + allHex[pickHex][5] + allHex[pickHex][6]);

    allRed /= 255;
    allGreen /= 255;
    allBlue /= 255;

    var cmin = Math.min(allRed, allGreen, allBlue);
    var cmax = Math.max(allRed, allGreen, allBlue);
    var delta = cmax - cmin;
    var hue = 0;
    var saturation = 0;
    var lightness = 0;

    if (delta == 0){
        hue = 0;
    }
    else if (cmax == allRed){
        hue = ((allGreen - allBlue) / delta) % 6;
    }
    else if (cmax == allGreen){
        hue = (allBlue - allRed) / delta + 2;
    }
    else{
        hue = (allRed - allGreen) / delta + 4;
    }

    hue = Math.round(hue * 60);

    if (hue < 0){
        hue += 360;
    }

    lightness = (cmax + cmin) / 2;
    saturation = delta == 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));
    saturation = +(saturation * 100).toFixed(0);
    lightness = +(lightness * 100).toFixed(0);

    if(lightness > 50){
        lightness -= Math.floor(Math.random() * hue);
    }
    else{
        lightness += Math.floor(Math.random() * hue);
    }

    if(lightness < 0){
        lightness = Math.abs(lightness);
    }

    while(lightness > 100){
        lightness -= 100
    }

    saturation /= 100;
    lightness /= 100;

    var c = (1 - Math.abs(2 * lightness - 1)) * saturation;
    var x = c * (1 - Math.abs((hue / 60) % 2 - 1));
    var m = lightness - c / 2;
    var newRed = 0;
    var newGreen = 0; 
    var newBlue = 0; 

    if (0 <= hue && hue < 60){
        newRed = c; newGreen = x; newBlue = 0;
    } else if (60 <= hue && hue < 120){
        newRed = x; newGreen = c; newBlue = 0;
    } else if (120 <= hue && hue < 180){
        newRed = 0; newGreen = c; newBlue = x;
    } else if (180 <= hue && hue < 240){
        newRed = 0; newGreen = x; newBlue = c;
    } else if (240 <= hue && hue < 300){
        newRed = x; newGreen = 0; newBlue = c;
    } else if (300 <= hue){
        newRed = c; newGreen = 0; newBlue = x;
    }
    
    newRed = Math.round((newRed + m) * 255).toString(16);
    newGreen = Math.round((newGreen + m) * 255).toString(16);
    newBlue = Math.round((newBlue + m) * 255).toString(16);

    if (newRed.length == 1){
        newRed = "0" + newRed;
    }
    if (newGreen.length == 1){
        newGreen = "0" + newGreen;
    }
    if (newBlue.length == 1){
        newBlue = "0" + newBlue;
    }

    if(allHex.length < 7){
        var div1 = document.createElement("div");
        var div2 = document.createElement("div");
        var input = document.createElement("input");

        div1.setAttribute("id", "color" + (allHex.length + 1));
        div1.setAttribute("class", "finish-color");
        div2.setAttribute("class", "input-color");
        input.setAttribute("type", "color");
        input.setAttribute("name", "color" + (allHex.length + 1));
        input.setAttribute("id", "input" + (allHex.length + 1));
        input.setAttribute("value", "#" + newRed + newGreen + newBlue);

        document.getElementById("allColor").appendChild(div1).appendChild(div2).appendChild(input);
        div2.innerHTML += "<div class='button button-ncta-ball' onclick='removeFinish(" + (allHex.length + 1) + ")' style='position: absolute; right: 0; top: 0; width: 37.5px; height: 37.5px; padding: 0; text-align: center;'><svg xmlns='http://www.w3.org/2000/svg' height='37.5px' viewBox='0 0 25 25' width='37.5px' fill='var(--background-white)'><path d='M0 0h24v24H0V0z' fill='none'/><path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z'/></svg></div>"
        document.getElementById("color" + (allHex.length + 1)).innerHTML += "<div class='color-setting'><div onclick='move(-" + (allHex.length + 1) + ")' id='svgN" + (allHex.length + 1) + "'><svg xmlns='http://www.w3.org/2000/svg' height='37.5px' viewBox='0 0 25 25' width='37.5px' fill='var(--background-white)' class='button button-lcta-ball'><path d='M0 0h24v24H0V0z' fill='none' opacity='.87'/><path d='M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z'/></svg></div><input type='checkbox' name='lock' id='lock" + allHex.length + "'><label for='lock" + allHex.length + "'><svg xmlns='http://www.w3.org/2000/svg' height='37.5px' viewBox='0 0 25 25' width='37.5px' fill='#ffffff' class='button button-lcta-ball'><g fill='none'><path d='M0 0h24v24H0V0z'/><path d='M0 0h24v24H0V0z' opacity='.87'/></g><path d='M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z'/></svg></label><div onclick='move(" + (allHex.length + 1) + ")' id='svgP" + (allHex.length + 1) + "'><svg xmlns='http://www.w3.org/2000/svg' height='37.5px' viewBox='0 0 25 25' width='37.5px' fill='#ffffff' style='transform: rotate(180deg);' class='button button-lcta-ball'><path d='M0 0h24v24H0V0z' fill='none' opacity='.87'/><path d='M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z'/></svg></div></div>"

        for(var y = 0; y < 4; y++){
            if(document.getElementsByName("amount")[y].checked == true){
                document.getElementsByName("amount")[y].value++;
            }
        }
    }
}

function removeFinish(colorId){
    document.getElementById("allColor").removeChild(document.getElementById("color" + colorId));

    for(var b = 0; b < 4; b++){
        if(document.getElementsByName("amount")[b].checked == true){
            document.getElementsByName("amount")[b].value--;
        }
    }

    var removeOldParent = document.getElementById("allColor").childNodes;
    var removeNewParent = [];
    var done = [];

    for(var x = 0; x < removeOldParent.length; x++){
        if(removeOldParent[x].nodeName != "#text"){
            removeNewParent.push(removeOldParent[x]);
        }
    }

    for(var a = 0; a < removeNewParent.length; a++){
        removeNewParent[a].setAttribute("id", "color" + (a + 1));

        if(removeNewParent[a].childNodes[0].childNodes[0] == null){
            document.getElementsByClassName("input-color")[0].childNodes[0].setAttribute("id", "input" + (a + 1));
            removeNewParent[a].childNodes[3].childNodes[1].setAttribute("id", "svgN" + (a + 1));
            removeNewParent[a].childNodes[3].childNodes[5].setAttribute("id", "svgP" + (a + 1));
        }
        else{
            removeNewParent[a].childNodes[0].childNodes[0].setAttribute("id", "input" + (a + 1));
            removeNewParent[a].childNodes[0].childNodes[1].setAttribute("onclick", "removeFinish(" + (a + 1) + ")");
            removeNewParent[a].childNodes[1].childNodes[0].setAttribute("id", "svgN" + (a + 1));
            removeNewParent[a].childNodes[1].childNodes[3].setAttribute("id", "svgP" + (a + 1));
        }
    }

    document.getElementById("allColor").innerHTML = "";

    for(var y = 0; y < removeNewParent.length; y++){
        document.getElementById("allColor").appendChild(removeNewParent[y]);

        for(var z = 0; z < removeNewParent.length; z++){
            if(document.getElementById("svgP" + (z + 1)) != null && document.getElementById("svgN" + (z + 1)) != null && !done.includes(z)){
                document.getElementById("svgP" + (z + 1)).setAttribute("onclick", "move(" + (y + 1) + ")");
                document.getElementById("svgN" + (z + 1)).setAttribute("onclick", "move(-" + (y + 1) + ")");
                document.getElementById("input" + (z + 1)).setAttribute("name", "color" + (y + 1));

                done.push(z);
            }
        }
    }
}
// Generator Script

// Save Script
function switchSetting(option){
    var options = ["CCC", "IP", "PDFF"];

    for(x = 0; x < 3; x++){
        if(document.getElementById("option" + options[x]) != null){
            document.getElementById("option" + options[x]).style.display = "none";
        }
    }

    document.getElementById("option" + option).style.display = "block";
    
    if(option == "CCC"){
        CCC();

        document.getElementById("saves").style.display = "none";
        document.getElementsByTagName("h5")[0].style.display = "none";
        document.getElementById("saves").setAttribute("onclick", "");
        document.getElementById("preview").style.flexDirection = "row";
        document.getElementById("preview").style.justifyContent = "space-evenly";
    }
    if(option == "IP"){
        IP();

        document.getElementById("saves").style.display = "block";
        document.getElementsByTagName("h5")[0].style.display = "block";
        document.getElementsByTagName("h5")[0].innerText = "Warning: when you click the 'Save' button, you will be asked about 'Download multiple files' click allow to download all slides";
        document.getElementById("saves").setAttribute("onclick", "downloadIP()");
        document.getElementById("preview").style.flexDirection = "row";
        document.getElementById("preview").style.justifyContent = "space-evenly";
    }
    if(option == "PDFF"){
        PDFF();

        document.getElementById("saves").style.display = "block";
        document.getElementsByTagName("h5")[0].style.display = "block";
        document.getElementsByTagName("h5")[0].innerText = "Attention: when you click the 'Save' button, it will show print menu so you can choose to print or save as pdf and if some colors are not present go to more settings then turn on background graphics";
        document.getElementById("saves").setAttribute("onclick", "window.print();");
        document.getElementById("preview").style.flexDirection = "column";
        document.getElementById("preview").style.justifyContent = "flex-start";
    }

}

function CCC(){    
    var allSaveColor = [];

    for(var x = 1; x <= 8; x++){
        if(document.getElementById("PI" + x) != null && document.getElementById("PI" + x).value != null){
            allSaveColor.push(document.getElementById("PI" + x).value);
        }
        else{
            if(sessionStorage.getItem("temporaryData") != null){
                allSaveColor.push(JSON.parse(sessionStorage.getItem("temporaryData"))[(x - 1)]);
            }
            else{
                allSaveColor.push(document.getElementById("anrawCode"))
            }
        }
    }

    sessionStorage.setItem("temporaryData", JSON.stringify(allSaveColor));

    document.getElementById("preview").innerHTML = "";

    for(y = 0; y < allSaveColor.slice(-1)[0]; y++){
        var div1 = document.createElement("div");
        var div2 = document.createElement("div");
        var div3 = document.createElement("div");
        var div4 = document.createElement("div");
        var div5 = document.createElement("div");
        var div6 = document.createElement("div");
        var p1 = document.createElement("p");
        var input2 = document.createElement("input");
        var p3 = document.createElement("p");
        var input4 = document.createElement("input");
        var input5 = document.createElement("input");
        var input6 = document.createElement("input");
        var p7 = document.createElement("p");
        var input8 = document.createElement("input");
        var input9 = document.createElement("input");
        var input10 = document.createElement("input");
        var text1 = document.createTextNode("Hex");
        var text2 = allSaveColor[y];

        var hex = allSaveColor[y];

        var red = parseInt ("0x" + hex[1] + hex[2]);
        var green = parseInt("0x" + hex[3] + hex[4]);
        var blue = parseInt("0x" + hex[5] + hex[6]);

        var text3 = document.createTextNode("RGB");
        var text4 = red;
        var text5 = green;
        var text6 = blue;

        red /= 255;
        green /= 255;
        blue /= 255;

        var cmin = Math.min(red, green, blue);
        var cmax = Math.max(red, green, blue);
        var delta = cmax - cmin;
        var hue = 0;
        var saturation = 0;
        var lightness = 0;

        if (delta == 0){
            hue = 0;
        }
        else if (cmax == red){
            hue = ((green - blue) / delta) % 6;
        }
        else if (cmax == green){
            hue = (blue - red) / delta + 2;
        }
        else{
            hue = (red - green) / delta + 4;
        }

        hue = Math.round(hue * 60);

        if (hue < 0){
            hue += 360;
        }

        lightness = (cmax + cmin) / 2;
        saturation = delta == 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));
        saturation = +(saturation * 100).toFixed(0);
        lightness = +(lightness * 100).toFixed(0);

        var text7 = document.createTextNode("HSL");
        var text8 = hue;
        var text9 = saturation;
        var text10 = lightness;

        div1.setAttribute("class", "CCC");
        div2.setAttribute("class", "CCCC");
        div2.setAttribute("style", "background: " + allSaveColor[y] + ";");
        div4.setAttribute("style", "display: flex; align-items: center; justify-content: space-between");
        div5.setAttribute("style", "display: flex; align-items: center; justify-content: space-between");
        div6.setAttribute("style", "display: flex; align-items: center; justify-content: space-between");
        p1.appendChild(text1);
        input2.setAttribute("style", "margin-left: 12.5px;");
        input2.setAttribute("value", text2);
        input2.setAttribute("id", "hex" + y);
        input2.setAttribute("readonly", "");
        input2.setAttribute("class", "input-save-hex");
        p3.appendChild(text3);
        input4.setAttribute("style", "margin-left: 12.5px;");
        input4.setAttribute("value", text4);
        input4.setAttribute("id", "r" + y);
        input4.setAttribute("readonly", "");
        input4.setAttribute("class", "input-save");
        input5.setAttribute("style", "margin-left: 12.5px;");
        input5.setAttribute("value", text5);
        input5.setAttribute("id", "g" + y);
        input5.setAttribute("readonly", "");
        input5.setAttribute("class", "input-save");
        input6.setAttribute("style", "margin-left: 12.5px;");
        input6.setAttribute("value", text6);
        input6.setAttribute("id", "b" + y);
        input6.setAttribute("readonly", "");
        input6.setAttribute("class", "input-save");
        p7.appendChild(text7);
        input8.setAttribute("style", "margin-left: 12.5px;");
        input8.setAttribute("value", text8);
        input8.setAttribute("id", "h" + y);
        input8.setAttribute("readonly", "");
        input8.setAttribute("class", "input-save");
        input9.setAttribute("style", "margin-left: 12.5px;");
        input9.setAttribute("value", text9 + "%");
        input9.setAttribute("id", "s" + y);
        input9.setAttribute("readonly", "");
        input9.setAttribute("class", "input-save");
        input10.setAttribute("style", "margin-left: 12.5px;");
        input10.setAttribute("value", text10 + "%");
        input10.setAttribute("id", "l" + y);
        input10.setAttribute("readonly", "");
        input10.setAttribute("class", "input-save");

        div1.appendChild(div2);

        div3.appendChild(div4).appendChild(p1);
        div3.appendChild(div4).appendChild(input2);
        div4.innerHTML += "<svg xmlns='http://www.w3.org/2000/svg' height='25px' viewBox='0 0 25 25' width='25px' fill='var(--background)' onclick='copyColor(hex" + y + ")'><path d='M0 0h24v24H0V0z' fill='none'/><path d='M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z'/></svg>";

        div3.appendChild(div5).appendChild(p3);
        div3.appendChild(div5).appendChild(input4);
        div5.innerHTML += "<svg xmlns='http://www.w3.org/2000/svg' height='25px' viewBox='0 0 25 25' width='25px' fill='var(--background)' onclick='copyColor(r" + y + ")'><path d='M0 0h24v24H0V0z' fill='none'/><path d='M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z'/></svg>";
        div3.appendChild(div5).appendChild(input5);
        div5.innerHTML += "<svg xmlns='http://www.w3.org/2000/svg' height='25px' viewBox='0 0 25 25' width='25px' fill='var(--background)' onclick='copyColor(g" + y + ")'><path d='M0 0h24v24H0V0z' fill='none'/><path d='M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z'/></svg>";
        div3.appendChild(div5).appendChild(input6);
        div5.innerHTML += "<svg xmlns='http://www.w3.org/2000/svg' height='25px' viewBox='0 0 25 25' width='25px' fill='var(--background)' onclick='copyColor(b" + y + ")'><path d='M0 0h24v24H0V0z' fill='none'/><path d='M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z'/></svg>";

        div3.appendChild(div6).appendChild(p7);
        div3.appendChild(div6).appendChild(input8);
        div6.innerHTML += "<svg xmlns='http://www.w3.org/2000/svg' height='25px' viewBox='0 0 25 25' width='25px' fill='var(--background)' onclick='copyColor(h" + y + ")'><path d='M0 0h24v24H0V0z' fill='none'/><path d='M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z'/></svg>";
        div3.appendChild(div6).appendChild(input9);
        div6.innerHTML += "<svg xmlns='http://www.w3.org/2000/svg' height='25px' viewBox='0 0 25 25' width='25px' fill='var(--background)' onclick='copyColor(s" + y + ")'><path d='M0 0h24v24H0V0z' fill='none'/><path d='M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z'/></svg>";
        div3.appendChild(div6).appendChild(input10);
        div6.innerHTML += "<svg xmlns='http://www.w3.org/2000/svg' height='25px' viewBox='0 0 25 25' width='25px' fill='var(--background)' onclick='copyColor(l" + y + ")'><path d='M0 0h24v24H0V0z' fill='none'/><path d='M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z'/></svg>";    

        div1.appendChild(div3);
        document.getElementById("preview").appendChild(div1);
    }
}

var copyColors = true;

function copyColor(code){
    if(copyColors){
        var oldValue = code.value;

        code.select();
        code.setSelectionRange(0, 99999);
    
        document.execCommand("copy");
    
        code.value = "copied";
    
        setTimeout(function(){ 
            code.value = oldValue;

            copyColors = true;
        }, 1000);
    }

    copyColors = false;
}

function IP(){
    document.getElementById("slides").innerHTML = "";
    document.getElementById("preview").innerHTML = "";

    var allSaveColor = [];
    var allCanvasCode = ["A", "A", "A", "A", "A", "A", "A", "A", "A", "A"];
    var canvasSquare = 540;
    var ctdx = [0];

    for(var x = 0; x < 8; x++){
        allSaveColor.push(JSON.parse(sessionStorage.getItem("temporaryData"))[x]);
    }
    for(var a = 1; a <= allSaveColor.slice(-1)[0]; a++){
        ctdx.push((canvasSquare / allSaveColor.slice(-1)[0]) * a);
    }
    
    sessionStorage.setItem("temporaryCode", JSON.stringify(allCanvasCode));

    for(var y = 0; y < allSaveColor.slice(-1)[0]; y++){
        var div = document.createElement("div");
        var label = document.createElement("label");
        var select = document.createElement("select");
        var option1 = document.createElement("option");
        var option2 = document.createElement("option");
        var option3 = document.createElement("option");
        var textL = document.createTextNode("Slide " + (y + 1));
        var textO1 = document.createTextNode("All colors");
        var textO2 = document.createTextNode("Message");
        var textO3 = document.createTextNode("Credit");
        var canvas = document.createElement("canvas");
        var ctd = canvas.getContext("2d");

        div.setAttribute("id", "S" + (y + 1));
        div.setAttribute("style", "width: 100%; margin: 6.25px 0px;");
        label.setAttribute("for", "OS" + (y + 1) + "IP");
        select.setAttribute("id", "OS" + (y + 1) + "IP");
        select.setAttribute("class", "slides");
        select.setAttribute("onchange", "reloadSlide(OS" + (y + 1) + "IP)");
        option1.setAttribute("value", "allColors");
        option2.setAttribute("value", "message");
        option3.setAttribute("value", "credit");
        canvas.setAttribute("style", "background: var(--background-white); margin: var(--margin-small);");
        canvas.setAttribute("id", "c" + y);

        canvas.width = canvasSquare;
        canvas.height = canvasSquare;

        label.appendChild(textL);
        option1.appendChild(textO1);
        option2.appendChild(textO2);
        option3.appendChild(textO3);

        div.appendChild(label);
        div.appendChild(select).appendChild(option1);
        div.appendChild(select).appendChild(option2);
        div.appendChild(select).appendChild(option3);

        document.getElementById("slides").appendChild(div);
        document.getElementById("preview").appendChild(canvas);

        for(var z = 0; z < allSaveColor.slice(-1)[0]; z++){
            var options = document.createElement("option");
            var textOs = document.createTextNode("Color " + (z + 1));
    
            options.setAttribute("value", "color" + (z + 1));

            ctd.fillStyle = allSaveColor[z];
            ctd.fillRect(ctdx[z], 0, canvasSquare / allSaveColor.slice(-1)[0], canvasSquare - 100);
    
            options.appendChild(textOs);

            document.getElementById("OS" + (y + 1) + "IP").appendChild(options);
        }

        ctd.fillStyle = "#0d0d0d";
        ctd.fillRect(0, canvasSquare - 100, canvasSquare, 100);

        ctd.beginPath();
        ctd.moveTo(0, 0);
        ctd.lineTo(canvasSquare, 0);
        ctd.lineTo(canvasSquare, canvasSquare);
        ctd.lineTo(0, canvasSquare);
        ctd.closePath();
        ctd.lineWidth = 25;
        ctd.strokeStyle = "#0d0d0d";
        ctd.stroke();

        for(var b = allSaveColor.slice(-1)[0]; b >= 0; b--){
            var randomX = Math.floor(Math.random() * canvasSquare);
            var randomY = Math.floor(Math.random() * 100);
            var randomR = Math.floor(Math.random() * 25);

            ctd.beginPath();
            ctd.arc(randomX, (canvasSquare - randomY) + (12.5 + randomR), 12.5 + randomR, 0, 2 * Math.PI);
            ctd.fillStyle = allSaveColor[b];
            ctd.fill();
        }
    }
    
    document.getElementById("HIP").value = "@anraw_palette #anraw ";

    for(var c = 0; c < allSaveColor.slice(-1)[0]; c++){
        document.getElementById("HIP").value += allSaveColor[c] + " ";
    }

    document.getElementById("HIP").value += "#becreative #colorspalette";
    
    document.getElementById("NIPS").value = allSaveColor.slice(-1)[0];
}

function reloadSlide(slide){
    var slideNum = document.getElementById("NIPS").value;

    if(slideNum <= 0){
        slideNum = 1;

        document.getElementById("NIPS").value = 1;
    }
    if(slideNum >= 11){
        slideNum = 10;

        document.getElementById("NIPS").value = 10;
    }

    var allSaveColor = [];
    var allCanvasCode = JSON.parse(sessionStorage.getItem("temporaryCode"));
    var canvasSquare = 540;
    var ctdx = [0];

    for(var x = 0; x < 8; x++){
        allSaveColor.push(JSON.parse(sessionStorage.getItem("temporaryData"))[x]);
    }

    if(document.getElementById("horizontal").checked){
        for(var a = 1; a <= allSaveColor.slice(-1)[0]; a++){
            ctdx.push((((canvasSquare - 10) / allSaveColor.slice(-1)[0]) * a));
        }
    }
    if(document.getElementById("vertical").checked){
        for(var a = 1; a <= allSaveColor.slice(-1)[0]; a++){
            ctdx.push((((canvasSquare - 100) / allSaveColor.slice(-1)[0]) * a));
        }
    }

    var colors = allSaveColor.slice(-1)[0];

    if(slide != null){
        if(slide.value == "allColors"){
            var canvas = document.getElementById("c" + (slide.id.split("S")[1].split("I")[0] - 1));
            var ctd = canvas.getContext("2d");

            ctd.clearRect(0, 0, canvas.width, canvas.height);

            if(document.getElementById("horizontal").checked){
                for(var z = 0; z < colors; z++){  
                    ctd.fillStyle = allSaveColor[z];
                    ctd.fillRect(ctdx[z], 0, canvasSquare / colors, canvasSquare);
                }
            }
            if(document.getElementById("vertical").checked){
                for(var z = 0; z < colors; z++){  
                    ctd.fillStyle = allSaveColor[z];
                    ctd.fillRect(0, ctdx[z], canvasSquare, (canvasSquare - 100) / colors);
                }
            }

            ctd.fillStyle = "#0d0d0d";
            ctd.fillRect(0, canvasSquare - 100, canvasSquare, 100);
    
            ctd.beginPath();
            ctd.moveTo(0, 0);
            ctd.lineTo(canvasSquare, 0);
            ctd.lineTo(canvasSquare, canvasSquare);
            ctd.lineTo(0, canvasSquare);
            ctd.closePath();
            ctd.lineWidth = 25;
            ctd.strokeStyle = "#0d0d0d";
            ctd.stroke();
    
            for(var b = colors; b >= 0; b--){
                var randomX = Math.floor(Math.random() * canvasSquare);
                var randomY = Math.floor(Math.random() * 100);
                var randomR = Math.floor(Math.random() * 25);
    
                ctd.beginPath();
                ctd.arc(randomX, (canvasSquare - randomY) + (12.5 + randomR), 12.5 + randomR, 0, 2 * Math.PI);
                ctd.fillStyle = allSaveColor[b];
                ctd.fill();
            }

            allCanvasCode[(slide.id.split("S")[1].split("I")[0] - 1)] = "A";
        }
        else if(slide.value == "horizontal"){
            for(var a = 0; a < 10; a++){
                if(allCanvasCode[a] == "A" && document.getElementById("c" + a) != null){
                    var canvas = document.getElementById("c" + a);
                    var ctd = canvas.getContext("2d");

                    ctd.clearRect(0, 0, canvas.width, canvas.height);

                    for(var z = 0; z < colors; z++){  
                        ctd.fillStyle = allSaveColor[z];
                        ctd.fillRect(ctdx[z], 0, canvasSquare / colors, canvasSquare);
                    }

                    ctd.fillStyle = "#0d0d0d";
                    ctd.fillRect(0, canvasSquare - 100, canvasSquare, 100);
            
                    ctd.beginPath();
                    ctd.moveTo(0, 0);
                    ctd.lineTo(canvasSquare, 0);
                    ctd.lineTo(canvasSquare, canvasSquare);
                    ctd.lineTo(0, canvasSquare);
                    ctd.closePath();
                    ctd.lineWidth = 25;
                    ctd.strokeStyle = "#0d0d0d";
                    ctd.stroke();
            
                    for(var b = colors; b >= 0; b--){
                        var randomX = Math.floor(Math.random() * canvasSquare);
                        var randomY = Math.floor(Math.random() * 100);
                        var randomR = Math.floor(Math.random() * 25);
            
                        ctd.beginPath();
                        ctd.arc(randomX, (canvasSquare - randomY) + (12.5 + randomR), 12.5 + randomR, 0, 2 * Math.PI);
                        ctd.fillStyle = allSaveColor[b];
                        ctd.fill();
                    }
                }
            }
        }
        else if(slide.value == "vertical"){
            for(var a = 0; a < 10; a++){
                if(allCanvasCode[a] == "A" && document.getElementById("c" + a) != null){
                    var canvas = document.getElementById("c" + a);
                    var ctd = canvas.getContext("2d");

                    ctd.clearRect(0, 0, canvas.width, canvas.height);

                    for(var z = 0; z < colors; z++){  
                        ctd.fillStyle = allSaveColor[z];
                        ctd.fillRect(0, ctdx[z], canvasSquare, canvasSquare / colors);
                    }

                    ctd.fillStyle = "#0d0d0d";
                    ctd.fillRect(0, canvasSquare - 100, canvasSquare, 100);
            
                    ctd.beginPath();
                    ctd.moveTo(0, 0);
                    ctd.lineTo(canvasSquare, 0);
                    ctd.lineTo(canvasSquare, canvasSquare);
                    ctd.lineTo(0, canvasSquare);
                    ctd.closePath();
                    ctd.lineWidth = 25;
                    ctd.strokeStyle = "#0d0d0d";
                    ctd.stroke();
            
                    for(var b = colors; b >= 0; b--){
                        var randomX = Math.floor(Math.random() * canvasSquare);
                        var randomY = Math.floor(Math.random() * 100);
                        var randomR = Math.floor(Math.random() * 25);
            
                        ctd.beginPath();
                        ctd.arc(randomX, (canvasSquare - randomY) + (12.5 + randomR), 12.5 + randomR, 0, 2 * Math.PI);
                        ctd.fillStyle = allSaveColor[b];
                        ctd.fill();
                    }
                }
            }
        }
        else if(slide.value == "message"){
            var canvas = document.getElementById("c" + (slide.id.split("S")[1].split("I")[0] - 1));
            var ctd = canvas.getContext("2d");
            var texts = document.getElementById("MIP").value.split(" ");
            var needFillText = 1;
            var word = [];
            var text = "";
            var f = 0;

            ctd.clearRect(0, 0, canvas.width, canvas.height);

            ctd.fillStyle = "#0d0d0d";
            ctd.fillRect(0, 0, canvasSquare, canvasSquare);

            for(var b = colors; b >= 0; b--){
                var randomX = Math.floor(Math.random() * canvasSquare);
                var randomY = Math.floor(Math.random() * canvasSquare);
                var randomR = Math.floor(Math.random() * (canvasSquare / 2));
    
                ctd.beginPath();
                ctd.arc(randomX, randomY, 25 + randomR, 0, 2 * Math.PI);
                ctd.fillStyle = allSaveColor[b];
                ctd.fill();
            }

            ctd.fillStyle = "#ffffff";
            ctd.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
            ctd.textAlign = "center";
            ctd.textBaseline = 'middle';

            var widthText = ctd.measureText(document.getElementById("MIP").value).width;

            while(widthText > canvasSquare - 20){
                widthText /= 2;
                needFillText++;
            }

            for(var d = 1; d <= needFillText; d++){
                for(var e = f; e < (texts.length / needFillText) * d; e++){
                    if(texts[e] != null){
                        text += texts[e] + " ";
                    }
                }

                word.push(text.substring(0, text.lastIndexOf(" ")));

                if(texts.length % 2 != 0){
                    f = Math.floor((texts.length / needFillText) * d) + 1;
                }
                else{
                    f = Math.floor((texts.length / needFillText) * d);
                }

                text = "";
            }
            for(var c = 0; c < needFillText; c++){
                ctd.fillText(word[c], canvasSquare / 2, (canvasSquare / 2) - (24 * (needFillText - (c + (needFillText - 1)))), canvasSquare - 20);
            }

            allCanvasCode[(slide.id.split("S")[1].split("I")[0] - 1)] = "M";
        }
        else if(slide.id == "MIP"){
            for(var a = 0; a < 10; a++){
                if(allCanvasCode[a] == "M" && document.getElementById("c" + a) != null){
                    var canvas = document.getElementById("c" + a);
                    var ctd = canvas.getContext("2d");
                    var texts = slide.value.split(" ");
                    var widthText = ctd.measureText(slide.value).width;
                    var needFillText = 1;
                    var word = [];
                    var text = "";
                    var f = 0;

                    ctd.clearRect(0, 0, canvas.width, canvas.height);

                    ctd.fillStyle = "#0d0d0d";
                    ctd.fillRect(0, 0, canvasSquare, canvasSquare);

                    for(var b = colors; b >= 0; b--){
                        var randomX = Math.floor(Math.random() * canvasSquare);
                        var randomY = Math.floor(Math.random() * canvasSquare);
                        var randomR = Math.floor(Math.random() * (canvasSquare / 2));
            
                        ctd.beginPath();
                        ctd.arc(randomX, randomY, 25 + randomR, 0, 2 * Math.PI);
                        ctd.fillStyle = allSaveColor[b];
                        ctd.fill();
                    }

                    ctd.fillStyle = "#ffffff";
                    ctd.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
                    ctd.textAlign = "center";
                    ctd.textBaseline = 'middle';

                    var widthText = ctd.measureText(document.getElementById("MIP").value).width;

                    while(widthText > canvasSquare - 20){
                        widthText /= 2;
                        needFillText++;
                    }

                    for(var d = 1; d <= needFillText; d++){
                        for(var e = f; e < (texts.length / needFillText) * d; e++){
                            if(texts[e] != null){
                                text += texts[e] + " ";
                            }
                        }

                        word.push(text.substring(0, text.lastIndexOf(" ")));

                        if(texts.length % 2 != 0){
                            f = Math.floor((texts.length / needFillText) * d) + 1;
                        }
                        else{
                            f = Math.floor((texts.length / needFillText) * d);
                        }

                        text = "";
                    }
                    for(var c = 0; c < needFillText; c++){
                        ctd.fillText(word[c], canvasSquare / 2, (canvasSquare / 2) - (24 * (needFillText - (c + (needFillText - 1)))), canvasSquare - 20);
                    }
                }
            }
        }
        else if(slide.value == "credit"){
            var canvas = document.getElementById("c" + (slide.id.split("S")[1].split("I")[0] - 1));
            var ctd = canvas.getContext("2d");
            var code = colors;

            for(var c = 0; c < colors; c++){
                code += allSaveColor[c];
            }

            ctd.clearRect(0, 0, canvas.width, canvas.height);

            ctd.fillStyle = "#0d0d0d";
            ctd.fillRect(0, 0, canvasSquare, canvasSquare);

            for(var b = colors; b >= 0; b--){
                var randomX = Math.floor(Math.random() * canvasSquare);
                var randomY = Math.floor(Math.random() * canvasSquare);
                var randomR = Math.floor(Math.random() * (canvasSquare / 2));
    
                ctd.beginPath();
                ctd.arc(randomX, randomY, 25 + randomR, 0, 2 * Math.PI);
                ctd.fillStyle = allSaveColor[b];
                ctd.fill();
            }

            ctd.fillStyle = "#ffffff";
            ctd.font = "36px Cambria, Cochin, Georgia, Times, 'Times New Roman', serif";
            ctd.textAlign = "center";
            ctd.fillText("This color palette", canvasSquare / 2, 46, canvasSquare);
            
            ctd.fillStyle = "#ffffff";
            ctd.font = "18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
            ctd.textAlign = "center";
            ctd.fillText("Created by", canvasSquare / 2, (canvasSquare / 2 ) - 52, canvasSquare);

            ctd.fillStyle = "#ffffff";
            ctd.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
            ctd.textAlign = "center";
            ctd.fillText("@" + document.getElementById("CIPC").value, canvasSquare / 2, (canvasSquare / 2 ) - 24, canvasSquare);

            ctd.fillStyle = "#ffffff";
            ctd.font = "18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
            ctd.textAlign = "center";
            ctd.fillText("Powered by", canvasSquare / 2, (canvasSquare / 2) + 18, canvasSquare);

            ctd.fillStyle = "#ffffff";
            ctd.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
            ctd.textAlign = "center";
            ctd.fillText("Anraw", canvasSquare / 2, (canvasSquare / 2 ) + 42, canvasSquare);

            ctd.fillStyle = "#ffffff";
            ctd.font = "18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
            ctd.textAlign = "center";
            ctd.fillText("Use code: " + code, canvasSquare / 2, canvasSquare - 42, canvasSquare - 20);

            ctd.fillStyle = "#ffffff";
            ctd.font = "18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
            ctd.textAlign = "center";
            ctd.fillText("Visit: anraw.herokuapp.com", canvasSquare / 2, canvasSquare - 18, canvasSquare);

            allCanvasCode[(slide.id.split("S")[1].split("I")[0] - 1)] = "C";
        }
        else if(slide.id == "CIPC"){
            for(var a = 0; a < 10; a++){
                if(allCanvasCode[a] == "C" && document.getElementById("c" + a) != null){
                    var canvas = document.getElementById("c" + a);
                    var ctd = canvas.getContext("2d");
                    var code = colors;

                    for(var c = 0; c < colors; c++){
                        code += allSaveColor[c];
                    }

                    ctd.clearRect(0, 0, canvas.width, canvas.height);

                    ctd.fillStyle = "#0d0d0d";
                    ctd.fillRect(0, 0, canvasSquare, canvasSquare);

                    for(var b = colors; b >= 0; b--){
                        var randomX = Math.floor(Math.random() * canvasSquare);
                        var randomY = Math.floor(Math.random() * canvasSquare);
                        var randomR = Math.floor(Math.random() * (canvasSquare / 2));
            
                        ctd.beginPath();
                        ctd.arc(randomX, randomY, 25 + randomR, 0, 2 * Math.PI);
                        ctd.fillStyle = allSaveColor[b];
                        ctd.fill();
                    }

                    ctd.fillStyle = "#ffffff";
                    ctd.font = "36px Cambria, Cochin, Georgia, Times, 'Times New Roman', serif";
                    ctd.textAlign = "center";
                    ctd.fillText("This color palette", canvasSquare / 2, 46, canvasSquare);

                    ctd.fillStyle = "#ffffff";
                    ctd.font = "18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
                    ctd.textAlign = "center";
                    ctd.fillText("Created by", canvasSquare / 2, (canvasSquare / 2 ) - 57, canvasSquare);

                    ctd.fillStyle = "#ffffff";
                    ctd.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
                    ctd.textAlign = "center";
                    ctd.fillText("@" + document.getElementById("CIPC").value, canvasSquare / 2, (canvasSquare / 2 ) - 24, canvasSquare);

                    ctd.fillStyle = "#ffffff";
                    ctd.font = "18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
                    ctd.textAlign = "center";
                    ctd.fillText("Powered by", canvasSquare / 2, (canvasSquare / 2) + 18, canvasSquare);

                    ctd.fillStyle = "#ffffff";
                    ctd.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
                    ctd.textAlign = "center";
                    ctd.fillText("Anraw", canvasSquare / 2, (canvasSquare / 2 ) + 42, canvasSquare);

                    ctd.fillStyle = "#ffffff";
                    ctd.font = "18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
                    ctd.textAlign = "center";
                    ctd.fillText("Use code: " + code, canvasSquare / 2, canvasSquare - 62, canvasSquare - 20);

                    ctd.fillStyle = "#ffffff";
                    ctd.font = "18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
                    ctd.textAlign = "center";
                    ctd.fillText("Visit: anraw.herokuapp.com", canvasSquare / 2, canvasSquare - 18, canvasSquare);
                }
            }
        }
        else if(slide.value.includes("color")){
            var canvas = document.getElementById("c" + (slide.id.split("S")[1].split("I")[0] - 1));
            var ctd = canvas.getContext("2d");
            var idColor = slide.value.split("r")[1] - 1;

            ctd.clearRect(0, 0, canvas.width, canvas.height);

            ctd.fillStyle = "#0d0d0d";
            ctd.fillRect(0, 0, canvasSquare, canvasSquare);

            ctd.fillStyle = allSaveColor[idColor];
            ctd.fillRect(10, 10, canvasSquare - 20, canvasSquare - 100);

            ctd.fillStyle = "#ffffff";
            ctd.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
            ctd.textAlign = "center";
            ctd.textBaseline = 'middle';

            var hex = allSaveColor[idColor];

            if(document.getElementById("OCIIP1").checked){
                ctd.fillText("Hex " + allSaveColor[idColor], canvasSquare / 2, canvasSquare - 69, canvasSquare);
            }
        
            var red = parseInt ("0x" + hex[1] + hex[2]);
            var green = parseInt("0x" + hex[3] + hex[4]);
            var blue = parseInt("0x" + hex[5] + hex[6]);
    
            if(document.getElementById("OCIIP2").checked){
                ctd.fillText("RGB " + red + " " + green + " " + blue, canvasSquare / 2, canvasSquare - 45, canvasSquare);
            }
    
            red /= 255;
            green /= 255;
            blue /= 255;
    
            var cmin = Math.min(red, green, blue);
            var cmax = Math.max(red, green, blue);
            var delta = cmax - cmin;
            var hue = 0;
            var saturation = 0;
            var lightness = 0;
    
            if (delta == 0){
                hue = 0;
            }
            else if (cmax == red){
                hue = ((green - blue) / delta) % 6;
            }
            else if (cmax == green){
                hue = (blue - red) / delta + 2;
            }
            else{
                hue = (red - green) / delta + 4;
            }
    
            hue = Math.round(hue * 60);
    
            if (hue < 0){
                hue += 360;
            }
    
            lightness = (cmax + cmin) / 2;
            saturation = delta == 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));
            saturation = +(saturation * 100).toFixed(0);
            lightness = +(lightness * 100).toFixed(0);

            if(document.getElementById("OCIIP3").checked){
                ctd.fillText("HSL " + hue + " " + saturation + " " + lightness, canvasSquare / 2, canvasSquare - 22, canvasSquare);
            }

            allCanvasCode[(slide.id.split("S")[1].split("I")[0] - 1)] = "Cs" + idColor;
        }
        else if(slide.value == "OCIIP"){
            for(var a = 0; a < 10; a++){
                if(allCanvasCode[a].includes("Cs") && document.getElementById("c" + a) != null){
                    var canvas = document.getElementById("c" + a);
                    var ctd = canvas.getContext("2d");
                    var idColor = JSON.parse(sessionStorage.getItem("temporaryCode"))[a].split("s")[1];

                    ctd.clearRect(0, 0, canvas.width, canvas.height);

                    ctd.fillStyle = "#0d0d0d";
                    ctd.fillRect(0, 0, canvasSquare, canvasSquare);

                    ctd.fillStyle = allSaveColor[idColor];
                    ctd.fillRect(10, 10, canvasSquare - 20, canvasSquare - 100);

                    ctd.fillStyle = "#ffffff";
                    ctd.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
                    ctd.textAlign = "center";
                    ctd.textBaseline = 'middle';

                    var hex = allSaveColor[idColor];

                    if(document.getElementById("OCIIP1").checked){
                        ctd.fillText("Hex " + hex, canvasSquare / 2, canvasSquare - 69, canvasSquare);
                    }
                
                    var red = parseInt ("0x" + hex[1] + hex[2]);
                    var green = parseInt("0x" + hex[3] + hex[4]);
                    var blue = parseInt("0x" + hex[5] + hex[6]);
            
                    if(document.getElementById("OCIIP2").checked){
                        ctd.fillText("RGB " + red + " " + green + " " + blue, canvasSquare / 2, canvasSquare - 45, canvasSquare);
                    }
            
                    red /= 255;
                    green /= 255;
                    blue /= 255;
            
                    var cmin = Math.min(red, green, blue);
                    var cmax = Math.max(red, green, blue);
                    var delta = cmax - cmin;
                    var hue = 0;
                    var saturation = 0;
                    var lightness = 0;
            
                    if (delta == 0){
                        hue = 0;
                    }
                    else if (cmax == red){
                        hue = ((green - blue) / delta) % 6;
                    }
                    else if (cmax == green){
                        hue = (blue - red) / delta + 2;
                    }
                    else{
                        hue = (red - green) / delta + 4;
                    }
            
                    hue = Math.round(hue * 60);
            
                    if (hue < 0){
                        hue += 360;
                    }
            
                    lightness = (cmax + cmin) / 2;
                    saturation = delta == 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));
                    saturation = +(saturation * 100).toFixed(0);
                    lightness = +(lightness * 100).toFixed(0);

                    if(document.getElementById("OCIIP3").checked){
                        ctd.fillText("HSL " + hue + " " + saturation + "% " + lightness + "%", canvasSquare / 2, canvasSquare - 22, canvasSquare);
                    }
                }
            }
        }
    }
    else{
        var allCanvasCode = ["A", "A", "A", "A", "A", "A", "A", "A", "A", "A"];

        document.getElementById("slides").innerHTML = "";
        document.getElementById("preview").innerHTML = "";

        for(var y = 0; y < slideNum; y++){
            var div = document.createElement("div");
            var label = document.createElement("label");
            var select = document.createElement("select");
            var option1 = document.createElement("option");
            var option2 = document.createElement("option");
            var option3 = document.createElement("option");
            var textL = document.createTextNode("Slide " + (y + 1));
            var textO1 = document.createTextNode("All colors");
            var textO2 = document.createTextNode("Message");
            var textO3 = document.createTextNode("Credit");
            var canvas = document.createElement("canvas");
            var ctd = canvas.getContext("2d");
    
            div.setAttribute("id", "S" + (y + 1));
            div.setAttribute("style", "width: 100%; margin: 6.25px 0px;");
            label.setAttribute("for", "OS" + (y + 1) + "IP");
            select.setAttribute("id", "OS" + (y + 1) + "IP");
            select.setAttribute("class", "slides");
            select.setAttribute("onchange", "reloadSlide(OS" + (y + 1) + "IP)");
            option1.setAttribute("value", "allColors");
            option2.setAttribute("value", "message");
            option3.setAttribute("value", "credit");
            canvas.setAttribute("style", "background: var(--background-white); margin: var(--margin-small);");
            canvas.setAttribute("id", "c" + y);
    
            canvas.width = canvasSquare;
            canvas.height = canvasSquare;
    
            label.appendChild(textL);
            option1.appendChild(textO1);
            option2.appendChild(textO2);
            option3.appendChild(textO3);
    
            div.appendChild(label);
            div.appendChild(select).appendChild(option1);
            div.appendChild(select).appendChild(option2);
            div.appendChild(select).appendChild(option3);
    
            document.getElementById("slides").appendChild(div);
            document.getElementById("preview").appendChild(canvas);
    
            for(var z = 0; z < colors; z++){
                var options = document.createElement("option");
                var textOs = document.createTextNode("Color " + (z + 1));
        
                options.setAttribute("value", "color" + (z + 1));
        
                if(document.getElementById("horizontal").checked){
                    for(var c = 0; c < colors; c++){  
                        ctd.fillStyle = allSaveColor[c];
                        ctd.fillRect(ctdx[c], 0, canvasSquare / colors, canvasSquare);
                    }
                }
                if(document.getElementById("vertical").checked){
                    for(var c = 0; c < colors; c++){  
                        ctd.fillStyle = allSaveColor[c];
                        ctd.fillRect(0, ctdx[c], canvasSquare, (canvasSquare - 100) / colors);
                    }
                }

                options.appendChild(textOs);
    
                document.getElementById("OS" + (y + 1) + "IP").appendChild(options);
            }
    
            ctd.fillStyle = "#0d0d0d";
            ctd.fillRect(0, canvasSquare - 100, canvasSquare, 100);

            ctd.beginPath();
            ctd.moveTo(0, 0);
            ctd.lineTo(canvasSquare, 0);
            ctd.lineTo(canvasSquare, canvasSquare);
            ctd.lineTo(0, canvasSquare);
            ctd.closePath();
            ctd.lineWidth = 25;
            ctd.strokeStyle = "#0d0d0d";
            ctd.stroke();
    
            for(var b = colors; b >= 0; b--){
                var randomX = Math.floor(Math.random() * canvasSquare);
                var randomY = Math.floor(Math.random() * 100);
                var randomR = Math.floor(Math.random() * 25);
    
                ctd.beginPath();
                ctd.arc(randomX, (canvasSquare - randomY) + (12.5 + randomR), 12.5 + randomR, 0, 2 * Math.PI);
                ctd.fillStyle = allSaveColor[b];
                ctd.fill();
            }
        }
    }
    
    sessionStorage.setItem("temporaryCode", JSON.stringify(allCanvasCode));
}

function downloadIP(){
    for(var x = 0; x < document.getElementById("NIPS").value; x++){
        if(window.navigator.msSaveBlob){
            window.navigator.msSaveBlob(document.getElementById("c" + x).toDataURL(), "slide" + (x + 1) + ".png");
        }
        else{
            var a = document.createElement("a");

            document.body.appendChild(a);

            a.href = document.getElementById("c" + x).toDataURL();
            a.download = "slide" + (x + 1) + ".png";
            a.click();

            document.body.removeChild(a);
        }
    }
}

function PDFF(){
    document.getElementById("preview").innerHTML = "";

    var h2 = document.createElement("h2");
    var p1 = document.createElement("p");
    var div = document.createElement("div");
    var p2 = document.createElement("p");

    h2.setAttribute("style", "margin: var(--margin-super); text-align: center; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;");
    h2.setAttribute("id", "title");
    p1.setAttribute("style", "margin: var(--margin-small); text-align: center;");
    p1.setAttribute("id", "opening");  
    div.setAttribute("style", "margin: var(--margin-small); text-align: center; display: flex; align-items: center; justify-content: space-evenly; flex-wrap: wrap;");
    div.setAttribute("id", "example");
    p2.setAttribute("style", "margin: var(--margin-small); text-align: center;");
    p2.setAttribute("id", "closing");  

    document.getElementById("preview").appendChild(h2);
    document.getElementById("preview").appendChild(p1);
    document.getElementById("preview").appendChild(div);
    document.getElementById("preview").appendChild(p2);

    fillText("title");
    fillText("opening");
    fillText("closing");
    examplePDF();
}

function fillText(text){
    if(text == "title"){
        document.getElementById(text).innerText = document.getElementById("TPDFF").value;
    }
    if(text == "opening"){
        document.getElementById(text).innerText = document.getElementById("OPDFF").value;
    }
    if(text == "closing"){
        document.getElementById(text).innerText = document.getElementById("CPDFF").value;
    }
}

function examplePDF(){
    document.getElementById("example").innerHTML = "";

    var data = JSON.parse(sessionStorage.getItem("temporaryData"));

    if(document.getElementById("OEPDFF1").checked){
        for(var x = 0; x < data[7]; x++){
            var div1 = document.createElement("div");
            var div2 = document.createElement("div");
            var p1 = document.createElement("p");
            var p2 = document.createElement("p");
            var p3 = document.createElement("p");

            var hex = data[x];

            var text1 = document.createTextNode("Hex " + hex);

            var red = parseInt ("0x" + hex[1] + hex[2]);
            var green = parseInt("0x" + hex[3] + hex[4]);
            var blue = parseInt("0x" + hex[5] + hex[6]);

            var text2 = document.createTextNode("RGB " + red + " " + green + " " + blue);

            red /= 255;
            green /= 255;
            blue /= 255;

            var cmin = Math.min(red, green, blue);
            var cmax = Math.max(red, green, blue);
            var delta = cmax - cmin;
            var hue = 0;
            var saturation = 0;
            var lightness = 0;

            if (delta == 0){
                hue = 0;
            }
            else if (cmax == red){
                hue = ((green - blue) / delta) % 6;
            }
            else if (cmax == green){
                hue = (blue - red) / delta + 2;
            }
            else{
                hue = (red - green) / delta + 4;
            }

            hue = Math.round(hue * 60);

            if (hue < 0){
                hue += 360;
            }

            lightness = (cmax + cmin) / 2;
            saturation = delta == 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));
            saturation = +(saturation * 100).toFixed(0);
            lightness = +(lightness * 100).toFixed(0);

            var text3 = document.createTextNode("HSL " + hue + " " + saturation + "% " + lightness + "% ");

            p1.appendChild(text1);
            p2.appendChild(text2);
            p3.appendChild(text3);

            div1.setAttribute("style", "display: flex; align-items: center; justify-content: space-evenly; flex-direction: column; width: 250px; height: 250px; margin: var(--margin-small);");
            div2.setAttribute("style", "background: " + hex + "; border-radius: 25px; width: 150px; height: 150px;")

            div1.appendChild(div2);
            div1.appendChild(p1);
            div1.appendChild(p2);
            div1.appendChild(p3);

            document.getElementById("example").appendChild(div1);
        }
    }
    if(document.getElementById("OEPDFF2").checked){
        var canvas = document.createElement("canvas");
        var ctd = canvas.getContext("2d");
        var posX = 0;

        canvas.width = 250;
        canvas.height = 250;

        canvas.setAttribute("style", "margin: var(--margin-small);");

        for(var x = 0; x < data[7]; x++){
            if(data[7] % 2 != 0){
                var sizeX = 250 / (parseInt(data[7]) + 6);
            }
            else{
                var sizeX = 250 / (parseInt(data[7]) + 7);
            }

            var sizeY = -(Math.floor(Math.random() * 250));

            ctd.fillStyle = data[x];
            ctd.fillRect(posX, 250, sizeX, sizeY);

            if(data[7] % 2 != 0){
                posX += (250 / (parseInt(data[7]) + 6)) * 2;
            }
            else{
                posX += (250 / (parseInt(data[7]) + 7)) * 2;
            }
        }

        document.getElementById("example").appendChild(canvas);
    }
    if(document.getElementById("OEPDFF3").checked){
        var canvas = document.createElement("canvas");
        var ctd = canvas.getContext("2d");

        canvas.width = 250;
        canvas.height = 250;

        canvas.setAttribute("style", "margin: var(--margin-small);");

        for(var x = 0; x < data[7]; x++){
            var startX = 0;
            var startY = Math.floor(Math.random() * 250);

            ctd.beginPath();
            ctd.moveTo(startX, startY);

            for(var y = 0; y < 7; y++){
                var startY = Math.floor(Math.random() * 250);
    
                ctd.lineTo(startX + (250 / data[7]), startY);

                startX += (250 / data[7]);
            }

            ctd.strokeStyle = data[x];
            ctd.lineWidth = 2.5;
            ctd.stroke();
        }

        document.getElementById("example").appendChild(canvas);
    }
    if(document.getElementById("OEPDFF4").checked){
        var canvas = document.createElement("canvas");
        var ctd = canvas.getContext("2d");
        var start = 0;

        canvas.width = 250;
        canvas.height = 250;

        canvas.setAttribute("style", "margin: var(--margin-small); transform: rotate(-90deg);");

        for(var x = 0; x < data[7]; x++){
            if(Math.floor(Math.random() * 2)){
                var randomEnd = ((2 / data[7]) * Math.PI) + (Math.random() * ((2 / data[7]) * Math.PI)) + start;
            }
            else{
                var randomEnd = ((2 / data[7]) * Math.PI) - (Math.random() * ((2 / data[7]) * Math.PI)) + start;
            }

            ctd.beginPath();
            ctd.moveTo(125, 125);

            if((x + 1) == data[7]){
                ctd.arc(125, 125, 125, start, 2 * Math.PI);
            }
            else{
                ctd.arc(125, 125, 125, start, randomEnd);
            }

            ctd.lineTo(125, 125);
            ctd.fillStyle = data[x];
            ctd.fill();

            start = randomEnd;
        }

        document.getElementById("example").appendChild(canvas);
    }
}

function setCode(){
    var data = JSON.parse(sessionStorage.getItem("temporaryData"));
    var code = data[7];

    for(var x = 0; x < data[7]; x++){
        code += data[x];
    }

    document.getElementById("anrawCode").value = code;

    anrawCode();
}

function anrawCode(){
    var anrawCode = document.getElementById("anrawCode").value.split("#");
    var temporaryData = [];

    if(document.getElementById("anrawCode").value == ""){
        document.getElementById("anrawCode").value = "5#ffffff#00ff95#ff9500#9500ff#0d0d0d";
    }
    else{
        if(Number.isInteger(parseInt(anrawCode[0])) && anrawCode[0] <= 7){
            if((parseInt(anrawCode[0]) + 1) == anrawCode.length){
                for(var x = 1; x <= anrawCode[0]; x++){
                    if(!isNaN(Number('0x' + anrawCode[x]))){
                        temporaryData.push("#" + anrawCode[x]);
                    }
                    else{
                        if(x == 1){
                            var num = "st";
                        }
                        else if(x == 2){
                            var num = "nd";
                        }
                        else if(x == 3){
                            var num = "rd";
                        }
                        else{
                            var num = "th";
                        }
    
                        document.getElementById("errorCode").innerText = "the " + x + num + " code is not the color code!";
                    }
                }
    
                if(num == null){
                    temporaryData[7] = anrawCode[0];
            
                    sessionStorage.setItem("temporaryData", JSON.stringify(temporaryData));
                
                    document.getElementById("container").removeChild(document.getElementById("saveN"));
                    document.getElementById("container").removeChild(document.getElementsByTagName("header")[0]);
                    document.getElementById("container").removeChild(document.getElementsByTagName("footer")[0]);
                    document.getElementById("save").style.display = "";
                
                    CCC();
                }
            }
            else{
                document.getElementById("errorCode").innerText = "The first letter with the number of color codes does not match!";
            }
        }
        else{
            document.getElementById("errorCode").innerText = "The first letter must be a number, less than 7 and followed by #!";
        }
    }
}

function doneSave(OC){
    if(document.getElementById("popup") != null){
        if(OC == "open"){
            document.getElementById("popup").style.display = "flex";
            document.getElementById("popup").style.top = "calc((100vh - " + document.getElementById("popup").offsetHeight + "px) / 2)";
            document.getElementById("popup").style.left = "calc((100vw - " + document.getElementById("popup").offsetWidth + "px) / 2)";
            document.getElementById("backgroundPopup").style.display = "block";
            document.getElementsByTagName("body")[0].style.overflow = "hidden";
        }
        if(OC == "close"){
            document.getElementById("popup").style.display = "";
            document.getElementById("popup").style.top = "";
            document.getElementById("popup").style.left = "";
            document.getElementById("backgroundPopup").style.display = "";
            document.getElementsByTagName("body")[0].style.overflow = "visible";
        }
    }
    else{
        sessionStorage.clear();
    }
}
// Save Script

// Post Script
function generateCandidate(){
    var data = JSON.parse(sessionStorage.getItem("temporaryData"));

    for(var x = 0; x < data[7]; x++){
        var div = document.createElement("div");
        var input = document.createElement("input");

        div.setAttribute("style", "background: " + data[x] + "; width: " + (750 / data[7]) + "px;");
        input.setAttribute("onclick", "quickCopy(" + x + ")");
        input.setAttribute("value", data[x]);
        input.setAttribute("readonly", "");
        input.setAttribute("id", "C" + x);

        div.appendChild(input);

        document.getElementById("colors").appendChild(div);
    }
}

function quickCopy(num){
    var color = document.getElementById("C" + num);

    color.select();
    color.setSelectionRange(0, 99999);

    document.execCommand("copy");
}

function generateSetup(){
    var data = JSON.parse(sessionStorage.getItem("temporaryData"));

    if(document.getElementById("allowSave").checked){
        document.getElementById("IS").style.display = "";
    }
    else{
        document.getElementById("IS").style.display = "none";
    }
    if(document.getElementById("allowQuickSave").checked){
        for(var x = 0; x < data[7]; x++){
            document.getElementById("C" + x).style.display = "";
        }
    }
    else{
        for(var x = 0; x < data[7]; x++){
            document.getElementById("C" + x).style.display = "none";
        }
    }
    if(document.getElementById("linkInstagram").checked){
        document.getElementById("II").style.display = "";
        document.getElementById("AI").style.display = "";
    }
    else{
        document.getElementById("II").style.display = "none";
        document.getElementById("AI").style.display = "none";
    }
}

function changeLink(){
    if(document.getElementById("accountInstagram").value.includes("@")){
        document.getElementById("II").href = "https://instagram.com/" + document.getElementById("accountInstagram").value.split("@")[1];
        document.getElementById("CIA").href = "https://instagram.com/" + document.getElementById("accountInstagram").value.split("@")[1];
    }
    else{
        document.getElementById("II").href = "https://instagram.com/" + document.getElementById("accountInstagram").value;
        document.getElementById("CIA").href = "https://instagram.com/" + document.getElementById("accountInstagram").value;
    }
}

function changeCreator(){
    document.getElementById("Ccreator").value = "Created by " + document.getElementById("creator").value;
}
// Post Script

// Gallery Script
function startGallery(){
    var palette = document.getElementsByClassName("palette").length;

    if(window.screen.width <= 425){
        var maxWidth = window.screen.width - 25;
    }
    else if(window.screen.width <= 1024){
        var maxWidth = window.screen.width - 50;
    }
    else{
        var maxWidth = window.screen.width - 100;
    }

    for(var x = 1; x <= palette; x++){
        if(window.screen.width <= 425){
            document.getElementsByClassName("palette")[x - 1].style.width = maxWidth + "px";
        }
        else{
            document.getElementsByClassName("palette")[x - 1].style.width = maxWidth * ((document.getElementById("P" + x).value * 10) / 100) + "px";
        }

        for(var y = 1; y <= 7; y++){
            if(document.getElementById("P" + x + "D" + y) != null){

                document.getElementById("P" + x + "D" + y).style.background = document.getElementById("P" + x + "I" + y).value;
                document.getElementById("P" + x + "D" + y).style.width = document.getElementsByClassName("palette")[x - 1].style.width.split("p")[0] / document.getElementById("P" + x).value + "px";

                document.getElementById("P" + x + "D" + y).removeChild(document.getElementById("P" + x + "I" + y));
            }
        }

        document.getElementsByClassName("colors")[x - 1].removeChild(document.getElementById("P" + x));
    }

    for(var z = 0; z < 3; z++){
        botPalette();
    }
}

function copyPaletteColorCode(id){
    var code = document.getElementById(id);

    code.select();
    code.setSelectionRange(0, 99999);

    document.execCommand("copy");
}

function setTempData(code){
    var tempData = [];

    for(var x = 1; x <= 7; x++){
        if(document.getElementById(code + "C" + x) != null){
            tempData.push(document.getElementById(code + "C" + x).value);
        }
    }

    tempData[7] = tempData.length;

    sessionStorage.setItem("temporaryData", JSON.stringify(tempData));
}

function botPalette(){
    var palette = document.getElementsByClassName("palette").length;

    if(window.screen.width <= 425){
        var maxWidth = window.screen.width - 25;
    }
    else if(window.screen.width <= 1024){
        var maxWidth = window.screen.width - 50;
    }
    else{
        var maxWidth = window.screen.width - 100;
    }

    for(var z = 1; z <= 7; z++){
        var div1 = document.createElement("div");
        var div2 = document.createElement("div");
        var div4 = document.createElement("div");
        var div5 = document.createElement("div");
        var div6 = document.createElement("div");
        var input2 = document.createElement("input");
        var input3 = document.createElement("input");
        var br = document.createElement("br");
        var string2 = "setTempData('P" + (palette + z) + "')";
        var amount = Math.floor(Math.random() * 7) + 1;
        var mainHue = Math.floor(Math.random() * 361);
        var mainSaturation = Math.floor(Math.random() * 101) / 100;
        var mainLightness = Math.floor(Math.random() * 101) / 100;

        if(amount > 4){
            var alt = Math.floor(Math.random() * 4) + 1;
        }
        if(amount == 3 || alt == 3){
            var deg = Math.floor(Math.random() * 181);
        }
        if(amount == 4 || alt == 4){
            var deg = Math.floor(Math.random() * 91);
        }

        for(var y = 0; y < amount; y++){
            var hue = mainHue;
            var saturation = mainSaturation;
            var lightness = mainLightness;
            var div3 = document.createElement("div");
            var input1 = document.createElement("input");
            var string1 = "copyPaletteColorCode('P" + (palette + z) + "C" + (y + 1) +"')";

            if(y > 0){
                if(amount == 2 || alt == 2){
                    hue += 180;
                }
                else if(amount == 3 || alt == 3){
                    if(y == 1){
                        hue += deg;
                    }
                    if(y == 2){
                        hue -= deg; 
                    }
                }
                else if(amount == 4 || alt == 4){
                    if(deg % 2 == 0){
                        if(y == 1){
                            hue += deg;
                        }
                        if(y == 2){
                            hue -= deg + 90;
                        }
                        if(y == 3){
                            hue += 180;
                        }
                    }
                    else{
                        if(y == 1){
                            hue += deg + 90;
                        }
                        if(y == 2){
                            hue -= deg;
                        }
                        if(y == 3){
                            hue += 180;
                        }
                    }
                }
                if(amount > 4){
                    var ToF = Math.floor(Math.random() * 2);

                    if(ToF){
                        lightness = Math.floor(Math.random() * 101) / 100;
                    }
                    else{
                        if(y >= alt){
                            lightness = Math.floor(Math.random() * 101) / 100;
                        }
                    }
                }
            }
            
            var c = (1 - Math.abs(2 * lightness - 1)) * saturation;
            var x = c * (1 - Math.abs((hue / 60) % 2 - 1));
            var m = lightness - c/2;
            var red = 0;
            var green = 0; 
            var blue = 0; 

            if (0 <= hue && hue < 60){
                red = c; green = x; blue = 0;
            } else if (60 <= hue && hue < 120){
                red = x; green = c; blue = 0;
            } else if (120 <= hue && hue < 180){
                red = 0; green = c; blue = x;
            } else if (180 <= hue && hue < 240){
                red = 0; green = x; blue = c;
            } else if (240 <= hue && hue < 300){
                red = x; green = 0; blue = c;
            } else if (300 <= hue){
                red = c; newGreen = 0; blue = x;
            }
            
            red = Math.round((red + m) * 255).toString(16);
            green = Math.round((green + m) * 255).toString(16);
            blue = Math.round((blue + m) * 255).toString(16);

            if (red.length == 1){
                red = "0" + red;
            }
            if (green.length == 1){
                green = "0" + green;
            }
            if (blue.length == 1){
                blue = "0" + blue;
            }

            var hex = "#" + red + green + blue;

            div3.setAttribute("style", "width: " + (maxWidth / amount) + "px; background: " + hex + ";");
            div3.setAttribute("id", "P" + (palette + z) + "D" + (y + 1));

            input1.setAttribute("type", "text");
            input1.setAttribute("value", hex);
            input1.setAttribute("readonly", "");
            input1.setAttribute("onclick", string1);
            input1.setAttribute("id", "P" + (palette + z) + "C" + (y + 1));

            div2.appendChild(div3).appendChild(input1);
        }

        div1.setAttribute("class", "palette");

        if(window.screen.width <= 425){
            div1.setAttribute("style", "width: " + maxWidth + "px;");
        }
        else{
            div1.setAttribute("style", "width: " + (maxWidth * ((amount * 10)) / 100) + "px;");
        }

        div2.setAttribute("class", "colors");
        div4.setAttribute("class", "settings");
        div5.setAttribute("style", "cursor: default; height: 50px; overflow: hidden;");
        div6.setAttribute("style", "display: flex;");
        
        input2.setAttribute("type", "text");
        input2.setAttribute("value", "Color Palette " + (palette + z));
        input2.setAttribute("readonly", "");
        input3.setAttribute("type", "text");
        input3.setAttribute("value", "Created by Anraw");
        input3.setAttribute("readonly", "");
        input3.setAttribute("class", "creator");

        div6.innerHTML = "<div class='LTI'><a href='https://www.instagram.com/anraw_palette' target='blank'><svg width='25' height='25' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'><path fill='var(--background)' d='M12.48 6.0675C8.93999 6.0675 6.05999 8.9475 6.05999 12.4875C6.05999 16.0275 8.93999 18.905 12.48 18.905C16.02 18.905 18.8975 16.025 18.8975 12.4875C18.9 8.9475 16.02 6.0675 12.48 6.0675ZM12.48 16.4575C10.29 16.4575 8.50999 14.6775 8.50999 12.4875C8.50999 10.2975 10.29 8.5175 12.48 8.5175C14.67 8.5175 16.45 10.2975 16.45 12.4875C16.45 14.6775 14.67 16.4575 12.48 16.4575ZM17.7275 0.125H7.23249C3.30999 0.125 0.117493 3.3175 0.117493 7.24V17.735C0.117493 21.6575 3.30999 24.85 7.23249 24.85H17.7275C21.65 24.85 24.8425 21.6575 24.8425 17.735V7.24C24.8425 3.3175 21.6525 0.125 17.7275 0.125ZM22.395 17.735C22.395 20.3075 20.3 22.4 17.7275 22.4H7.23249C4.65999 22.4 2.56749 20.3075 2.56749 17.735V7.24C2.56749 4.6675 4.65999 2.575 7.23249 2.575H17.7275C20.3 2.575 22.3925 4.6675 22.3925 7.24V17.735H22.395ZM18.9875 4.2125C18.0625 4.2125 17.3075 4.965 17.3075 5.8925C17.3075 6.8175 18.06 7.5725 18.9875 7.5725C19.9125 7.5725 20.6675 6.82 20.6675 5.8925C20.6675 4.965 19.9125 4.2125 18.9875 4.2125Z'/></svg></a></div><div onclick=" + string2 + " class='AS'><a href='/save'><svg xmlns='http://www.w3.org/2000/svg' height='25px' viewBox='0 0 25 25' width='25px' fill='var(--background'><g><rect fill='none' height='25' width='25'/></g><g><path d='M18,15v3H6v-3H4v3c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-3H18z M17,11l-1.41-1.41L13,12.17V4h-2v8.17L8.41,9.59L7,11l5,5 L17,11z'/></g></svg></a></div>"
        div5.appendChild(input2);
        div5.appendChild(br);
        div5.appendChild(input3);
        div4.appendChild(div5);
        div4.appendChild(div6);
        div1.appendChild(div2);
        div1.appendChild(div4);

        document.getElementById("gallery").appendChild(div1);
    }
}

function selection(){
    for(var x = 0; x < document.getElementsByClassName("palette").length; x++){
        document.getElementsByClassName("palette")[x].style.display = "";
    }

    if(document.getElementById("MA").value > 0){
        for(var y = 1; y <= document.getElementsByClassName("palette").length; y++){
            var run = true;

            for(var z = 1; z <= 8; z++){
                if(document.getElementById("P" + y + "D" + z) == null && run){
                    run = false;

                    if(document.getElementById("MA").value != z - 1){
                        document.getElementsByClassName("palette")[y - 1].style.display = "none";
                    }
                }
            }
        }
    }
    if(document.getElementById("MAS").checked){
        for(var y = 0; y < document.getElementsByClassName("palette").length; y++){
            if(document.getElementsByClassName("palette")[y].getElementsByClassName("AS")[0] == null){
                document.getElementsByClassName("palette")[y].style.display = "none";
            }
        }
    }
    if(document.getElementById("MAQS").checked){
        for(var y = 1; y <= document.getElementsByClassName("palette").length; y++){
            if(document.getElementById("P" + y + "C1") == null){
                document.getElementsByClassName("palette")[y - 1].style.display = "none";
            }
        }
    }
    if(document.getElementById("MAG").checked){
        for(var y = 0; y < document.getElementsByClassName("db").length; y++){
            document.getElementsByClassName("db")[y].style.display = "none";
        }
    }
    if(document.getElementById("MFA").checked){
        for(var y = 0; y < document.getElementsByClassName("palette").length; y++){
            if(document.getElementsByClassName("palette")[y].getElementsByClassName("LTI")[0] == null || document.getElementsByClassName("palette")[y].getElementsByTagName("a")[0].href != "https://www.instagram.com/anraw_palette" || document.getElementsByClassName("palette")[y].getElementsByClassName("creator")[0].value != "Created by Anraw"){
                document.getElementsByClassName("palette")[y].style.display = "none";
            }
        }
    }
    if(document.getElementById("MLTI").checked){
        for(var y = 0; y < document.getElementsByClassName("palette").length; y++){
            if(document.getElementsByClassName("palette")[y].getElementsByClassName("LTI")[0] == null){
                document.getElementsByClassName("palette")[y].style.display = "none";
            }
        }
    }
}
// Gallery Script

// Public Relation Script
function setAnrawTime(){
    let APM
    var anrawTime = new Date().getUTCHours() + 7;

    if(anrawTime > 12){
        anrawTime -= 12;
        APM = "PM";
    }
    if(anrawTime == 0){
        anrawTime = 12;
        APM = "AM"
    }

    document.getElementById("anrawTime").innerText = anrawTime + " " + APM;
}

function sendMail(){
    var a = document.createElement("a");
    var inputs = document.getElementsByTagName("input").length;
    var mailBody = "";

    for(var x = 0; x < inputs; x++){
        if(document.getElementsByTagName("input")[x].type == "radio" || document.getElementsByTagName("input")[x].type == "checkbox"){
            if(document.getElementsByTagName("input")[x].checked){
                mailBody += document.getElementsByTagName("h1")[0].innerText + " : " + document.getElementsByTagName("input")[x].value + "%0D%0A%0D%0A";
            }
        }
        else if(x == (inputs - 1) && document.getElementsByTagName("h1")[0].innerText != "Disrespectful Language Report"){
            mailBody += document.getElementsByTagName("textarea")[0].value + "%0D%0A%0D%0A";
        }
        if(document.getElementsByTagName("input")[x].type != "radio" && document.getElementsByTagName("input")[x].type != "checkbox"){
            mailBody += document.getElementsByTagName("input")[x].value + "%0D%0A%0D%0A";
        }
    }

    document.body.appendChild(a);

    a.href = "mailto:anrawofficial@gmail.com?subject=" + document.getElementsByTagName("h1")[0].innerText + " From Website&body=" + mailBody;
    a.target = "top";
    a.click();

    document.body.removeChild(a);
}
// Public Relation Script