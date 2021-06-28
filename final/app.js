var taiwan = document.getElementById("taiwan");
var board = document.getElementById("board");
let vaccineCount = 10;

window.addEventListener("keydown", (e) => {
  var left = parseInt(window.getComputedStyle(taiwan).getPropertyValue("left"));
  if (e.key == "ArrowLeft" && left > 10) {
    taiwan.style.left = left - 20 + "px";
  }
  else if (e.key == "ArrowRight" && left <= 470) {
    taiwan.style.left = left + 20 + "px";
  }

  if (e.keyCode == 32) {
    var vaccine = document.createElement("div");
    if(vaccineCount > 0){
    vaccine.classList.add("vaccines");
    board.appendChild(vaccine);
    }
    vaccineCount -= 1;

    var movevaccine = setInterval(() => {
      var viruss = document.getElementsByClassName("viruss");

      for (var i = 0; i < viruss.length; i++) {
        var virus = viruss[i];
        if (virus != undefined) {
          var virusbound = virus.getBoundingClientRect();
          var vaccinebound = vaccine.getBoundingClientRect();


          if (
            vaccinebound.left >= virusbound.left &&
            vaccinebound.right <= virusbound.right &&
            vaccinebound.top <= virusbound.top &&
            vaccinebound.bottom <= virusbound.bottom
          ) {
            virus.parentElement.removeChild(virus); 
            const audio = document.createElement("audio");
            audio.src = "Point.mp3";
            audio.play();
            document.getElementById("points").innerHTML =
              parseInt(document.getElementById("points").innerHTML) + 1;
            if(parseInt(document.getElementById("points").innerHTML) % 25 == 0){
              vaccineCount += 5;
            }
          }
        }
      }
      var vaccinebottom = parseInt(
        window.getComputedStyle(vaccine).getPropertyValue("bottom")
      );


      if (vaccinebottom >= 500) {
        clearInterval(movevaccine);
      }



      vaccine.style.left = left + "px"; 
      vaccine.style.bottom = vaccinebottom + 3 + "px";
    });
  }
  if(e.key == "ArrowUp"){
    var mask = document.createElement("div");
    mask.classList.add("masks");
    board.appendChild(mask);

    var movemask = setInterval(() => {
      var viruss = document.getElementsByClassName("viruss");

      for (var i = 0; i < viruss.length; i++) {
        var virus = viruss[i];
        if (virus != undefined) {
          var virusbound = virus.getBoundingClientRect();
          var maskbound = mask.getBoundingClientRect();


          if (
            maskbound.left >= virusbound.left &&
            maskbound.right <= virusbound.right &&
            maskbound.top <= virusbound.top &&
            maskbound.bottom <= virusbound.bottom
          ) {
            virus.parentElement.removeChild(virus); 
            $("div").removeClass(".mask");
            const audio = document.createElement("audio");
            audio.src = "Point.mp3";
            audio.play();
            mask.remove();
            document.getElementById("points").innerHTML =
              parseInt(document.getElementById("points").innerHTML) + 1;
              if(parseInt(document.getElementById("points").innerHTML) % 25 == 0){
                vaccineCount += 5;
              }
              return;
          }
        }
      }
      var maskbottom = parseInt(
        window.getComputedStyle(mask).getPropertyValue("bottom")
      );


      if (maskbottom >= 500) {
        clearInterval(movemask);
      }

      mask.style.left = left + "px"; 
      mask.style.bottom = maskbottom + 3 + "px";
    });

  }
});

var generateviruss = setInterval(() => {
  if(getRandomInt(0, 100) % 3 != 0){
    var virus = document.createElement("div");
    virus.classList.add("viruss");
    
    var virusleft = parseInt(
      window.getComputedStyle(virus).getPropertyValue("left")
    );
    virus.style.left = Math.floor(Math.random() * 450) + "px";

    board.appendChild(virus);
  }
}, 1000);

var moveviruss = setInterval(() => {
  var viruss = document.getElementsByClassName("viruss");

  if (viruss != undefined) {
    for (var i = 0; i < viruss.length; i++) {
      var virus = viruss[i]; 
      var virustop = parseInt(
        window.getComputedStyle(virus).getPropertyValue("top")
      );

      if (virustop >= 475) {
        alert("遊戲結束，按關閉後重新開始");
        clearInterval(moveviruss);
        $("div").removeClass("viruss");
        window.location.reload();
      }

      virus.style.top = virustop + 25 + "px";
    }
  }
}, 450);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}