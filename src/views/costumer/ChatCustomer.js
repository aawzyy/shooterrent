import React, { useEffect, useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import { Link, useHistory } from "react-router-dom";
import {
  getConverstationVendor,
  getListChatVendor,
} from "../../services/enpoint/costumer";
import { useDispatch, useSelector } from "react-redux";
import { DateFormat } from "../../utils/date-format";

export default function ChatCustomer() {
  const [ListChats, setListChats] = useState([]);

  const history = useHistory();
  // redux
  const dispatch = useDispatch();
  const { dataUsers, dataToken } = useSelector((state) => state);
  const { login, token } = dataToken?.token;

  const getListChat = () => {
    getListChatVendor(token)
      .then((result) => {
        let arrayMes = [];
        const resp = result.data;
        for (let i = 0; i < resp.length; i++) {
          const element = resp[i];
          arrayMes.push({ ...element });
        }
        setListChats(arrayMes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getListChat();
  }, []);

  const handleCheck = async (props) => {
    const params = {
      conversation_id: props,
    };
    // console.log(params);
    setTimeout(() => {
      history.push({
        pathname: "/costumer/list-chats/detail",
        state: { ...params },
      });
    }, 100);
  };

  return (
    <>
      <section className="dark:bg-gray-900 min-h-screen h-full relative w-full">
        <div className="container mx-auto px-6">
          <div className="flex-auto px-8 lg:px-10 py-6 pt-0">
            <h1 className="text-3xl text-center font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">Obrolan Anda</h1>
            <div className="flex flex-wrap">
              {ListChats.map((val, k) => {
                return (
                  <Link
                    to="#pablo"
                    onClick={() =>
                      handleCheck(val?.last_message?.conversation_id)
                    }
                    className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500"
                  >
                    <a href="#pablo" key={k}>
                      <div className="flex justify-between p-4 rounded-lg bg-white shadow-indigo-50 shadow-md">
                        <div className="flex justify-between">
                          {/* <MdAccountCircle size={50} className='mt-4'/> */}
                          <div className="items-center flex">
                            <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
                              <img
                                alt="..."
                                className="w-full rounded-full align-middle border-none shadow-lg"
                                src={val?.recipient?.avatar?.src}
                              />
                            </span>
                          </div>
                          <div className="ml-3">
                            <h4 className="mt-4 text-lg font-bold text-red-500 text-left">
                              {val?.recipient?.name}
                            </h4>
                            <p className="text-sm font-semibold text-gray-400 mt-1">
                              {val?.last_message?.message}
                            </p>
                          </div>
                        </div>
                        <div
                          className="shadow-2xl justify-center items-center"
                          style={{ marginTop: 50 }}
                        >
                          <h3 className="mt-2 text-sm font-bold text-red-500 text-left">
                            {DateFormat(val?.last_message?.created_at)}
                          </h3>
                        </div>
                      </div>
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
