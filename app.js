//recuperer les elements du DOM
//recuperer tous les elements qui on une case
//on recuperer une node liste qu'il faut transformer en aray
const cases=[...document.getElementsByClassName("case")];
console.log(cases);

//recuprer le joueur en cour
let joueur =document.getElementById("joueur");
let score1 =document.getElementById("score1");
let score2 =document.getElementById("score2");
let scoreNul =document.getElementById("scoreNul");

//creation d'un state (element qui va contenir tous les elements importants du jeu)
let state= {
    joueurEnCours :1,
    scoreJ1:0,
    scoreJ2:0,
    matchNuls:0,
    c1:0,
    c2:0,
    c3:0,
    c4:0,
    c5:0,
    c6:0,
    c7:0,
    c8:0,
    c9:0,
};

//fonction pour remettre à zero les Case
const resetState =() =>{
    joueurEnCours =1;
    state.c1 = 0 ;
    state.c2 = 0 ;
    state.c3 = 0 ;
    state.c4 = 0 ;
    state.c5 = 0 ;
    state.c6 = 0 ;
    state.c7 = 0 ;
    state.c8 = 0 ;
    state.c9 = 0 ;
};

//creation du jeu

//création fonction verification victoire
const verifierVictoire = ()=>{
    //cas de figure n1 : C1 = C2 = C3 (coché par un meme joueur)
    if(
        //cas de figure n1 : C1 = C2 = C3 (coché par un meme joueur)
        (state.c1 == state.c2 && state.c2 == state.c3 && state.c1>0) ||
        //cas de figure n2 : C1 = C2 = C3 (coché par un meme joueur)
        (state.c4 == state.c5 && state.c5 == state.c6 && state.c4>0) ||
        (state.c7 == state.c8 && state.c8 == state.c9 && state.c7>0) ||
        (state.c1 == state.c4 && state.c4 == state.c7 && state.c1>0) ||
        (state.c2 == state.c5 && state.c5 == state.c8 && state.c2>0) ||
        (state.c3 == state.c6 && state.c6 == state.c9 && state.c3>0) ||
        (state.c1 == state.c5 && state.c5 == state.c9 && state.c1>0) ||
        (state.c3 == state.c5 && state.c5 == state.c7 && state.c3>0)
        

    ){
        //si on a un gagnant retourné true
        console.log("winner");
        return true;
    }
    // si matche nul
    else if (
        state.c1 !== 0 &&
        state.c2 !== 0 &&
        state.c3 !== 0 &&
        state.c4 !== 0 &&
        state.c5 !== 0 &&
        state.c6 !== 0 &&
        state.c7 !== 0 &&
        state.c8 !== 0 &&
        state.c9 !== 0 
    ){
        return null;
    } 
    // si pas de victoire et pas de match null
    else {
        return false;

    }
};

//création de la fonction jouerCase
const jouerCase=(e)=>{
    //recuperer l'id de la case qui a été clicquée
    let idCase = e.target.id;
    // console.log(idCase);
    //verifier que la case n'a pas déjà été joué, si déjà jouer on ne fait rien
    if (state[idCase]!== 0 )return;
    //a chaque fois que le joueur coche une case on garde en memeoir que cette case à ete jouer
    state[idCase]=state.joueurEnCours;
    //une fois cliqué, on vérifie si c'est une victoire
    let isVictoire = verifierVictoire();

    if(isVictoire==true){
        // si victoire
        alert("le gagnant est le joueur" + state.joueurEnCours);
        //si le joueur 1 gagne
        if(state.joueurEnCours==1){
            //augmentation score joueur 1
            state.scoreJ1++;
            score1.textContent=state.scoreJ1;
        }
        //si le joueur 2 gagne
        else {
            //augmentation score joueur 2
            state.scoreJ2++;
            score2.textContent=state.scoreJ2;
        }
        //fonction remise à zeo des cases
        resetState();
        //vider l'afichage des cases
        cases.forEach((c) => (c.textContent=""));
    } 
    //sinon si il n'y a pas de victoire
    else if (isVictoire === null){
        alert("match null !");
        //augmentation des score avec match null
        state.matchNuls++;
        scoreNul.textContent=state.matchNuls;
        joueur.textContent="1";
        resetState();
        //vider l'afichage des cases
        cases.forEach((c) => (c.textContent=""));
    }
    // s'il n'y a pas de victoire
    else if (isVictoire===false){
        if(state.joueurEnCours==1){
            //mettre une croix dans la case
            e.target.textContent="X";
            //changement de joueur
            state.joueurEnCours=2;
            joueur.textContent="2";
        } else{
            //mettre une croix dans la case
            e.target.textContent="O";
             //changement de joueur
            state.joueurEnCours=1;
            joueur.textContent="1";

        }
    }
};

//declancher l'événement lorsque l'on clique sur une case
cases.forEach((el)=>{
    // ecouter l'evenement click et lancer la fonction jouerCase à chaque click
    el.addEventListener("click",jouerCase);
    
});


