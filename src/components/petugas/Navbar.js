import React from "react"
import {Link} from "react-router-dom"
class Navbar extends React.Component{
    Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("petugas")
        window.location = "/home"
    }
    render(){
        return(
            <div className="navbar navbar-expand-lg bg-danger navbar-dark">
                <h6 className="navbar-brand">
                    Pengaduan Terpadu
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
                            <Link to="/petugaspengaduan" className="nav-link">
                                Pengaduan
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/petugasmasyarakat" className="nav-link">
                                Masyarakat
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/petugasdaftar" className="nav-link">
                                Petugas
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