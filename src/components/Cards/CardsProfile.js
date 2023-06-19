import React, { useState, useEffect} from "react";
import { BiTrash } from "react-icons/bi"; 
import MapExample from "../Maps/MapExample";
import ModalEdits from "../Modals/ModalEditPaket";

// enpoint
import { addPortofolio, deletePortofolio, getPortofolio, getUsers, updateProfil } from "../../services/enpoint/vendor";
import { useDispatch, useSelector } from "react-redux";
import useGeoLocation from "../../hooks/useGeolocation";
import { Link } from "react-router-dom";

// components
export default function CardProfile() {
  const location = useGeoLocation()
  // console.log(location);
  const [files, setFile] = useState([]);
  const [message, setMessage] = useState();

  // redux
  const dispatch = useDispatch();
  const { dataUsers, dataToken } = useSelector((state) => state)
  const { full_name , roles , email} = dataUsers?.userDatas
  const { login , token} = dataToken?.token
  // console.log(token);

  // fileImages
  const [filesWedding, setFileWedding] = useState([]);
  const [filesBritday, setFileBritday] = useState([]);
  const [fileGraduation, setFileGraduation] = useState([]);
  const [fileHoliday, setFileHoliday] = useState([]);
  const [fileBaby, setFileBaby] = useState([]);
  const [fileProduct, setFileProduct] = useState([]);
  const [fileFeed, setFileFeed] = useState([]);
  const [fileProfil, setFileProfil] = useState([]);

  // category
  const [wedding, setWedding] = useState(false);
  const [birthday, setBirthday] = useState(false);
  const [graduation, setGraduation] = useState(false);
  const [holiday, setHoliday] = useState(false);
  const [baby, setBaby] = useState(false);
  const [product, setProduct] = useState(false);
  const [feed, setFeed] = useState(false);
  
  // message profile
  const [messageProfil, setMessageProfil] = useState();


  // profile vendor
  const [formProfil, setFormProfil] = useState({
    full_name : '',
    email : '',
    account_number : '',
    description : '',
    full_address : '',
    lat : '',
    lang : ''
  })
  const [ErorformProfil, setErorFormProfil] = useState({
    full_name : '',
    email : '',
    account_number : '',
    description : '',
    full_address : '',
    lat : '',
    lang : ''
  })

  function getDataVendor(){
    // getProfil Vendor
    getUsers(token)
    .then((result) => {
      const respon = result.data
      const myObj = respon?.additional_data
      var isEmptyObj = !Object.keys(myObj).length;

      setFormProfil({
        full_name : respon.user.first_name,
        email : respon.user.email,
        account_number : respon.additional_data.account_number,
        description : respon.additional_data.description,
        full_address : respon.additional_data.address.full_address,
        lat : respon.additional_data.address.latitude,
        lang : respon.additional_data.address.longitude,
      })
      if (!isEmptyObj) {
        // for (let i = 0; i < respon?.additional_data?.services?.length; i++) {
        //   const element = respon?.additional_data?.services[i];
        //   switch (element.id) {
        //     case 1:
        //       setWedding(true)
        //       break;
        //     case 2:
        //       setBirthday(true)
        //       break;
        //     case 3:
        //       setGraduation(true)
        //       break;
        //     case 4:
        //       setHoliday(true)
        //       break;
        //       case 5:
        //         setBaby(true)
        //         break;
        //         case 6:
        //       setProduct(true)
        //       break;
        //       case 7:
        //       setFeed(true)
        //       break;
        //     default:
        //       console.log(null);
        //       break;
        //   }
        // }
        setFileProfil([myObj.avatar.src])
      }
    }).catch((err) => {
      console.log('==>',err);
    });

    // get Portofolio Vendor
    getPortofolio(token)
      .then((result) => {
        const respon = result.data
        
        if (respon.length > 0) {
          for (let i = 0; i < respon?.length; i++) {
            const element = respon[i];
            switch (element.service_id) {
              case 1:
                console.log(1);
                setWedding(true)
                const arrayWd = []
                for (let i = 0; i < element.portfolios.length; i++) {
                  const data1 = element.portfolios[i];
                  // console.log(data);
                  arrayWd.push({id : data1.id, base64 : data1.src})
                }
                setFileWedding(arrayWd);
                break;
              case 2:
                setBirthday(true)
                const arrayBt = []
                for (let i = 0; i < element.portfolios.length; i++) {
                  const data2 = element.portfolios[i];
                  // console.log(data)
                  arrayBt.push({id : data2.id, base64 : data2.src });
                }
                setFileBritday(arrayBt);
                
                break;
              case 3:
                setGraduation(true)
                const arrayGd = []
                for (let i = 0; i < element.portfolios.length; i++) {
                  const data3 = element.portfolios[i];
                  // console.log(data);
                  arrayGd.push({id : data3.id, base64 : data3.src })
                }
                setFileGraduation(arrayGd);
                break;
              case 4:
                setHoliday(true)
                const arrayHl = []
                for (let i = 0; i < element.portfolios.length; i++) {
                  const data4 = element.portfolios[i];
                  // console.log(data);
                  arrayHl.push({id : data4.id, base64 :data4.src })
                }
                setFileHoliday(arrayHl);
                break;
              case 5:
                setBaby(true)
                const arrayBy = []
                for (let i = 0; i < element.portfolios.length; i++) {
                  const data5 = element.portfolios[i];
                  // console.log(data);
                  arrayBy.push({id : data5.id, base64 : data5.src })
                }
                setFileBaby(arrayBy);
                break;
              case 6:
                setProduct(true)
                const arrayPd = []
                for (let i = 0; i < element.portfolios.length; i++) {
                  const data6 = element.portfolios[i];
                  // console.log(data);
                  arrayPd.push({id : data6.id, base64 : data6.src })
                }
                setFileProduct(arrayPd);
                break;
              case 7:
                setFeed(true)
                const arrayFe = []
                for (let i = 0; i < element.portfolios.length; i++) {
                  const data7 = element.portfolios[i];
                  // console.log(data);
                  arrayFe.push({id : data7.id, base64 : data7.src })
                }
                setFileFeed(arrayFe);
                break;
              default:
                console.log(null);
                break;
            }
          }
        }
      }).catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    // GetProfile
    getDataVendor()
  }, [])
  

  const handleFile = async (e) => {
    setMessage("");
    let file = e.target.files;
    let dataName = e.target.name
    let imagePromises = [];

    for (let i = 0; i < file.length; i++) {
      const fileName = file[i];
      const reader = new FileReader();
      const fileType = file[i]['type'];
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

      if (validImageTypes.includes(fileType)) {
        imagePromises.push(
          new Promise((resolve) => {
            reader.onloadend = () => {
              const base64String = reader.result;
              resolve(base64String);
            };

            reader.readAsDataURL(fileName);
          })
        )
      } else {
        setMessage("only images accepted");
      }
    }

    Promise.all(imagePromises)
    .then((base64Strings) => {
      for (let i = 0; i < base64Strings.length; i++) {
        let base64 = base64Strings[i]
        if (wedding && dataName == 'wedding') {
          setFileWedding([...filesWedding, {base64, imageData: file[i]}]);
        }
        if (birthday && dataName == 'birthday') {
          setFileBritday([...filesBritday, {base64, imageData: file[i]}]);
        }
        if (graduation && dataName == 'graduation') {
          setFileGraduation([...fileGraduation, {base64, imageData: file[i]}]);
        }
        if (holiday && dataName == 'holiday') {
          setFileHoliday([...fileHoliday, {base64, imageData: file[i]}]);
        }
        if (baby && dataName == 'baby') {
          setFileBaby([...fileBaby, {base64, imageData: file[i]}]);
        }
        if (product && dataName == 'product') {
          setFileProduct([...fileProduct, {base64, imageData: file[i]}]);
        }
        if (product && dataName == 'product') {
          setFileProduct([...fileProduct, {base64, imageData: file[i]}]);
        }
        if (feed && dataName == 'feed') {
          setFileFeed([...fileFeed, {base64, imageData: file[i]}]);
        }
        // else {
        //   setFile([...files, {base64, imageData: file[i]}]);
        // }
      }
    });
  }

  const handleUploadImageProfile = async (e) => {
    let file = e.target.files;
    let imagePromises = [];


    for (let i = 0; i < file.length; i++) {
      const fileName = file[i];
      const reader = new FileReader();
      const fileType = file[i]['type'];
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
      
      if (validImageTypes.includes(fileType)) {
        imagePromises.push(
          new Promise((resolve) => {
            reader.onloadend = () => {
              const base64String = reader.result;
              resolve(base64String);
            };

            reader.readAsDataURL(fileName);
          })
        )
      } else {
        setMessageProfil("only images accepted");
      }
    }

    Promise.all(imagePromises)
    .then((base64Strings) => {
      // console.log();
      // for (let i = 0; i < base64Strings.length; i++) {
      //   const element = base64Strings[i];
      setFileProfil([base64Strings[0]])
      // }
    })
  }

  const handleRemoveProfil = (i, name) => {
    setFileProfil(fileProfil.filter((x, idx) => idx !== i));
  }

  const removeImage = (i, name) => {
    if (name == 'wedding') {
      deletePortofolio(token, i)
      .then((result) => {
        alert('Berhasil Menghapus Salah Satu Foto Pernikahan')
        console.log(result);
        setFileWedding(filesWedding.filter((x , idx)=> x.id !== i));
      }).catch((err) => {
        console.log(err);
      });
    }
    if (name == 'birthday') {
      deletePortofolio(token, i)
      .then((result) => {
        alert('Berhasil Menghapus Salah Satu Foto Ulang Tahun')
        console.log(result);
        setFileBritday(filesBritday.filter((x, idx)=> x.id !== i));
      }).catch((err) => {
        console.log(err);
      });
    }
    if (name == 'graduation') {
      deletePortofolio(token, i)
      .then((result) => {
        alert('Berhasil Menghapus Salah Satu Foto Kelulusan')
        console.log(result);
        setFileGraduation(fileGraduation.filter((x, idx) => x.id !== i));
      }).catch((err) => {
        console.log(err);
      });
    }
    if (name == 'holiday') {
      deletePortofolio(token, i)
      .then((result) => {
        alert('Berhasil Menghapus Salah Satu Foto Liburan')
        console.log(result);
        setFileHoliday(fileHoliday.filter((x, idx )=> x.id !== i));
      }).catch((err) => {
        console.log(err);
      });
    }
    if (name == 'baby') {
      deletePortofolio(token, i)
      .then((result) => {
        alert('Berhasil Menghapus Salah Satu Foto Bayi')
        console.log(result);
        setFileBaby(fileBaby.filter((x, idx )=> x.id !== i));
      }).catch((err) => {
        console.log(err);
      });
    }
    if (name == 'product') {
      deletePortofolio(token, i)
      .then((result) => {
        alert('Berhasil Menghapus Salah Satu Foto Product')
        console.log(result);
        setFileProduct(fileProduct.filter((x, idx)=> x.id !== i));
      }).catch((err) => {
        console.log(err);
      });
    }
    if (name == 'feed') {
      deletePortofolio(token, i)
      .then((result) => {
        alert('Berhasil Menghapus Salah Satu Foto Makanan')
        console.log(result);
        setFileFeed(fileFeed.filter((x, idx )=> x.id !== i));
      }).catch((err) => {
        console.log(err);
      });
    }
    else {
      console.log(null);
    }
    // setFile(files.filter(x => x.imageData.name !== i));
  }

  const handleCategory = async (e) => {
    let dataName = e.target.name
    if (dataName == 'wedding') {
      setWedding(!wedding)
      setFileWedding([])
    } 
    if (dataName == 'brithay'){
      setBirthday(!birthday)
      setFileBritday([])
    }
    if (dataName == 'graduation'){
      setGraduation(!graduation)
      setFileGraduation([])
    }
    if (dataName == 'holiday'){
      setHoliday(!holiday)
      setFileHoliday([])
    }
    if (dataName == 'baby'){
      setBaby(!baby)
      setFileBaby([])
    }
    if (dataName == 'product'){
      setProduct(!product)
      setFileProduct([])
    }
    if (dataName == 'feed'){
      setFeed(!feed)
      setFileFeed([])
    }
    else {
      console.log(null);
    }
  }

  const handlCangeForm = (e) => {
    setFormProfil({
      ...formProfil,
      [e.target.name]: e.target.value,
    });

    setErorFormProfil({
      ...ErorformProfil,
      [e.target.name]: "",
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // POST DATA PROFILE
    let dataPost = {
      fullname: formProfil.full_name,
      email: formProfil.email,
      description: formProfil.description,
      account_number: formProfil.account_number,
      address: {
        latitude: location.coordinates.lat,
        longitude: location.coordinates.lng,
        full_address: formProfil.full_address
      },
    }
    if (fileProfil.length > 0) {
      dataPost = {
        ...dataPost,
        avatar : {
          base64 : fileProfil[0]
        }
      }
    }
    
    // POST DATA PORTOFOLIO
    let serviceCategory = []
    let ArrayWedding = []
    let ArrayBrithay = []
    let ArrayGraduation = []
    let ArrayHoliday = []
    let ArrayBaby = []
    let ArrayProduct = []
    let ArrayFeed = []
    
    // state objd
    let PostPortofolio = {}
    
    // check category
    if (filesWedding.length > 0) {
      serviceCategory.push(1)
      for (let i = 0; i < filesWedding.length; i++) {
        const wd = filesWedding[i];
        ArrayWedding.push(wd.base64)
      }
      PostPortofolio = {
        ...PostPortofolio,
        "1" : ArrayWedding
      }
    }
    if (filesBritday.length > 0) {
      serviceCategory.push(2)
      for (let i = 0; i < filesBritday.length; i++) {
        const bd = filesBritday[i];
        ArrayBrithay.push(bd.base64)
      }
      PostPortofolio = {
        ...PostPortofolio,
        "2" : ArrayBrithay
      }
    }
    if (fileGraduation.length > 0) {
      console.log(3);
      serviceCategory.push(3)
      for (let i = 0; i < fileGraduation.length; i++) {
        const gd = fileGraduation[i];
        ArrayGraduation.push(gd.base64)
      }
      PostPortofolio = {
        ...PostPortofolio,
        "3" : ArrayGraduation
      }
    }
    if (fileHoliday.length > 0) {
      serviceCategory.push(4)
      for (let i = 0; i < fileHoliday.length; i++) {
        const hl = fileHoliday[i];
        ArrayHoliday.push(hl.base64)
      }
      PostPortofolio = {
        ...PostPortofolio,
        "4" : ArrayHoliday
      }
    }
    if (fileBaby.length > 0) {
      serviceCategory.push(5)
      for (let i = 0; i < fileBaby.length; i++) {
        const fb = fileBaby[i];
        ArrayBaby.push(fb.base64)
      }
      PostPortofolio = {
        ...PostPortofolio,
        "5" : ArrayBaby
      }
    }
    if (fileProduct.length > 0) {
      serviceCategory.push(6)
      for (let i = 0; i < fileProduct.length; i++) {
        const pd = fileProduct[i];
        ArrayProduct.push(pd.base64)
      }
      PostPortofolio = {
        ...PostPortofolio,
        "6" : ArrayProduct
      }
    }
    if (fileFeed.length > 0) {
      serviceCategory.push(7)
      for (let i = 0; i < fileFeed.length; i++) {
        const ff = fileFeed[i];
        ArrayFeed.push(ff.base64)
      }
      PostPortofolio = {
        ...PostPortofolio,
        "7" : ArrayFeed
      }
    }

    if (serviceCategory.length > 0) {
      dataPost = {
        ...dataPost,
        services : serviceCategory
      }
    }
    // console.log('DATA PROFILE =>',dataPost)
    // console.log('DATA PORTFOLIO =>',PostPortofolio);
    
    updateProfil(dataPost, token)
    .then((result) => {
      console.log(result)
    }).catch((err) => {
      console.log(err);
    });


    addPortofolio(PostPortofolio, token)
    .then((result) => {
      console.log(result);
    }).catch((err) => {
      console.log(err);
    });

    alert('Berhasil Update Profile')
    // window.location.reload()
  }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-800 text-xl font-bold">Profile Saya</h6>
            <Link to="/admin/profile/paket">
              <button
                className={
                  'text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
                  + ' bg-blueGray-600'
                }
                type="button"
                // onClick={handleFileChange}
              >
                {'List Paket Anda'}
              </button>
            </Link>
          </div>
        </div>

        {/* {!change ? */}
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            INFORMASI PENGGUNA
            </h6>

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Foto Profil
            </h6>
            <div className="h-50 flex justify-center items-center bg-ligth-900 px-2">
              <div className="p-3 w-full rounded-md">
                <span className="flex justify-center items-center bg-white text-[12px] mb-1 text-red-500">{messageProfil}</span>
                {fileProfil.length < 1 ?
                <div class="flex w-full h-12 items-center justify-center bg-grey-lighter mb-4">
                  <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                      <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                      </svg>
                      <span class="mt-2 text-base leading-normal">Unggah Disini</span>
                      <input type="file" onChange={handleUploadImageProfile} className="hidden" accept="image/*" />
                  </label>
                </div>
                :
                <>
                  {fileProfil.map((file, key) => {
                    return (
                      <div className="flex flex-wrap gap-2" key={key}>
                        <div className='h-24 flex items-center justify-between rounded bg-gray-600 p-3 bg-white mt-2 ml-2'>
                          <div className="flex flex-row items-center gap-2">
                            <div className="h-20 w-20">
                              <img alt="..." className="w-full h-full rounded" src={file} width={50} height={50}/>
                            </div>
                            {/* <span className="truncate w-44 text-gray-200 text-xs ml-3 mr-4"></span> */}
                          </div>
                          <div onClick={() => {handleRemoveProfil(key, '')}} className="h-8 w-8 bg-red-400 flex items-center cursor-pointer justify-center rounded-sm ml-3">
                            <BiTrash className="mdi mdi-trash-can text-white text-[14px]" size={20}/>
                          </div>
                        </div> 
                      </div>
                    )
                  })}
                </>
                }
              </div>
            </div>

            <div className="flex flex-wrap mt-6">
              <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                      Full Name
                  </label>
                  <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Lucky"
                      name="full_name"
                      defaultValue={formProfil?.full_name ? formProfil?.full_name : full_name?.replace('_', ' ')}
                      onChange={(e) => handlCangeForm(e)}
                  />
                  </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
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
                          placeholder="jesse@example.com"
                          name="email"
                          defaultValue={formProfil.email ? formProfil.email : email.replace('_', ' ')}
                          onChange={(e) => handlCangeForm(e)}
                      />
                  </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                      <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                      >
                          No Rekening
                      </label>
                      <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="834673256437"
                          name="account_number"
                          defaultValue={formProfil.account_number}
                          onChange={(e) => handlCangeForm(e)}
                      />
                  </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                      <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                      >
                          Peran
                      </label>
                      <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="fotografer"
                          defaultValue={roles == 'vendor' ? 'Fotografer' : 'Costumer'}
                          disabled
                          onChange={(e) => handlCangeForm(e)}
                      />
                  </div>
              </div>
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Tentang Saya
                  </label>
                  <textarea
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="A beautiful UI Kit and Admin for React & Tailwind CSS. It is Free and Open Source."
                    rows="4"
                    name="description"
                    defaultValue={formProfil.description}
                    onChange={(e) => handlCangeForm(e)}
                  ></textarea>
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Informasi Alamat
            </h6>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4 mt-3">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Alamat
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                    name="full_address"
                    defaultValue={formProfil.full_address}
                    onChange={(e) => handlCangeForm(e)}
                  />
                </div>
              </div>

              <div className="w-full lg:w-12/12 px-4">
                <MapExample props={{lang : formProfil.lang , lat : formProfil.lat}}/>
              </div>
            </div>
            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Kategori
            </h6>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12">
                <div className="w-full lg:w-2/12 px-4 mt-3">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      id="customCheckLogin"
                      type="checkbox"
                      className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      name="wedding"
                      checked={wedding}
                      onClick={handleCategory}
                    />
                    <span className="ml-2 text-sm font-semibold text-blueGray-600">
                      Pernikahan
                    </span>
                  </label>
                </div>
                <div className="w-full lg:w-2/12 px-4 mt-3">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      id="customCheckLogin"
                      type="checkbox"
                      className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      name="brithay"
                      checked={birthday}
                      onClick={handleCategory}
                    />
                    <span className="ml-2 text-sm font-semibold text-blueGray-600">
                      Ulang Tahun
                    </span>
                  </label>
                </div>
                <div className="w-full lg:w-2/12 px-4 mt-3">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      id="customCheckLogin"
                      type="checkbox"
                      className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      name="graduation"
                      onClick={handleCategory}
                      checked={graduation}
                    />
                    <span className="ml-2 text-sm font-semibold text-blueGray-600">
                      Kelulusan
                    </span>
                  </label>
                </div>
                <div className="w-full lg:w-2/12 px-4 mt-3">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      id="customCheckLogin"
                      type="checkbox"
                      className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      name="holiday"
                      onClick={handleCategory}
                      checked={holiday}
                    />
                    <span className="ml-2 text-sm font-semibold text-blueGray-600">
                      Liburan
                    </span>
                  </label>
                </div>
              </div>
              <div className="w-full lg:w-6/12">
                <div className="w-full lg:w-2/12 px-4 mt-3">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      id="customCheckLogin"
                      type="checkbox"
                      className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      name="baby"
                      onClick={handleCategory}
                      checked={baby}
                    />
                    <span className="ml-2 text-sm font-semibold text-blueGray-600">
                      Bayi
                    </span>
                  </label>
                </div>
                <div className="w-full lg:w-2/12 px-4 mt-3">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      id="customCheckLogin"
                      type="checkbox"
                      className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      name="product"
                      onClick={handleCategory}
                      checked={product}
                    />
                    <span className="ml-2 text-sm font-semibold text-blueGray-600">
                      Produk
                    </span>
                  </label>
                </div>
                <div className="w-full lg:w-2/12 px-4 mt-3">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      id="customCheckLogin"
                      type="checkbox"
                      className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      name="feed"
                      onClick={handleCategory}
                      checked={feed}
                    />
                    <span className="ml-2 text-sm font-semibold text-blueGray-600">
                      Makanan
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Gambar Portofolio
            </h6>
            {wedding ?
              <>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Pernikahan
                </h6>
                <div className="h-50 flex justify-center items-center bg-ligth-900 px-2">
                  <div className="p-3 w-full rounded-md">
                    <span className="flex justify-center items-center bg-white text-[12px] mb-1 text-red-500">{message}</span>
                    {filesWedding.length < 5 ? 
                    <>
                      <div class="flex w-full h-12 items-center justify-center bg-grey-lighter mb-4">
                        <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                            <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                            </svg>
                            <span class="mt-2 text-base leading-normal">Tambah</span>
                            <input type="file" onChange={handleFile} className="hidden" multiple name="wedding"/>
                        </label>
                      </div>
                    </>
                    : null}
                    <div className={'flex flex-wrap gap-2' + `${filesWedding.length < 5 ? ' mt-12' : '' }`}>
                      {filesWedding.map((file, key) => {
                        return (
                          <div key={key} className='h-24 flex items-center justify-between rounded bg-gray-600 p-3 bg-white mt-2 ml-2'>
                            <div className="flex flex-row items-center gap-2">
                              <div className="h-20 w-20">
                                <img alt="..." className="w-full h-full rounded" src={file.base64} width={50} height={50}/>
                              </div>
                              {/* <span className="truncate w-44 text-gray-200 text-xs ml-3 mr-4">{file.imageData.name < 15 ? file.imageData.name : `${file.imageData.name.substring(0,14)}..`}</span> */}
                            </div>
                            <div onClick={() => {removeImage(file.id, 'wedding')}} className="ml-3 h-8 w-8 bg-red-400 flex items-center cursor-pointer justify-center rounded-sm">
                              <BiTrash className="mdi mdi-trash-can text-white text-[14px]" size={20}/>
                            </div>
                          </div> 
                        )
                      })}
                    </div>
                  </div>
                </div>
              </>
            : null}
            {birthday ? 
              <>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Ulang Tahun
                </h6>
                <div className="h-50 flex justify-center items-center bg-ligth-900 px-2">
                  <div className="p-3 w-full rounded-md">
                    <span className="flex justify-center items-center bg-white text-[12px] mb-1 text-red-500">{message}</span>
                    {filesBritday.length < 5 ? 
                    <>
                      <div class="flex w-full h-12 items-center justify-center bg-grey-lighter mb-4">
                        <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                            <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                            </svg>
                            <span class="mt-2 text-base leading-normal">Tambah</span>
                            <input type="file" onChange={handleFile} className="hidden" multiple name="birthday"/>
                        </label>
                      </div>
                    </>
                    : null}
                    <div className={'flex flex-wrap gap-2' + `${filesBritday.length < 5 ? ' mt-12' : '' }`}>
                      {filesBritday.map((file, key) => {
                        return (
                          <div key={key} className='h-24 flex items-center justify-between rounded bg-gray-600 p-3 bg-white mt-2 ml-2'>
                            <div className="flex flex-row items-center gap-2">
                              <div className="h-20 w-20">
                                <img alt="..." className="w-full h-full rounded" src={file.base64} width={50} height={50}/>
                              </div>
                              {/* <span className="truncate w-44 text-gray-200 text-xs ml-3 mr-4">{file.imageData.name < 15 ? file.imageData.name : `${file.imageData.name.substring(0,14)}..`}</span> */}
                            </div>
                            <div onClick={() => {removeImage(file.id, 'birthday')}} className="ml-3 h-8 w-8 bg-red-400 flex items-center cursor-pointer justify-center rounded-sm">
                              <BiTrash className="mdi mdi-trash-can text-white text-[14px]" size={20}/>
                            </div>
                          </div> 
                        )
                      })}
                    </div>
                  </div>
                </div>
              </>
            : null}
            {graduation ? 
              <>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Kelulusan
                </h6>
                <div className="h-50 flex justify-center items-center bg-ligth-900 px-2">
                  <div className="p-3 w-full rounded-md">
                    <span className="flex justify-center items-center bg-white text-[12px] mb-1 text-red-500">{message}</span>
                    {fileGraduation.length < 5 ? 
                    <>
                      <div class="flex w-full h-12 items-center justify-center bg-grey-lighter mb-4">
                        <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                            <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                            </svg>
                            <span class="mt-2 text-base leading-normal">Tambah</span>
                            <input type="file" onChange={handleFile} className="hidden" multiple name="graduation"/>
                        </label>
                      </div>
                    </>
                    : null}
                    <div className={'flex flex-wrap gap-2' + `${fileGraduation.length < 5 ? ' mt-12' : '' }`}>
                      {fileGraduation.map((file, key) => {
                        return (
                          <div key={key} className='h-24 flex items-center justify-between rounded bg-gray-600 p-3 bg-white mt-2 ml-2'>
                            <div className="flex flex-row items-center gap-2">
                              <div className="h-20 w-20">
                                <img alt="..." className="w-full h-full rounded" src={file.base64} width={50} height={50}/>
                              </div>
                              {/* <span className="truncate w-44 text-gray-200 text-xs ml-3 mr-4">{file.imageData.name < 15 ? file.imageData.name : `${file.imageData.name.substring(0,14)}..`}</span> */}
                            </div>
                            <div onClick={() => {removeImage(file.id, 'graduation')}} className="ml-3 h-8 w-8 bg-red-400 flex items-center cursor-pointer justify-center rounded-sm">
                              <BiTrash className="mdi mdi-trash-can text-white text-[14px]" size={20}/>
                            </div>
                          </div> 
                        )
                      })}
                    </div>
                  </div>
                </div>
              </>
            : null}
            {holiday ?
              <>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Liburan
                </h6>
                <div className="h-50 flex justify-center items-center bg-ligth-900 px-2">
                  <div className="p-3 w-full rounded-md">
                    <span className="flex justify-center items-center bg-white text-[12px] mb-1 text-red-500">{message}</span>
                    {fileHoliday.length < 5 ? 
                    <>
                      <div class="flex w-full h-12 items-center justify-center bg-grey-lighter mb-4">
                        <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                            <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                            </svg>
                            <span class="mt-2 text-base leading-normal">Tambah</span>
                            <input type="file" onChange={handleFile} className="hidden" multiple name="holiday"/>
                        </label>
                      </div>
                    </>
                    : null}
                    <div className={'flex flex-wrap gap-2' + `${fileHoliday.length < 5 ? ' mt-12' : '' }`}>
                      {fileHoliday.map((file, key) => {
                        return (
                          <div key={key} className='h-24 flex items-center justify-between rounded bg-gray-600 p-3 bg-white mt-2 ml-2'>
                            <div className="flex flex-row items-center gap-2">
                              <div className="h-20 w-20">
                                <img alt="..." className="w-full h-full rounded" src={file.base64} width={50} height={50}/>
                              </div>
                              {/* <span className="truncate w-44 text-gray-200 text-xs ml-3 mr-4">{file.imageData.name < 15 ? file.imageData.name : `${file.imageData.name.substring(0,14)}..`}</span> */}
                            </div>
                            <div onClick={() => {removeImage(file.id, 'holiday')}} className="ml-3 h-8 w-8 bg-red-400 flex items-center cursor-pointer justify-center rounded-sm">
                              <BiTrash className="mdi mdi-trash-can text-white text-[14px]" size={20}/>
                            </div>
                          </div> 
                        )
                      })}
                    </div>
                  </div>
                </div>
              </>
            : null}
            {baby ? 
              <>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Bayi
                </h6>
                <div className="h-50 flex justify-center items-center bg-ligth-900 px-2">
                  <div className="p-3 w-full rounded-md">
                    <span className="flex justify-center items-center bg-white text-[12px] mb-1 text-red-500">{message}</span>
                    {fileBaby.length < 5 ? 
                      <>
                        <div class="flex w-full h-12 items-center justify-center bg-grey-lighter mb-4">
                          <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                              <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                              </svg>
                              <span class="mt-2 text-base leading-normal">Tambah</span>
                              <input type="file" onChange={handleFile} className="hidden" multiple name="baby"/>
                          </label>
                        </div>
                      </>
                    : null}
                    <div className={'flex flex-wrap gap-2' + `${fileBaby.length < 5 ? ' mt-12' : '' }`}>
                      {fileBaby.map((file, key) => {
                        return (
                          <div key={key} className='h-24 flex items-center justify-between rounded bg-gray-600 p-3 bg-white mt-2 ml-2'>
                            <div className="flex flex-row items-center gap-2">
                              <div className="h-20 w-20">
                                <img alt="..." className="w-full h-full rounded" src={file.base64} width={50} height={50}/>
                              </div>
                              {/* <span className="truncate w-44 text-gray-200 text-xs ml-3 mr-4">{file.imageData.name < 15 ? file.imageData.name : `${file.imageData.name.substring(0,14)}..`}</span> */}
                            </div>
                            <div onClick={() => {removeImage(file.id, 'baby')}} className="ml-3 h-8 w-8 bg-red-400 flex items-center cursor-pointer justify-center rounded-sm">
                              <BiTrash className="mdi mdi-trash-can text-white text-[14px]" size={20}/>
                            </div>
                          </div> 
                        )
                      })}
                    </div>
                  </div>
                </div>
              </>
            : null}
            {product ? 
              <>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Product
                </h6>
                <div className="h-50 flex justify-center items-center bg-ligth-900 px-2">
                  <div className="p-3 w-full rounded-md">
                    <span className="flex justify-center items-center bg-white text-[12px] mb-1 text-red-500">{message}</span>
                    {fileProduct.length < 5 ? 
                    <>
                      <div class="flex w-full h-12 items-center justify-center bg-grey-lighter mb-4">
                        <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                            <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                            </svg>
                            <span class="mt-2 text-base leading-normal">Tambah</span>
                            <input type="file" onChange={handleFile} className="hidden" multiple name="product" />
                        </label>
                      </div>
                    </>
                    : null}
                    <div className={'flex flex-wrap gap-2' + `${fileProduct.length < 5 ? ' mt-12' : '' }`}>
                      {fileProduct.map((file, key) => {
                        return (
                          <div key={key} className='h-24 flex items-center justify-between rounded bg-gray-600 p-3 bg-white mt-2 ml-2'>
                            <div className="flex flex-row items-center gap-2">
                              <div className="h-20 w-20">
                                <img alt="..." className="w-full h-full rounded" src={file.base64} width={50} height={50}/>
                              </div>
                              {/* <span className="truncate w-44 text-gray-200 text-xs ml-3 mr-4">{file.imageData.name < 15 ? file.imageData.name : `${file.imageData.name.substring(0,14)}..`}</span> */}
                            </div>
                            <div onClick={() => {removeImage(file.id, 'product')}} className="ml-3 h-8 w-8 bg-red-400 flex items-center cursor-pointer justify-center rounded-sm">
                              <BiTrash className="mdi mdi-trash-can text-white text-[14px]" size={20}/>
                            </div>
                          </div> 
                        )
                      })}
                    </div>
                  </div>
                </div>
              </>
            : null}
            {feed ? 
              <>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Makanan
                </h6>
                <div className="h-50 flex justify-center items-center bg-ligth-900 px-2">
                  <div className="p-3 w-full rounded-md">
                    <span className="flex justify-center items-center bg-white text-[12px] mb-1 text-red-500">{message}</span>
                    {fileFeed.length < 5 ? 
                    <>
                      <div class="flex w-full h-12 items-center justify-center bg-grey-lighter mb-4">
                        <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                            <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                            </svg>
                            <span class="mt-2 text-base leading-normal">Tambah</span>
                            <input type="file" onChange={handleFile} className="hidden" multiple name="feed" />
                        </label>
                      </div>
                    </>
                    : null}
                    <div className={'flex flex-wrap gap-2' + `${fileFeed.length < 5 ? ' mt-12' : '' }`}>
                      {fileFeed.map((file, key) => {
                        return (
                          <div key={key} className='h-24 flex items-center justify-between rounded bg-gray-600 p-3 bg-white mt-2 ml-2'>
                            <div className="flex flex-row items-center gap-2">
                              <div className="h-20 w-20">
                                <img alt="..." className="w-full h-full rounded" src={file.base64} width={50} height={50}/>
                              </div>
                              {/* <span className="truncate w-44 text-gray-200 text-xs ml-3 mr-4">{file.imageData.name < 15 ? file.imageData.name : `${file.imageData.name.substring(0,14)}..`}</span> */}
                            </div>
                            <div onClick={() => {removeImage(file.id, 'feed')}} className="ml-3 h-8 w-8 bg-red-400 flex items-center cursor-pointer justify-center rounded-sm">
                              <BiTrash className="mdi mdi-trash-can text-white text-[14px]" size={20}/>
                            </div>
                          </div> 
                        )
                      })}
                    </div>
                  </div>
                </div>
              </>
            : null}
            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <button
              className={
                'text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
                + ' bg-blueGray-600 mt-4'
              }
              type="button"
              onClick={handleSubmit}
            >
              Simpan Perubahan
            </button>
          </form>
        </div>
      </div>    
    </>
  );
}
