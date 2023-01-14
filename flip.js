'use strict'
const insert_card= document.querySelector('.card-insert')
const img=['playing cards/B.jpeg','playing cards/A.jpeg','playing cards/D.jpeg','playing cards/E.jpeg','playing cards/A.jpeg','playing cards/C.jpeg','playing cards/F.jpeg','playing cards/B.jpeg','playing cards/D.jpeg','playing cards/C.jpeg','playing cards/F.jpeg','playing cards/E.jpeg']
let id;
let checkIfMatch=[];
let score=0;
const overlay=document.querySelector("#overlay");
const whatHappend=document.querySelector('.what-happend');
let initial=0;
const new_game=document.querySelector('.new-game');
const bar=document.querySelector('.load-bar')


function createElement(i){
    const hiddenIMg=document.createElement('img');
          hiddenIMg.src=`playing cards/hidden.svg`;
          hiddenIMg.classList.add('flip')
          hiddenIMg.id=i

  insert_card.insertAdjacentElement("afterbegin",hiddenIMg)
}

function loadTopImg(){

    for(let i=0;i<12;i++){
            createElement(i)
    }
}loadTopImg()

function newGame(){
    // console.log('function is running')
    score=0;
    checkIfMatch=[];
    initial=0;
    overlay.classList.add('hidden');
    bar.style.width=0 +'%'
    removeAllLeftImage()
    loadTopImg()
    topImgGradiantClick()
}

function topImgGradiantClick(){

    const img2=img.sort((a,b)=>0.5-Math.random());
    const allImg=document.querySelectorAll('.flip')

        allImg.forEach(element=>{run(element)})

        function run(element){
            // console.log(checkIfMatch)
            element.addEventListener('click',(e)=>{
               
                // console.log(img2[e.target.id])
                checkIfMatch.push({name:img2[e.target.id],id:e.target.id})
        
                e.target.src=img2[e.target.id];
        
                if(checkIfMatch.length === 2){
                    let a=checkIfMatch[0],b=checkIfMatch[1];
                        if(a.name!==b.name){
                            // console.log('matched')
                                setTimeout(()=>{
                                    document.getElementById(`${+checkIfMatch[0].id}`).src=`playing cards/hidden.jpeg`;
                                    document.getElementById(`${+checkIfMatch[1].id}`).src=`playing cards/hidden.jpeg`;
                                    checkIfMatch=[]
                                },200)
        
                        }
                        if(a.name === b.name){
                            checkIfMatch.forEach((elemen,i)=>{
                                document.getElementById(`${+checkIfMatch[i].id}`).removeEventListener('click',run)
                            })
                            
                            score +=1
                            // console.log(score)
                            checkIfMatch=[]
                        }
                        if(score >= 6){
                            overlay.classList.remove('hidden');
                            clearInterval(id);
                            whatHappend.innerHTML='You Win'
                            new_game.addEventListener('click',()=>{
                                newGame()
                            })
                        }
                        
                }
                
    runProgressBar()

        })

        }
}topImgGradiantClick()




function runProgressBar(){
if(initial===0){
    initial=1;
    let width=0;
    id=setInterval(bars,1000)
    function bars(){
        if(width>=100){
            clearInterval(id)
            initial=0
            overlay.classList.remove('hidden');
            new_game.addEventListener('click',()=>{
                newGame()
            })
        }else{
            width+=5
            bar.style.width=width+'%'
        }
    }
}

}


function removeAllLeftImage(){
    document.querySelectorAll('.flip').forEach(val=>val.remove())
}