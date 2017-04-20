const files = require('./config.json');
const fs = require('fs');
const path = require('path');


if(process.argv[2] == "-init"){
    files.forEach((v) => {
       if(v.type === "dir"){
            fs.mkdir(path.join(__dirname,v.name),(err) => {
                err?console.log(v.name+"创建目录失败"):console.log(v.name+"创建目录成功");
            })
       }
       if(v.type === "file"){
            fs.writeFile(path.join(__dirname,v.name),"",(err) =>{
                  err?console.log(v.name+"创建文件失败"):console.log(v.name+"创建文件成功");
            })
       }
    })
}else if(process.argv[2] == "-del"){

         files.forEach((v) =>{
                if(v.type === "dir"){
                    delDirectory(path.join(__dirname,v.name));
                }
                if(v.type === "file"){
                    fs.unlinkSync(path.join(__dirname,v.name));
                    console.log(path.join(__dirname,v.name)+"文件已删除")
                }
            })
}else{
    console.log("参数无效");
}


//递归删除目录

function delDirectory(url){
    //获取所有目录下的文件
    let files=fs.readdirSync(url);
    //遍历目录，判断是文件还是目录
   files.forEach((v) =>{
        console.log(v);
        var tempurl = path.join(url,v)
        let type=fs.statSync(tempurl);
        //如果是文件，删除文件
        if(type.isFile()){
            fs.unlinkSync(tempurl)
            console.log(tempurl+"文件已删除")
        }
        //如果是目录，进行递归删除
        if(type.isDirectory()){
              delDirectory(tempurl);
        }
   })
    fs.rmdirSync(url);
    console.log(url+"目录已删除");
}