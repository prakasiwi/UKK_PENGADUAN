import React from "react"
import Navbar from "../components/Navbar"
import axios from "axios"
import { base_url } from "../config"
import $ from "jquery"


export default class ListPengaduan extends React.Component{
    constructor(){
        super()
        this.state = {
            aduan: [],
            token: "",
            action: "",
            jenis: "",
            isi_laporan: "",
            nik: "0",
            nama: "",
            id_pengaduan: "0",
            id_petugas: "0",
            foto: "",
            status: "",
            tanggapan: "",
            uploadFile: true,
            selectedPengaduan: null,
            selectedTanggapan: null,
        }

        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }

        this.headerConfig.bind(this)
    }
    
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    getPengaduan = () => {
        let url = base_url + "/pengaduan"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({aduan: response.data})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }

    Add = () => {
        $("#modal_pengaduan").modal("show")
        this.setState({
            action: "insert",
            id_pengaduan: 0,
            jenis: "",
            isi_laporan: "",
            nik: "0",
            status: 'pending',
            foto: null,
            uploadFile: true
        })
    }

    Edit = selectedItem => {
        $("#modal_pengaduan").modal("show")
        this.setState({
            action: "update",
            id_pengaduan: selectedItem.id_pengaduan,
            jenis: selectedItem.jenis,
            isi_laporan: selectedItem.isi_laporan,
            nik: selectedItem.nik,
            status: selectedItem.status,
            foto: null,
            uploadFile: false
        })
    }

    savePengaduan = event => {
        event.preventDefault()
        $("#modal_pengaduan").modal("hide")
        let form = new FormData()
        form.append("id_pengaduan", this.state.id_pengaduan)
        form.append("jenis", this.state.jenis)
        form.append("isi_laporan", this.state.isi_laporan)
        form.append("nik", this.state.nik)
        form.append("status", this.state.status)
        if (this.state.uploadFile) {
            form.append("foto", this.state.foto)
        }

        let url = base_url + "/pengaduan"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPengaduan()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPengaduan()
            })
            .catch(error => console.log(error))
        }
    }

    dropPengaduan = selectedItem => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = base_url + "/pengaduan/" + selectedItem.id_pengaduan
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPengaduan()
            })
            .catch(error => console.log(error))
        }
    }

    getTanggapan = (aduan) => {
        $("#modal_detail").modal("show")
        this.setState({selectedPengaduan: aduan})
      }

    componentDidMount(){
        this.getPengaduan()
    }

    render(){
        return(
            <div>
                <Navbar />
                <div className="container">
                    <h3 className="text-bold text-info mt-2">List Pengaduan</h3>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Foto</th>
                                <th>ID Pengaduan</th>
                                <th>ID Petugas</th>
                                <th>NIK</th>
                                <th>Nama</th>
                                <th>Jenis</th>
                                <th>Laporan</th>
                                <th>Tanggapan</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.aduan.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.foto}</td>
                                    <td>{item.id_pengaduan}</td>
                                    <td>{item.tanggapan.id_petugas}</td>
                                    <td>{item.nik}</td>
                                    <td>{item.nama}</td>
                                    <td>{item.jenis}</td>
                                    <td>{item.isi_laporan}</td>
                                    <td>{item.tanggapan.tanggapan}</td>
                                    <td>{item.status}</td>
                                    {/* <td>
                                        <button className="btn btn-sm btn-info m-1"
                                        onClick={() => this.Edit(item)}>
                                            Edit
                                        </button>

                                        <button className="btn btn-sm btn-danger m-1"
                                        onClick={() => this.dropMasyarakat(item)}>
                                            Hapus
                                        </button>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}