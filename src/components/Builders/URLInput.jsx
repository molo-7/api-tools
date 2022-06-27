export default function URLInput({ origin, placeholder, value }) {
  return (
    <div className="flex items-center text-white-500 border border-white-200 rounded-md">
      <div className="px-3 py-2.5 rounded-l-md bg-titlebar border-r cursor-default select-none">
        {origin}
      </div>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        className="w-full p-2.5 ml-2 outline-none text-white-900 placeholder:text-white-200 bg-[transparent]"
      />
    </div>
  );
}
