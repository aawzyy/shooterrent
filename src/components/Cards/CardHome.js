import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { getConverstation, getListOrderVendor, getListRating, updateOrders } from '../../services/enpoint/vendor'
import { useDispatch, useSelector } from 'react-redux';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { RiStarSFill } from 'react-icons/ri';

export default function CardHome() {
    const history = useHistory();
    // redux
    const dispatch = useDispatch();
    const { dataUsers, dataToken } = useSelector((state) => state)
    const { login , token} = dataToken?.token
    // state
    const [ListOrders, setListOrders] = useState([])
    const [listRating, setlistRating] = useState([])

    const getListOrders = () => {
        getListOrderVendor(token)
        .then((result) => {
            let res = result?.data
            if (result?.data) {
                let array = []
                for (let i = 0; i < res?.length; i++) {
                    const elmmnt = res[i];
                    if(elmmnt?.order_status == 'pending'){
                        updateOrders(token, elmmnt?.id, 'on-progress')
                    }
                    if (elmmnt?.order_status == 'on-progress') {
                        array.push({...elmmnt})
                    } 
                }
                setListOrders(array)
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        function ListRating() {
            getListRating(token)
            .then((result) => {
                let arrayRating = []
                for (let i = 0; i < result.data.length; i++) {
                    const element = result.data[i];
                    arrayRating.push({...element})
                }
                setlistRating(arrayRating)
            }).catch((err) => {
                console.log(err);
            });
        }
        ListRating()
        getListOrders()
    }, [])

    const handleCancel = (params, id) => {
        if (window.confirm(`Apakah anda ingin ${'membatalkan'} pesanan ini`)) {
            updateOrders(token, id, params)
            .then((result) => {
                getListOrders()
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    const handleAccept = (params, id) => {
        if (window.confirm('Apakah anda ingin menerima pesanan ini')) {
            updateOrders(token, id, params)
            .then((result) => {
                getListOrders()
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    const handleCompleted = (params, id) => {
        if (window.confirm('Apakah pesanan ini sudah selesai')) {
            updateOrders(token, id, params)
            .then((result) => {
                getListOrders()
            }).catch((err) => {
                console.log(err);
            });
        }
    }

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
                        <h6 className="text-blueGray-800 text-xl font-bold">Pesanan Masuk</h6>
                        
                    </div>
                    {/* SWIPPER */}
                    <div className='flex-auto px-8 lg:px-10 py-2'>
                        <Swiper
                            loop={true}
                            autoplay={{
                                delay: 100,
                                disableOnInteraction: false
                            }}>
                            {listRating?.map((val, k) => {
                                let arry = []
                                // Melakukan perulangan dari angka awal ke angka akhir
                                for (let i = 1; i <= Number(val?.rating); i++) {
                                    arry.push(i)
                                }
                                return (
                                    <SwiperSlide className='w-full flex p-3' style={{width : '100%' , height : '100%'}} key={k}>
                                        <a href='#pablo' className="p-4 hover:scale-105 duration-500">
                                            <div className="justify-between p-5 rounded-lg bg-white shadow-indigo-50 shadow-md">
                                                <div className='flex items=center text-center'>
                                                    <h4 className="w-1/3 text-lg font-bold text-red-500 text-left">Rating : </h4>
                                                    <div className='w-full flex border-0 px-3 py-3 mb-2 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'>
                                                        {arry.map((v,k) => (
                                                            <RiStarSFill size={16} color='#FFC26F'/>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className='flex items=center text-center'>
                                                    <h4 className="w-1/3 text-lg font-bold text-red-500 text-left">Paket : </h4>
                                                    <input
                                                        disabled
                                                        type="text"
                                                        className="w-full border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        value={val?.product_name}
                                                    />
                                                </div>
                                                <div className='flex items=center text-center mt-2'>
                                                    <h4 className="w-1/3 text-lg font-bold text-red-500 text-left">Ula san : </h4>
                                                    <input
                                                        disabled
                                                        type="text"
                                                        className="w-full border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        value={val?.review}
                                                    />
                                                </div>
                                            </div>
                                        </a>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                    <div className="text-center flex justify-end">
                        {/* <h6 className="text-blueGray-800 text-xl font-bold">Pesanan Masuk</h6> */}

                        <Link to='/admin/dashboard/listall'>
                            <button
                                className={
                                    'text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
                                    + ' bg-blueGray-600'
                                }
                                type="button"
                            >
                                Lihat Semua Pesanan
                            </button>
                        </Link>
                    </div>
                    {/* LIST ORDERS */}
                    <div className="flex-auto px-8 lg:px-10 py-2">
                        {/* <h6 className="text-blueGray-800 text-xl font-bold">Pesanan Masuk</h6> */}
                        <div className="flex flex-wrap">
                            {getListOrders()}
                            {ListOrders?.slice(0,6)?.map((val, k) => {
                                return (
                                    <Link to='#pablo' className="p-4 sm:w-1/2 lg:w-1/2 hover:scale-105 duration-500" style={{width : '50%'}} key={k}>
                                        <a href='#pablo' key={k}>
                                            <div className="flex justify-between p-4 rounded-lg bg-white shadow-indigo-50 shadow-md">
                                                <div className='flex justify-between'>
                                                    {/* <MdAccountCircle size={50} className='mt-4'/> */}
                                                    <div className='ml-3'>
                                                        <h4 className="mt-4 text-lg font-bold text-gray-500 text-left">Nama : {val?.customer?.fullname}</h4>
                                                        <p className="text-sm font-semibold text-red-500 mt-1">{val?.appointment_date}</p>
                                                        <p className="text-sm font-semibold text-warmGray-300 mt-1">Tanggal : {val.appointment_date}</p>
                                                        
                                                    </div>
                                                </div>
                                                <div className="w-1/6 flex flex-wrap justify-center items-center">
                                                    {val?.order_status == 'pending' ? 
                                                    <>
                                                        {/* <a
                                                            href="#pablo"
                                                            alt='...' 
                                                            className="text-sm px-4 py-2 bg-red-400 text-white rounded-lg tracking-wider hover:bg-blueGray-600 outline-none"
                                                            onClick={() => handleCancel('canceled', val.id)}
                                                        >
                                                            Tolak
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
                                                            onClick={() => handleAccept('on-progress', val.id)}
                                                        >
                                                            Terima
                                                        </a>
                                                    </>
                                                    : val?.order_status == 'on-progress' ? 
                                                    <>
                                                        {/* <a
                                                            href="#pablo"
                                                            alt='...' 
                                                            className="text-sm px-4 mb-1 py-2 bg-red-400 text-white rounded-lg tracking-wider hover:bg-blueGray-600 outline-none"
                                                            onClick={() => handleCancel('canceled', val.id)}
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
                                                            className="text-sm px-4 mt-1 py-2 bg-emerald-400 text-white rounded-lg tracking-wider hover:bg-orange-500 outline-none"
                                                            onClick={() => handleCompleted('completed', val.id)}
                                                        >
                                                            Selesai
                                                        </a>
                                                    </>
                                                    :null}
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
