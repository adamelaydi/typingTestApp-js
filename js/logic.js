import { passageHandling,showPassInDoc ,Statistics ,check } from "./dom.js";

//#region timer
export function timer(wordNum){
    let Counter = 60;
    let myInterval=setInterval(() => {
        Counter--;
        localStorage.setItem("time","true");
        document.querySelector("main .container .bar .time .score").textContent=`0:${Counter}`;
        if(Counter===0){
            //end the timer
            clearInterval(myInterval);
            localStorage.setItem("time","false");
            //hide the passage
            document.querySelector("main >.container").style.display="none";
            //display result screen
                //the first time
                if(localStorage.getItem("bestScore")===null){
                    let first=document.querySelector("main .first");
                    first.style.display="flex";
                }
                //the best score
                else if(localStorage.getItem("bestScore")<wordNum){
                    let best=document.querySelector("main .best");
                    best.style.display="flex";
                }
                // normal state
                else{
                    let normal=document.querySelector("main .normal");
                    normal.style.display="flex";
                }
                

        }
        return true;     
    }, 1000);
}
//#endregion

//#region statistics
    function calcStatistics(trueCount,falseCount,wordNum){
        return {
            accuracy:Math.ceil((trueCount/(trueCount+falseCount))*100),
            speed:wordNum,
            characters:trueCount+"/"+falseCount
        }
    }
//#endregion

//#region main funciton
export async function main(level="easy"){
    let counter=0,trueCounter=0,falseCounter=0;
    let data= await passageHandling(level);
    let passage=data.pass;
    let wordCounter=0;
    showPassInDoc(passage);
    document.addEventListener("keypress",(event)=>{
                    //calculating words
                        if(passage[counter]===" "){
                            wordCounter++;
                        }
                    // time end case
                        if(localStorage.getItem("time")==="false"){
                            console.log("time ends!");
                            let statValues=calcStatistics(trueCounter,falseCounter,wordCounter);
                            //best score
                                if(localStorage.getItem("bestScore")===null ||( Number(localStorage.getItem("bestScore"))<Number(wordCounter) && trueCounter>falseCounter)){
                                    localStorage.setItem("bestScore",`${statValues.speed}`);
                                }
                            //Statistics
                                Statistics(localStorage.getItem("bestScore"),statValues.accuracy,statValues.speed , statValues.characters);
                        }
                    // passage ends before time 
                        if(counter===passage.length-1){
                            console.log("passage end!")
                        }

                        //#region set updated data
                            let updateData=check(passage,counter,event.key,trueCounter,falseCounter);
                            trueCounter=updateData.true;
                            falseCounter=updateData.false;
                            counter=updateData.counter;
                        //#endregion
                        
                    // the statistics
                        console.log(`key : ${event.key} , counter : ${counter} ,trueCounter : ${trueCounter} , falseCounter : ${falseCounter}`)
                    });
    timer(wordCounter);
    }
//#endregion
