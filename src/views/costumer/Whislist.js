import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDataWhistList, getUserWhhistlist } from '../../services/enpoint/costumer';
import { RiStarSFill } from 'react-icons/ri';
import { BiTrash } from "react-icons/bi"; 
import { Link } from 'react-router-dom';

export default function WhislistPage() {
    // redux
    const dispatch = useDispatch();
    const { dataUsers, dataToken } = useSelector((state) => state)
    const { name, roles } = dataUsers?.userDatas
    const { login , token} = dataToken?.token

    const [ListWhistlist, setListWhistlist] = useState([])

    const getWhistList = () => {
        getUserWhhistlist(token)
        .then((result) => {
            // console.log(result);
            setListWhistlist(result.data)
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        getWhistList()
    }, [])

    const handleDelete = async (id) => {
        if (window.confirm('Apakah Anda Ingin Menghapus nya')) {
            getDataWhistList(token, id)
            .then((result) => {
                console.log(result)
                getWhistList()
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    return (
        <>
            <section className="dark:bg-gray-900 min-h-screen h-full relative w-full">
                <div className="container mx-auto px-3 py-3">
                    <h1 className="text-3xl text-center font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">Favorit Anda</h1>
                    <div className="p-5 mt-4">
                        {ListWhistlist.map((val,key) => {
                            return(
                                <div className='bg-white-400 shadow-lg w-full flex justify-between mx-auto rounded-lg pl-4 pr-3 pb-6 mt-2' style={{height : 200}}>
                                    <Link to={`/costumer/list/${val.vendor_id}/detail-list`} className='flex justify-between'>
                                        <div className='mt-6 items-center row flex'>
                                            <img className="object-cover rounded-lg lg:w-64 mt-4" src={val?.avatar?.src} alt=".." style={{height : 100, width : 100}}/>
                                            <div className='ml-3 row mt-3'>
                                                <p className="text-gray-700">{val?.vendor_name}</p>
                                                <p className="text-gray-700">Mulai Dari : Rp.{val?.lowest_price}</p>
                                            </div>
                                        </div>
                                        <div className='mt-6 items-center mr-4'>
                                            <div className='justify-bettwen mb-2 flex'>
                                                <div className='flex bg-gray-300 p-1 rounded'>
                                                    <RiStarSFill size={17} className='mr-1' color='#FFC26F'/>
                                                    <h2>{val?.average_rating}/{val?.average_rating}</h2>
                                                </div>
                                                <div className='flex ml-3 rounded bg-gray-300' style={{height : 30 , width : 40, alignItems : 'center', paddingLeft : 5}}>
                                                    <h2 className='text-sm'>{val?.distance} km</h2>
                                                </div>
                                            </div>
                                            <div className='justify-bettwen mt-2 flex'>
                                                {val?.services?.map((v,k) => (
                                                    <div className='flex ml-3 p-1 rounded bg-gray-300'>
                                                        <h2 className='items-center'>{v.name}</h2>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className='row flex w-1/3 mt-6 pl-4'>
                                            {val?.portfolios?.map((v,k) => {
                                                return(
                                                    <div className='mr-2 w-full'>
                                                        <img className="object-cover w-16 h-16 rounded-lg lg:w-64 mt-6" src={v.image} alt=".." style={{width : 150, height: 100}}/>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </Link>
                                    <div className='mt-5'>
                                        <a href='#pablo' onClick={() => handleDelete(val.id)}>
                                            <BiTrash size={30}/>
                                        </a>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}
