
const express = require('express')
const router = express.Router()

const { getListUser, createUser, selectUserToUpdate, formCreateUser, update, selectDeleteUser, deleteUser } = require('../controllers/controller')

function routing(app) {
    router.get('/', getListUser)

    router.get('/create/form', formCreateUser)
    router.post('/create/store', createUser)

    router.get('/update/:id', selectUserToUpdate)
    router.put('/update/:id', update)

    router.get('/delete/:id', selectDeleteUser)
    router.delete('/delete/:id', deleteUser)

    return app.use('/', router)
}


module.exports = routing;