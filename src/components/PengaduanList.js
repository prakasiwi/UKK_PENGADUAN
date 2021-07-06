import React from "react"


class PengaduanList extends React.Component{
    render(){
        return (
            <div className="col-lg-6 col-sm-12 p-2">
                <div className="card">
                    <div className="card-body row">
                        {/* menampilkan Gambar / cover */}
                        <div className="col-5">
                            <img src={this.props.foto} className="img"
                            height="200" width="200" alt={this.props.foto} />
                        </div>

                        {/* menampilkan deskripsi */}
                        <div className="col-7">
                            <h6 className="text-info">
                                ID: { this.props.id_pengaduan}
                            </h6>
                            <h6 className="text-info">
                                NIK: { this.props.nik}
                            </h6>
                            <h3 className="text-danger">
                                { this.props.jenis}
                            </h3>
                            <h6 className="text-dark">
                                Laporan: { this.props.isi_laporan}
                            </h6>
                            <h6 className="text-dark">
                                Status: { this.props.status}
                            </h6>
                    
                            {/* button untuk mengedit */}
                            {/* <button className="btn btn-sm btn-primary m-1"
                            onClick={this.props.onEdit}>
                                Edit
                            </button> */}

                            {/* button untuk menghapus */}
                            {/* <button className="btn btn-sm btn-danger m-1"
                            onClick={this.props.onDrop}>
                                Delete
                            </button> */}

                            {/* <button className="btn btn-block btn-success" id="exclude-print" onClick={() => window.print()}>
                                Print
                            </button> */}

                            {/* lihat tanggapan */}
                            <button type="button" class="btn btn-sm btn-outline-info btn-block mt-2" onClick={this.props.onGet}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                            </svg>
                              <strong className = "ml-2">Lihat Tanggapan</strong>
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default PengaduanList;