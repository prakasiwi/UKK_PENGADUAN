const express = require("express")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const models = require("../models/index")
const masyarakat = models.masyarakat

const md5 = require("md5")

const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "BelajarNodeJSItuMenyengankan"

app.get("/", auth, (req, res) =>{
    masyarakat.findAll()
            .then(masyarakat => {
                res.json(masyarakat)
            })
            .catch(error => {
                res.json({
                    message: error.message
                })
            })
    
})

app.post("/",(req, res) => {
    let data = {
        nik: req.body.nik,
        nama: req.body.nama,
        email: req.body.email,
        password: md5(req.body.password),
        telp: req.body.telp
    }

    masyarakat.create(data)
    .then(result => {
        res.json({
            message: "data has been inserted"
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.put("/", auth, async(req, res) => {
    let param = { id_masyarakat: req.body.id_masyarakat}
    let data = {
        nik: req.body.nik,
        nama: req.body.nama,
        email: req.body.email,
        telp: req.body.telp,
        password: md5(req.body.password)
    }

    if (req.body.password) {
        data.password = md5(req.body.password)
    }

    masyarakat.update(data, {where: param})
    .then(result => {
        res.json({
            message: "data has been updated"
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.delete("/:id_masyarakat", auth, async(req, res) => {
    let param = {id_masyarakat: req.params.id_masyarakat}
    masyarakat.destroy({where: param})
    .then(result => {
        res.json({
            message: "data has been deleted"
           
         
            
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.post("/auth", async (req,res) => {
    let params = {
        email: req.body.email,
        password: md5(req.body.password)
    }

    let result = await masyarakat.findOne({where: params})
    if(result){
        let payload = JSON.stringify(result)
        // generate token
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: result,
            token: token,
            masyarakat: result
        })
    }else{
        res.json({
            logged: false,
            message: "Invalid username or password"
        })
    }
})

module.exports = app