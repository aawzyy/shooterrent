import React, { useState, useEffect } from 'react'
import { MdAccountCircle } from "react-icons/md";
import { Link, useHistory } from 'react-router-dom';
import { getConverstation, getListChatCustomer } from '../../services/enpoint/vendor';
import { useDispatch, useSelector } from 'react-redux';
import { DateFormat } from '../../utils/date-format';

export default function CardChat() {
    const history = useHistory();
    // redux
    const dispatch = useDispatch();
    const { dataUsers, dataToken } = useSelector((state) => state)
    const { login , token} = dataToken?.token
    // state
    const [ListChats, setListChats] = useState([])

    const handleCheck = async (props) => {
        const params = {
            conversation_id : props,
        }
        setTimeout(() => {
            history.push({
                pathname : '/admin/chat/detail',
                state : { ...params }
            })
        }, 100);
    }

    useEffect(() => {
        getListChatCustomer(token)
        .then((result) => {
            let arrayMess = []
            const resp = result.data
            for (let i = 0; i < resp.length; i++) {
                const element = resp[i];
                arrayMess.push(element)
            }
            setListChats(arrayMess)
        }).catch((err) => {
            console.log(err);
        });
    }, [])

    

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-800 text-xl font-bold">List Obrolan</h6>
                        {/* <button
                            className={
                                'text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
                                + ' bg-lightBlue-600'
                            }
                            type="button"
                        >
                            Button
                        </button> */}
                    </div>
                    <div className="flex-auto px-8 lg:px-10 py-6 pt-0">
                        <div className="flex flex-wrap">
                            {ListChats.map((val, k) => {
                                return (
                                    <Link to="#pablo" onClick={() => handleCheck(val?.last_message?.conversation_id)} className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
                                        <a href='#pablo' key={k}>
                                            <div className="flex justify-between p-4 rounded-lg bg-white shadow-indigo-50 shadow-md">
                                                <div className='flex justify-between'>
                                                    {/* <MdAccountCircle size={50} className='mt-4'/> */}
                                                    <div className="items-center flex">
                                                        <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
                                                            <img
                                                                alt="..."
                                                                className="w-full rounded-full align-middle border-none shadow-lg"
                                                                src={val?.recipient?.avatar?.src}
                                                            />
                                                        </span>
                                                    </div>
                                                    <div className='ml-3'>
                                                        <h4 className="mt-4 text-lg font-bold text-red-500 text-left">{val?.recipient?.name}</h4>
                                                        <p className="text-sm font-semibold text-gray-400 mt-1">{val?.last_message?.message}</p>
                                                    </div>
                                                </div>
                                                <div className="justify-center items-center" style={{marginTop : 50}}>
                                                    <h3 className="mt-2 text-xs font-semibold text-gray-500 text-left">{DateFormat(val?.last_message?.created_at)}</h3>
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
