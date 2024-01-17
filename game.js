let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector("#reset");
let newbtn=document.querySelector("#new");
let container1=document.querySelector(".container1");
let msg=document.querySelector("#msg");

//true denotes turn for player X and false denotes turn for player O
let turn=true;
let count=0;

//all possible win patterns for tic tac toe
let winPatterns=
[
    //diagonal patterns
    [0,4,8],
    [2,4,6],
    
    //row patterns
    [0,1,2],
    [3,4,5],
    [6,7,8],

    //column patterns
    [0,3,6],
    [1,4,7],
    [2,5,8]
];

//for restarting the game
function resetGame()
{
    turn=true;
    count=0;

    enableBoxes();
    container1.classList.add("hide");
}

function enableBoxes()
{
    for(let i=0;i<boxes.length;i++)
    {
        boxes[i].disabled=false;
        boxes[i].innerText="";
    }
}

function disableBoxes()
{
    for(let i=0;i<boxes.length;i++)
    {
        boxes[i].disabled=true;
    }
}

function showDraw()
{
    disableBoxes();

    msg.innerText=`The Game is a Tie`;
    container1.classList.remove("hide");
}

function showWinner(winner)
{
    disableBoxes();

    msg.innerText=`Congratulations, Winner is player ${winner}`;
    container1.classList.remove("hide");
}

function checkWinner()
{
    //if any of the win pattern is formed
    for(let i=0;i<winPatterns.length;i++)
    {
        let a=winPatterns[i][0];
        let b=winPatterns[i][1];
        let c=winPatterns[i][2];

        if(boxes[a].innerText!=="" && boxes[a].innerText===boxes[b].innerText && boxes[b].innerText===boxes[c].innerText)
        {
            showWinner(boxes[a].innerText);
            return true;
        }
    }

    return false;
}

//for marking the box whenever mouse is clicked
function mark(evt)
{
    //this is very imp
    //we get the current box by using the Event Object
    let box=evt.target;

    if(turn===true)
    {
        box.innerText="X";
        turn=false;
    }

    else
    {
        box.innerText="O";
        turn=true;
    }

    //The Boolean disabled attribute, when present, makes the element not mutable, focusable, or even submitted with the form
    //The user can neither edit nor focus on the control, nor its form control descendants
    //Often browsers grey out such controls and it won't receive any browsing events, like mouse clicks or focus-related ones
    box.disabled=true;
    count++;

    //for checking winner
    let result=checkWinner();

    //for checking draw
    if(result==false && count==9)
    {
        showDraw();
    }
}

for(let i=0;i<boxes.length;i++)
{
    boxes[i].addEventListener("click",mark);
}
 
resetbtn.addEventListener("click",resetGame);
newbtn.addEventListener("click",resetGame);