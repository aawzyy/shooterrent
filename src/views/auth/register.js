import React, { useState } from "react";
import { Link } from "react-router-dom";
import CategoryRole from "../../components/Dropdown/CategoryRole";
import { RegisterWebs } from "../../services/enpoint/auth";
import { useHistory } from 'react-router-dom';

export default function Register() {
  const history = useHistory();
  const [selectProject, setSelectProject] = React.useState();
  
  const [form, setForm] = useState({
    firstname : '',
    lastname : '',
    email : '',
    password : '',
    password_confirmation : '',
    check : ''
  });

  const [error, setError] = useState({
    firstname : '',
    lastname : '',
    email : '',
    password : '',
    password_confirmation : '',
    check : ''
  });

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const postData = {
      ...form,
      role : selectProject == 'Fotografer' ? 'vendor' : 'customer'
    }

    RegisterWebs(postData)
    .then((result) => {
      const respons = result
      if (respons.data) {
        console.log(1);
        console.log(respons.data);
        alert('Selamat Anda Berhasil Daftar')
        history.push('/auth/login');
      } else {
        console.log(2);
        alert("Email Tidak Boleh Sama")
        console.log(respons.message);
      }
    }).catch((err) => {
      console.log(err.message);
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
                      Daftar
                    </h6>
                  </a>
                </div>
                {/* <div className="btn-wrapper text-center">
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("assets/img/github.svg")}
                    />
                    Github
                  </button>
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("assets/img/google.svg").default}
                    />
                    Google
                  </button>
                </div> */}
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  {/* <small>Daftar</small> */}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex">
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
                    </div>

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
                      Masukan Kata Sandi
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Kata Sandi"
                      name="password"
                      required
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Masukan Kembali Kata Sandi
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Kata Sandi"
                      name="password_confirmation"
                      required
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <CategoryRole setSelectProject={setSelectProject}/>

                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                        name="check"
                        required
                        onChange={(e) => handleChange(e)}
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                      Saya setuju dengan{" "}
                        <a
                          href="#pablo"
                          className="text-lightBlue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Kebijakan privasi
                        </a>
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                        Buat Akun
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-blueGray-200"
                >
                  {/* <small>Lupa Kata Sandi</small> */}
                </a>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/login" className="text-blueGray-200">
                  <small>Sudah Punya Akun</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
