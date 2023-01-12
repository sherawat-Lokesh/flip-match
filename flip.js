'use strict'

const img=['playing cards/B.SVG','playing cards/A.SVG','playing cards/D.SVG','playing cards/E.svg','playing cards/A.SVG','playing cards/C.SVG','playing cards/F.SVG','playing cards/B.SVG','playing cards/D.SVG','playing cards/C.SVG','playing cards/F.SVG','playing cards/E.svg']

function createElement(i){
    const hiddenIMg=document.createElement('img');
          hiddenIMg.src=`playing cards/hidden.svg`;
          hiddenIMg.classList.add('flip')
        hiddenIMg.id=i

    document.querySelector('.card-insert').insertAdjacentElement("afterbegin",hiddenIMg)
}

for(let i=0;i<12;i++){
        createElement(i)
}
let checkIfMatch=[];
let score=0
function topImgGradiantClick(){
    const img2=img.sort((a,b)=>0.5-Math.random());
    const allImg=document.querySelectorAll('.flip')
        allImg.forEach(element=>{
            element.addEventListener('click',(e)=>{
                e.preventDefault()
                console.log(img2[e.target.id])
                checkIfMatch.push({name:img2[e.target.id],id:e.target.id})
                console.log(checkIfMatch)
                e.target.src=img2[e.target.id];
        
                if(checkIfMatch.length === 2){
                    let a=checkIfMatch[0],b=checkIfMatch[1];
                        if(a.name!==b.name){
                            console.log('matched')
                            setTimeout(()=>{
                                document.getElementById(`${+checkIfMatch[0].id}`).src=`playing cards/hidden.svg`;
                                document.getElementById(`${+checkIfMatch[1].id}`).src=`playing cards/hidden.svg`;
                                checkIfMatch=[]
                            },500)
                        }
                        if(a.name === b.name){
                            score +=1
                            console.log(score)
                            checkIfMatch=[]
                        }
                        if(score===6){

                        }
                }
        })
    })
}topImgGradiantClick()