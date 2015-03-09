$(loaded);
var data;

function loaded(){
  showText();
  $("#formButton").click(
    function(){
      saveText();
      showText();
    });
  $("#clearButton").click(
     function(){
       clearAll();
       showText();
   });
}

function saveText(){
  var text = $("#formText");
  var time = new Date();
  var val = escapeText(text.val());
  var date = $("#date").val();  
  if (checkText(val)){
    encodeURI(val);
  }
  data = {};
  data[val] = date;
  var jsonData = JSON.stringify(data);
  localStorage.setItem(time,jsonData);
  text.val("");
  $('input[type="date"]').val("");
}

function showText(){
  list =$("#list");
  list.children().remove();
  var key, value, html = [];
  for (var i=0, len=localStorage.length; i<len; i++){
    key = localStorage.key(i);
    value = localStorage.getItem(key);
    data = JSON.parse(value);
    var todoData = ""; 
    var todoDate = "";    
    for (var contKey in data){
      todoData += contKey; 
      todoDate += data[contKey];
    }
    console.log(todoData, todoDate);
    html.push("<p>"+"<input type='checkbox'>"+todoData+todoDate+"</p>");
    list.prepend(decodeURI(html[i]));
    checkbox();
  }
}

function escapeText(text){
  return $("<div>").text(text).html();
}

function checkText(text){
  if (0==text.length||140<text.length){
    alert("文字制限数はtwitterと同じです");
    return false
  }
  if (text.match(/&lt;|&gt;/i)){
    alert("Htmlタグは入力できません");
    $('input[type="text"]').val("");
    $('input[type="date"]').val("");
    return false 
  }
  return true;
}

function checkbox(){
  $('input[type="checkbox"]').change(function(){
    if ($(this).is(':checked')) {
      console.log($(this));
      console.log($(this).closest("p#checkList"));
      console.log($(this).closest("div"));
      $(this).closest("p").css("text-decoration", "line-through").css({"background-color":"aliceblue","color":"darkgray"}); 
    }else{
      $(this).closest("p").css("text-decoration", "none").css({"background-color":"white","color":"black"});
      console.log("unchecked!");
    } 
  });
}


function clearAll(){
  localStorage.clear();
  $('input[type="text"]').val("");
  $('input[type="date"]').val("");
}

