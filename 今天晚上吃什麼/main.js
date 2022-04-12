$(function(){
    $("input").on("click",function(){
    //alert("Hi");
    var numberOfListItem = $("li").length;
    var randomChildNumber = Math.floor(Math.random()*numberOfListItem);
    $("h1").text($("li").eq(randomChildNumber).text());
    //$("div").text($("li").eq(randomChildNumber).jpg);
 //   var foodImage;
 //   foodImage = document.getElementById( "foodimg" );
 //   foodImage.setAttribute( "src", foodValue + ".jpg" );

  
    


    });
    });
    