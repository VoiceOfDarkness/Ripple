import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { motion as m } from "framer-motion";

export default function Toast() {
  const message = useSelector((state) => state.uiMessage);

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message.message) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 7000); // hide the toast after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <AnimatePresence mode={show}>
      {show && (
        <m.div
          className={`toast ${
            message.type === "error" ? " bg-rose-700" : "bg-green-500"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p>{message.message}</p>
          {message.description && <p>{message.description}</p>}
        </m.div>
      )}
    </AnimatePresence>
  );
}
