let SUITE = 'H D S C'.split(' ');
let RANKS = '6 7 8 9 10 J Q K A'.split(' ');    //deck shortend for short game
let deck1,deck2;
let active1,active2;
let count=200;
const comp=document.querySelector("#computer");
const player=document.querySelector("#player");

function product(){
    let temp=[];
    for(let i=0;i<SUITE.length;i++){
        for(let j=0;j<RANKS.length;j++){
            temp.push(SUITE[i]+RANKS[j]);
        }
    }
    return temp;
}
function shuffle(arr){
    let i,j,temp;
    for(i=0;i<arr.length;i++){
        j=Math.floor(Math.random()*arr.length);
        temp=arr[i];
        arr[i]=arr[j];
        arr[j]=temp;
    }
}
function get_card(){
    active2.push(deck2[0]);
    showCard(deck2[0])
    deck2 = deck2.slice(1, deck2.length);
    active1.push(deck1[0]);
    setTimeout(showCard,1000,deck1[0]);
    deck1 = deck1.slice(1, deck1.length);
}
function get_war_card(player=0){
    if(player){
        if(deck2.length<3){
            active2=active2.concat(deck1);
        }else{
            for(let i=3;i>0;i=i-1){
                active2.push(deck2[0]);
                deck2=deck2.slice(1,deck2.length);
            }
        }
    }else{
        if(deck1.length<3){
            active1=active1.concat(deck1);
        }else{
            for(let i=3;i>0;i=i-1){
                active1.push(deck1[0]);
                deck1=deck1.slice(1,deck1.length);
            }
        }
    }
}
function still_have_cards(player=0){
    if(player){ return deck2.length!=0;}
    else{ return deck1.length!=0;}
}
function showCard(img){
    const demo=document.createElement("img");
    demo.src="asset/"+img+".jpg";
    if(player.style.color=="black" || img=="0"){
        comp.style.color="black";
        player.style.color="white";
    }else{
        comp.style.color="white";
        player.style.color="black";
    }
    demo.addEventListener("load",()=>{
        let container=document.querySelector("#table");
        container.replaceChild(demo,container.firstElementChild);
        container.firstElementChild.classList="animadrop";
    })
}
function game(){
    if(RANKS.indexOf(active1[active1.length-1][1])==RANKS.indexOf(active2[active2.length-1][1])){
        console.log("War Begins!");
        get_war_card(0);
        get_war_card(1);
        setTimeout(showCard,900,"0");
        show("War");
        setTimeout(deshow,1000);
    }else{
        if(RANKS.indexOf(active1[active1.length-1][1])>RANKS.indexOf(active2[active2.length-1][1])){
            deck1=deck1.concat(active1,active2);
            document.querySelector("#table").firstChild.classList="animaleft";
        }else{
            deck2=deck2.concat(active1,active2);
            document.querySelector("#table").firstChild.classList="animaright";
        }
        active1=[];
        active2=[];
    }
    document.querySelector("#player").addEventListener("click",click);
    count=count-1;
}
function main(){
    console.log("War Game!");
    let deck=product();
    shuffle(deck);
    deck1=deck.slice(0,18);
    deck2=deck.slice(18,36);
    console.log("Decks distributed!");
    active1=[];
    active2=[];
    document.querySelector("#player").addEventListener("click",click);
}
function click(){
    document.querySelector("#player").removeEventListener("click",click);
    if(still_have_cards() && still_have_cards(1) && count){
        empty();
        setTimeout(get_card,300);
        setTimeout(game,2000);
    }else{
        if(still_have_cards() && count){
            console.log("Computer Won!");
            show("Lost!");
        }else if(still_have_cards(1) && count){
            console.log("Player Won!");
            show("Winner!");
        }else{
            console.log("Draw!");
            show("Draw!");
        }
    }
}
function show(text){
    document.querySelector(".cont2").style.display="block";
    document.querySelector(".cont2").innerHTML=text;
}
function deshow(){
    document.querySelector(".cont2").style.display="none";
}
function empty(){
    document.querySelector("#table").innerHTML="<img>";
}
main();