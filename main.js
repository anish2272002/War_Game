var SUITE = 'H D S C'.split(' ');
var RANKS = '2 3 4 5 6 7 8 9 10 J Q K A'.split(' ');

function product(SUITE,RANKS){
    var arr=[];
    for(var i=0;i<SUITE.length;i++){
        for(var j=0;j<RANKS.length;j++){
            arr.push(SUITE[i]+RANKS[j]);
        }
    }
    return arr;
}

class Deck{
    constructor(){
        this.deck=product(SUITE,RANKS);
    }
    shuffle(){
        var temp;
        for(var i=0;i<this.deck.length;i++){
            var j=Math.floor(Math.random*50);
            temp=this.deck[i];
            this.deck[i]=this.deck[j];
            this.deck[j]=temp;
        }   
    }
    split_in_half(order=0){
        return (order)?this.deck[0,26]:this.deck[26,52];
    }
}

class Hand{
    constructor(cards){
        this.cards=cards;
    }
    add_cards(card_arr){
        this.cards=this.cards+card_arr;
    }
    get_card(){
        var temp=this.cards[0];
        this.cards=this.cards(1,);
        return temp;
    }
    get_war_cards(){
        if(this.cards.length<3){
            return this.cards;
        }else{
            var arr=[];
            var temp;
            for(var i=0;i<3;i++){
                temp=this.cards[0];
                this.cards=this.cards(1,);
                arr.push(temp);
            }
            return arr;
        }
    }
}

class Player{
    constructor(name,hand){
        this.name=name;
        this.hand=hand;
        this.active=[];
    }
    pick_card(war=0){
        if(war){
            this.active=this.active+this.hand.get_war_cards();
        }else{
            this.active.push(this.hand.get_card());
        }
    }
    keep_cards(arr){
        this.hand.add_cards(this.active+arr);
        this.active=[];
    }
    give_cards(){
        arr=this.active;
        this.active=[];
        return arr;
    }
    get_rank(){
        return RANKS.indexOf(this.active[-1][1]);
    }
    still_has_cards(){
        return (this.hand.cards!==undefined)?this.hand.cards.length!=0:1;
    }
}
function game(){
    console.log("---WAR GAME---");
    var deck=new Deck();
    // deck.shuffle();
    console.log("Deck shuffled");
    console.log(deck.deck);
    var h1=new Hand(deck.split_in_half());
    var player=new Player(prompt("Enter name: "),h1);
    var h2=new Hand(deck.split_in_half(1));
    var comp=new Player("Computer",h2);
    console.log("Cards Distributed");
    while(player.still_has_cards() && comp.still_has_cards()){
        player.pick_card();
        comp.pick_card();
        console.log(player.hand.cards);
        console.log(comp.hand.cards);
        if(player.get_rank()==comp.get_rank()){
            console.log("War Begins");
            player.pick_card(1);
            comp.pick_card(1);
        }else if(player.get_rank()>comp.get_rank()){
            player.keep_cards(comp.give_cards());
        }else{
            comp.keep_cards(player.give_cards());
        }
    }
    if(player.still_has_cards()){
        console.log(player.name+" Won!");
    }else{
        console.log(comp.name+" Won!");
    }
}
game();