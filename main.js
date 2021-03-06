const path = require("path");
const fs = require("fs");

function display(name,spaces){
    let lastname = name.split("\\");
    let withdot = [];
    let withoutdot = [];
    process.stdout.write("\n");
    for(let i=0;i<spaces;i++)
      process.stdout.write(" ");
      
    console.log("=>",lastname[lastname.length-1]); 
    var files = fs.readdirSync(name);

        files.forEach(function(file){
         if(fs.lstatSync(path.join(name,file)).isDirectory()){
             withoutdot.push(file);
         }else 
            withdot.push(file);
       
    
       }) 
       for(let i=0;i<withdot.length;i++){
        for(let j=0;j<spaces;j++)
            process.stdout.write(" ");
        console.log("|_",withdot[i]); 
    }    
    for(let i=0;i<withoutdot.length;i++){
        display(path.join(name,withoutdot[i]),spaces+2);
    }     

}

function showpath(path){
    display(path,0);
}

function managefiles(source,dest){
    var files = fs.readdirSync(source);
    files.forEach(function(file){
        if(fs.lstatSync(path.join(source,file)).isDirectory()){
           managefiles(path.join(source,file),dest);
        }else{
            
            let extension = file.split('.');
            extension = extension[extension.length-1]
            if(!fs.existsSync(path.join(dest,extension))){
                fs.mkdirSync(path.join(dest,extension));   
            }
                let tempsourcepath = path.join(source,file);
                let tempdestpath = path.join(dest,extension);
                tempdestpath = path.join(tempdestpath,file);
                fs.copyFileSync(tempsourcepath,tempdestpath);          
        }
    })
}

function manage(source,dest){
  
    if(!fs.existsSync(path.join(dest,"Managed Folder")))
      fs.mkdirSync(path.join(dest,"Managed Folder"));
    dest = path.join(dest,"Managed Folder");
    managefiles(source,dest);
}

module.exports.showpath = showpath;
module.exports.manage = manage;