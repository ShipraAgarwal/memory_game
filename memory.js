
/*------------------- GLOBAL VARIABLE -----------------------------*/
			var tempStack = [];
			var arr = ["tile3", "tile7", "tile2", "tile1", "tile3", "tile8", "tile4", "tile1", "tile5", "tile8", "tile6", "tile7", "tile5", "tile2", "tile6", "tile4"]
			var i;
			var moves=0;
			var time=60;
			var score=0;
			var pair=0;
			var time_id;
			var temp = new Date();
			time = temp.getSeconds();
			var st = time;
			var t1 = 60;			
/*-----------------------------------------------------------------------*/	

			
/*----------------- START FUNCTION --------------------------------------*/
			function start(){
					document.getElementById("start").style.display = "none";
					document.getElementById("restart").style.display = "block";
					document.getElementById("overid").style.display = "none";
					document.getElementById("boardid").style.display = "block";
					document.getElementById("win").style.display = "none";
				for(i=0;i<16;i++){
					var random = Math.floor(Math.random()*16);
					n=(i+random)%8;
					var temp;
					temp = arr[i];
					arr[i]= arr[n];
					arr[n] = temp;
				}
				console.log(arr);
				var tiles = document.getElementsByClassName("back");
				for(i=0;i<16;i++){
					tiles[i].id = arr[i];
				}
				time=30;
				moves=0;
				score=0;
				pair=0;
				document.getElementById("found").innerHTML = pair;
				document.getElementById("scores").innerHTML = score;
				document.getElementById("moves").innerHTML = moves;
				initiate();
				time_id=setInterval(time_count,1000);
				setTimeout(add, 3000);
			}
/*-------------------------------------------------------------------*/


/*---------------- THIS PORTION COUNTS THE REMAINING TIME ----------*/
			function time_count(){
				var temp = new Date();

				var t2 = temp.getSeconds();
				if(t1 != t2){
					time--;
					t1 = t2;
				}
				if(time<1){
					console.log(time);
					document.getElementById("overid").style.display = "block";
					document.getElementById("boardid").style.display = "none";
					document.getElementById("win").style.display = "none";
					clearInterval(time_id);
				}
				document.getElementById("time").innerHTML = time + " sec";
			}

			/* FUNCTION FOR SHOWING THE CARDS IN THE STARTING*/
			function initiate(){
				var card = document.getElementsByClassName("card");
				for(var i=0;i<16;i++){
				card[i].className += " show";
				}
			}
			
/*-----------------------------------------------------------------*/
			

/*------------- FUNCTION FOR ADDING ONCLICK EVENT ON CARDS --------*/
			function add(){
				var card = document.getElementsByClassName("card");
				for(var i=0;i<16;i++){
					card[i].className = "card";
					card[i].attributes.onclick.nodeValue = "flip(this)";
				}
			}

			/* FUNCTION FOR FLIPPING THE CARD AND FURTHER PROCESSING*/
			function flip(a){
				
				var x = document.getElementById(a.id);
				moves++;
				tempStack.push(x);
				x.className += " show";
				 if(tempStack.length > 1)
				{	
					if(tempStack[0].id === tempStack[1].id)
					{
					tempStack.pop();
					moves--;
					}
					else{
					setTimeout(match, 700);
					}					
				}
				document.getElementById("moves").innerHTML = moves;
			}
/*-------------------------------------------------------------------*/


/*------ FUNCTION TO CHECK WHETHER CARDS ARE MATCHED OR NOT --------*/
			function match(){
				
				var id1, id2, child;
				child = tempStack[0].children;
				id1 = child[1].id;
				child = tempStack[1].children;
				id2 = child[1].id;
				if(id1 === id2)
				{	
					moves++;
					pair++;
					score=score+10;
					tempStack[0].onclick = "";
					tempStack[1].onclick = "";
					tempStack.splice(0,2);
					document.getElementById("found").innerHTML = pair;
					document.getElementById("scores").innerHTML = score;
					if((pair === 8) && (time >= 0))
					{
						document.getElementById("overid").style.display = "none";
						document.getElementById("boardid").style.display = "none";
						document.getElementById("win").style.display = "block";
						document.getElementById("final-time").innerHTML = (30 - time) + " sec";
						document.getElementById("final-move").innerHTML = moves;
						document.getElementById("final-score").innerHTML = score;
						clearInterval(time_id);
					}
				}
				else{
					tempStack[0].className = "card";
					tempStack[1].className = "card";
					tempStack.splice(0,2);
					
				}

			}