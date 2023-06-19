import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GrSecure, } from "react-icons/gr";

// login
import { LoginWebs, forgotPass } from "../../services/enpoint/auth";
import { useDispatch } from "react-redux";
import { setDataUsers, setToken } from "../../redux/actions";
import { useHistory } from 'react-router-dom';

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    email : '',
    password : ''
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const [EmailForgot, setEmailForgot] = useState({
    email : ''
  })

  // handle change text
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError({
      ...error,
      [e.target.name]: "",
    });
  };

  const handleChangeForgot = (e) => {
    setEmailForgot({
      ...EmailForgot,
      [e.target.name]: e.target.value,
    });
  }

  // validate
  const validate = () => {
    const newError = { ...error };
    const { email, password } = form;

    if (!email) {
      newError.email = "Email Harus di isi !!";
    } else if (!password) {
      newError.password = "Password Harus Di Isi !!";
    }

    return newError;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const findError = await validate();
    setLoading(true)

    if (Object.values(findError).some((m) => m !== "")) {
      setError(findError);
    } else {
      let setUserRedux = {}
      let setUserToken = {}
      LoginWebs(form.email, form.password)
        .then((result) => {
          const respon = result
          // console.log(respon);
          if (respon.data) {
            setUserRedux = {
              ...setUserRedux,
              id_user : respon.data.user.id,
              roles : respon.data.user.roles[0].name,
              email : respon.data.user.email,
              full_name : respon.data.user.firstname,
              images : respon?.data?.user?.avatar_url
            }
            setUserToken = {
              login : true,
              ...setUserToken,
              token : respon.data.token,
            }
            dispatch(setDataUsers({...setUserRedux}));
            dispatch(setToken({...setUserToken}));
            alert('Selamat Anda Berhasil Masuk')
            // history.push('/admin/dashboard');
          } else {
            alert('Username Atau Password Salah')
            console.log(respon);
          }
          setLoading(false)
        }).catch((err) => {
          setLoading(false)
        });
    }
  }

  const handleSendEmailForgot = async (event) => {
    event.preventDefault();
    
    const postEmail = {
      email : EmailForgot.email
    }
    forgotPass(postEmail)
    .then((result) => {
      if (result.data) {
        alert('Berhasil Mengirimkan Tautan Email Anda')
        setShowModal(false)
      } else {
        alert('Silahkan Cek Email Anda, Kami Sudah Mengirimkan Link Tautan Perubahan')
        setTimeout(() => {
          setShowModal(false)
        }, 3000);
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  // console.log(form);
  
  return (
    <>
      {showModal ? (
        <>
          <div
            style={{left : '33%', width : '507px'}}
            className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none" 
          >
            <div className="relative w-auto my-6 mx-auto max-h-full w-full p-3">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">
                    Lupa Kata Sandi
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                
                <div className="relative p-6 flex-auto p-4 mx-auto text-center">
                  <GrSecure size={150} className='items-center'/>
                </div>

                {/*body*/}
                <div className="relative p-6 flex-auto p-4 text-center">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    Masukkan email Anda
                  </p>
                  <p>
                    Kami akan mengirimi Anda tautan
                  </p>
                  <p>untuk kembali ke akun Anda.</p>
                </div>
                <form onSubmit={handleSendEmailForgot}>
                  <div className="relative p-6 flex-auto p-4 text-center">
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-gray-800 bg-blueGray-200 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Masukan Email Anda Untuk Menerima Tautan Email"
                      name="email"
                      onChange={(e) => handleChangeForgot(e)}
                      required
                    />
                  </div>
                  
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b p-3">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Tutup
                    </button>
                    <button
                      className="bg-blueGray-800 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                      // onClick={() => setShowModal(false)}
                    >
                      Kirim Tautan Email
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      <div className="container mx-auto px-2 h-full">
        <div className="flex content-center items-center justify-center h-full">
          {/* <ModalForgot isOpen={isOpen} onClose={closeModal} /> */}
          <div className="w-full lg:w-4/12 px-2">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <a href="/">
                    <h6 className="text-blueGray-500 text-sm font-bold text-xl">
                      Masuk
                    </h6>
                  </a>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>

              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  {/* <small>Masukkan Email Dan Password Anda</small> */}
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      name="email"
                      required
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Kata Sandi
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Kata Sandi"
                      name="password"
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </div>

                  <button
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="submit"
                    disabled={loading}
                  >
                    Masuk
                  </button>
                </form>
              </div>
            
            </div>
            
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  // onClick={openModal}
                  onClick={() => setShowModal(true)}
                  className="text-blueGray-200"
                >
                  <small>Lupa Kata Sandi ?</small>
                </a>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/register" className="text-blueGray-200">
                  <small>Buat akun baru</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
