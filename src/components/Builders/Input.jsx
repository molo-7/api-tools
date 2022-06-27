import { MutableRefObject } from "react";

/**
 * main input builder
 * @param {object} props
 * @param {string} placeholder - input placeholder
 * @param {string} type - input type
 * @param {string} value - initial value
 * @param {number} min - minimum length
 * @param {number} max - maximum length
 * @param {MutableRefObject} inputRef - reference for the input element
 * @param {function} onKeyUp - on key up event handler
 * @param {string} error - error to display
 */
export default function Input({
  placeholder,
  type,
  value,
  min,
  max,
  inputRef,
  onKeyUp,
  error,
}) {
  return (
    <div className="ml-2">
      <input
        type={type ?? "text"}
        value={value}
        placeholder={placeholder}
        ref={inputRef}
        minLength={min}
        maxLength={max}
        onKeyUp={onKeyUp}
        className={
          "w-full p-2.5 outline-none text-white-900 placeholder:text-white-500 bg-[transparent] border border-white-200 rounded-md" +
          (error ? "  border-danger" : "")
        }
      />

      {error && <div className="text-danger text-sm mt-3">{error}</div>}
    </div>
  );
}
