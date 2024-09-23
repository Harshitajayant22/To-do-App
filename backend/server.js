const express= require("express");
const app=express();
let todo=[];
let id=0;
app.use(express.json());

app.get('/home',(req,res)=>{
    res.json({
        message:"welcome to todo app"
    });
})

// respond present todos to client
app.get('/todo',(req,res)=>{
    if(todo.length>0){
       return res.status(200).json({
            message:"todo is present",
            todo:todo //data
        })
    }
    
    else{
       return res.status(400).json({
            message:"noting is present",
            length:todo.length //0
        });
    }
});

//adding new todo//
app.post('/',(req,res)=>{
    const title=req.body.title;
    const desc=req.body.desc;
    if(title && desc){
        id=id+1;
        todo.push({
            id,title,desc
        })
    }
    else{
        return res.Status(400).json({
            message:"noting is present in tittle and desc"
        })
    }
    return res.status(200).json({
        message:"todo added sucessfuly",
        todo:{id,title,desc}
    })
});

//editing the existing todo.//
app.put('/todo/:id',(req,res)=>{
    const id=req.params.id;
    console.log(id);
    const newtitle=req.body.title;
    const newdesc=req.body.desc;
    let isupdated=false;

    for(let i=0; i<todo.length; i++){
        if(todo[i].id==id){
            todo[i].title=newtitle;
            todo[i].desc=newdesc;
            isupdated=true;
        }
    }
    if(isupdated){
        return res.status(200).json({
            message:"todo updated",
            todo:todo
        })
    }
    return res.status(400).json({       //400-404 (not found) //500 (status code)
        message:"todo is not found",
    })
})

//app ko kareneg delete//
app.delete('/todo/:id',(req,res)=>{
    let newtodo=[];
    const id=req.params.id;   ///samaj nahi aaya
    for(let i=0; i<todo.length; i++){
        if(todo[i].id==id){

        }
        else{
            newtodo.push(todo[i]);
        }
    }
    todo=[];
    todo=newtodo;
    return res.status(200).json({
        message:"todo element delete",
        todo:todo
    })

})
app.listen(8000,()=>{
    console.log("server running")
})
