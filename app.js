// will be a two player game
//player red is always Trump pic
//player Blue is always Obama pic
//want a load screen with rules and "start Play button"
//click "start play button" plays "shall we play a game"
// 3 sec transition of main game on stage
// question 22 ,answer 2, audio 2 in database json
// first to five failures looses
// question displays; audio "dun dun da" plays; waits for response
// reads first letter of response
// reveals answer; audio of "the answer is :name: " plays;
// each answer raises "def con" (loadbar 'answer array.length')
//when defcon is red (22questions asked) ganme ends
//wrong answer = "failure holder++"
// each wrong answer REDUCES image by 10% (loadbar:  presPicRed.width minus (failure holder * 20 +'%'))
// "failures" displays on screen
// if defcon==22 or if Redfailures == 5  or if Bluefailures == 5 load 'end game' modal

// questions courtesy https://ramonahouston.com/blog/the-244-accomplishments-of-president-barak-obama/    ,    https://lc.org/PDFs/Trump.Accomplishments.FINAL.pdf

// ajax
const URL ="https://cdn.contentful.com/spaces/oy2q0xrv1vwu/environments/master/entries?access_token=pYlGR49Ybd_hPAFp_hGqUTUtm0tdGPoeAIg0gvuTo0w&content_type=triviaq"


// stuctural vars
let myTurn = true;
//if myTurn is true show RED (player1) which is $(#switcher).changeClass('.gameblue') ---- if false show Blue (Player2) $(#switcher).changeClass('.gamer')
//toggle myTurn
let player1 = 0;
let player2 = 0;
let counter = 0;
let fetched = []
const getReady = (param) =>{ $('.open_btn').on('click' , ()=>{
    console.log(param);
    $('.opener').toggle( "slow", ()=> {})
    $('#gamejoint').toggle( "slow", ()=> {})
    bigEngine(param)
})}
$.ajax(URL)
.then((data)=>{
    fetched = data.items.map((q) => q.fields)
 
    getReady(fetched)
})




const bigEngine =(param) => { 
    
    
    $('.questionme').text('')
   $('.playerprompt').text('') 
$('.questionme').text(param[counter].question)

if (myTurn == false){
    console.log('blueturn')
    $('#gamejoint').attr('class', 'gameblue');
    $('.playerprompt').text('Player2 Please Answer, ')
    $("#bluepic").attr("class", "activated")

} 
else if(myTurn == true){ 
    console.log('redturn')
     $('#gamejoint').attr('class', 'gamer');
    $('.playerprompt').text('Player1 Please Answer, ')
    $("#redpic").attr("class", "activated")
}
$('#allputted').on('submit' , (e)=>{
    console.log('touched')
    e.preventDefault()
    
    solveEngine(param) 
    
})
} //endbigEngine

const donewit =() =>{; }

const advanceCounter =(param) => { counter++;
    myTurn = !myTurn;
    endgameCheck(param)    
}


const endgameCheck =(param) => {console.log(myTurn);
if(player1 >= 5 ){$('#gamejoint').toggle( "slow", ()=> {})
$('.endgamered').toggle( "slow", ()=> {})}
else if(player2 >= 5 ){$('#gamejoint').toggle( "slow", ()=> {})
$('.endgameblue').toggle( "slow", ()=> {})}
    else if (counter>= fetched.length){$('#gamejoint').toggle( "slow", ()=> {})
    $('.endgamecon').toggle( "slow", ()=> {})}
    else{console.log('going big');
    bigEngine(param)}

}

const solveEngine = (param) => {
// console.log('solving')
// console.log(player1)
let redfirst = $('.redside').width()
let bluefirst = $('.blueside').width()
redfirst = redfirst - 20
bluefirst = bluefirst -20;


    if ($('#uinput').val() !=  param[counter].answer){
        console.log($('#uinput').val())
        console.log(param[counter].answer)
        if(myTurn == true){player1 ++;
               $('.redside').attr('width', redfirst )
               console.log(redfirst) 
                   $('#playedit1').text(player1)            
    }
     else if (myTurn == false){player2 ++;
        $('.blueside').attr('width', bluefirst ) 
        $('#playedit2').text(player2)
    }
    
}
//   console.log(counter)  
advanceCounter(param)

    ;}
    
