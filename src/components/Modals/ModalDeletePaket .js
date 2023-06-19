import React from "react";
import { deletePackets } from "../../services/enpoint/vendor";
import { useDispatch, useSelector } from "react-redux";

export default function ModalDeletePaket({ isOpen, onClose, data }) {
  // redux
  const dispatch = useDispatch();
  const { dataUsers, dataToken } = useSelector((state) => state)
  const { full_name , roles , email} = dataUsers?.userDatas
  const { login , token} = dataToken?.token

  function DeletePakect() {
    deletePackets(token, data)
      .then((result) => {
          console.log(result);
          alert('berhasil delete paket ini')
          // onClose()
          window.location.reload()
      }).catch((err) => {
          console.log(err);
      });
  }

  // console.log(data);
  
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
                    Delete Paket
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
                <div className="relative p-6 flex-auto p-4 text-center">
                  <p class="my-4 text-slate-500 text-lg leading-relaxed">
                    Apakah Anda yakin untuk menghapus paket tersebut?
                  </p>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b p-3">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => DeletePakect()}
                  >
                    Ya
                  </button>
                  <button
                    className="bg-blueGray-800 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onClose}
                  >
                    Tidak
                  </button>
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