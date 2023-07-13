import React, { useState, useEffect} from "react";

import { useDispatch, useSelector } from "react-redux";
import ModalEdits from "../Modals/ModalEditPaket";
import { Link } from "react-router-dom";
import FilterDescAsc from "../Dropdown/CardFilterProduct";
import FilterBy from "../Dropdown/CardFilterByProduct";
import { AddPackets, deletePackets, getPackets } from "../../services/enpoint/vendor";
import ModalDeletePaket from "../Modals/ModalDeletePaket ";

export default function CardProductVendor() {
    // redux
    const dispatch = useDispatch();
    const { dataUsers, dataToken } = useSelector((state) => state)
    const { full_name , roles , email} = dataUsers?.userDatas
    const { login , token} = dataToken?.token
    
    // packets
    const [showModal, setShowModal] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [filterDescAsc, setFilterDescAsc] = useState('asc');
    const [filterBy, setFilterBy] = useState('id');
    const [listPackage, setlistPackage] = useState([])
    const [changeAdd, setchangeAdd] = useState(false)
    const [Id, setId] = useState(null)
    const [dataEdit, setData] = useState(null)
    const [ waktu , setTime ] = useState ( new Date ( ) ) ;

    const [formPaket, setFormPaket] = useState({
        name_paket : '',
        price : '',
        desc : '',
    })
    
    const [ErorMesformPaket, setErorMesformPaket] = useState({
        name_paket : '',
        price : '',
        desc : '',
    })

    const getListProduct = (filDescAsc, filtBy) => {
        getPackets(token, filDescAsc ? filDescAsc : filterDescAsc, filtBy ? filtBy : filterBy)
        .then((result) => {
            const res = result?.data
            let arrayRes = []
            for (let i = 0; i < res.length; i++) {
                const value = res[i];
                arrayRes.push(value)
            }
            setlistPackage(arrayRes)
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        getListProduct()
    }, [])

    const handleChangePaket = (e) => {
        setFormPaket({
          ...formPaket,
          [e.target.name]: e.target.value,
        });
    
        setErorMesformPaket({
          ...ErorMesformPaket,
          [e.target.name]: "",
        });
    }
    
    const handleAddPaket = async (event) => {
        event.preventDefault();

        const dataPost = {
            name: formPaket.name_paket,
            description: formPaket.desc,
            price: formPaket.price
        }
        let filterAsc = 'desc'
        let filter = 'id'

        AddPackets(token, dataPost)
        .then((result) => {
            console.log(result);
            setchangeAdd(false);
            getListProduct(filterAsc, filter)
        }).catch((err) => {
            console.log(err);
        });
        alert('Berhasil Menambahkan Paket')
        // setlistPackage([...listPackage, formPaket])
        // setFormPaket({
        //   name_paket : '',
        //   price : '',
        //   desc : '',
        // })
    }
    



    const handleDeletePacket = (id) => {
        setId(id);
        setShowModalDelete(true);
        
    }
    const handledeletsukses =  () => {
        setShowModalDelete(false);
        getListProduct('desc', 'id');
        
    }

    const handleEditPacket = (data) => {
        setData(data);
        setShowModal(true)        
    }
    const handleeditsukses =  () => {
        setShowModal(false);
        getListProduct('desc', 'id');
        
    }

    const handleAdd = async () => {
        setchangeAdd(!changeAdd)
    }

    const ResetFilter = async () => {
        const filBy = 'id'
        const filDsccAsc = 'asc'
        setFilterDescAsc()
        setFilterBy()
        getListProduct(filDsccAsc, filBy)

    }

    // console.log(filterDescAsc);
    
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-800 text-xl font-bold">List Paket Anda</h6>
                        <div className="row">
                            <button
                                className={
                                    'text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
                                    + `${changeAdd ? ' bg-blueGray-600' :' bg-orange-500'}`
                                }
                                type="button"
                                onClick={handleAdd}
                            >
                            {changeAdd ? 'Sembunyikan' : 'Tambah Paket'}
                            </button>
                            <Link to="/admin/profile">
                                <button
                                    className={
                                        'text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
                                        + ' bg-lightBlue-600'
                                    }
                                    type="button"
                                    // onClick={handleFileChange}
                                >
                                {'Profile Pengguna'}
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form onSubmit={handleAddPaket}>
                        <>
                            {changeAdd ?
                                <>
                                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                        Tambah Kan Paket
                                    </h6>
                                    <div className="flex flex-wrap">
                                        <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Nama Paket
                                        </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Paket A"
                                            name="name_paket"
                                            onChange={(e) => handleChangePaket(e)}
                                            required
                                        />
                                        </div>
                                        </div>
                                        <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Harga
                                            </label>
                                            <input
                                                // type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Rp. 100.000"
                                                name="price"
                                                onChange={(e) => handleChangePaket(e)}
                                                type='number'
                                                required
                                            />
                                        </div>
                                        </div>
                                        <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                            >
                                            Deskripsi Paket
                                            </label>
                                            <textarea
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="A beautiful UI Kit and Admin for React & Tailwind CSS. It is Free and Open Source."
                                                rows="5"
                                                name="desc"
                                                onChange={(e) => handleChangePaket(e)}
                                                required
                                            ></textarea>
                                        </div>
                                        </div>
                                    </div>

                                    <hr className="mt-2 border-b-1 border-blueGray-300" />
                                    <button className=
                                        'bg-blueGray-600 mb-4 mt-2 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
                                        type="submit"
                                        // onClick={handleAddPaket}
                                    >
                                        Buat Paket
                                    </button>
                                </>
                            :null }
                            <div className="row flex">
                                {/* <FilterDescAsc  setSelectProject={setFilterDescAsc}/>
                                <FilterBy  setSelectProject={setFilterBy}/>
                                <div className="text-center flex justify-between h-12 mt-2 ml-4" style={{height:35, marginLeft: 10}}>
                                    <button
                                        className={
                                            'text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
                                            + ' bg-red-500'
                                        }
                                        type="button"
                                        onClick={FilterButton}
                                    >
                                    {'Terapkan'}
                                    </button>
                                </div> */}
                                {/* <div className="text-center flex justify-between h-12 mt-2 ml-4" style={{height:35, marginLeft: 10}}>
                                    <button
                                        className={
                                            'text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
                                            + ' bg-blueGray-600'
                                        }
                                        type="button"
                                        onClick={ResetFilter}
                                    >
                                    {'Reset'}
                                    </button>
                                </div> */}
                            </div>
                            {/* LIST PAKET  */}
                            <hr className="mt-6 border-b-1 border-blueGray-300" />
                            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                List Paket Anda
                            </h6>

                            <div className="flex flex-wrap">
                                {listPackage.map((val, key) => {
                                    const mapString = val?.description?.split('\n')
                                    return(
                                        <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
                                            <div className="flex items-center justify-between p-4 rounded-lg bg-white shadow-indigo-50 shadow-md">
                                                <div className="pl-4 pt-2">
                                                    <h2 className="text-gray-900 text-lg font-bold">Nomor : {key + 1}</h2>
                                                    <hr className="mt-2 border-b-1 border-blueGray-300" />
                                                    <h2 className="text-gray-900 text-lg font-bold">Nama Paket : {val.name}</h2>
                                                    <hr className="mt-2 border-b-1 border-blueGray-300" />
                                                    <h2 className="text-gray-900 text-lg font-bold mt-2">Deskripsi : </h2>
                                                        {mapString.map((v, i) => (
                                                            <h3 className="text-sm font-semibold text-gray-400">{v}</h3>
                                                        ))}
                                                    <hr className="mt-2 border-b-1 border-blueGray-300" />
                                                    <h3 className="mt-2 text-xl font-bold text-red-500 text-left">Harga : Rp. {val.price}</h3>
                                                    </div>
                                                    <div className="rounded-full border-white border-dashed justify-center items-center ">
                                                        <a
                                                            href="#pablo"
                                                            alt='...' 
                                                            className="text-sm px-4 py-2 bg-blueGray-600 text-white rounded-lg tracking-wider hover:bg-orange-500 outline-none"
                                                            onClick={() => handleEditPacket(val)}
                                                        >
                                                            Edit
                                                        </a>
                                                        <a 
                                                            href="#pablo"
                                                            alt='...'
                                                            className="text-sm px-4 ml-3 py-2 bg-red-400 text-white rounded-lg tracking-wider hover:bg-orange-500 outline-none"
                                                            onClick={() => handleDeletePacket(val.id)}
                                                        >
                                                            Hapus
                                                        </a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                    </form>
                </div>
            </div>
            <ModalEdits
                isOpen={showModal}
                onClose={()=>handleeditsukses()}
                data={dataEdit}
            />
            <ModalDeletePaket
                isOpen={showModalDelete}
                onClose={()=>handledeletsukses()}
                data={Id}
            />
        </>
    )
}
