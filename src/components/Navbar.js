import React from "react"
import {Link} from "react-router-dom"
class Navbar extends React.Component{
    Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("admin")
        window.location = "/home"
    }
    render(){
        return(
            <div className="navbar navbar-expand-lg bg-dark navbar-dark">
                <h6 className="navbar-brand">
                    HII
                </h6>

                {/* show and hide menu */}
                <button className="navbar-toggler" data-toggle="collapse"
                data-target="#menu">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* menu */}
                <div id="menu" className="navbar-collapse collpase">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/listpengaduan" className="nav-link">
                                List Pengaduan
                            </Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link to="/tanggapan" className="nav-link">
                                Tanggapan
                            </Link>
                        </li> */}
                        <li className="nav-item">
                            <Link to="/masyarakat" className="nav-link">
                                Masyarakat
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/petugas" className="nav-link">
                                Petugas
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin" className="nav-link">
                                Administrator
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" onClick={() => this.Logout()}>
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default Navbar;