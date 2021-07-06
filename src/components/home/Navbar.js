import React from "react"
import {Link} from "react-router-dom"
class Navbar extends React.Component{
    render(){
        return(
            <div class="conatainer">
            <div className="navbar navbar-expand-lg bg-info navbar-dark">
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
                            <Link to="/userlogin" className="nav-link">
                                Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/petugaslogin" className="nav-link">
                                Petugas
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">
                                Admin
                            </Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link to="/userregister" className="nav-link">
                                Registrasi
                            </Link>
                        </li> */}
                    </ul>
                </div>
            </div>
            <div class="container">
            <div class="jumbotron">
                <h1>Pengaduan Terpadu Desa Konoha</h1>
                <h6>Silakan sampaikan kritik anda, kami menjamin setiap kebebasan individu untuk bersuara</h6>
            </div>
            </div>
            </div>
        )
    }
}
export default Navbar;