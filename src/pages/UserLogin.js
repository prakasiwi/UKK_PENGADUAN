import axios from "axios"
import React from "react"
import { base_url } from "../config.js";
import $ from "jquery"

export default class UserLogin extends React.Component{
    
    constructor(){
        super()
        this.state = {
            nik: "",
            nama: "",
            email: "",
            password: "",
            telp: "",
            message: "",
            logged: true
        }
    }

    // Login
    Login = event => {
        event.preventDefault()
        let sendData = {
            email: this.state.email,
            password: this.state.password
        }

        let url = base_url + "/masyarakat/auth"
        
        axios.post(url, sendData)
        .then(response => {
            this.setState({logged: response.data.logged})
            if (this.state.logged) {
                let masyarakat = response.data.masyarakat
                let token = response.data.token
                localStorage.setItem("masyarakat", JSON.stringify(masyarakat))
                localStorage.setItem("token", token)
                this.props.history.push("/userpengaduan")
            } else {
                this.setState({message: response.data.message})
            }
        })
        .catch(error => console.log(error))
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    // Register
    Add = () => {
        $("#modal_masyarakat").modal("show")
        this.setState({
            action: "insert",
            nik: "",
            nama: "",
            email: "",
            password: "",
            telp: "",
            fillPassword: true,
        })
    }
     // Fungsi untuk menyimpan
     saveMasyarakat = event => {
        event.preventDefault()
        $("#modal_masyarakat").modal("hide")
        // prepare data
        let form = {
          nik: this.state.nik,
          email: this.state.email,
          nama: this.state.nama,
          telp: this.state.telp
        }

        if (this.state.fillPassword) {
            form.password = this.state.password
        }

        let url = base_url + "/masyarakat"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getMasyarakat()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getMasyarakat()
            })
            .catch(error => console.log(error))
        }
    }

    render(){
        return(
            <div className="container d-flex h-100 justify-content-center align-items-center">
                <div className="col-sm-6 card my-5">
                    <div className="card-header bg-info text-white text-center">
                        <h4>Pengaduan</h4>
                        <strong className="text-warning">Masyarakat Sign In</strong>
                    </div>
                    <div className="card-body">
                        { !this.state.logged ? 
                        (
                            <div className="alert alert-danger mt-1">
                                { this.state.message }
                            </div>
                        ) : null }
                        <form onSubmit={ev => this.Login(ev)}>
                            <input type="email" className="form-control mb-1" placeholder="Email" value={this.state.email}
                            onChange={ev => this.setState({email: ev.target.value})} />
                            <input type="password" className="form-control mb-1" placeholder="Password" value={this.state.password}
                            onChange={ev => this.setState({password: ev.target.value})}
                            autoComplete="false" />

                            <button className="btn btn-block btn-primary mb-1" type="submit">
                                Sign In
                            </button>
                        </form>

                        <div class="text-l mb-2"> Belum punya akun? </div>
                        <button className="btn btn-block btn-outline-info mb-1 rounded" onClick={() => this.Add()}>
                            Register
                        </button>
                        {/* modal masyarakat  */}
                        <div className="modal fade" id="modal_masyarakat">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header bg-info text-white ">
                                        <h4>Form Register Masyarakat</h4>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={ev => this.saveMasyarakat(ev)}>

                                            NIK:
                                            <input type="number" className="form-control mb-1"
                                            value={this.state.nik}
                                            onChange={ev => this.setState({nik: ev.target.value})}
                                            required
                                            />

                                            Nama:
                                            <input type="text" className="form-control mb-1"
                                            value={this.state.nama}
                                            onChange={ev => this.setState({nama: ev.target.value})}
                                            required
                                            />

                                            Email
                                            <input type="email" className="form-control mb-1"
                                            value={this.state.username}
                                            onChange={ev => this.setState({email: ev.target.value})}
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

                                            Telepon :
                                            <input type="number" className="form-control mb-1"
                                            value={this.state.telp}
                                            onChange={ev => this.setState({telp: ev.target.value})}
                                            required
                                            />

                                            <button type="submit" className="btn btn-block btn-success">
                                                Register
                                            </button>
                                        </form>
                                     </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}