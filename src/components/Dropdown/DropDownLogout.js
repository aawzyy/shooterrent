import React from 'react'
import { createPopper } from "@popperjs/core";
import { Link } from "react-router-dom";
import { MdOutlineAccountCircle } from 'react-icons/md';
import { LogOut } from '../../services/enpoint/auth';
import { clearLogin } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function DropDownCotumerLogut() {
  // redux
  const dispatch = useDispatch();
  const { dataUsers, dataToken } = useSelector((state) => state)
  const { login , token} = dataToken?.token
  
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const handleLogut = async () => {
    LogOut(token)
    .then((result) => {
      alert('Anda Berhasil Keluar')
      dispatch(clearLogin())
    }).catch((err) => {
      alert("Gagal Keluar")
    });
  }
  
  return (
    <>
      <a
        className="hover:text-blueGray-500 text-blueGray-700 flex items-center text-xs uppercase font-bold"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <MdOutlineAccountCircle size={30} color="#D9D9D9"/>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        {/* <span
          className={
            "text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
          }
        >
          Settings
        </span> */}
        <Link
          to="#pablo"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          onClick={handleLogut}
        >
          Keluar
        </Link>
      </div>
    </>
  )
}
