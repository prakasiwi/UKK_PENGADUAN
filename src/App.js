import React from "react"
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login"
import Pengaduan from "./pages/Pengaduan";
// import Tanggapan from "./pages/Tanggapan"
import Admin from "./pages/Admin"
import Masyarakat from "./pages/Masyarakat"
import Home from "./pages/Home"
import UserLogin from "./pages/UserLogin"
import UserPengaduan from "./pages/UserPengaduan"
// import UserRegister from "./pages/UserRegister"
import Petugas from "./pages/Petugas"
import PetugasLogin from "./pages/PetugasLogin"
import PetugasPengaduan from "./pages/PetugasPengaduan"
import PetugasDaftar from "./pages/PetugasDaftar"
import PetugasMasyarakat from "./pages/PetugasMasyarakat"
import ListPengaduan from "./pages/ListPengaduan"

export default class App extends React.Component{
  render(){
    return(
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/pengaduan" component={Pengaduan} />
        <Route path="/listpengaduan" component={ListPengaduan} />
        {/* <Route path="/tanggapan" component={Tanggapan} /> */}
        <Route path="/masyarakat" component={Masyarakat} />
        <Route path="/admin" component={Admin} />
        <Route path="/home" component={Home} />
        <Route path="/userlogin" component={UserLogin} />
        <Route path="/userpengaduan" component={UserPengaduan} />
        {/* <Route path="/userregister" component={UserRegister} /> */}
        <Route path="/petugas" component={Petugas} />
        <Route path="/petugaslogin" component={PetugasLogin} />\
        <Route path="/petugaspengaduan" component={PetugasPengaduan} />
        <Route path="/petugasdaftar" component={PetugasDaftar} />
        <Route path="/petugasmasyarakat" component={PetugasMasyarakat} />
      </Switch>
    )
  }
}