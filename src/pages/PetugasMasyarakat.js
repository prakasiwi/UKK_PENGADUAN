import React from "react"
import Navbar from "../components/petugas/Navbar"
import axios from "axios"
import { base_url } from "../config"
import $ from "jquery"

export default class PetugasMasyarakat extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            action: "",
            masyarakats: [],
            tanggapans: [],
            id_masyarakat: "",
            nik: "",
            nama: "",
            email: "",
            telp:"",
            password: "",
            createdAt: "",
            updatedAt: "",
            fillPassword: true
        }

        if(localStorage.getItem("token")){
            this.state.token = localStorage.getItem("token")
        }else{
            window.location = "/login"
        }
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    getMasyarakats = () => {
        let url = base_url + "/masyarakat"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({masyarakats: response.data})
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
        $("#modal_masyarakat").modal("show")
        this.setState({
            action: "insert",
            nik: 0,
            nama: "",
            email: "",
            telp: "",
            password: "",
            fillPassword: true,
        })
    }

    Edit = selectedItem => {
        $("#modal_masyarakat").modal("show")
        this.setState({
            action: "update",
            id_masyarakat: selectedItem.id_masyarakat,
            nik: selectedItem.nik,
            nama: selectedItem.nama,
            email: selectedItem.email,
            telp: selectedItem.telp,
            password: "",
            fillPassword: false,
        })
    }

    saveMasyarakat = event => {
        event.preventDefault()
        $("#modal_masyarakat").modal("hide")
        let form = {
            id_masyarakat: this.state.id_masyarakat,
            nik: this.state.nik,
            nama: this.state.nama,
            email: this.state.email,
            telp: this.state.telp
        }
        
        if (this.state.fillPassword) {
            form.password =  this.state.password
        }

        let url = base_url + "/masyarakat"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getMasyarakats()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getMasyarakats()
            })
            .catch(error => console.log(error))
        }
    }

    dropMasyarakat = selectedItem => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = base_url + "/masyarakat/" + selectedItem.id_masyarakat
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getMasyarakats()
            })
            .catch(error => console.log(error))
        }
    }

    componentDidMount(){
        this.getMasyarakats()
    }

    render(){
        return(
            <div>
                <Navbar />
                <div className="container">
                    <h3 className="text-bold text-info mt-2">Masyarakat List</h3>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NIK</th>
                                <th>Nama</th>
                                <th>Email</th>
                                <th>Telephone</th>
                                <th>Created At</th>
                                <th>Updated At</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.masyarakats.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id_masyarakat}</td>
                                    <td>{item.nik}</td>
                                    <td>{item.nama}</td>
                                    <td>{item.email}</td>
                                    <td>{item.telp}</td>
                                    <td>{item.createdAt}</td>
                                    <td>{item.updatedAt}</td>
                                    <td>
                                        <button className="btn btn-sm btn-info m-1"
                                        onClick={() => this.Edit(item)}>
                                            Edit
                                        </button>

                                        <button className="btn btn-sm btn-danger m-1"
                                        onClick={() => this.dropMasyarakat(item)}>
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="btn btn-success" onClick={() => this.Add()}>
                       Add Masyarakat
                    </button>
                    {/* modal user  */}
                    <div className="modal fade" id="modal_masyarakat">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header bg-info text-white">
                                    <h4>Form Masyarakat</h4>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={ev => this.saveMasyarakat(ev)}>
                                        {/* ID
                                        <input type="number" className="form-control mb-1"
                                        value={this.state.id_masyarakat}
                                        onChange={ev => this.setState({id_masyarakat: ev.target.value})}
                                        required
                                        /> */}

                                        NIK
                                        <input type="number" className="form-control mb-1"
                                        value={this.state.nik}
                                        onChange={ev => this.setState({nik: ev.target.value})}
                                        required
                                        />

                                        Nama Masyarakat
                                        <input type="text" className="form-control mb-1"
                                        value={this.state.nama}
                                        onChange={ev => this.setState({nama: ev.target.value})}
                                        required
                                        />

                                        Email
                                        <input type="text" className="form-control mb-1"
                                        value={this.state.email}
                                        onChange={ev => this.setState({email: ev.target.value})}
                                        required
                                        />

                                        Telphone
                                        <input type="number" className="form-control mb-1"
                                        value={this.state.telp}
                                        onChange={ev => this.setState({telp: ev.target.value})}
                                        required
                                        />

                                        { this.state.action === "update" && this.state.fillPassword === false ? (
                                            <button className="btn btn-sm btn-secondary mb-1 btn-block"
                                            onClick={() => this.setState({fillPassword: true})}>
                                                Change Password
                                            </button>
                                        ) : (
                                            <div>
                                                Password
                                                <input type="password" className="form-control mb-1"
                                                value={this.state.password}
                                                onChange={ev => this.setState({password: ev.target.value})}
                                                required
                                                />
                                            </div>
                                        ) }

                                        <button type="submit" className="btn btn-block btn-success">
                                            Simpan
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

