import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getListChatDetailCustomer, sendMessageCostumer } from '../../services/enpoint/vendor';
import { useDispatch, useSelector } from 'react-redux';
import Pusher from 'pusher-js';

export default function CardDetailChat() {
    const location = useLocation();
    const { conversation_id } = location?.state

    // redux
    const dispatch = useDispatch();
    const { dataUsers, dataToken } = useSelector((state) => state)
    const { login , token} = dataToken?.token
    const { id_user , images} = dataUsers?.userDatas

    const [InfoRecipient, setInfoRecipient] = useState(null)
    const [listMessage, setlistMessage] = useState([])

    const [Form, setForm] = useState({
        message : ''
    })

    const getListChats = () => {
        getListChatDetailCustomer(token, conversation_id)
        .then((result) => {
            const resp = result
            // console.log(resp);
            let arryMes = []
            setInfoRecipient({id : resp?.id, unread_messages : resp?.unread_messages, recipient : { ...resp?.recipient}})
            for (let i = 0; i < resp.messages.length; i++) {
                const element = resp.messages[i];
                arryMes.push(element)
            }
            setlistMessage(arryMes)
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        getListChats()

        Pusher.logToConsole = true;

        var pusher = new Pusher('be032e26475d43e1989c', {
            cluster: 'ap1'
        });

        var channel = pusher.subscribe('my-channel');
        channel.bind('my-event', function(data) {
            // console.log(JSON.stringify(data));
            // getListChats()
        });
    },[])

    const handleChange = (e) => {
        setForm({
            ...Form,
            [e.target.name]: e.target.value,
        });
    }

    const handleSend = async (event) => {
        event.preventDefault();

        const dataRecipient = {
            recipient_id: id_user,
            message: Form.message
        }
        sendMessageCostumer(token, conversation_id, dataRecipient)
        .then((result) => {
            getListChats()
        }).catch((err) => {
            console.log(err);
        });
        setForm({
            message : ''
        })
    }
    
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-800 text-xl font-bold">{InfoRecipient?.recipient?.name}</h6>
                        <Link to='/admin/chat'>
                            <a
                                href='#pablo'
                                className={
                                    'text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
                                    + ' bg-lightBlue-600'
                                }
                                type="button"
                            >
                                Kembali
                            </a>
                        </Link>
                    </div>

                    <div className="flex flex-row h-full w-full overflow-x-hidden">
                        <div className="flex flex-col flex-auto h-full p-6">
                            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                                {/* CHAT USERS */}
                                <div className="flex flex-col h-full overflow-x-auto mb-4 overflow-scroll" style={{height : 400}}>
                                    <div className="flex flex-col h-full">
                                        <div className="grid grid-cols-12 gap-y-2">
                                            {listMessage?.map((v,k) => {
                                                // if the sender is not the same as the one logged in, it will come here, if it is the same, it will be next
                                                if(v.sender_id !== id_user) {  
                                                    return(
                                                        <div className="col-start-1 col-end-8 p-3 rounded-lg">
                                                            <div className="flex flex-row items-center">
                                                                <img src={InfoRecipient?.recipient?.avatar?.src} alt='...' className="bg-indigo-500 flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0"/>
                                                                    <div
                                                                    className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                                                                    >
                                                                    <div>{v.message}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                } else {
                                                    return( 
                                                        <div className="col-start-6 col-end-13 p-3 rounded-lg">
                                                            <div className="flex items-center justify-start flex-row-reverse" style={{justifyContent : 'end'}}>
                                                                <img alt='...' src={images} className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"/>
                                                                    {/* A
                                                                </img> */}
                                                                <div
                                                                    className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                                                                >
                                                                <div>{v.message}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }       
                                            })}
                                        </div>
                                    </div>
                                </div>
                                {/* Text Input Message  */}
                                <form onSubmit={handleSend}>
                                    <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4" >
                                        <div className="flex-grow ml-4">
                                            <div className="relative w-full">
                                                <input
                                                    type="text"
                                                    className="flex w-full border rounded focus:outline-none focus:border-indigo-300 pl-4 h-10"
                                                    name='message'
                                                    onChange={(e) => handleChange(e)}
                                                    value={Form.message}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="ml-4" style={{marginLeft : 10}}>
                                            <button className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded text-white px-4 py-1 flex-shrink-0"
                                                type='submit'
                                            >
                                                <span>Kirim</span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                        
        </>
    )
}
