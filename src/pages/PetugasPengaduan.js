import React from "react"
import Navbar from "../components/petugas/Navbar"
import PengaduanList from "../components/petugas/PengaduanList"
import { base_url, pengaduan_foto_url } from "../config.js";
import $ from "jquery"
import axios from "axios"

export default class PetugasPengaduan extends React.Component{
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
        let petugas = JSON.parse(localStorage.getItem("petugas"))
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
            status: 'pending',
        })
    }

    // Fungsi untuk mengedit data pengaduan
    Edit = selectedItem => {
        $("#modal_pengaduan").modal("show")
        this.setState({
            action: "update",
            id_pengaduan: selectedItem.id_pengaduan,
            isi_laporan: selectedItem.isi_laporan,
            foto: null,
            status: selectedItem.status,
            uploadFile: false,
            fillPassword: false,
        })
    }

    savePengaduan = event => {
        event.preventDefault()
        $("#modal_pengaduan").modal("hide")
        let form= {
            id_pengaduan: this.state.id_pengaduan,
            status: this.state.status
        }

        let url = base_url + "/pengaduan/cek"
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

     // Fungsi untuk INSERT tanggapan
    Add = (item) => {
        $("#modal_tanggapan").modal("show")
        this.setState({
            action: "insert",
            id_tanggapan: "",
            id_pengaduan: item.id_pengaduan,
            tanggapan: "",
            id_petugas: "",
            isi_laporan: item.isi_laporan,
            fillPassword: true,
            selectedPengaduan: item
        })
    }
    
    // Fungsi untuk mengedit data tanggapan
    EditTanggapan = selectedItem => {
        $("#modal_tanggapan").modal("show")
        this.setState({
            action: "update",
            id_tanggapan: selectedItem.tanggapan.id_tanggapan,
            id_pengaduan: selectedItem.id_pengaduan,
            tanggapan: selectedItem.tanggapan.tanggapan,
            id_petugas: selectedItem.tanggapan.id_petugas
        })
    }

    // Fungsi untuk menyimpan hasil tambah Tanggapan
    saveTanggapan = event => {
        event.preventDefault()
        $("#modal_tanggapan").modal("hide")
        let petugas = JSON.parse(localStorage.getItem("petugas"))
        let form= {
          id_tanggapan: this.state.id_tanggapan,
          id_pengaduan: this.state.id_pengaduan,
          tanggapan: this.state.tanggapan,
          id_petugas: petugas.id_petugas
        }

        let url = base_url + "/tanggapan"
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
                           foto = { pengaduan_foto_url + "/" + item.foto}
                           id_pengaduan = {item.id_pengaduan}
                           nik = {item.nik}
                        //    nama = {item.masyarakat.nama}
                           isi_laporan = {item.isi_laporan}
                           status = {item.status}
                           tanggapan = {item.tanggapan}
                           onAdd ={() => this.Add(item)}
                           onEdit = {() => this.Edit(item)}
                           onDrop = {() => this.dropPengaduan(item)}
                           onGet = {() => this.getTanggapan(item)}
                           onEditTanggapan = {() => this.EditTanggapan(item)}
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
                                 <h4>Ubah Status</h4>
                             </div>
                             <div className="modal-body">
                                 <form onSubmit={ev => this.savePengaduan(ev)}>
                                    ID Pengaduan
                                    <input type="text" className="form-control mb-1" readOnly
                                    value={this.state.id_pengaduan}
                                    onChange={ev => this.setState({id_pengaduan: ev.target.value})}
                                    required
                                    />
                                    Status
                                    <select
                                    value={this.state.status}
                                    onChange={ev => this.setState({status: ev.target.value})}
                                    required>
                                    <option value="pending">pending</option>
                                    <option value="process">process</option>
                                    <option value="done">done</option>
                                    </select>

                                    <button type="submit" className="btn btn-block btn-success">
                                        Simpan
                                    </button>
                                 </form>
                             </div>
                         </div>
                     </div>
                 </div>

                {/* modal tanggapan  */}
              <div className="modal fade" id="modal_tanggapan">
                  <div className="modal-dialog">
                      <div className="modal-content">
                          <div className="modal-header bg-info text-white">
                              <h4>Form Tanggapan</h4>
                          </div>
                          <div className="modal-body">
                              <form onSubmit={ev => this.saveTanggapan(ev)}>
                                Laporan
                                  <input type="text" className="form-control mb-1" readOnly
                                  value={this.state.isi_laporan}
                                  onChange={ev => this.setState({isi_laporan: ev.target.value})}
                                  required
                                  />

                                  Balasan Tanggapan
                                    <input type="text" className="form-control mb-1"
                                    value={this.state.tanggapan}
                                    onChange={ev => this.setState({tanggapan: ev.target.value})}
                                    required
                                    />

                                    {/* ID Petugas
                                      <input type="text" className="form-control mb-1" 
                                      value={this.state.id_petugas}
                                      onChange={ev => this.setState({id_petugas: ev.target.value})}
                                      required
                                      /> */}

                                <button type="submit" className="btn btn-block btn-success">
                                    Simpan
                                </button>
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