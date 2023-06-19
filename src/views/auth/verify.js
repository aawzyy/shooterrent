import React, { useState } from "react";
import { Link } from "react-router-dom";
import CategoryRole from "../../components/Dropdown/CategoryRole";
import { RegisterWebs, verifyPass } from "../../services/enpoint/auth";
import { useHistory } from 'react-router-dom';

export default function VerifyPass() {
    const history = useHistory();
    const currentUrl = window.location.href;
    // get url
    const url = new URL(currentUrl)
    // Membuat objek URLSearchParams berdasarkan URL
    const urlParams = new URLSearchParams(url.search);
    // Mendapatkan nilai token dari parameter 'token'
    const token = urlParams.get('token');

    const handleSubmit = async (event) => {
        const postData = {
            token
        }

        verifyPass(postData)
        .then((result) => {
            console.log(result)
            setTimeout(() => {
                alert('akun berhasil di verifikasi')                
                history.push({
                    pathname : '/auth/login'
                })
            }, 3000);
        }).catch((err) => {
            console.log(err);
        });
    }

    // console.log(form);

    return (
        <>
        <div className="container mx-auto px-3 h-full">
            <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                    <a href="/">
                        <h6 className="text-blueGray-500 text-sm font-bold text-xl">
                        Verifikasi Email
                        </h6>
                    </a>
                    </div>
                    <hr className="mt-6 border-b-1 border-blueGray-300" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-blueGray-400 text-center mb-3 font-bold">
                    {/* <small>Daftar</small> */}
                    </div>
                        {/* <div className="flex">
                        <div className="relative w-full mb-3 lg:w-6/12">
                            <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                            >
                            Nama Depan
                            </label>
                            <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Nama Depan"
                            name="firstname"
                            required
                            onChange={(e) => handleChange(e)}
                            />
                        </div>

                        <div className="relative w-full mb-3 lg:w-6/12 ml-3">
                            <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                            >
                            Nama Belakang
                            </label>
                            <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Nama Belakang"
                            name="lastname"
                            required
                            onChange={(e) => handleChange(e)}
                            />
                        </div>
                        </div> */}

                    <div className="text-center mt-6">
                        <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        // type="button"
                        onClick={() => handleSubmit()}
                        >
                            Verify
                        </button>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </>
    );
}
