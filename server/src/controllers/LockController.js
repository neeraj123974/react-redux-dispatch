import Lock from '../models/Lock'

// create lock
const createLock = async (req, res) => {   
    try{
        const lock = await Lock.create(req.body)
        return res.status(200).json({
            status: true,
            message: "Lock created successfully.",
            data: lock
        })
    }catch(err){
        return res.status(200).json({
            status: true,
            message: err,
            data: []
        })
    }
}


// get lock
const getLock = async (req, res) => {   
    try{
        const lock = await Lock.find({})
        return res.status(200).json({
            status: true,
            message: "Lock found successfully.",
            data: lock
        })
    }catch(err){
        return res.status(200).json({
            status: true,
            message: err,
            data: []
        })
    }
}

// delete lock
const deleteLock = async (req, res) => {   
    try{
        const lock = await Lock.remove({_id:req.body.id})
        return res.status(200).json({
            status: true,
            message: "Lock deleted successfully.",
        })
    }catch(err){
        return res.status(200).json({
            status: true,
            message: err,
            data: []
        })
    }
}

const editLock = async (req, res) => { 
    try{ 
        await Lock.update({_id:req.body.id},{$set:req.body})
        return res.status(200).send({
            status: true,
            message: "Lock updated successfully.",
        })
    }catch(err){
        return res.status(200).json({
            status: true,
            message: err,
            data: []
        })
    }
}



export default {
    createLock,
    getLock,
    deleteLock,
    editLock
}