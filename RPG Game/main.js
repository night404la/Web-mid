let mapArray,ctx,currentImgMain;
let imgMountain,imgMain,imgEnemy;
//預設每格200
const gridLength = 200;


$(function()
{
    mapArray = [ 
        [0,1,1],
        [0,0,0],
        [3,1,2]
    
    ];
    ctx = $("#myCanvas")[0].getContext("2d");
imgMain = new Image();
imgMain.src = "images/spriteSheet.png";
currentImgMain = {
"x":0,
"y":0
};

//當圖片載入後才執行 (因圖片載入速度比程式慢)
//圖片長度 l 80, h 130 
imgMain.onload = function(){
    ctx.drawImage(imgMain, 0,0,80,130,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
    }

});

//Draw 
imgMountain = new Image();
imgMountain.src = "images/material.png";
imgEnemy = new Image();
imgEnemy.src = "images/Enemy.png";
//2層圖片載入
imgMountain.onload = function()
{
    imgEnemy.onload = function()
    {
        //二維 2層
        for(var x in mapArray)
        {
            for(var y in mapArray[x])
            {
                //1 -> 山
                if(mapArray[x][y]==1)
                    {
                    ctx.drawImage(imgMountain, 32,65,32,32,y*gridLength,x*gridLength,gridLength,gridLength);
                    }
                // 3 ->敵人
                else if(mapArray[x][y]==3)
                    {
                    ctx.drawImage(imgEnemy, 7,40,104,135,y*gridLength,x*gridLength,gridLength,gridLength);
                    }
            }
        }
    }
}

$(document).on("keydown",function(event){
    let targetImg, targetBlock, cutImagePositionX;
    //cutImagePositionX - 決定主角臉朝向哪個方向
    targetImg = { //主角的目標座標
    "x":-1,
    "y":-1
    };
    targetBlock = { //主角的目標(對應2維陣列)
    "x":-1,
    "y":-1
    }
    event.preventDefault();
    switch(event.code)
    {
    case"ArrowLeft":
        targetImg.x= currentImgMain.x- gridLength;
        targetImg.y= currentImgMain.y;
        cutImagePositionX= 175;//臉朝左
        break;
    case"ArrowUp":
        targetImg.x= currentImgMain.x;
        targetImg.y= currentImgMain.y- gridLength;
        cutImagePositionX= 175;//臉朝上
        break;
    case"ArrowRight":
        targetImg.x= currentImgMain.x+ gridLength;
        targetImg.y= currentImgMain.y;
        cutImagePositionX= 540;//臉朝右
        break;
    case"ArrowDown":
        targetImg.x= currentImgMain.x;
        targetImg.y= currentImgMain.y+ gridLength;
        cutImagePositionX= 0;//臉朝下
        break;
    default: //else
        return;
    } 
    if(targetImg.x<=400 && targetImg.x>=0 && targetImg.y<=400 && targetImg.y>=0)
    {
        targetBlock.x = targetImg.y / gridLength;
        targetBlock.y = targetImg.x / gridLength;
    }
    else
    {
        targetBlock.x = -1;
        targetBlock.y = -1;
    }
    ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);
    if(targetBlock.x!=-1 && targetBlock.y!=-1){
        switch(mapArray[targetBlock.x][targetBlock.y]){
        case 0: // 一般道路(可移動)
        $("#talkBox").text("");
        currentImgMain.x = targetImg.x;
        currentImgMain.y = targetImg.y;
        break;
        case 1: // 有障礙物(不可移動)
        $("#talkBox").text("有山");
        break;
        case 2: // 終點(可移動)
        $("#talkBox").text("抵達終點");

        currentImgMain.x = targetImg.x;
        currentImgMain.y = targetImg.y;
        window.alert("抵達終點");
        break;
        case 3: // 敵人(不可移動)
        $("#talkBox").text("哈摟");
        break;
        }
        }else{
        $("#talkBox").text("邊界");
        
        }
        //重新繪製主角
        ctx.drawImage(imgMain, cutImagePositionX,0,80,130,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
  /*      if(mapArray[targetBlock.x][targetBlock.y] == 2)
        {
                       
             window.alert("抵達終點");
            
        }
        */
        });


