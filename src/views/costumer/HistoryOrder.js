import React, { useEffect, useState } from 'react'
import { getConverstationVendor, getProductOrdersCustomer, userCancelOrder } from '../../services/enpoint/costumer'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom';
import ModalRating from '../../components/Modals/RatingCustomer';

export default function HistoryOrder() {
    const history = useHistory();
    const [ListHistory, setListHistory] = useState([])
    const [showModal, setShowModal] = useState({status : false, data : ''});

    // redux
    const dispatch = useDispatch();
    const { dataUsers, dataToken } = useSelector((state) => state)
    const { full_name , roles } = dataUsers?.userDatas
    const { login , token} = dataToken?.token

    const getListOrder = () => {
        getProductOrdersCustomer(token)
        .then((result) => {
            // console.log(result);
            setListHistory(result?.data)
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        getListOrder()
    }, [])

    const handleCancelOrders = (id) => {
        if (window.confirm('apakah anda ingin membatalkan pesanan ini')) {
            userCancelOrder(token, id)
            .then((result) => {
                getListOrder()
                console.log(result);
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    const handleChat = async (props) => {
        getConverstationVendor(token, props)
        .then((result) => {
            const res = result?.data
            history.push({
                pathname : '/costumer/list-chats/detail',
                state : { ...res }
             })
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <>
            <section className="dark:bg-gray-900 min-h-screen h-full relative w-full">
                <div className="container mx-auto px-3 py-3">
                    <h1 className="text-3xl text-center font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">pesanan anda</h1>

                    <div className='rows items-center mt-2'>
                        <div className="container p-4 mx-auto w-full h-full">
                            {ListHistory?.map((val, k) => {
                                return(
                                    <div className="flex justify-between bg-white shadow-lg h-full p-6 rounded-lg mb-2">
                                        <div className='flex w-1/6'>
                                            <img className="object-cover w-16 h-16 rounded-lg lg:w-64 mt-4" src={val?.vendor?.avatar?.src} alt=".."/>
                                            <div className='ml-3'>
                                                <h4 className="mt-4 text-lg font-bold text-gray-500 text-left">{val?.vendor?.fullname}</h4>
                                                <p className="text-sm font-semibold text-red-500 mt-1">{val?.product_name}</p>
                                            </div>
                                        </div>
                                        <div className='w-6/12 mt-12'>
                                            <div className="relative border-8 border-opacity-3 border-gray-600 border rounded-lg"/>
                                            <div className='flex justify-between items-center'>
                                                <div className='rounded'>
                                                    {val?.order_status == 'pending' || val?.order_status == 'on-progress' || val?.order_status == 'completed' ?
                                                        <div className='rounded-lg' style={{backgroundColor: '#00DFA2', height : 20, width : 20 ,}}></div>
                                                    : val?.order_status == 'canceled' ?
                                                        <div className='rounded-lg' style={{backgroundColor: '#000000', height : 20, width : 20 ,}}></div>
                                                    :
                                                        <div className='rounded-lg' style={{backgroundColor: '#0079FF', height : 20, width : 20 ,}}></div>
                                                    }
                                                    <h4 className='text-xs mt-1 subpixel-antialiased'>persiapan</h4>
                                                </div>
                                                <div className='rounded items-center'>
                                                    {val?.order_status == 'canceled' ?
                                                        <div className='rounded-lg' style={{backgroundColor: '#000000', height : 20, width : 20 ,}}></div>
                                                    : val.is_appointment_date ? 
                                                        <div className='rounded-lg' style={{backgroundColor: '#00DFA2', height : 20, width : 20 ,}}></div>
                                                    : 
                                                        <div className='rounded-lg' style={{backgroundColor: '#0079FF', height : 20, width : 20 ,}}></div>
                                                    }
                                                    <h4 className='text-xs mt-1 subpixel-antialiased'>jadwal foto</h4>
                                                </div>
                                                <div className='rounded items-center'>
                                                    {val.order_status == 'completed' ?
                                                        <div className='rounded-lg' style={{backgroundColor: '#00DFA2', height : 20, width : 20 ,}}></div>
                                                    : val?.order_status == 'canceled' ?
                                                        <div className='rounded-lg' style={{backgroundColor: '#000000', height : 20, width : 20 ,}}></div>
                                                    :
                                                        <div className='rounded-lg' style={{backgroundColor: '#0079FF', height : 20, width : 20 ,}}></div>
                                                    }
                                                    <h4 class='text-xs mt-1 subpixel-antialiased'>selesai</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-1/6 bg-white ml-3 p-6 flex'>
                                        {val.order_status == 'canceled' ?
                                            <a
                                                href="#pablo"
                                                alt='...' 
                                                className="text-sm px-4 mb-1 py-2 bg-blueGray-600 text-white rounded-lg tracking-wider hover:bg-red-400 outline-none"
                                                // onClick={() => handleCancel('canceled', val.id)}
                                            >
                                                Dibatalkan
                                            </a>
                                        : val.order_status == 'completed' && val.rating !== null ?
                                            <a
                                                href="#pablo"
                                                alt='...' 
                                                className="text-sm px-4 mb-1 py-2 bg-emerald-400 text-white rounded-lg tracking-wider hover:bg-blueGray-600 outline-none"
                                                onClick={() => setShowModal({status : true , rating : val?.rating, name_paket : val?.product_name, id_order : val.id, mode: true})}
                                            >
                                               Lihat Ulasan
                                            </a>
                                        : val.order_status == 'completed' ?
                                            <a
                                                href="#pablo"
                                                alt='...' 
                                                className="text-sm px-4 mb-1 py-2 bg-emerald-400 text-white rounded-lg tracking-wider hover:bg-blueGray-600 outline-none"
                                                onClick={() => setShowModal({status : true , rating : val, name_paket : val?.product_name, id_order : val.id, mode: false})}
                                            >
                                                Ulasan
                                            </a>
                                        :
                                        <>

                                            {/* <a
                                                href="#pablo"
                                                alt='...' 
                                                className="text-sm px-4 mb-1 py-2 bg-red-400 text-white rounded-lg tracking-wider hover:bg-blueGray-600 outline-none"
                                                onClick={() => handleCancelOrders(val.id)}
                                            >
                                                Batalkan
                                            </a> */}
                                            <Link to="#pablo" className="text-sm px-4 ml-1 mb-1 py-2 bg-lightBlue-600 text-white rounded-lg tracking-wider hover:bg-blueGray-600 outline-none">
                                                <a
                                                    href="#pablo"
                                                    alt='...' 
                                                    // className="text-sm px-4 ml-1 mb-1 py-2 bg-lightBlue-600 text-white rounded-lg tracking-wider hover:bg-blueGray-600 outline-none"
                                                    onClick={() => handleChat(val?.vendor?.vendor_user_id)}
                                                >
                                                    Chat
                                                </a>
                                            </Link>
                                        </>
                                        }
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <ModalRating
                    isOpen={showModal?.status}
                    onClose={() => setShowModal({status : false})}
                    data={showModal}
                />
            </section>
        </>
    )
}
