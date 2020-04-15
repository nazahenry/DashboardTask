const express = require('express');
const app = express();
const router = express.Router();
const { check, validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('../config/DB')

app.use(cors());



router.get('/', 
// [
//     check('faculty_id', 'Faculty ID is REQUIRED!').not().isEmpty(),
// ], 
    async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({ errors: errors.array().map(msg => msg.msg) })
    }

    // const { faculty_id, faculty, description } = req.body;

    //Selecting ALL from the TABLE
    knex
        .from('faculties')
        .select("*")
        .then((rows) => {
            res.json({
                page: 1,
                per_page: 6,
                total: 12,
                total_pages: 2,
                data: rows})
            // for(row of rows) {
            //    const all = `${row['faculty_id']}  ${row['faculty']}  ${row['description']}`;
            //    res.send(all)
            //    console.log(all)
            // }
        }).catch(err => { 
            res.status(400).json("Could not Select ALL")
            console.log(err); 
            throw err })
        .finally(() => {
            knex.destroy();
        });

    //Selecting speficfic Records
    // knex
    //     .from('faculties')
    //     .select("faculty", "description")
    //     .where('faculty_id', faculty_id)
    //     .then((rows) => {
    //         for (row of rows) {
    //             const record = `${row['faculty']}  ${row['description']}`;
    //             res.send(record)
    //             console.log(record)
    //         }
    //         // console.log(rows)
    //     })
    //     .catch(err => { 
    //         res.status(400).json("Could not Select Specific Records")
    //         console.log(err); 
    //         throw err })
    //     .finally(() => {
    //         knex.destroy();
    //     });
})

module.exports = router;