// import React from "react"

// class TanggapanList extends React.Component{
//     render(){
//         return (
//             <div className="col-lg-6 col-sm-12 p-2">
//                 <div className="card">
//                     <div className="card-body row">
//                         {/* menampilkan Gambar / cover */}
//                         <div className="col-5">
//                             <img src={this.props.foto} className="img"
//                             height="200" width="200" alt={this.props.foto} />
//                         </div>

//                         {/* menampilkan deskripsi */}
//                         <div className="col-7">
//                             <h6 className="text-info">
//                                 ID: { this.props.id_pengaduan}
//                             </h6>
//                             <h6 className="text-info">
//                                 NIK: { this.props.nik}
//                             </h6>
//                             <h3 className="text-danger">
//                                 { this.props.jenis}
//                             </h3>
//                             <h6 className="text-dark">
//                                 Laporan: { this.props.isi_laporan}
//                             </h6>
//                             <h6 className="text-dark">
//                                 Status: { this.props.status}
//                             </h6>
//                             <h6 className="text-dark">
//                                 Status: { this.props.status}
//                             </h6>
                    
//                             {/* button untuk mengedit */}
//                             <button className="btn btn-sm btn-primary m-1"
//                             onClick={this.props.onEdit}>
//                                 Edit
//                             </button>

//                             {/* button untuk menghapus */}
//                             <button className="btn btn-sm btn-danger m-1"
//                             onClick={this.props.onDrop}>
//                                 Delete
//                             </button>

//                             {/* button untuk menambah ke keranjang belanja */}
//                             {/* <button className="btn btn-sm btn-success m-1"
//                             onClick={this.props.onCart}>
//                                 Tambahkan ke keranjang belanja
//                             </button> */}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }
// export default TanggapanList;