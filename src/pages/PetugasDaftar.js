import React from "react"
import Navbar from "../components/petugas/Navbar"
import axios from "axios"
import { base_url } from "../config"
import $ from "jquery"

export default class PetugasDaftar extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            action: "",
            petugass: [],
            id_petugas: "",
            nama_petugas: "",
            email: "",
            telp:"",
            level: "",
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

    getPetugass = () => {
        let url = base_url + "/petugas"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({petugass: response.data})
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
        $("#modal_petugas").modal("show")
        this.setState({
            action: "insert",
            nama_petugas: "",
            email: "",
            telp: "",
            level: "",
            password: "",
            fillPassword: true,
        })
    }

    Edit = selectedItem => {
        $("#modal_petugas").modal("show")
        this.setState({
            action: "update",
            id_petugas: selectedItem.id_petugas,
            nama_petugas: selectedItem.nama_petugas,
            email: selectedItem.email,
            telp: selectedItem.telp,
            level: selectedItem.level,
            password: "",
            fillPassword: false,
        })
    }

    savePetugas = event => {
        event.preventDefault()
        $("#modal_petugas").modal("hide")
        let form = {
            id_petugas: this.state.id_petugas,
            nama_petugas: this.state.nama_petugas,
            email: this.state.email,
            telp: this.state.telp,
            level: this.state.level
        }
        
        if (this.state.fillPassword) {
            form.password =  this.state.password
        }

        let url = base_url + "/petugas"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPetugass()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPetugass()
            })
            .catch(error => console.log(error))
        }
    }

    dropPetugas = selectedItem => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = base_url + "/petugas/" + selectedItem.id_petugas
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPetugass()
            })
            .catch(error => console.log(error))
        }
    }

    componentDidMount(){
        this.getPetugass()
    }

    render(){
        return(
            <div>
                <Navbar />
                <div className="container">
                    <h3 className="text-bold text-info mt-2">List Petugas</h3>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nama</th>
                                <th>Email</th>
                                <th>Telephone</th>
                                {/* <th>Level</th> */}
                                <th>Created At</th>
                                <th>Updated At</th>
                                {/* <th>Option</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.petugass.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id_petugas}</td>
                                    <td>{item.nama_petugas}</td>
                                    <td>{item.email}</td>
                                    <td>{item.telp}</td>
                                    {/* <td>{item.level}</td> */}
                                    <td>{item.createdAt}</td>
                                    <td>{item.updatedAt}</td>
                                    {/* <td>
                                        <button className="btn btn-sm btn-info m-1"
                                        onClick={() => this.Edit(item)}>
                                            Edit
                                        </button>

                                        <button className="btn btn-sm btn-danger m-1"
                                        onClick={() => this.dropPetugas(item)}>
                                            Hapus
                                        </button>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* <button className="btn btn-success" onClick={() => this.Add()}>
                       Add Petugas
                    </button> */}
                    {/* modal admin  */}
                    <div className="modal fade" id="modal_petugas">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header bg-info text-white">
                                    <h4>Form Admin</h4>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={ev => this.savePetugas(ev)}>
                                        Nama Admin
                                        <input type="text" className="form-control mb-1"
                                        value={this.state.nama_petugas}
                                        onChange={ev => this.setState({nama_petugas: ev.target.value})}
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

                                        {/* Level
                                        <input type="text" className="form-control mb-1"
                                        value={this.state.level}
                                        onChange={ev => this.setState({level: ev.target.value})}
                                        required
                                        /> */}

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

