const canvas=document.querySelector('.tint_drawing_board'); //querySelector('canvas')
const toolbar= document.getElementById('toolbar');
const ctx=canvas.getContext('2d');


let tint=false;
let lineWidth=5;
let lineCap='round';
let brush_type="pen";
let cap_list=document.getElementsByName("brush-cap");
let brush_type_list=document.getElementsByName("brush-type");
let startX, startY;

canvas.height=window.innerHeight;
canvas.width=window.innerWidth;

//=============================TINT PROPERTY CHANGE

//------clear screen
function clr(e){
    if(e.target.id=='clr'){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}
toolbar.addEventListener('click', clr);

//-----change canvas properties
function change_properties(e){
    if(e.target.id=='strokeStyle'){
        ctx.strokeStyle=e.target.value;
    }

    if(e.target.id=="lineWidth"){
        lineWidth=e.target.value;
    }

    if(e.target.name=='brush-cap'){
        for(var cap of cap_list){
            if(cap.checked){
                lineCap=cap.value;
            }
        }
    }
    if(e.target.name=='brush-type'){
        for(var brush of brush_type_list){
            if(brush.checked){
                brush_type=brush.value;
            }
        }
    }
    /*if(e.target.id=='fillStyle'){
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = e.target.value;
        ctx.fill();
    }*/

}
toolbar.addEventListener('change',change_properties);



//========================TINT STROKES==============

function startTinting(e){
    if(e.which==1){
        tint=true;
        Tinting(e);         //to draw single dots when mouse isn't moving
    }
}

function stopTinting(){
    tint=false;
    ctx.beginPath();
}

function Tinting(e){
    if(!tint) return;

    //tint properties
    ctx.lineCap=lineCap;
    ctx.lineWidth=lineWidth;

    //start tinting

    if(brush_type=="pen"){
        ctx.globalCompositeOperation="source-over";
        ctx.lineTo(e.clientX,e.clientY);
        ctx.stroke();
    }
    else if(brush_type=="eraser"){
        ctx.globalCompositeOperation="destination-out";
        ctx.lineTo(e.clientX,e.clientY);
        ctx.stroke();
    }

}

canvas.addEventListener("mousedown",startTinting);
canvas.addEventListener("mouseup",stopTinting);
canvas.addEventListener("mousemove",Tinting);

//=======================RESIZE CANVAS WITH WINDOW
function CanvasResize(){
    canvas.height=window.innerHeight;
    canvas.width=window.innerWidth;
}
window.addEventListener("resize", CanvasResize);