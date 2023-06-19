import React from "react";
import { createPopper } from "@popperjs/core";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const UserDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();

  const { dataUsers, dataToken } = useSelector((state) => state)
  const { login , token} = dataToken?.token
  const { full_name, roles, images } = dataUsers?.userDatas

  // console.log(dataUsers);

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="/admin/profile"
        ref={btnDropdownRef}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={images}
            />
          </span>
        </div>
      </a>
    </>
  );
};

export default UserDropdown;
