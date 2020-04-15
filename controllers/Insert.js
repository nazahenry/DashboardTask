const express = require('express');
const app = express();
const router = express.Router();
const { check, validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('../config/DB')

app.use(cors());



router.post('/', [
    check('faculty_id', 'Faculty ID is REQUIRED!').not().isEmpty(),
    check('faculty', 'Faculty Name is REQUIRED!').not().isEmpty(),
    check('description', 'Give a description about your Faculty, not less than 10 WORDS.').not().isEmpty().isLength({ max: 200 })
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({ errors: errors.array().map(msg => msg.msg) })
    }

    const { faculty_id, faculty, description } = req.body;
    //Inserting Into the TABLE
    knex('faculties')
        .returning(['faculty_id', 'faculty', 'description'])
        .insert({
            faculty_id,
            faculty,
            description
        })
        .then(id => res.status(id).send("Data inserted SUCCESSFULLY"))
        .catch(err => {
            res.status(400).json('Error from Insertion')
            console.log(err); 
            throw err
        })
        .finally(() => {
            knex.destroy();
        })
})


// router.post('/', [

//     check('first_name', 'First Name is required').not().isEmpty(),
//     check('last_name', 'Last Name is required').not().isEmpty(),
//     check('gender', 'Gender is required').not().isEmpty(),
//     check('mobile_no', 'Phone not more than 11 digits').isLength({ max: 11 }),
//     check('email_id', 'A valid email is required').isEmail(),
//     check('password', 'Provide a valid password not less than 8 characters').isLength({ min: 8 })

// ], async (req, res) => {

//     const errors = validationResult(req)
//      if(!errors.isEmpty()){
//         res.status(400).json({ errors: errors.array().map((msg) => { return msg.msg } )})
//      }

//     const { first_name, last_name, gender, mobile_no, email_id, password } = req.body;

//         const salt = await bcrypt.genSalt(10);
//         const hash_password = await bcrypt.hash(password, salt);
        
//      //Inserting into the Database
//      knex('students')
//         .insert({
//             first_name,
//             last_name,
//             gender,
//             mobile_no,
//             email_id,
//             password: hash_password,
//             created_at: new Date
//         })
//         .then(id => res.send(id) )
//         .catch(err => {
//             res.status(400).json('Data not entered!');
//             console.error(err)
//         });
// })

module.exports = router;