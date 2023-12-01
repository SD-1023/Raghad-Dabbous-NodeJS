const {readFile} = require('fs/promises')
const fs =require("fs")


async function read(){
    try{
        const configFiles = await readFile("config.json" , "utf-8")
        const filesPath = JSON.parse(configFiles).files; 
        
        for(let i=0; i<filesPath.length ;i++){

            fs.stat(filesPath[i], async function(err, stat) {
                if(err == null){ //file exist
                    const data =await readFile(filesPath[i] , "utf-8");

                    if(data.length == 0){ // to check if file is empty
                        console.log(filesPath[i] + " is empty");
                    }else{
                        const arrayData = data.split(" ");
                        console.log(filesPath[i] + " : " + arrayData.length + " words");
                    }
                }
                else if (err.code === 'ENOENT') { //file does not exist
                    console.log(filesPath[i] + " does not exist");
                }
            });
        }
                
    }catch(error){
        console.log(error.message)
    }
}

read();