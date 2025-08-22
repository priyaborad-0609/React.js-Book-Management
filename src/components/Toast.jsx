import React from "react";
import { motion } from "framer-motion";

export default function Toast({ message }) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow z-50"
    >
      {message}
    </motion.div>
  );
}
