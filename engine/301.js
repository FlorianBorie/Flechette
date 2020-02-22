// Initialisation des variable pour le joueur 1
player = Array();
player[0] = Array();
player[0]["name"] = 'Joueur #1';
player[0]["score"] = 0;
// Initialisation des coups 
//SIMPLE
player[0]["simple"] = Array();
for(var x=0;x<21;x++){
player[0]["simple"][x] = 0;
}
player[0]["simple"][25] = 0;
player[0]["simple"][50] = 0;
//DOUBLE
player[0]["double"] = Array();
for(var x=0;x<21;x++){
player[0]["double"][x] = 0;
}
//TRIPLE
player[0]["triple"] = Array();
for(var x=0;x<21;x++){
player[0]["triple"][x] = 0;
}

// Initialisation des variable pour le joueur 2
player[1] = Array();
player[1]["name"] = 'Joueur #2';
player[1]["score"] = 0;
// Initialisation des coups
//SIMPLE
player[1]["simple"] = Array();
for(var x=0;x<21;x++){
player[1]["simple"][x] = 0;
}
player[1]["simple"][25] = 0;
player[1]["simple"][50] = 0;
//DOUBLE
player[1]["double"] = Array();
for(var x=0;x<21;x++){
player[1]["double"][x] = 0;
}
//TRIPLE
player[1]["triple"] = Array();
for(var x=0;x<21;x++){
player[1]["triple"][x] = 0;
}
//initialisation des variables de configuration de la partie
game = Array();
game["type"] = 301;


function startgame(){ // function pour initialiser une nouvelle partie
	player[0]["name"] = document.getElementById('j1Name').value; // stock le nom du joueur #1
	player[1]["name"] = document.getElementById('j2Name').value; // stock le nom du joueur #2
	game["type"] = document.getElementById('gameType').options[document.getElementById('gameType').selectedIndex].value; // stock le type de partie
	// initialise les scores  des 2 joueurs
	player[0]["score"] = game["type"];
	player[1]["score"] = game["type"];
	
	//Affecte les nom des joueus dans le design 
	//Nom a coter des score
	document.getElementById('aj1Name').innerHTML = player[0]["name"]; 
	document.getElementById('aj2Name').innerHTML = player[1]["name"];
	//Nom dans la table de tir
	document.getElementById('aj1NameTir').innerHTML = player[0]["name"];
	document.getElementById('aj2NameTir').innerHTML = player[1]["name"];
	
	//Affiche la section de la page qui contient le compteur
	document.getElementById('showAll').style.display = "block";
	
	//initialise les variable necessaire au focntionnement
	pTurn = 0; // Tour tu joueur 0 = joueur#1, 1 = joueur#2
	nbCoup = 0; // nombre de coup effectuer par le joueur actif
	tir = Array(); // tableau des tirs effectuer pendant le tour du joueur
	tir[1] = 0; 
	tir[2] = 0; 
	tir[3] = 0;
	tir["somme"] = 0; // somme des tir effectuer pendant le tour du joueur

	showInfo(); // appelle de la fonction showInfo();
	alert("Bonne partie !!"); // Boite d'alert 
}


function addTir(x,nb){ // Fonction qui sert a ajouter un tir en memoire OU x est le type de coup SIMPLE(1), DOUBLE(2), TRIPLE(3)
if(nbCoup <3){ // verification si le nombre de coup allouer n'est pas supperieur a 3
	// Verification et affectation  des valeurs correspondantes au nombre que contient x
	if(x == 1){
		var tirType = 'simple';
	}
	if(x == 2){
		var tirType = 'double';
	}
	if(x == 3){
		var tirType = 'triple';
	}
	
	var total = nb*x; // calcul du total  obtenue pour ce lancer multiplicateur(x) * nombre obtenu(nb)
	
	player[pTurn][tirType][nb]++; // incrementation du type de tir effectuer au joueur actif
	
	nbCoup++; // incrementation du nombre de coup
	
	tir[nbCoup] = x+'X'+nb; // affectation du tir effectuer ds la variable correspondante
	tir["somme"] = tir["somme"]+total; // addition du tir actuel a la somme du tour actuel
	
	if(nbCoup == 3){ // verification si le nombre de coup est egal à 3
		document.getElementById('showBTN').style.display = "block";	// si oui affichage de la zone de bouton
	}
	showInfo(); // appelle de la fonction showInfo();
}
}

function validerTirs(){ // fonction pour valider les 3 tirs actifs et les soustraire au score du joueur actuel
	if(player[pTurn]["score"]-tir["somme"]>=0){ // verification si le score du joueur - somme des 3 tir > 0
		player[pTurn]["score"] = player[pTurn]["score"]-tir["somme"]; //  Si oui effectuer loperation et affectation au score du joueur actuel
		if(player[pTurn]["score"] == 0){ // Verification si le joueur a atteint le score de  0 - Donc gagnant
			alert("Partie Termine  ! \n"+player[pTurn]["name"]+" Gagne !!!!! \n "+player[0]["name"]+" = "+player[0]["score"]+"\n"+player[1]["name"]+" = "+player[1]["score"]); // alert indicant le gagnant et les scores
			startgame(); // appele de la fonction qui reinitialise une nouvelle partie
			pTurn = 1; // changement de joueur pour que ce soit le joueur #1 qui commence
		}else{
			alert("Votre tour est termine "+player[pTurn]["name"]); // alert indiquant que le tour du joueur actuel est terminer
		}
	}else{
		alert("BOOOM !! SAUTE !!"); // alert indiquant que le joueur a depasser le 0 donc saute et retour au point du coup prepecedent
	}
	
		//Reinitialisation des variables pour le joueur suivant
		nbCoup = 0;
		tir[1] = 0;
		tir[2] = 0;
		tir[3] = 0;
		tir["somme"] = 0;
		// IF pour alternance des joueurs
		if(pTurn == 0){
			pTurn = 1;
		}else{
			pTurn = 0;
		}
		document.getElementById('showBTN').style.display = "none"; // cacher la zone de bouton
		showInfo();// appelle de la fonction showInfo();
	
	
}
function annulerTirs(){ // fonction qui annule les 3 tirs effectuer, pour cause d'Erreur...
	alert("Dards annuler !!"); // alert
	//reinitialisation pour que le joueur actif recommence sont tour
	nbCoup = 0;
	tir[1] = 0;
	tir[2] = 0;
	tir[3] = 0;
	tir["somme"] = 0;
	showInfo();// appelle de la fonction showInfo();
	document.getElementById('showBTN').style.display = "none"; // cacher la zone de bouton
}

function showInfo(){ // fonction pour afficher tous les infos dans la page
	
	document.getElementById('aj1Name').style.color = "#666666"; // reinitialise les couleur des noms
	document.getElementById('aj2Name').style.color = "#666666"; // reinitialise les couleur des noms
	document.getElementById('aj'+(pTurn+1)+'Name').style.color = "#FF6600"; // change la couleur du nom actuel en orange
	
	document.getElementById('aCoup').innerHTML = tir[1]+', '+tir[2]+', '+tir[3]; // affiche les 3 tirs dans la zone prevu a cette effet
	document.getElementById('aSommeCoup').innerHTML = tir["somme"]; // affichage de la somme des 3 tirs

	document.getElementById('aj1Score').innerHTML = player[0]["score"]; // affichage du score du joueur #1
	document.getElementById('aj2Score').innerHTML = player[1]["score"];// affichage du score du joueur #2
	document.getElementById('aNbCoup').innerHTML = nbCoup; // affichage du nb de coup du joueur actif
	
	for(var x=1;x<21;x++){ // boucle pour afficher les nombre de tir pour chaque type de tir
		document.getElementById('p1_1x'+x).innerHTML = player[0]["simple"][x];
		document.getElementById('p1_2x'+x).innerHTML = player[0]["double"][x];
		document.getElementById('p1_3x'+x).innerHTML = player[0]["triple"][x];
		
		document.getElementById('p2_1x'+x).innerHTML = player[1]["simple"][x];
		document.getElementById('p2_2x'+x).innerHTML = player[1]["double"][x];
		document.getElementById('p2_3x'+x).innerHTML = player[1]["triple"][x];
	}
	// affichage les nombre de tir pour chaque type de tir qui n'entre pas ds la boucle
	document.getElementById('p1_1x25').innerHTML = player[0]["simple"][25];
	document.getElementById('p1_1x50').innerHTML = player[0]["simple"][50];
	document.getElementById('p2_1x25').innerHTML = player[1]["simple"][25];
	document.getElementById('p2_1x50').innerHTML = player[1]["simple"][50];
	document.getElementById('p1_1x0').innerHTML = player[0]["simple"][0];
	document.getElementById('p2_1x0').innerHTML = player[1]["simple"][0];
}