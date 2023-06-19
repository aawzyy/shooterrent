import React, { useState } from 'react'
import { RiStarSFill } from 'react-icons/ri';
import { useLocation } from 'react-router';
import RadioButtonPayment from '../../components/Radio/RadioButtonPayment';
import ModalSucsesPayment from '../../components/Modals/ModalSuccsesPayment';

export default function ChartOrders() {
    const location = useLocation();
    const data = location?.state?.chartState

    const [desc, setdesc] = useState(data?.packages?.description)
    const [selectPayment, setSelectPayment] = useState()

    const [modalSuccses, setModalSuccses] = useState(false)

    const handleCheckout = () => {
        setModalSuccses(true)
    }

    return (
        <>
            <section className="dark:bg-gray-900 h-full relative w-full">
                <div className="container mx-auto px-6">
                    {/* <h1 className="text-3xl text-center font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">Keranjang Anda</h1> */}

                    <div className="mx-auto justify-between px-6 md:flex md:space-x-6 xl:px-0 mt-4">
                        <div className="rounded-lg md:w-6/12">
                            <div className="mb-6 rounded-lg p-3 shadow-md sm:justify-start">
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center'>
                                        <img
                                            src={data?.avatar_vendor}
                                            alt="...."
                                            className="w-16 h-32 rounded-lg" 
                                            style={{height : 150, width : 200}}
                                        />
                                        <h2 className='font-bold ml-3'>{data?.vendor_name}</h2>
                                    </div>
                                    <div className='ml-4'>
                                        <div className='flex p-3'>
                                            <RiStarSFill size={16} className='mr-1' color='#FFC26F'/>
                                            <h2>{data?.rating}/{data?.distance}</h2>
                                        </div>
                                        <hr className="my-1"/>
                                        <div className="flex p-3">
                                            <h2>{data?.rating}x pesanan</h2>
                                        </div>
                                        <hr className="my-1"/>
                                        <div className="flex p-3">
                                            <h2>jarak {data?.distance} km</h2>
                                        </div>
                                        <hr className="my-1"/>
                                    </div>
                                </div>
                                <div className="mt-4 flex sm:space-y-6 sm:mt-0 sm:block">
                                    <div className="items-center border-gray-100 p-3 bg-white-400 shadow-md mb-4 mt-3 rounded-lg">
                                        <h2 className='font-bold'>saya Anda : </h2>
                                        <h4 className="text-red-400 text-sm font-bold mt-2">{data?.packages?.name}</h4>
                                        {desc?.split('\n')?.map((v, i) => (
                                            <h3 className="text-sm font-semibold text-blueGray-400 mt-1">{v}</h3>
                                        ))}
                                    </div>
                                </div>
                                <div className='p-4 bg-red-400 rounded-lg justify-center items-center'>
                                    <h3 className='text-white'>Rp . {data?.packages?.price}</h3>
                                </div>
                            </div>        
                        </div>

                        <div className="mt-6 h-full rounded-lg border bg-white p-5 shadow-md md:mt-0 md:w-1/2">
                            <h3 className='text-red-400 text-lg font-bold mt-2 mb-2'>Pilih Metode Pembayaran</h3>
                            <hr className="my-1"/>

                            <RadioButtonPayment setSelectProject={setSelectPayment}/>
                            <hr className="my-1"/>
                            <button onClick={handleCheckout} className='mt-2 w-full p-2 bg-blueGray-600 rounded-lg text-white mr-3' disabled={selectPayment ? false : true}>
                                Pembayaran
                            </button>
                        </div>
                    </div>
                </div>
                <ModalSucsesPayment
                    isOpen={modalSuccses}
                    onClose={() => setModalSuccses(false)}
                    data={{payment : selectPayment ? JSON?.parse(selectPayment) : '' , data_order:data }}
                />
            </section>
        </>
    )
}
