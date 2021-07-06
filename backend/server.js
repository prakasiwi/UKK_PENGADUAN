const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())


const pengaduan = require("./router/pengaduan")
const masyarakat = require("./router/masyarakat")
const admin = require("./router/admin")
const petugas = require("./router/petugas")
const tanggapan = require("./router/tanggapan")
app.use("/store/api/v1/pengaduan", pengaduan)
app.use("/store/api/v1/admin", admin)
app.use("/store/api/v1/tanggapan", tanggapan)
app.use("/store/api/v1/masyarakat", masyarakat)
app.use("/store/api/v1/petugas", petugas)
app.use(express.static(__dirname))

app.get("/", function(req, res) {
    res.send("Node On")
})

app.listen(8000, () => {
    console.log("Server run on port 8000");
})