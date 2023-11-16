
const dbSQL = require('../config_db/connectDB')

// Controllers

function getListUser(req, res) {
    // Truy vấn SELECT
    dbSQL.connection.query('SELECT * FROM nhanvien', (error, results, fields) => {
        if (error) {
            console.error('Lỗi truy vấn: ' + error);
            return;
        }

        console.log('Result: ', results);
        console.log('Feilds: ', fields);

        return res.render('home', { dataUser: results })
    });
}

// GET /create/form
function formCreateUser(req, res) {
    return res.render('create')
}


// POST /create/store
function createUser(req, res) {
    const newUser = {
        Ho: req.body.Ho,
        Ten: req.body.Ten
    }

    // Truy vấn SQL
    dbSQL.connection.query('INSERT INTO nhanvien SET ?', newUser, (error, results) => {
        if (error) {
            console.error('Faild create user: ' + error.message);
            return;
        }
        console.log('Create user successfully !!!');
    });

    console.log('dataBodyyyyy: ', newUser)
    res.redirect('/')
    // return res.json(newUser)
}

//GET update/:id
function selectUserToUpdate(req, res) {
    const paramURL = req.params.id
    console.log('dataUpdate: ', paramURL)

    //Truy vấn SQL
    dbSQL.connection.query('SELECT * FROM nhanvien WHERE id = ?', [paramURL], (error, results, fields) => {
        if (error) {
            console.error('Error Update: ' + error.message);
            return;
        }
        console.log('Results Update: ', results[0]);
        return res.render('update', { userUpdate: results[0] })
    });
}

//PUT update/:id
function update(req, res) {
    console.log('PUT payload: ', req.body, 'params: ', req.params.id)
    const newData = req.body
    const userId = req.params.id

    //SQL Update
    dbSQL.connection.query(
        'UPDATE nhanvien SET ? WHERE id = ?',
        [newData, userId],
        (err, results) => {
            if (err) {
                console.error('Faild UPDATED: ', err);
                return;
            }
            else {
                console.log('Updated sucessfully !!!');
            }
        }
    );

    return res.redirect('/')
}


//GET /delete/:id
function selectDeleteUser(req, res) {
    return res.send('Select delete')
}

//DELETE /delete/:id
function deleteUser(req, res) {
    const userIdToDelete = req.params.id

    // SQL DELETE
    dbSQL.connection.query(
        'DELETE FROM nhanvien WHERE id = ?',
        [userIdToDelete],
        (err, results) => {
            if (err) {
                console.error('Faild SQL DELETE: ', err);
                return
            } else {
                console.log('Deleted Successfully !!!');
            }
        }
    );
    return res.redirect('/')
}


module.exports = { getListUser, createUser, selectUserToUpdate, formCreateUser, update, selectDeleteUser, deleteUser }