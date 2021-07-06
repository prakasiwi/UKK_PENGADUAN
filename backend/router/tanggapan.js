const express = require("express")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const models = require("../models/index")
const admin = models.tanggapan
const pengaduan = models.pengaduan

const auth = require("../auth")


app.get("/", auth, async(req, res) => {
    let result = await admin.findAll()
    res.json(result)
})

app.get("/detail", async (req, res) =>{
    let result = await admin.findAll({
        include: ["pengaduan"]
    })
    res.json(result)
})

app.put("/", auth, async(req, res) => {
    let param = { id_tanggapan: req.body.id_tanggapan}
    let data = {
        tanggapan: req.body.tanggapan,
      
    }

    admin.update(data, {where: param})
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

app.delete("/:id_tanggapan", auth, async(req, res) => {
    let param = {id_tanggapan: req.params.id_tanggapan}
    admin.destroy({where: param})
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
app.delete("/adu/:id_pengaduan",auth, async(req, res) => {
    let param = {id_pengaduan: req.params.id_pengaduan}
    admin.destroy({where: param})
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


app.get("/:id_pengaduan", auth, (req, res) =>{
    admin.findOne({ where: {id_pengaduan: req.params.id_pengaduan}})
    .then(admin => {
        res.json(admin)
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})


app.post("/",(req, res) => {
    let data = {
        tanggapan: req.body.tanggapan,
        id_pengaduan: req.body.id_pengaduan,
        id_petugas: req.body.id_petugas
    }

    admin.create(data)
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




module.exports = app