import React from 'react';
import { GrSecure, } from "react-icons/gr";

function ModalForgot({ isOpen, onClose }) {
  return (
    <div className={`absolute fixed inset-0 flex items-center justify-center ${isOpen ? '' : 'hidden'} relative z-index-999 z-50`}>
        <div className="inset-0 bg-black opacity-50"></div>
        <div className="bg-white p-6 rounded shadow-md w-1/2 h-48 text-center">
            <GrSecure size={30} className='items-center'/>
            <h2 className="text-xl font-bold mb-4">Modal Title</h2>
            <p>Modal content goes here...</p>
            <div className="mt-6 flex justify-end">
            <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={onClose}
            >
                Close
            </button>
            </div>
      </div>
    </div>
  );
}

export default ModalForgot;
