import { useRef } from "react";

/**
 * modal builder
 * @param {object} props
 * @param {string} props.title - modal title
 * @param {function} props.closeModalHandler - close modal handler
 */
export default function Modal({ title, closeModalHandler, children }) {
  const modalEle = useRef();

  const clickHandler = (event) => {
    console.log("hello bro?");
    if (
      !event.target.isSameNode(modalEle.current) &&
      !modalEle.current.contains(event.target)
    )
      closeModalHandler(event);
  };

  return (
    <div
      onDoubleClick={clickHandler}
      className="flex justify-center items-center fixed w-full h-full left-0 top-0 bg-[#00000091] z-30"
    >
      <div
        className="bg-dark rounded-lg relative w-4/5 h-[85%] p-4 pb-0 shadow-lg"
        ref={modalEle}
      >
        {/* Close Modal Button */}
        <span
          className="absolute right-5 top-5 cursor-pointer"
          onClick={closeModalHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>

        {/* Modal Title */}
        <h1 className="text-center text-xl mt-3 text-white-900 font-bold select-none">
          {title}
        </h1>

        <div className="overflow-auto p-4 pt-7 h-[90%]">{children}</div>
      </div>
    </div>
  );
}
