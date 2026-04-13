import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { IoIosCloseCircle } from "react-icons/io";

export default function Modal({ isOpen, onClose, children }) {
  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflowY = "scroll";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflowY = "";
      document.documentElement.style.scrollBehavior = "auto"; //
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
      document.documentElement.style.scrollBehavior = "smooth"; //
    }
  }, [isOpen]);


  if (isOpen === false) return null;
  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center retaltive"

    >
      <div
        className="bg-white no-scrollbar p-4 rounded-2xl relative shadow-md min-w-75 max-h-[calc(100vh-100px)] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <IoIosCloseCircle
          onClick={onClose}
          className="sticky ml-auto top-0 hover:cursor-pointer text-gray-500 hover:text-red-500 size-6"
        />

        {children}
      </div>
    </div>,
    document.body,
  );
}
