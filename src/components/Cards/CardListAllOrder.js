import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { getConverstation, getListOrderVendor } from '../../services/enpoint/vendor'
import { useDispatch, useSelector } from 'react-redux';

export default function CardLisDetailAll() {
    const history = useHistory();
    // redux
    const dispatch = useDispatch();
    const { dataUsers, dataToken } = useSelector((state) => state)
    const { login , token} = dataToken?.token

    const [ListPending, setListPending] = useState([])

    const [listOnggoing, setlistOnggoing] = useState([])

    const [listSuccses, setlistSuccses] = useState([])
    
    const handleGetListOrders = () => {
        getListOrderVendor(token)
        .then((result) => {
            const res = result.data
            let arrayPending = []
            let arrayOnProgress = []
            let arrayCompleted = []
            if (result.data) {
                for (let i = 0; i < res.length; i++) {
                    const val = res[i];
                    if (val.order_status == "pending") {
                        arrayPending.push({...val})
                    }
                    if (val.order_status == 'completed') {
                        arrayOnProgress.push({...val})
                    }
                    if (val.order_status == 'on-progress') {
                        arrayCompleted.push({...val})
                    }
                }
            }
            setListPending(arrayPending)
            setlistSuccses(arrayOnProgress)
            setlistOnggoing(arrayCompleted)
        }).catch((err) => {
            
        });
    }

    useEffect(() => {
        handleGetListOrders()
    }, [])

    const handleChat = async (props) => {
        getConverstation(token, props)
        .then((result) => {
            const res = result?.data
            history.push({
                pathname : '/admin/chat/detail',
                state : { ...res }
             })
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-800 text-xl font-bold">Semua Pesanan</h6>
                        <Link to='/admin/dashboard'>
                            <button
                                className={
                                    'text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
                                    + ' bg-blueGray-600'
                                }
                                type="button"
                            >
                                Kembali
                            </button>
                        </Link>
                    </div>
                    <div className="flex flex-warp mt-12">
                        {/* <div className="flex-wrap" style={{width : 500}}>
                            <h3 className='text-lg font-bold text-lightBlue-500'>Pesanan Pending</h3>
                            {ListPending.map((val, k) => {
                                return (
                                <Link to='#pablo' className="p-4 sm:w-1/2 lg:w-1/2 hover:scale-105 duration-500">
                                    <a href='#pablo' key={k}>
                                        <div className="flex justify-between p-4 rounded-lg bg-white shadow-indigo-50 shadow-md">
                                            <div className='flex justify-between'>
                                                <div className='ml-3'>
                                                    <h4 className="mt-4 text-lg font-bold text-gray-500 text-left">Nama : {val?.customer?.fullname}</h4>
                                                    <p className="text-sm font-semibold text-red-500 mt-1">{val?.product_name}</p>
                                                    <p className="text-sm font-semibold text-warmGray-300 mt-1">Tanggal : {val.appointment_date}</p>
                                                    <p className="text-sm font-semibold text-trueGray-300 mt-1">Jam : {val.appointment_time}</p>
                                                </div>
                                            </div>
                                            <div className="w-1/3 flex-wrap flex justify-center items-center">
                                                <a
                                                    href="#pablo"
                                                    alt='...' 
                                                    className="text-sm px-4 py-2 bg-red-400 text-white rounded-lg tracking-wider hover:bg-orange-500 outline-none"
                                                >
                                                    Tolak
                                                </a>
                                                <a 
                                                    href="#pablo"
                                                    alt='...' 
                                                    className="text-sm px-4 py-2 bg-emerald-400 text-white rounded-lg tracking-wider hover:bg-orange-500 outline-none"
                                                >
                                                    Terima
                                                </a>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                                )
                            })}    
                        </div> */}

                        <div className="flex-wrap" style={{width : 500, marginLeft : 20, marginRight : 20}}>
                            <h3 className='text-lg font-bold text-red-500'>Sedang Berjalan</h3>
                            {listOnggoing.map((val, k) => {
                                return (
                                <Link to='#pablo' className="p-4 sm:w-1/2 lg:w-1/2 hover:scale-105 duration-500">
                                    <a href='#pablo' key={k}>
                                        <div className="flex justify-between p-4 rounded-lg bg-white shadow-indigo-50 shadow-md">
                                            <div className='flex justify-between'>
                                                {/* <MdAccountCircle size={50} className='mt-4'/> */}
                                                <div className='ml-3'>
                                                    <h4 className="mt-4 text-lg font-bold text-gray-500 text-left">Nama : {val?.customer?.fullname}</h4>
                                                    <p className="text-sm font-semibold text-warmGray-300 mt-1">{val?.product_name}</p>
                                                    <p className="text-sm font-semibold text-red-500 mt-1">Tanggal : {val.appointment_date}</p>
                                                    
                                                </div>
                                            </div>
                                            <div className="flex flex-warp justify-center items-center">
                                                {/* <a
                                                    href="#pablo"
                                                    alt='...' 
                                                    className="text-sm px-4 py-2 bg-red-400 text-white rounded-lg tracking-wider hover:bg-orange-500 outline-none"
                                                    // onClick={() => setShowModal(!showModal)}
                                                >
                                                    Batalkan
                                                </a> */}
                                                <Link to="#pablo">
                                                    <a
                                                        href="#pablo"
                                                        alt='...' 
                                                        className="text-sm px-4 py-2 bg-blueGray-600 text-white rounded-lg tracking-wider hover:bg-orange-500 outline-none"
                                                        onClick={() => handleChat(val?.customer?.id)}
                                                    >
                                                        Pesan
                                                    </a>
                                                </Link>
                                                <a 
                                                    href="#pablo"
                                                    alt='...' 
                                                    className="text-sm px-4 py-2 bg-emerald-400 text-white rounded-lg tracking-wider hover:bg-orange-500 outline-none"
                                                >
                                                    Selesai
                                                </a>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                                )
                            })}    
                        </div>

                        <div className="flex-wrap" style={{width : 500}}>
                            <h3 className='text-lg font-bold text-gray-500'>Selesai</h3>
                            {listSuccses.map((val, k) => {
                                return (
                                <Link to='#pablo' className="p-4 sm:w-1/2 lg:w-1/2 hover:scale-105 duration-500">
                                    <a href='#pablo' key={k}>
                                        <div className="flex justify-between p-4 rounded-lg bg-white shadow-indigo-50 shadow-md">
                                            <div className='flex justify-between'>
                                                {/* <MdAccountCircle size={50} className='mt-4'/> */}
                                                <div className='ml-3'>
                                                    <h4 className="mt-4 text-lg font-bold text-gray-500 text-left">Nama : {val?.customer?.fullname}</h4>
                                                    <p className="text-sm font-semibold text-warmGray-300 mt-1">{val?.product_name}</p>
                                                    <p className="text-sm font-semibold text-red-500 mt-1">Tanggal : {val.appointment_date}</p>
                                                </div>
                                            </div>
                                            <div className="justify-center items-center">
                                                {/* <a 
                                                    href="#pablo"
                                                    alt='...' 
                                                    className="text-sm px-4 ml-3 py-2 bg-orange-500 text-white rounded-lg tracking-wider hover:bg-emerald-400 outline-none"
                                                >
                                                    Ulasan
                                                </a> */}
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                                )
                            })}    
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
