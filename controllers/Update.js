const express = require('express');
const app = express();
const router = express.Router();
const { check, validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('../config/DB')

app.use(cors());



router.put('/', [
    check('faculty_id', 'Faculty ID is REQUIRED!').not().isEmpty(),
    check('faculty', 'Faculty Name is REQUIRED!').not().isEmpty(),
    check('description', 'Give a description about your Faculty, not less than 10 WORDS.').not().isEmpty().isLength({ max: 200 })
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({ errors: errors.array().map(msg => msg.msg) })
    }

    const { faculty_id, faculty, description } = req.body;

    //Updating the TABLE
    knex('faculties')
        .where({ faculty_id })
        .update({
            faculty_id,
            faculty,
            description
        }, ['faculty_id', 'faculty', 'description'])
        .then(id => res.send(id))
        .catch(err => {
            res.status(400).json('Error from Insertion')
            console.log(err); 
            throw err
        })
        .finally(() => {
            knex.destroy();
        })
})

module.exports = router;