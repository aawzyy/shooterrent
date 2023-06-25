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
