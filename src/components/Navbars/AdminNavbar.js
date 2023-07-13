import React from "react";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineBars } from "react-icons/ai";
import { BsFillChatFill } from "react-icons/bs";
import { MdOutlineAccountCircle } from "react-icons/md";
import { TbShoppingBag } from "react-icons/tb";
import logo from "./../../assets/img/logorent.png";

// components
import IndexDropdown from "../Dropdown/IndexDropDown";
import DropDownCotumerLogut from "../Dropdown/DropDownLogout";
import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "../../services/enpoint/auth";
import { clearLogin } from "../../redux/actions";

import UserDropdown from "../Dropdown/UserDropdown";

export default function Navbar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const dispatch = useDispatch();
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const { dataUsers, dataToken } = useSelector((state) => state);
  const { login, token } = dataToken?.token;
  const { full_name, roles } = dataUsers?.userDatas;

  const handleLogut = async () => {
    LogOut(token)
      .then((result) => {
        alert("Anda Berhasil Keluar");
        dispatch(clearLogin());
      })
      .catch((err) => {
        alert("Gagal Keluar");
      });
  };

  return (
    <>
      <nav
        className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow"
        style={{ height: 80 }}
      >
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <div className="row flex">
              <Link
                to="/costumer"
                className="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4 whitespace-nowrap uppercase"
              >
                <img src={logo} alt="logo a" style={{ width: "190px" }} />
              </Link>
              {/* <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
                  <div className="relative flex w-full flex-wrap items-stretch">
                    <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                      <i className="fas fa-search"></i>
                    </span>
                    <input
                      type="text"
                      placeholder="Search here..."
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                    />
                  </div>
                </form> */}
            </div>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <AiOutlineBars size={20} />
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/dashboard") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/admin/dashboard"
                >
                  <button
                    className="text-black active:bg-blueGray-600 text-xs font-bold uppercase px-4 py-2 rounded hover:shadow-lg outline-none focus:outline-none lg:mb-0 mb-3 ease-linear transition-all duration-150"
                    type="button"
                  >
                    <i
                      className={
                        "fas fa-tv mr-2 text-sm " +
                        (window.location.href.indexOf("/admin/dashboard") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Pesanan
                  </button>
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/chat") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/admin/chat"
                >
                  <button className="text-black active:bg-blueGray-600 text-xs font-bold uppercase px-4 py-2 rounded hover:shadow-lg outline-none focus:outline-none lg:mb-0 mb-3 ease-linear transition-all duration-150"
                    type="button">
                    <i
                      className={
                        "fas fa-table mr-2 text-sm " +
                        (window.location.href.indexOf("/admin/chat") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Pesan
                  </button>
                </Link>
              </li>
              <li className="flex items-center">
              <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/profile") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/admin/profile"
                >
                  <button className="text-black active:bg-blueGray-600 text-xs font-bold uppercase px-4 py-2 rounded hover:shadow-lg outline-none focus:outline-none lg:mb-0 mb-3 ease-linear transition-all duration-150"
                    type="button">
                  <i
                    className={
                      "fas fa-tools mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/profile") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Profil
                  </button>
                 
                </Link>
              </li>
              <li className="flex items-center" style={{ marginLeft: 15 }}>
                <h4 className="text-red-700 text-sm font-bold uppercase">
                  {full_name}
                </h4>
              </li>
              <Link to="#pablo">
                <li className="flex items-center">
                  <button
                    className="text-white active:bg-blueGray-600 text-xs font-bold uppercase px-4 py-2 rounded hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                    type="button"
                  >
                    <DropDownCotumerLogut />
                  </button>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
