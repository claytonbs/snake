
// get the DOM elements
var cobra = document.getElementById("cobra");
var food = document.getElementById("food");
var rabo = document.getElementsByClassName("rabo");
var secRabo = document.getElementById("secRabo");
var difInput = document.getElementById("difInput");
var start = document.getElementById("play");
var spanPtn = document.getElementById("spanPtn");
var perdeu = document.getElementById("perdeu");
var pauseBtn = document.getElementById("pause");


// set all the global variables
var dificuldade = 50;
var dir = "d";
var matriz = [0,0];
var raboPosX = [];
var raboPosY = [];
var raboPosXAnt = [];
var raboPosYAnt = [];
var pontos = 0;
var posicaoX = [];
var posicaoY = [];
var posicaoXAnt = [];
var posicaoYAnt = [];
var foodX;
var foodY;
var posX = 0, posY = 0
var myVar;
var rabo 
var colisao;
var colisaoInterna = [];



// add the listeners
difInput.addEventListener("input", mudaDif);
document.addEventListener("keypress", trocaDir);


// declare all the functions


//  detect the key pressed and change the direction of tha snake
function trocaDir(event){
	if (event.key.toLowerCase() == "w" || event.key.toLowerCase() == "s" || event.key.toLowerCase() == "a" || event.key.toLowerCase() == "d"){
			console.log("okkkkk")
			dir = event.key.toLowerCase();
			console.log(event.key);
	}
}



// change the difficult

function mudaDif(){
	
	var dif = Number(difInput.value);
	dificuldade =  55 - dif*5;
	console.log(dificuldade);
 	pause();
}


// make the game start or continue if paused
function play(){

		pauseBtn.style.backgroundColor = "black";
		pauseBtn.style.color = "white";
		cobra.style.transition = "transform 50ms linear";
		myVar = setInterval(comeca,dificuldade)
		difInput.disabled = true;;
}


// pause the game
function pause(){
	
	pauseBtn.style.backgroundColor = "white";
	pauseBtn.style.color = "black";
	cobra.style.transition = "none";
	clearInterval(myVar);
	difInput.disabled = false;
}




// reset all the variables and start a new game
function newGame(){

	perdeu.style.display = "none";
	pontos = 0;
	spanPtn.innerHTML = pontos;
	start.disabled=false;
	difInput.disabled = false;
	cobra.style.transition = "transform 50ms linear";
	dir = "d";
	matriz = [0,0];
	raboPosX = [];
	raboPosY = [];
	raboPosXAnt = [];
	raboPosYAnt = [];
	pontos = 0;
	posicaoX = [];
	posicaoY = [];
	posicaoXAnt = [];
	posicaoYAnt = [];
	posX = 0, posY = 0
	secRabo.innerHTML = "<div class='rabo'></div>";
	cobra.style.transform = "translate(0px,0px)";
	clearInterval(myVar);
	geraFood();
}





//generate the food for the snake
function geraFood(){
	foodX = Math.floor((Math.random() * 98));
	foodY = Math.floor((Math.random() * 48));
	food.style.transform = "translate("+foodX*10 +"px," +foodY*10 + "px)";

}


geraFood();


	
// start the game
function comeca(){
	

	colisaoInterna[0] = false;
	colisaoInterna[1] = false;
			

	// check if there is no collision
	if(colisao == false){
		for (var posix= raboPosX.length-1;posix>0;posix--){
			raboPosX[posix] = raboPosX[posix-1];
		}	

		for (var posix= raboPosY.length-1;posix>0;posix--){
			raboPosY[posix] = raboPosY[posix-1];

			if (matriz[1] == raboPosY[posix]){
				colisaoInterna[1]= true;
			}
		}	

		raboPosX[0] = matriz[0];
		raboPosY[0] = matriz[1];
	}

	colisao = false;



// change the direction of the snake
	tecla = dir;
	if (tecla == "s" && matriz[1] < 49){
			matriz[1]++;
			dir = "s";
			segue();
	}  else if(tecla == "w" && matriz[1] > 0) {
			matriz[1]--;
			dir = "w";
			segue();	
	}	else if(tecla == "a" && matriz[0] > 0) {
			posX = posX - 10
			matriz[0]--
			dir = "a";
	     	segue();
	}	else if(tecla == "d" && matriz[0] < 99) {
			dir = "d";
			matriz[0]++;
			segue();
	}	else {
			colisao = true;
			gameOver();
	}
	
			
	// this function is invoked if there is no collision and moves the snake
	function segue(){
		cobra.style.transform = "translate("+matriz[0]*10 + "px" + "," +matriz[1]*10 + "px)";
		if (matriz[0] == foodX && matriz[1] == foodY){
			pontos++;
			spanPtn.innerHTML = pontos;
			geraFood();
			raboPosX.push(0);
			raboPosY.push(0);
			secRabo.innerHTML = secRabo.innerHTML + "<div class='rabo'></div>";	
		}

	
		for(var i = 0;i<pontos;i++){
			rabo[i].style.transform = "translate("+raboPosX[i]*10 + "px" + "," +raboPosY[i]*10 + "px)";
		}
	}


	// check if the snake hit itself
	for (var posix= raboPosX.length-1;posix>0;posix--){
		if (matriz[0] == raboPosX[posix] && matriz[1] == raboPosY[posix]){
			colisaoInterna[0]= true;
			gameOver();
		}
	}	


}



function gameOver(){
	start.disabled=true;
	console.log("gameover");
	pause();
	perdeu.style.display = "inline";
}
