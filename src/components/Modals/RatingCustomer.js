import React, { useState } from "react";
import { deletePackets } from "../../services/enpoint/vendor";
import { useDispatch, useSelector } from "react-redux";
import { userRating } from "../../services/enpoint/costumer";
import { useHistory } from "react-router";

import { RiStarSFill } from 'react-icons/ri';

export default function ModalRating({ isOpen, onClose, data }) {
    const history = useHistory();
    // redux
    const dispatch = useDispatch();
    const { dataUsers, dataToken } = useSelector((state) => state)
    const { full_name , roles , email} = dataUsers?.userDatas
    const { login , token} = dataToken?.token
    
    const [Forms, setForms] = useState({
        rating : '',
        review : ''
    })

    const handlCangeForm = (e) => {
        setForms({
            ...Forms,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        userRating(token, data.id_order, Forms)
        .then((result) => {
            console.log(result);
            setTimeout(() => {
                history.push('/costumer/history')
                onClose()
            }, 200);
        }).catch((err) => {
            console.log(err);
        });
    }

    let arry = []
    // Melakukan perulangan dari angka awal ke angka akhir
    for (let i = 1; i <= Number(data?.rating?.rating); i++) {
        arry.push(i)
    }
    
    return (
        <>
        {isOpen ? (
            <>
                <div
                    className={"justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"}
                    style={{left : '0%', top : '0%' , width : '100%',height : '100%', backgroundColor : '#D9D9D9', opacity : 0.9}}
                >
                    <div className="relative w-auto my-6 mx-auto max-w-sm">

                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                            Ulasan
                        </h3>
                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={onClose}
                        >
                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                            </span>
                        </button>
                        </div>

                        {/*body*/}
                        <div className="relative p-6 flex-auto p-6">
                            <form onSubmit={handleSubmit}>
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
                                        placeholder="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                                        name="full_address"
                                        disabled={true}
                                        value={data?.name_paket}
                                    />
                                </div>
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Rating
                                    </label>
                                    {data?.mode ? 
                                        <div className="flex border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        >
                                        {arry.map((v,k) => (
                                            <RiStarSFill size={16} color='#FFC26F'/>
                                        ))}
                                        </div>
                                    : 
                                        <input
                                            max="5"
                                            min="1"
                                            type="number"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="1-5"
                                            name="rating"
                                            disabled={data?.mode ? true : false}
                                            defaultValue={data?.rating?.rating}
                                            onChange={(e) => handlCangeForm(e)}
                                            required
                                        />
                                    }
                                </div>
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Ulasan
                                    </label>
                                    <textarea
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="A beautiful UI Kit and Admin for React & Tailwind CSS. It is Free and Open Source."
                                        rows="4"
                                        name="review"
                                        disabled={data?.mode ? true : false}
                                        defaultValue={data?.rating?.review}
                                        onChange={(e) => handlCangeForm(e)}
                                        required
                                    ></textarea>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b p-3">
                                {data?.mode ? 
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={onClose}
                                    >
                                        Tutup
                                    </button>
                                :
                                    <button
                                        className="bg-blueGray-800 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit"
                                        // onClick={onClose}
                                    >
                                        Simpan
                                    </button>
                                }
                                </div>
                            </form>
                        </div>

                        {/*footer*/}
                        {/* <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b p-3">
                        
                        </div> */}
                    </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
        ) : null}
        </>
    );
}