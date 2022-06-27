import "./LoadingScreen.css";

export default function LoadingScreen() {
  return (
    <div className="left-0 top-0 w-full h-full flex justify-center items-center absolute z-40 bg-[#000000c0]">
      <div className="loader flex gap-3">
        <span className="w-4 h-4 lg:w-6 lg:h-6 rounded-full bg-white-700 animate-bounce"></span>
        <span className="w-4 h-4 lg:w-6 lg:h-6 rounded-full bg-white-700 animate-bounce"></span>
        <span className="w-4 h-4 lg:w-6 lg:h-6 rounded-full bg-white-700 animate-bounce"></span>
      </div>
    </div>
  );
}
