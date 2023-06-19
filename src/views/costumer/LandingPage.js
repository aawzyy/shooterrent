import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom';

import { BiSlider } from "react-icons/bi";
import { MdAccountCircle } from 'react-icons/md';
import { AiOutlineSearch, AiOutlineCloseCircle } from "react-icons/ai";
import { RiStarSFill } from "react-icons/ri";

import DropDownCotumer from '../../components/Dropdown/DropDownCostumer';
import { getAllProductVendor, getGeolocation } from '../../services/enpoint/costumer';
import DropDownCategory from '../../components/Dropdown/DropDownCategory';

import { useDispatch, useSelector } from 'react-redux';
import useGeoLocation from '../../hooks/useGeolocation';
import MapExample from '../../components/Maps/MapExample';

export default function LandingPage() {
  const location = useGeoLocation()
  // redux
  const dispatch = useDispatch();
  const { dataUsers, dataToken } = useSelector((state) => state)
  const { full_name, roles } = dataUsers?.userDatas
  const { login , token} = dataToken?.token
  
  const [ListProduct, setProduct] = useState([])
  const [filterProductMinMax, setfilterProductMinMax] = useState([])
  const [filterProjects, setFilterProjects] = useState([])
  const [searchData, setSearchData] = useState([])

  const [changeFilter, setChangeFilter] = useState(false)

  const [filterCategory, setFilterCategory] = useState(null)

  const [MinMaxForm, setMinMaxForm] = useState({
    min : '',
    max : ''
  })

  const [SearchValue, setSearchValue] = useState('')

  const handleChange = (e) => {
    if (e.target.name == 'min' || e.target.name == 'max') { 
      setMinMaxForm({
        ...MinMaxForm,
        [e.target.name]: e.target.value,
      })
    }
      
  };

  const getListProductVendor = () => {
    getAllProductVendor(token, null, null, null , location?.coordinates?.lat ? location?.coordinates?.lat : '-6.200511971721622', location?.coordinates?.lng ? location?.coordinates?.lng : '106.849624984375')
    .then((result) => {
      let array = []
      const response = result.data
      for (let i = 0; i < response.length; i++) {
        const element = response[i];
        array.push({...element})
      }
      setProduct(array)
    }).catch((err) => {
      console.log(err);
    });
  }

  const getListProductMinMax = () => {
    getAllProductVendor(token, null, MinMaxForm.min, MinMaxForm.max, location?.coordinates?.lat, location?.coordinates?.lng)
    .then((result) => {
      let array = []
      const response = result.data
      for (let i = 0; i < response.length; i++) {
        const element = response[i];
        array.push({...element})
      }
      setfilterProductMinMax(array)
      
    }).catch((err) => {
      console.log(err);
     
    });
  }

  useEffect(() => {
    if (filterCategory) {
      getAllProductVendor(token, filterCategory, null, null, location?.coordinates?.lat, location?.coordinates?.lng)
      .then((result) => {
        let array = []
        const response = result.data
        for (let i = 0; i < response?.length; i++) {
          const element = response[i];
          array.push({...element})
        }
        setFilterProjects(array)
        
      }).catch((err) => {
        console.log(err);
      
      });
    } else {
      getListProductVendor()
      setTimeout(() => {
      }, 1000);
    }
  }, [filterCategory, location])

  const handleMinMax = (event) => {
    event.preventDefault();
    setFilterCategory(null)
    getListProductMinMax()
  }

  const handleClearFilter = (event) => {
    // event.preventDefault();
    setFilterCategory(null)
    setMinMaxForm({
      min : '',
      max : ''
    })
    setChangeFilter(false)
  }

  const handleFilterCategoy = (props) => {
    setFilterCategory(props)
    setChangeFilter(false)
  }

  const handleSearch = (event) => {
    event.preventDefault();
    const result = ListProduct.filter((val) => val?.vendor_name?.toLowerCase()?.includes(SearchValue?.toLocaleLowerCase()))
    return setSearchData(result)
  }

  const handleChangeSearch = (e) => {
    setSearchValue(e.target.value)
  }

  return (
    <>
      <section className="dark:bg-gray-900 min-h-screen h-full relative w-full">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl text-center font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">Fotografer Untuk Anda</h1>

            {/* Filter And Search  */}
            <div className='flex rows items-center mt-2'>
              <button onClick={() => setChangeFilter(!changeFilter)} className='p-2 flex rows' type='button'>
                <BiSlider size={25}/>
                <h2 className='ml-3 uppercase font-bold'>Filter</h2>
              </button>
              <button className='flex rows bg-blueGray-600 p-2 ml-3 rounded-sm' type='button' onClick={() => handleClearFilter()}>
                <AiOutlineCloseCircle size={20} color='#ffffff' className='mt-0.5'/>
                <h2 className='ml-1 text-white uppercase font-bold'>Hapus Filter</h2>
              </button>

              <form onSubmit={handleSearch} className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
                <div className="relative flex w-full flex-wrap items-stretch">
                  <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                    <AiOutlineSearch size={17}/>
                  </span>
                  <input
                    type="text"
                    placeholder="Cari Nama Fotografer"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                    name='search'
                    onChange={(e) => handleChangeSearch(e)}
                  />
                </div>
              </form>
            </div>

            {/* Value Filter */}

            {changeFilter ? 
              <>           
                <div className='rows items-center mt-2'>
                  <DropDownCategory setSelectProject={(e) => handleFilterCategoy(e)}/>
                  <>  
                    <form onSubmit={handleMinMax} className="md:flex hidden flex-row w-full items-center lg:ml-auto mr-3">
                      <div className="relative flex w-full flex-wrap items-stretch flex mr-2">
                        <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                          <AiOutlineSearch size={17}/>
                        </span>
                        <input
                          type="number"
                          placeholder="Minimal Harga"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                          name='min'
                          onChange={(e) => handleChange(e)}
                          required
                        />
                      </div>
                      <div className="relative flex w-full flex-wrap items-stretch flex">
                        <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                          <AiOutlineSearch size={17}/>
                        </span>
                        <input
                          type="number"
                          placeholder="Maximal Harga"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                          name='max'
                          onChange={(e) => handleChange(e)}
                          required
                        />
                      </div>
                      <button className='ml-3 mb-3 p-2 bg-blueGray-600 rounded-lg text-white' type='submit' style={{width : 100}}>
                        Cari
                      </button>
                    </form>
                  </>
                </div>
              </>
            : null}

            <div className="flex flex-wrap" style={{alignItems : 'center', justifyContent : 'center'}}>
              {SearchValue ?
                searchData?.map((vl ,k) => (
                  <Link to={`/costumer/list/${vl.id}/detail-list`} className="bg-white shadow-lg ml-3 mt-5 p-3 rounded-lg" style={{width : 600}}>
                      <a href='#pablo'>
                        <div className='row flex'>
                          <img className="object-cover w-16 h-16 rounded-lg lg:w-64 mt-4" src={vl?.avatar.src} alt=".."/>

                          <div className="flex flex-col justify-between py-6 lg:mx-6 ml-3">
                            <Link to='/notfound'>
                              <a href="#pablo" className="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
                                {vl?.vendor_name}
                              </a>
                            </Link>
                              
                            <span className="text-sm text-gray-500 dark:text-gray-300">Mulai Dari : Rp {vl?.lowest_price}</span>
                          </div>

                          <div className="ml-1 flex p-3">
                            <RiStarSFill size={16} className='mr-1' color='#FFC26F'/>
                            <p>{vl?.average_rating}/{vl?.average_rating}</p>
                          </div>
                          <div className="ml-1 p-3">
                            <h2>{vl?.total_orders}x pesanan</h2>
                          </div>
                          <div className="ml-1 p-3">
                            <h2>{vl?.distance} km</h2>
                          </div>
                        </div>
                        <div className='row flex'>
                          {vl?.portfolios?.map((v,k) => {
                            return(
                              <div className='mr-2'>
                                <img className="object-cover w-32 h-16 rounded-lg lg:w-64 mt-6" src={v.image} alt=".." style={{width : 100, height: 110}}/>
                              </div>
                            )
                          })}
                        </div>
                      </a>
                    </Link>
                ))
                :
                MinMaxForm.min && MinMaxForm.max ?
                filterProductMinMax?.map((vl ,k) => (
                  <Link to={`/costumer/list/${vl.id}/detail-list`} className="bg-white shadow-lg ml-3 mt-5 p-3 rounded-lg" style={{width : 600}}>
                      <a href='#pablo'>
                        <div className='row flex'>
                          <img className="object-cover w-16 h-16 rounded-lg lg:w-64 mt-4" src={vl?.avatar.src} alt=".."/>

                          <div className="flex flex-col justify-between py-6 lg:mx-6 ml-3">
                            <Link to='/notfound'>
                              <a href="#pablo" className="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
                                {vl?.vendor_name}
                              </a>
                            </Link>
                              
                            <span className="text-sm text-gray-500 dark:text-gray-300">Mulai Dari : Rp {vl?.lowest_price}</span>
                          </div>

                          <div className="ml-1 flex p-3">
                            <RiStarSFill size={16} className='mr-1' color='#FFC26F'/>
                            <p>{vl?.average_rating}/{vl?.average_rating}</p>
                          </div>
                          <div className="ml-1 p-3">
                            <h2>{vl?.total_orders}x pesanan</h2>
                          </div>
                          <div className="ml-1 p-3">
                            <h2>{vl?.distance} km</h2>
                          </div>
                        </div>
                        <div className='row flex'>
                          {vl?.portfolios?.map((v,k) => {
                            return(
                              <div className='mr-2'>
                                <img className="object-cover w-32 h-16 rounded-lg lg:w-64 mt-6" src={v.image} alt=".." style={{width : 100, height: 110}}/>
                              </div>
                            )
                          })}
                        </div>
                      </a>
                    </Link>
                ))
                :                
                filterCategory ?
                  filterProjects?.map((v,k) => (
                    <Link to={`/costumer/list/${v.id}/detail-list`} className="bg-white shadow-lg ml-3 mt-5 p-3 rounded-lg" style={{width : 600}}>
                        <a href='#pablo'>
                          <div className='row flex'>
                            <img className="object-cover w-16 h-16 rounded-lg lg:w-64 mt-4" src={v?.avatar.src} alt=".."/>

                            <div className="flex flex-col justify-between py-6 lg:mx-6 ml-3">
                              <Link to='/notfound'>
                                <a href="#pablo" className="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
                                  {v?.vendor_name}
                                </a>
                              </Link>
                                
                              <span className="text-sm text-gray-500 dark:text-gray-300">Mulai Dari : Rp {v?.lowest_price}</span>
                            </div>

                            <div className="ml-1 flex p-3">
                            <RiStarSFill size={16} className='mr-1' color='#FFC26F'/>
                            <p>{v?.average_rating}/{v?.average_rating}</p>
                          </div>
                          <div className="ml-1 p-3">
                            <h2>{v?.total_orders}x pesanan</h2>
                          </div>
                          <div className="ml-1 p-3">
                            <h2>{v?.distance} km</h2>
                          </div>
                          </div>
                          <div className='row flex'>
                            {v?.portfolios?.map((v,k) => {
                              return(
                                <div className='mr-2'>
                                  <img className="object-cover w-32 h-16 rounded-lg lg:w-64 mt-6" src={v.image} alt=".." style={{width : 100, height: 110}}/>
                                </div>
                              )
                            })}
                          </div>
                        </a>
                      </Link>
                  ))
                  :
                  ListProduct?.map((val,key) => {
                  return (
                    <Link to={`/costumer/list/${val.id}/detail-list`} className="bg-white shadow-lg ml-3 mt-5 p-3 rounded-lg" style={{width : 600}}>
                      <a href='#pablo'>
                        <div className='row flex'>
                          <img className="object-cover w-16 h-16 rounded-lg lg:w-64 mt-4" src={val?.avatar.src} alt=".."/>

                          <div className="flex flex-col justify-between py-6 lg:mx-6 ml-3">
                            <Link to='/notfound'>
                              <a href="#pablo" className="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
                                {val?.vendor_name}
                              </a>
                            </Link>
                              
                            <span className="text-sm text-gray-500 dark:text-gray-300">Mulai Dari : Rp {val?.lowest_price}</span>
                          </div>

                          <div className="ml-1 flex p-3">
                            <RiStarSFill size={16} className='mr-1' color='#FFC26F'/>
                            <p>{val?.average_rating}/{val?.average_rating}</p>
                          </div>
                          <div className="ml-1 p-3">
                            <h2>{val?.total_orders}x pesanan</h2>
                          </div>
                          <div className="ml-1 p-3">
                            <h2>{val?.distance} km</h2>
                          </div>
                        </div>
                        <div className='row flex'>
                          {val?.portfolios?.map((v,k) => {
                            return(
                              <div className='mr-2'>
                                <img className="object-cover w-32 h-16 rounded-lg lg:w-64 mt-6" src={v.image} alt=".." style={{width : 100, height: 110}}/>
                              </div>
                            )
                          })}
                        </div>
                      </a>
                    </Link>
                  )
                })
              }
            </div>
        </div>
      </section>
    </>
  )
}