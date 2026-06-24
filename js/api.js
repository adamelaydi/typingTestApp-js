//#region load passage
    export async function loadPassage(){
        try{
            const response=await fetch("../data/data.json");
            let data=await response.json();
            return data;
        }
        catch(err){
            console.error(`this error is founded in loading passage!`);
        }
    }
//#endregion