import Task from "../models/Task";

export const renderIndex = (req, res) => {
    res.render("index");
  };
  
  export const renderTasks = async(req,res)=>{
    const tasks = await Task.find({user: req.user.id}).lean();
    //console.log(tasks[0]);
    res.render("notes",{tasks:tasks});
}

export const createTask =async(req,res)=>{
    try {
        const task =Task(req.body)
        task.user= req.user.id;
        const taskSaved = await task.save();

        console.log(taskSaved);
        //console.log(req.body);
        //res.send("Guardar");
        
        res.redirect('/notes');
    } catch (error) {
        console.log(error);
    }
}

export const aboutTask = (req,res)=>{
    res.render("about");
}

export const renderTaskEdit = async(req,res)=>{
    //console.log(req.params.id)
  const task = await Task.findById(req.params.id).lean()

   // res.render("edit");
    res.render("edit",{task});
}

export const editTask = async(req,res)=>{
    const{id } = req.params

    await Task.findByIdAndUpdate(id, req.body)

    //console.log(req.body);
    //res.send('Cambio recibido');
    res.redirect('/notes');
}
export const delteTask = async(req,res)=>{
    const { id } = req.params;
    await Task.findByIdAndDelete(id)
    //res.render("delete");
    res.redirect('/notes');
}

export const doneTask =async(req,res)=>{
    const{id } = req.params;
    const task = await Task.findById(id)
    task.done = !task.done;
    await task.save();
    res.redirect("/notes");
}
