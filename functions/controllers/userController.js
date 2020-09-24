const User = require('../models/users/users.model.js')
const UserUpdate = require('../models/users/updateUser.model.js')
const validator = require('validator')

async function addUser(addData) {
    if (checkingUserObject(addData)) {
        const user = new User(addData)
        var x = await user.add().catch((error) => {
            console.log(error)
        })
        return `User ${user.dataObject.name} has been added`
    } else {
        throw new Error("User Object is not valid")
    }
}

function checkingUserObject(addData) { 
    if (addData.hasOwnProperty('name','bio', 'email', 'userId')) {
        return validator.isEmail(addData.email)
        
    }
    return false
}

async function updateUser(updateData) {
    const updateObject = new UserUpdate(updateData)
    await User.update(updateObject).catch((err) => {
        console.log(err)
        throw err
    })
    return `User ${updateObject.update.userId} updated`
    
}
async function deleteUser(deleteData) {
    if (deleteData.hasOwnProperty("userId")) {
        User.delete(deleteData).then((res) => {
            return res
        }).catch(err => {
            console.log(err)
        })
    }
}

module.exports = {
    addUser: addUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}


