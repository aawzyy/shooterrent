import React, { useState } from "react";
import { deletePackets } from "../../services/enpoint/vendor";
import { useDispatch, useSelector } from "react-redux";
import { BsCheck2Circle } from "react-icons/bs";
import { useHistory } from "react-router";
import { userCheckout } from "../../services/enpoint/costumer";

export default function ModalSucsesPayment({ isOpen, onClose, data }) {
  const history = useHistory();
  // redux
  const dispatch = useDispatch();
  const { dataUsers, dataToken } = useSelector((state) => state)
  const { full_name , roles , email} = dataUsers?.userDatas
  const { login , token} = dataToken?.token

  const [Change, setChange] = useState(true)

  const handleButton = () => {
    const split = data?.data_order?.order_date?.split(" ")
    setChange(false)

    const dataPost = {
      product_id: data?.data_order?.packages?.id,
      appointment: {
        date: split[0],
        time: split[1]
      },
      location: {
          latitude: JSON.stringify(data?.data_order?.location?.lat),
          longitude: JSON.stringify(data?.data_order?.location?.lng),
          full_address: data?.data_order?.full_address
      },
      payment: {
          bank_code: data?.payment?.code,
          payment_type: data?.payment?.payment_type
      }
    }

    userCheckout(token, dataPost)
    .then((result) => {
      if (result.data) {   
        setTimeout(() => {
          history.push({
            pathname : '/costumer/history',
            // state : { chartState }
          })
          onClose()
          setChange(true)
        }, 2000);
      } else {
        window.confirm('Transaksi Gagal Karena System :' + result.message)
        console.log(result);
        window.location.reload()
      }
    }).catch((err) => {
      if (window.confirm('Transaksi Gagal Karena System :' + err.message)) {
        console.log(err);
        window.location.reload()
      }
    });
    
  }
  
  return (
    <>
      {isOpen ? (
        <>
          <div
            className={"justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"}
            style={{left : '0%', top : '0%' , width : '100%', height : '100%', backgroundColor : '#D9D9D9', opacity : 0.9}}
          >
            <div className="relative w-auto my-6 mx-auto max-w-sm">

              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Berhasil !
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
                {Change ?
                    <>
                    <div className="relative p-6 flex-auto p-4 text-center items-center">
                      <BsCheck2Circle size={50} className="" style={{marginLeft : 50}}/>
                      <p class="my-4 text-slate-500 text-lg leading-relaxed">
                          Berhasil order
                      </p>
                    </div>
                    </> 
                : 
                    <>
                      <div className="relative p-6 flex-auto p-4 text-center items-center">
                        {/* <BsCheck2Circle size={50} className="" style={{marginLeft : 50}}/> */}
                        <p class="my-4 text-slate-500 text-lg leading-relaxed">
                            Mohon Tunggu Pembayaran sedang di verifikasi
                        </p>
                        <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                        </svg>
                      </div>
                    </>
                }

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b p-3">
                  {/* <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    // onClick={() => DeletePakect()}
                  >
                    Oke
                  </button> */}
                  {Change ? 
                    <button
                        className="bg-blueGray-800 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleButton}
                    >
                        Oke
                    </button>
                  : null }
                </div>

              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}