import React from "react"
import Navbar from "../components/Navbar"
import PengaduanList from "../components/PengaduanList"
import { base_url, pengaduan_foto_url } from "../config.js";
import $ from "jquery"
import axios from "axios"
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export default class Pengaduan extends React.Component{
    constructor(){
        super()
        this.state = {
            aduan: [],
            token: "",
            action: "",
            jenis: "",
            isi_laporan: "",
            nik: "0",
            id_pengaduan: "0",
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
        return (
            <div>
               <Navbar />
               <div className="container">
                   <h3 className="text-bold text-info mt-2">List Pengaduan</h3>
                   <div className="row">
                       { this.state.aduan.map( item => (
                           <PengaduanList
                           key = {item.id_pengaduan}
                           nik = {item.nik}
                           id_pengaduan = {item.id_pengaduan}
                           jenis = {item.jenis}
                           isi_laporan = {item.isi_laporan}
                           status = {item.status}
                           tanggapan = {item.tanggapan}
                           foto = { pengaduan_foto_url + "/" + item.foto}
                        //    onEdit = {() => this.Edit(item)}
                        //    onDrop = {() => this.dropPengaduan(item)}
                            onGet = {() => this.getTanggapan(item)}
                            />
                       )) }
                   </div>
                   {/* <button className="btn btn-success" onClick={() => this.Add()}>
                       Add Pengaduan
                   </button> */}
                </div>

             {/* modal pengaduan  */}
             <div className="modal fade" id="modal_pengaduan">
                     <div className="modal-dialog">
                         <div className="modal-content">
                             <div className="modal-header bg-info text-white">
                                 <h4>Form Pengaduan</h4>
                             </div>
                             <div className="modal-body">
                                 <form onSubmit={ev => this.savePengaduan(ev)}>
                                    NIK
                                     <input type="number" className="form-control mb-1"
                                     value={this.state.nik}
                                     onChange={ev => this.setState({nik: ev.target.value})}
                                     required
                                     />

                                     Jenis Pengaduan
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.jenis}
                                     onChange={ev => this.setState({jenis: ev.target.value})}
                                     required
                                     />

                                    Isi Laporan
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.isi_laporan}
                                     onChange={ev => this.setState({isi_laporan: ev.target.value})}
                                     required
                                     />

                                    Status
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.status}
                                     onChange={ev => this.setState({status: ev.target.value})}
                                     required
                                     />

                                    {/* { this.state.action === "update" && this.state.uploadFile === false ? (
                                        <button className="btn btn-sm btn-dark mb-1 btn-block"
                                        onClick={() => this.setState({uploadFile: true})}>
                                            Change Product Image
                                        </button>
                                    ) : (
                                        <div>
                                            Foto Pengaduan
                                            <input type="file" className="form-control mb-1"
                                            onChange={ev => this.setState({foto: ev.target.files[0]})}
                                            
                                            required
                                            />
                                        </div>
                                    ) }

                                    <button type="submit" className="btn btn-block btn-success">
                                        Simpan
                                    </button> */}
                                 </form>
                             </div>
                         </div>
                     </div>
                 </div>
                 
                 {/* modal detail_tanggapan  */}
              <div className="modal fade" id="modal_detail">
                  <div className="modal-dialog">
                      <div className="modal-content">
                          <div className="modal-header bg-info text-white">
                              <h4>Tanggapan dari Pengaduan</h4>
                          </div>
                          <div className="modal-body">
                          <h6>ID Pengaduan : {(this.state.selectedPengaduan !== null) ? this.state.selectedPengaduan.id_pengaduan : null} </h6>
                          <h6>NIK : {(this.state.selectedPengaduan !== null) ? this.state.selectedPengaduan.nik : null} </h6>
                          {/* <h6>Nama Masyarakat : {(this.state.selectedPengaduan !== null) ? this.state.selectedPengaduan.masyarakat.nama: null} </h6> */}
                          <h6>Laporan : {(this.state.selectedPengaduan !== null) ? this.state.selectedPengaduan.isi_laporan: null} </h6>
                          <h6>Tanggapan : {(this.state.selectedPengaduan !== null) ? (this.state.selectedPengaduan.tanggapan !== null ? this.state.selectedPengaduan.tanggapan.tanggapan : "-") : null} </h6>  
                          <h6>Status : {(this.state.selectedPengaduan !== null) ? this.state.selectedPengaduan.status : null}</h6>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
        )
    }
}