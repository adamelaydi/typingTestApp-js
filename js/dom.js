import {loadPassage} from "./api.js"
import {main} from"./logic.js"

//#region checking if character is true or false
    export function check(passage , index , key ,trueCounter,falseCounter){
        if(key===passage[index]){
            document.getElementById(`char-${index}`).style.color="hsl(140, 63%, 57%)";
            trueCounter++;
        }
        else{
            console.log("ejsdjflasdjfl")
            document.getElementById(`char-${index}`).style.color="hsl(354, 63%, 57%)";
            document.getElementById(`char-${index}`).style.textDecoration="underline";
            falseCounter++;
        }
        index++;
        return {
            true:trueCounter,
            false:falseCounter,
            counter:index
        }
    }
//#endregion

//#region buttons
    export function buttons(){
        let diffBtn=document.querySelector("main .container .bar .custom .difficulty .title");
        let diffList=document.querySelector("main .container .bar .custom .difficulty ul");
        let modeBtn=document.querySelector("main .container .bar .custom .mode .title");
        let modeList=document.querySelector("main .container .bar .custom .mode ul");
        let StatisticsBtn=document.querySelector("main .container .bar button");
        let infoList=document.querySelector("main .container .bar .information");
    if(window.innerWidth < 1024){
            diffBtn.addEventListener("click",()=>{
                modeList.style.display="none";
                infoList.style.display="none";
                if(diffList.style.display==="none")
                    diffList.style.display="flex";
                else
                    diffList.style.display="none";
            })
            
            modeBtn.addEventListener("click",()=>{
                infoList.style.display="none";
                diffList.style.display="none";
                if(modeList.style.display==="none")
                    modeList.style.display="flex";
                else
                    modeList.style.display="none";
            })
            
            StatisticsBtn.addEventListener("click",()=>{
                diffList.style.display="none";
                modeList.style.display="none";
                if(infoList.style.display==="none")
                    infoList.style.display="flex";
                else
                    infoList.style.display="none";
            })
    }

    if(localStorage.getItem("bestScore")!=="null")
        document.querySelector("header .container .personal-best .score").textContent=localStorage.getItem("bestScore");
    else
        document.querySelector("header .container .personal-best .score").textContent="---";

    if(window.innerWidth < 756){
    let img=document.querySelector("header .container img");
    img.src="../assets/images/logo-small.svg";
    let personal=document.querySelector("header .container .personal-best .title");
    personal.style.display="none";
}

if(window.innerWidth > 756){
    let img=document.querySelector("header .container img");
    img.src="../assets/images/logo-large.svg";
    let personal=document.querySelector("header .container .personal-best .title");
    personal.style.display="inline";
}

let levels=document.querySelectorAll("main .container .bar .custom .difficulty ul li");
levels.forEach((ele)=>{
    ele.addEventListener("click",()=>{
        console.log("sdfasfasdfa")
        levels.forEach((el)=>{
            el.classList.remove("active")
        })
        ele.classList.add("active");
        localStorage.setItem("level",ele.textContent)
        location.reload();
        //hide the overlay
        main(localStorage.getItem("level"));
        buttons();
        document.querySelector("main .start-overlay").style.display="none";
    })
})
    }
//#endregion

//#region passage charachters
export async function passageHandling(diff,id=0){
    let passageNum;
    if(id===0)
        passageNum=Math.floor(Math.random()*10);
    let data = await loadPassage();
    let level=data[`${diff}`];
    return {
        pass:level[Number(passageNum)].text,
        id:level[Number(passageNum)].id,
    }
}

export function showPassInDoc(passage){
    let passContainer=document.getElementById("psg");
    passContainer.innerHTML="";
    // console.log("char") 
    for(let i=0 ;i<passage.length;i++){
        let char=document.createElement("pre");
        char.setAttribute("id",`char-${i}`)
        char.textContent=passage[i];
        passContainer.appendChild(char);
    }
}
//#endregion

//#region assign Statistics
    export function Statistics(best , acc ,speed ,char){
        document.querySelector("header .container .personal-best .score").textContent=best;
        document.querySelector("main .container .bar .information .speed .score").textContent=speed;
        document.querySelector("main .container .bar .information .accuracy .score").textContent=char;
        // for first
        document.querySelector("main .first .container .info .word .score").textContent=speed;
        document.querySelector("main .first .container .info .accuracy .score").textContent=Math.ceil(acc)+"%";
        document.querySelector("main .first .container .info .charachters .score").textContent=char;
        // for normal
        document.querySelector("main .normal .container .info .word .score").textContent=speed;
        document.querySelector("main .normal .container .info .accuracy .score").textContent=Math.ceil(acc)+"%";
        document.querySelector("main .normal .container .info .charachters .score").textContent=char;
        // for best
        document.querySelector("main .best .container .info .word .score").textContent=speed;
        document.querySelector("main .best .container .info .accuracy .score").textContent=Math.ceil(acc)+"%";
        document.querySelector("main .best  .container .info .charachters .score").textContent=char;
    }   
//#endregion

//start button
let startBtn=document.querySelector("main .start-overlay button");
startBtn.addEventListener("click",()=>{
    //hide the overlay
    document.querySelector("main .start-overlay").style.display="none";
    //start main fuction
    main();
})

// normal state
let normalBtn=document.querySelector("main .normal .container button");
normalBtn.addEventListener("click",()=>{
    document.querySelector("main .normal").style.display="none";
    location.reload();
    //hide the overlay
    document.querySelector("main .start-overlay").style.display="none";
    main();
})

// first state
let firstBtn=document.querySelector("main .first .container button");
firstBtn.addEventListener("click",()=>{
    location.reload();
    //hide the overlay
    document.querySelector("main .start-overlay").style.display="none";
    main();
})

//best state
let bestBtn=document.querySelector("main .best .container button");
bestBtn.addEventListener("click",()=>{    location.reload();
    //hide the overlay
    document.querySelector("main .start-overlay").style.display="none";
    main();
})

//restart state
let restartBtn=document.querySelector("main .container .restart");
restartBtn.addEventListener("click",()=>{
    location.reload();
    //hide the overlay
    document.querySelector("main .start-overlay").style.display="none";
    main();
})