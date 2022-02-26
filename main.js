var SUITE = 'H D S C'.split(' ');
var RANKS = '2 3 4 5 6 7 8 9 10 J Q K A'.split(' ');
var deck1,deck2;
var active1,active2;
function product(){
    var temp=[];
    for(var i=0;i<SUITE.length;i++){
        for(var j=0;j<RANKS.length;j++){
            temp.push(SUITE[i]+RANKS[j]);
        }
    }
    return temp;
}
function shuffle(arr){
    var i,j,temp;
    for(i=0;i<arr.length;i++){
        j=Math.floor(Math.random()*arr.length);
        temp=arr[i];
        arr[i]=arr[j];
        arr[j]=temp;
    }
}
function get_card(dec,act){
    act.push(dec[0]);
    dec=dec.slice(1,dec.length);
}
function still_have_cards(player=0){
    if(player){ return deck2.length!=0;}
    else{ return deck1.length!=0;}
}
function game(){
    console.log("War Game!");
    var deck=product();
    shuffle(deck);
    deck1=deck.slice(0,26);
    deck2=deck.slice(26,52);
    console.log("Decks distributed!");
    active1=[];
    active2=[];
    var count=2000;
    while(still_have_cards() && still_have_cards(1) && count){
        active1.push(deck1[0]);
        setTimeout(function(st){
            document.querySelector("#table").innerHTML="<img src='asset/"+st+".jpg'>";
        },1000,deck1[0]);
        deck1=deck1.slice(1,deck1.length);
        active2.push(deck2[0]);
        setTimeout(function(st){
            document.querySelector("#table").innerHTML="<img src='asset/"+st+".jpg'>";
        },1000,deck2[0]);
        deck2=deck2.slice(1,deck2.length);
        if(RANKS.indexOf(active1[active1.length-1][1])==RANKS.indexOf(active2[active2.length-1][1])){
            console.log("War Begins!");
            if(deck1.length<3){
                active1=active1.concat(deck1);
            }else{
                active1.push(deck1[0]);
                deck1=deck1.slice(1,deck1.length);
                active1.push(deck1[0]);
                deck1=deck1.slice(1,deck1.length);
                active1.push(deck1[0]);
                deck1=deck1.slice(1,deck1.length);
            }
            if(deck2.length<3){
                active2=active2.concat(deck2);
            }else{
                active2.push(deck2[0]);
                deck2=deck2.slice(1,deck2.length);
                active2.push(deck2[0]);
                deck2=deck2.slice(1,deck2.length);
                active2.push(deck2[0]);
                deck2=deck2.slice(1,deck2.length);
            }
        }
        else{
            if(RANKS.indexOf(active1[active1.length-1][1])>RANKS.indexOf(active2[active2.length-1][1])){
                deck1=deck1.concat(active1,active2);
            }else{
                deck2=deck2.concat(active1,active2);
            }
            active1=[];
            active2=[];
        }
        count=count-1;
    }
    if(still_have_cards() && count) console.log("Computer Won!");
    else if(still_have_cards(1) && count) console.log("Player Won!");
    else console.log("Draw!");
}
game();