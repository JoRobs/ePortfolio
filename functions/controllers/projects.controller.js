const Project = require("../models/projects.model");

//create
exports.createProject = (req) => {
    try{
        const data = req.body
        data.userId = req.params.userId
        validateAdd(data);

        const project = new Project(data);

        project.create().then(console.log("Project Created"));

        return "Project created for user: " + project.userId;
    }catch(err){throw err}
}

function validateAdd(data){
    res = true;
    if(!data){
        res = false;
        throw new Error("No data");
    };
    if(!data.userId){
        res =  false;
        throw new Error("No userId");
    }
    if(!data.projectName){
        res =  false;
        throw new Error("No projectName");
    };
    return res;
}

/*
//read
exports.findAllProjects = (req, res) => {
    Project.getAll((err, data) => {
        if(err){
            res.status(500).send({message:err.message||"Error fetching all projects"});
            return;
        };

        res.status(200).send(data);
    });
};
*/

exports.findByProjectId = async (req) => {
    return await Project.getByProjectId(req.params.userId, req.params.projectId);
};

exports.findByUserId = async (req) => {
    return await Project.getByUserId(req.params.userId);
};

//update
exports.updateProject = (req) => {
    try{
        const data = req.body;
        data.userId = req.params.userId;
        data.projectId = req.params.projectId;
        validateUpdate(data);

        const project = new Project(data);

        project.update().then(console.log("Project updated"));

        return "Project: updated for user: " + project.userId;
    }catch(err){throw err}
}

function validateUpdate(data){
    res = true;
    if(!data){
        res = false;
        throw new Error("No data");
    };
    if(!data.userId){
        res =  false;
        throw new Error("No userId");
    }
    if(!data.projectId){
        res =  false;
        throw new Error("No projectId");
    };
    return res;
}

//delete
exports.delete = (req) => {
    return Project.deleteById(req.params.userId, req.params.projectId);
};