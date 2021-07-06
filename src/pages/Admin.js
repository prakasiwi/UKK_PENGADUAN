import React from "react"
import Navbar from "../components/Navbar"
import axios from "axios"
import { base_url } from "../config"
import $ from "jquery"

export default class Admin extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            action: "",
            admins: [],
            id_admin: "",
            nama_admin: "",
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

    getAdmins = () => {
        let url = base_url + "/admin"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({admins: response.data})
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
        $("#modal_admin").modal("show")
        this.setState({
            action: "insert",
            nama_admin: "",
            email: "",
            telp: "",
            level: "",
            password: "",
            fillPassword: true,
        })
    }

    Edit = selectedItem => {
        $("#modal_admin").modal("show")
        this.setState({
            action: "update",
            id_admin: selectedItem.id_admin,
            nama_admin: selectedItem.nama_admin,
            email: selectedItem.email,
            telp: selectedItem.telp,
            level: selectedItem.level,
            password: "",
            fillPassword: false,
        })
    }

    saveAdmin = event => {
        event.preventDefault()
        $("#modal_admin").modal("hide")
        let form = {
            id_admin: this.state.id_admin,
            nama_admin: this.state.nama_admin,
            email: this.state.email,
            telp: this.state.telp,
            level: this.state.level
        }
        
        if (this.state.fillPassword) {
            form.password =  this.state.password
        }

        let url = base_url + "/admin"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getAdmins()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getAdmins()
            })
            .catch(error => console.log(error))
        }
    }

    dropAdmin = selectedItem => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = base_url + "/admin/" + selectedItem.id_admin
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getAdmins()
            })
            .catch(error => console.log(error))
        }
    }

    componentDidMount(){
        this.getAdmins()
    }

    render(){
        return(
            <div>
                <Navbar />
                <div className="container">
                    <h3 className="text-bold text-info mt-2">Admin List</h3>
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
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.admins.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id_admin}</td>
                                    <td>{item.nama_admin}</td>
                                    <td>{item.email}</td>
                                    <td>{item.telp}</td>
                                    {/* <td>{item.level}</td> */}
                                    <td>{item.createdAt}</td>
                                    <td>{item.updatedAt}</td>
                                    <td>
                                        <button className="btn btn-sm btn-info m-1"
                                        onClick={() => this.Edit(item)}>
                                            Edit
                                        </button>

                                        <button className="btn btn-sm btn-danger m-1"
                                        onClick={() => this.dropAdmin(item)}>
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="btn btn-success" onClick={() => this.Add()}>
                       Add Admin
                    </button>
                    {/* modal admin  */}
                    <div className="modal fade" id="modal_admin">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header bg-info text-white">
                                    <h4>Form Admin</h4>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={ev => this.saveAdmin(ev)}>
                                        Nama Admin
                                        <input type="text" className="form-control mb-1"
                                        value={this.state.nama_admin}
                                        onChange={ev => this.setState({nama_admin: ev.target.value})}
                                        required
                                        />

                                        Email
                                        <input type="email" className="form-control mb-1"
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

