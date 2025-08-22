import React from "react";
import { motion } from "framer-motion";

export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md"
      >
        {children}
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="px-3 py-2 rounded bg-gray-200">Close</button>
        </div>
      </motion.div>
    </div>
  );
}
