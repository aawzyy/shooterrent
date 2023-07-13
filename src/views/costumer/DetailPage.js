import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import { Map, GoogleApiWrapper, Marker, Geocoder } from "google-maps-react";

// icons
import { AiFillHeart, AiOutlineBars } from "react-icons/ai";
import { RiStarSFill } from "react-icons/ri";
import { BsFillChatFill } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";

// components
import {
  adduUserWishlist,
  checkAppointMent,
  getDetailProduct,
  getConverstationVendor
} from "../../services/enpoint/costumer";
import {
  getConverstation,
  getListOrderVendor,
  getListRating,
  updateOrders,
} from "../../services/enpoint/vendor";
import DropdwonPackets from "../../components/Dropdown/DropdownListPakets";
import { formatDateString } from "../../utils/date-format";
import useGeoLocation from "../../hooks/useGeolocation";
import MapExample from "../../components/Maps/MapExample";
import { useHistory } from "react-router-dom";

export default function DetailPage() {
  //maps
  const location = useGeoLocation();
  const [formChart, setformChart] = useState({
    full_name: ""
  });

  const [address,setaddress]=useState();
  const [geocodeResults,setgeocodeResults] = useState()
  const [currentLocation,setcurrentLocation] = useState()
  let sendLocation = null
  const getCurrentLocation = () => {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => { 
          setcurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
          sendLocation = currentLocation
          getPlaceName(position.coords.latitude,position.coords.longitude)
          console.log("current"+location)
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    }
  };
  const geocodeAddress = () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK") {
        const location = results[0].geometry.location;
        const latitude = location.lat();
        const longitude = location.lng();
        setgeocodeResults(results);
        setcurrentLocation(location);
        sendLocation = location
      } else {
        console.error(
          "Geocode was not successful for the following reason:",
          status
        );
      }
    });
  };
  const reverseGeocode = async (lat, lng, apiKey) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
      );
      const data = await response.json();
  
      if (data.results.length > 0) {
        const address = data.results[0].formatted_address;
        return address;
      } else {
        return 'Address not found';
      }
    } catch (error) {
      console.error('Error in reverse geocoding:', error);
      return 'Error in reverse geocoding';
    }
  };
  const getPlaceName = async (lat, lng) => {
    const apiKey = 'AIzaSyCs0FQfOcg2z_-1tHzE6vpCgWqHSiNgA2c'; 
    const address = await reverseGeocode(lat, lng, apiKey);
    setformChart({
      ...formChart,
      full_address: address,
    });
    setaddress(address)

    console.log('Place name:', address);
    
  };


  const history = useHistory();
 
  const data = location?.state?.chartState;
  let { id_vendor } = useParams();

  // redux
  const dispatch = useDispatch();
  const { dataUsers, dataToken } = useSelector((state) => state);
  const { full_name, roles } = dataUsers?.userDatas;
  const { login, token } = dataToken?.token;
  const [loading, setloading] = useState(false);

  // product
  const [dataProduct, setdataProduct] = useState(null);
  const [today] = useState(new Date());
  const [selectPackets, setSelectPackets] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [start] =useState(new Date(startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate()));

  const [ListOrders, setListOrders] = useState([]);
  const [listRating, setlistRating] = useState([]);

  const handleAddWhislist = async (body) => {
    adduUserWishlist(token, body)
      .then((result) => {
        const respo = result;
        if (respo.message == "vendor added to wishlist") {
          alert("Anda Berhasil Menambahkan Ke Favorit");
        } else if (respo.error == "vendor already in wishlist") {
          alert("Fotografer Sudah Ini Sudah Ada Di List Anda");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Maaf Tidak Dapat Menambahkan Ke Favorit");
      });
  };

  const handlCangeForm = (e) => {
    setformChart({
      ...formChart,
      [e.target.name]: e.target.value,
    });
    setaddress(e.target.value)
    console.log(e.target.value)
  };

  const handleChat = async (props) => {
    getConverstationVendor(token, props)
    .then((result) => {
        const res = result?.data
        history.push({
            pathname : '/costumer/list-chats/detail',
            state : { ...res }
         })
    }).catch((err) => {
        console.log(err);
    });
}

  const handleBooking = async (event) => {
    // event.preventDefault();
    let x = document.getElementById("alamat").value;
    if (x == "") {
      alert("alamat must be filled out");
      return false;
    } else if (selectPackets == "[object Object]") {
      alert("pilih paket must be filled out");
      return false;
    } else if (
      window.confirm("apakah pesanan sudah sesuai ?")
    ) {
      const date = startDate ? formatDateString(startDate.toString()) : "";
      const dataPost = {
        date: date.split(" ")[0],
      };
      checkAppointMent(token, id_vendor, dataPost)
        .then((result) => {
          const res = result;
          if (res.message) {
            let chartState = {
              avatar_vendor: dataProduct?.avatar?.src,
              rating: dataProduct?.average_rating,
              distance: dataProduct?.distance,
              vendor_name: dataProduct?.vendor_name,
              services: dataProduct?.services,
              order_date: date,
              ...formChart,
              packages: JSON.parse(selectPackets),
              location: location.coordinates,
            };
            console.log(chartState);
            history.push({
              pathname: "/costumer/chart-orders",
              state: { chartState },
            });
          } else if (res.error) {
            alert(
              res.error + " " + "Jadwal Fotografer Tidak Tersedia Untuk tanggal tersebut, silahkan pilih tanggal yang lain"
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getListOrders = () => {
    getListOrderVendor(token)
      .then((result) => {
        let res = result?.data;
        if (result?.data) {
          let array = [];
          for (let i = 0; i < res?.length; i++) {
            const elmmnt = res[i];
            if (elmmnt?.order_status == "on-progress") {
              array.push({ ...elmmnt });
            }
          }
          setListOrders(array);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setloading(true);
    getDetailProduct(token, id_vendor)
      .then((result) => {
        const resp = result.data;
        setdataProduct(resp);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
    getListOrders();
    getCurrentLocation();
  }, []);

  

  return (
    <>
      <section className="dark:bg-gray-900 min-h-screen h-full relative w-full">
        <div className="container mx-auto bg-white-100 pt-2">
          {/* <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1> */}
          <div className="">
            <Link to="/costumer/list">
              <button className="p-2 bg-blueGray-600 rounded-lg text-white">
                Kembali
              </button>
            </Link>
          </div>
          <div className="mx-auto justify-between px-6 md:flex md:space-x-6 xl:px-0 mt-3">
            <div className="rounded-lg md:w-12/12">
              <div className="mb-6 rounded-lg p-3 shadow-md sm:justify-start">
                <img
                  src={dataProduct?.portfolios[0]?.image}
                  alt="...."
                  className="w-16 h-32 rounded-lg"
                  style={{ height: 500, width: 600 }}
                />
                <div className="p-5 mt-4 flex-wrap">
                  <div className="row flex">
                    {dataProduct?.portfolios?.slice(0, 5)?.map((v, k) => {
                      return (
                        <div className="mr-3">
                          <img
                            className="object-cover w-32 h-16 rounded-lg lg:w-64 mt-6"
                            src={v.image}
                            alt=".."
                            style={{ width: 100, height: 110 }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="sm:ml-4 sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-blueGray-400">
                      List Paket Tersedia
                    </h2>
                    {/* <p className="mt-1 text-xs text-gray-700">36EU - 4US</p> */}
                  </div>
                </div>
                <div className="mt-4 flex sm:space-y-6 sm:mt-0 sm:block">
                  {dataProduct?.products
                    ?.sort((a, b) => a.id - b.id)
                    ?.map((val, k) => {
                      const mapString = val?.description?.split("\n");
                      return (
                        <div className="items-center border-gray-100 p-3 bg-white-400 shadow-md mb-4 mt-3 rounded-lg">
                          <h2 className="font-bold">{val.name}</h2>
                          <h3>RP. {val.price}</h3>
                          <h4 className="text-red-400 text-sm font-bold mt-2">
                            Deskripsi :{" "}
                          </h4>
                          {mapString.map((v, i) => (
                            <h3 className="text-sm font-semibold text-blueGray-400 mt-1">
                              {v}
                            </h3>
                          ))}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            <div className="mt-6 h-full rounded-lg border bg-white p-5 shadow-md md:mt-0 md:w-1/2">
              <div className="mb-2 flex justify-between">
                <div className="flex">
                  <img
                    className="object-cover w-16 h-16 rounded-lg lg:w-64 mt-4"
                    src={dataProduct?.avatar?.src}
                    alt=".."
                  />
                  <div className="ml-3 row mt-3">
                    <p className="text-gray-700">{dataProduct?.vendor_name}</p>
                    
                    <p className="text-gray-700">
                      Mulai Dari : Rp.{dataProduct?.lowest_price}
                    </p>
                    <div className="flex">
                      <RiStarSFill size={16} className="mr-1" color="#FFC26F" />
                      <h2>
                        {dataProduct?.average_rating}/{dataProduct?.distance}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="row flex">
                  <a
                    href="#pablo"
                    onClick={() => handleAddWhislist(id_vendor)}
                  >
                    <AiFillHeart size={20} className="mr-3 ml-3" />
                  </a>
                  <a href="#pablo"
                    onClick={()=> handleChat(dataProduct.id)}
                  >
                    <BsFillChatFill size={17} className="ml-2" />
                  </a>
                </div>
              </div>
              <div className="border border-solid border-gray-500 mt-1 mb-4"></div>
              <div className="row flex">
                {dataProduct?.services?.map((val, key) => (
                  <h3 className="text-sm text-white p-2 bg-red-400 rounded mr-3">
                    {val?.name}
                  </h3>
                ))}
              </div>
              <div className="border border-solid border-gray-500 mt-4 mb-4"></div>
              <div className="flex justify-between" style={{ width: 450 }}>
                <p className="text-gray-500">{dataProduct?.description}</p>
              </div>
              <hr className="my-4" />
              <label>Pilih Paket</label>
              <DropdwonPackets
                setSelectProject={setSelectPackets}
                ListData={dataProduct?.products}
              />
              <hr className="my-4" />
              <label>Pilih Tanggal</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                filterDate={(date) => {
                  return today< date;
                }}
                excludeDates={[2023-6-25]}
                className="rounded mt-2 w-full"
                format="yyyy-MM-dd"
              />
              <hr className="my-4" />
              <label>Masukan Alamat</label>
              <input
                id="alamat"
                type="text"
                className="mb-3 mt-3 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                name="full_address"
                value={address}
                onChange={(e) => handlCangeForm(e)}
              />
              <div style={{margin:"10px"}}>
          <button
            className="text-sm text-white p-2 bg-blueGray-600 rounded mr-3"
            onClick={geocodeAddress}
          >
            cari
          </button>
          <button
            className="text-sm text-white p-2 bg-blueGray-600 rounded mr-3 "
            onClick={getCurrentLocation}
          >
            lokasi saat ini
          </button>
          
        </div>
              {/* <div style={{height:"500px"}}>
              <MapContainer />
              </div> */}
              

              <MapExample
                props={{
                  lat: currentLocation,
                  long: currentLocation,
                }}
              />
              <hr className="my-4" />
              {/* <div className="flex justify-between">
                                <p className="text-lg font-bold">Total</p>
                                <div className="">
                                    <p className="mb-1 text-lg font-bold">$134.98 USD</p>
                                    <p className="text-sm text-gray-700">including VAT</p>
                                </div>
                            </div> */}
              <button
                className="mt-6 w-full rounded-md bg-blueGray-600 py-1.5 rounded-lg p-3 font-medium text-blue-50 hover:bg-blue-600 text-white"
                type="submit"
                onClick={() => handleBooking()}
                // disabled={selectPackets?.name ? false : true}
              >
                Pesan
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
