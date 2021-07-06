const express = require("express")
const models = require("../models/index")
const pengaduan = require('../models/index').pengaduan
const app = express()

const multer = require("multer")
const path = require("path")
const fs = require("fs")

const auth = require("../auth")
app.use(auth)

// load cors = untuk membuka port agar bisa diakses oleh public
const cors = require('cors')
app.use(cors())

//buka access request json
app.use(express.json())

//buka access request dari form-urlencoded
app.use(express.urlencoded({extended: true}))

//load multer
app.use(express.static(__dirname))

// config storage image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"./images")
    },
    filename: (req, file, cb) => {
        cb(null, "img-" + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({storage: storage})


app.get("/", async(request, response) => {
    let result = await pengaduan.findAll({
        include: [
            "masyarakat",
            {
                model: models.tanggapan,
                as: "tanggapan",
                include: ["petugas"]
            }
        ]
    })
    response.json(result)
})

app.get("/:id_pengaduan", (req, res) =>{
    pengaduan.findOne({ where: {id_pengaduan: req.params.id_pengaduan}})
    .then(pengaduan => {
        res.json(pengaduan)
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.post("/", upload.single("foto"), (req, res) =>{
    if (!req.file) {
        res.json({
            message: "No uploaded file"
        })
    } else {
        let data = {
            nik: req.body.nik,
            jenis: req.body.jenis,
            isi_laporan: req.body.isi_laporan,
            status: req.body.status,
            foto: req.file.filename,
          
        }
        pengaduan.create(data)
        .then(result => {
            res.json({
                message: "data has been inserted",
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })

        
    }
})

app.put("/", upload.single("foto"), async (req, res) =>{
    let param = { id_pengaduan: req.body.id_pengaduan}
    let data = {
        nik: req.body.nik,
        jenis: req.body.jenis,
        isi_laporan: req.body.isi_laporan,
        foto: req.file.filename,
        status: req.body.status,
    }
    if (req.file) {
        // get data by id
        const row = await pengaduan.findOne({where: param})
        let oldFileName = row.foto

        // delete old file
        let dir = path.join(__dirname,"../images",oldFileName)
        fs.unlink(dir, err => console.log(err))
        

        // set new filename
        data.foto = req.file.filename
    }

    pengaduan.update(data, {where: param})
        .then(result => {
            res.json({
                message: "data has been updated",
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.delete("/:id_pengaduan", async (req, res) =>{
    try {
        let param = { id_pengaduan: req.params.id_pengaduan}
        let result = await pengaduan.findOne({where: param})
        let oldFileName = result.foto
            
        // delete old file
        let dir = path.join(__dirname,"../images",oldFileName)
        fs.unlink(dir, err => console.log(err))

        // delete data
        pengaduan.destroy({where: param})
        .then(result => {
            res.json({
                message: "data has been deleted",
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
        
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})

app.get("/get/:nik", async (req, res) =>{
    let param = { nik: req.params.nik}
    let result = await pengaduan.findAll({
        where: param,
        
    })
    res.json(result)
})

app.put("/cek", auth, async (req, res) =>{
    let param = { id_pengaduan: req.body.id_pengaduan}
    let data = {
        status: req.body.status,
    }

    
    pengaduan.update(data, {where: param})
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
module.exports = app