$(document).ready(function(){
     if(window.innerWidth <= 700){
          $("#btn").css("--font-size", "25px");
          $("#font-size-adjuster").val(25);
          $("#font-size-slider-value").text("25");
     }
})

$(window).on("resize", function(){
     let fontSize = $("#btn").css("--font-size");
     fontSize = Number(fontSize.replace("px", ""));
     if(window.innerWidth <= 700 && fontSize >= 25){
          $("#btn").css("--font-size", "25px");
          $("#font-size-adjuster").val(25);
          $("#font-size-slider-value").text("25");
          currentFontSize = 25;

     }
     if(window.innerWidth > 700){
          console.log("increase")
          $("#btn").css("--font-size", `${currentFontSize}px`);
          $("#font-size-adjuster").val(currentFontSize);
          $("#font-size-slider-value").text(currentFontSize);
     }
})

let currentFontSize = 50;
let keysPressed = {};
let activeHover = ".hover-none";
let hover = [  "hover-scale-up",
               "hover-scale-down",
               "hover-expand",
               "hover-shrink",
               "hover-fade-out",
               "hover-fade-in",
               "hover-rainbow",
               "hover-border-light-up",
               "hover-empty",
               "hover-raise",
               "hover-pulse",
               "hover-stretchable",
               "hover-none"];

$("#btn-bg").on("change", function(){
     let value = $(this).val();
     $("#btn").css('--background-color', value);
     $("#bg-picker").val(value);
});

$("#bg-picker").on("input", function(){
     let value = $(this).val();
     $("#btn").css('--background-color', value);
     $("#btn-bg").val("none");
     $("#custom-bg-color").text(value);
});

$("#btn-txt").on("change", function(){
     let value = $(this).val();
     $("#btn").css('--color', value);
     $("#font-color-picker").val(value);
});

$("#font-color-picker").on("input", function(){
     let value = $(this).val();
     $("#btn").css("--color", value);
     $("#btn-txt").val("none");
     $("#custom-text-color").text(value);
});

$("#btn-shape").on("change", function(){
     var value = $(this).val();
     if(value === "0px"){

          $("#border-radius-adjuster").prop("disabled", false);
          $(".border-radius").removeClass("disabled");
          $("#btn").css("--border-radius", value);
     }
     else{

          $("#border-radius-adjuster").prop("disabled", true);
          $(".border-radius").addClass("disabled");
          $("#btn").css("--border-radius", value);
     }
});

$("#btn-hover").on("change", function(){
     let value = $(this).val();
     changeClass(value, "hover");
     activeHover = `.${value}`;
});

$("#padding-block-adjuster").on("input", function(){
     var value = $(this).val();
     $("#btn").css("--padding-block", `${value}em`);
     $("#padding-block-slider-value").text(value);
});

$("#padding-inline-adjuster").on("input", function(){
     var value = $(this).val();
     $("#btn").css("--padding-inline", `${value}em`);
     $("#padding-inline-slider-value").text(value);
});

$("#font-size-adjuster").on("input", function(){
     var value = $(this).val();
     $("#btn").css("--font-size", `${value}px`);
     $("#font-size-slider-value").text(value);
     currentFontSize = value;
});

$("#placeholder-text").on("input", function(){
     $("#btn").text($(this).val());
});

$("#border-radius-adjuster").on("input", function(){
     var value = $(this).val();
     $("#btn").css("--border-radius",`${value}em`);
     $("#border-radius-slider-value").text(value);
     if(value == 0){

          $("#btn-shape").prop("disabled", false);
          $(".btn-shape").removeClass("disabled");
     }
     else{

          $("#btn-shape").prop("disabled", true);
          $(".btn-shape").addClass("disabled");
     }
});

$("html").on("keydown", function(){
     keysPressed[event.key] = true;
     if(keysPressed['Control'] && event.key === " ") randomButton()
     if(keysPressed['Control'] && (event.key === "r" || event.key === "R")) {
          location.reload()
     }
     if(event.key === "Enter") generateCss();
     if(event.key === "Escape") {
          $(".modal").addClass("modal-hidden");
          $("header").removeClass("disabled");
          $("form").removeClass("disabled");
     }
})

$("html").on("keyup", function(){
     delete keysPressed[event.key];
})

$(".modal-close").on("click", function(){
     $(".modal").addClass("modal-hidden");
     $("header").removeClass("disabled");
     $("form").removeClass("disabled");

})

$("#btn").on("click", function(){
     generateCss();
})

$("form").on("submit", function(){
     event.preventDefault()
})

$(".css-copy").on("click", function(){

     let copy = $(".modal-content-css").text()

     const el = document.createElement("textarea");
     el.value = copy;
     document.body.appendChild(el);
     el.select();
     document.execCommand("copy");
     document.body.removeChild(el);
})

function changeClass(value, type){
     if(type === "hover"){
          let classes = [...hover]; 
          removeElement(classes, value);
          $("#btn").addClass(value).removeClass(classes);
     }
}

function removeElement(arr, element){
     for(let i = 0; i < arr.length; i++){
          if(arr[i] === element) arr.splice(i, 1);
     }
     return arr;
}

function getClassProp(value){
     let rules = document.styleSheets[0].cssRules;
     let classes = [];

     for(i = 0; i < (rules.length); i++){
          if(rules[i].cssText.includes(value)){
               classes.push(rules[i].cssText)
          }
     }

     return classes;
}

function getAnimationProp(animationName){
     if(animationName === "none"){
          return "";
     }
     let rules = document.styleSheets[0].cssRules;
     for(i = 0; i < rules.length; i++){
          if(rules[i].name === animationName) return rules[i].cssText;
     }
}

function randomColorGen(){

     return "#" + Math.random().toString(16).slice(2, 8)
}

function generateCss(){
     $(".modal").fadeIn();
     $(".modal").toggleClass("modal-hidden"); 

     $("header").toggleClass("disabled");
     $("form").toggleClass("disabled");

     let contentHTML = `<button class="${$("#btn").attr("class")}">${$("#btn").text()}</button>`; 

     let comment = "/* ----------------------------------------------\n* Generated by CssButtonAnimations.com\n* Licensed under FreeBSD License.\n* ---------------------------------------------- */\n\n";

     let buttonCSS = getClassProp(".bcg-button");

     let bcgButtonProp = `--color:${$("#btn").css("--color")};--background-color:${$("#btn").css("--background-color")};--padding-block:${$("#btn").css("--padding-block")};--padding-inline:${$("#btn").css("--padding-inline")};--font-size:${$("#btn").css("--font-size")};--border-radius:${$("#btn").css("--border-radius")};`;

     buttonCSS[0] = buttonCSS[0].replace(".", `${comment}.`).replace("{", "{\n\t" + bcgButtonProp).replaceAll(";", ";\n\t").replace("}", "}\n\n");

     let hoverCSS = getClassProp(activeHover).toString();
     hoverCSS = hoverCSS.replaceAll("},.", "}\n.").replaceAll("{", "{\n\t").replaceAll(";", ";\n\t").replaceAll("}", "}\n");

     $(".modal-content-html").text(contentHTML); 

     if(activeHover === ".hover-none"){
          $(".modal-content-css").text(buttonCSS[0]);
     }
     else if(activeHover != ".hover-none" && $("#btn").css("animation-name") != "none"){
          $(".modal-content-css").text(buttonCSS[0] + hoverCSS + "\n" + getAnimationProp($("#btn").css("animation-name")));
     }
     else{
          $(".modal-content-css").text(buttonCSS[0] + hoverCSS);
     }
}

function randomButton(){
     let bgColor = randomColorGen()
     let fontColor = randomColorGen()
     let hoverStyle = hover[Math.floor(Math.random() * (hover.length - 1))]

     let paddingInline = Math.random() * 2
     let paddingBlock = Math.random()
     let borderRadius = Math.random() * 2

     $("#btn-bg").val("none");
     $("#custom-bg-color").text(bgColor)
     $("#bg-picker").val(bgColor)
     $("#btn-txt").val("none")
     $("#custom-text-color").text(fontColor)
     $("#font-color-picker").val(fontColor)
     $("#btn-hover").val(hoverStyle)
     $("#padding-block-adjuster").val(paddingBlock)
     $("#padding-block-slider-value").text($("#padding-block-adjuster").val())
     $("#padding-inline-adjuster").val(paddingInline)
     $("#padding-inline-slider-value").text($("#padding-inline-adjuster").val())
     $("#border-radius-adjuster").val(borderRadius)
     $("#border-radius-slider-value").text($("#border-radius-adjuster").val())

     $("#btn").css("--background-color", bgColor)
     $("#btn").css({"--color": fontColor, "--shadow-color": fontColor})
     $("#btn").css("--padding-inline", `${paddingInline.toPrecision(4)}em`)
     $("#btn").css("--padding-block", `${paddingBlock.toPrecision(4)}em`)
     $("#btn").css("--border-radius", `${borderRadius.toPrecision(4)}em`)

     changeClass(hoverStyle, "hover")
     activeHover = `.${hoverStyle}`
}