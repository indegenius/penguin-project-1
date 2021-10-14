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
let redfirst = $('.redside').width()
let bluefirst = $('.blueside').width()

const playAudio = ()=>{
    $('.wrapthegame').append('<audio>'); 
    
    $('.wrapthegame audio').attr('src', './img/Shall-we-play-a-game.mp3');
 console.log($('.wrapthegame audio')[0] )
    
    $('.wrapthegame audio')[0].play()
}

const getReady = (param) =>{ 
    $('.open_btn').on('click' , ()=>{
    // console.log(param);
        $('.opener').toggle( "slow", ()=> {})
        $('#gamejoint').toggle( "slow", ()=> {})
        $('#uinput').val('')
        $('.questionme').text(param[counter].question)
        $('.playerprompt').text('Player1 Please Answer, ')
        $("#redpic").attr('class', 'activated')
        inputter(param)
        playAudio()
})

}

$.ajax(URL)
.then((data)=>{
    fetched = data.items.map((q) => q.fields)
 
    getReady(fetched)
})

const inputter =  (param) => {$('#allputted').on('submit' , (e)=>{
        // console.log('touched')
        e.preventDefault()
        solveEngine(param)    
    })
    ;}

const turnBlue=(param)=>{
    // console.log('blueturn')
    $("#redpic").attr('class', '')
$('#gamejoint').attr('class', 'gameblue');

// console.log($('.playerprompt').text())

$("#bluepic").attr('class', 'activated');
}

const turnRed = (param) => {
    // console.log('redturn')
    $("#bluepic").attr('class', '');
     $('#gamejoint').attr('class', 'gamer');
    
    $("#redpic").attr('class', 'activated')}


    const questoiner = (param ) => {
        $('#uinput').val('')
        console.log($('#uinput').text())
$('.questionme').text('')
$('.playerprompt').text('') 
$('.questionme').text(param[counter].question)
if (myTurn){
    
    // console.log(redfirst + ' redvalue')
    $('.playerprompt').text('Player1 Please Answer, ')

// console.log($('.redside').width() + "Redwidth")
}
else { 
    
    // console.log(bluefirst + ' blueValue')
    $('.playerprompt').text('Player2 Please Answer, ')
    
    // console.log($('.blueside').width() + "Bluewidth")
}

}



const advanceCounter =(param) => { counter++;
    myTurn = !myTurn;
    endgameCheck(param)    
    
    // bigEngine(param)
    console.log(myTurn + " myturn Value")
    if (myTurn){turnRed(param)
}
else {
    turnBlue(param)
}
questoiner(param)
$('.defcon').width( fetched.length * counter )
}


const endgameCheck =(param) => {console.log(myTurn);
if(player2 >= 5 ){$('#gamejoint').toggle( "slow", ()=> {})
$('.endgamered').toggle( "slow", ()=> {})}
else if(player1 >= 5 ){$('#gamejoint').toggle( "slow", ()=> {})
$('.endgameblue').toggle( "slow", ()=> {})}
    else if (counter>= fetched.length){$('#gamejoint').toggle( "slow", ()=> {})
    $('.endgamecon').toggle( "slow", ()=> {})}
    

}



const playNo = ()=>{
     $('.wrapthegame audio').attr('src', './img/no.mp3');
 console.log($('.wrapthegame audio')[0] )
    
    $('.wrapthegame audio')[0].play()
}

const solveEngine = (param) => {
    // donewit(param)  
// console.log('solving')
//  console.log($('#uinput').val())
// console.log(param[counter].answer)
        if( $('#uinput').val() !=  param[counter].answer && myTurn == true){player1 ++;
            
                   $('#playedit1').text(player1 + " failures")   
                   console.log('redhit')
                //    redfirst = redfirst - 20 ;
                //    $('.redside').width( redfirst )
                // courtesy http://jsfiddle.net/jakecigar/3aaxs/
                // $('#redpic').animate({
                //     width: "-=20",
                //     height: "-=20",
                //     top: "+=20",
                //     left: "+=20"
                // }, 300);
                   playNo()
                   advanceCounter(param);         
    }
     else if ( $('#uinput').val() !=  param[counter].answer && myTurn == false){player2 ++;
        
        $('#playedit2').text(player2 + " failures")
        console.log('bluehit')
        // bluefirst = bluefirst -20 ;
        // $('.blueside').width( bluefirst ) 
        // $('#bluepic').animate({
        //     width: "-=20",
        //     height: "-=20",
        //     top: "+=20",
        //     left: "+=20"
        // }, 300);
        playNo()
        advanceCounter(param);
    }
    else{
        console.log('nodhit')
        advanceCounter(param);
    }

//   console.log(counter)  


    }  