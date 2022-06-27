import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";

export default function Sidebar() {
  const location = useLocation();
  const [path, setPath] = useState("/");
  const workspace = useSelector((state) => state.workspace);

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  return (
    <div className="flex flex-col items-start h-full w-16 p-4 bg-titlebar">
      <div className="relative after:w-full after:h-[1px] after:bg-white-200 after:absolute after:top-10">
        <img src={logo} alt="logo" className="w-6 h-6" draggable="false" />
      </div>

      <nav className="mt-14 flex flex-col h-28 justify-between">
        <Link
          to="/"
          className={
            path === "/"
              ? "text-white-200 cursor-default"
              : "text-white-700" +
                " relative cursor-pointer hover:after:absolute hover:after:bg-dark hover:after:p-2 hover:after:content-['Home'] hover:after:-top-2 hover:after:left-12 hover:after:text-white-700"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </Link>
        <Link
          to="/workspaces"
          href="#"
          className={
            path === "/workspaces"
              ? "text-white-200 cursor-default"
              : "text-white-700" +
                " relative cursor-pointer hover:after:absolute hover:after:bg-dark hover:after:p-2 hover:after:content-['Workspaces'] hover:after:-top-2 hover:after:left-12 hover:after:text-white-700"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 448 512"
            fill="currentColor"
          >
            <path d="M176 448C167.3 448 160 455.3 160 464V512h32v-48C192 455.3 184.8 448 176 448zM272 448c-8.75 0-16 7.25-16 16s7.25 16 16 16s16-7.25 16-16S280.8 448 272 448zM164 172l8.205 24.62c1.215 3.645 6.375 3.645 7.59 0L188 172l24.62-8.203c3.646-1.219 3.646-6.375 0-7.594L188 148L179.8 123.4c-1.215-3.648-6.375-3.648-7.59 0L164 148L139.4 156.2c-3.646 1.219-3.646 6.375 0 7.594L164 172zM336.1 315.4C304 338.6 265.1 352 224 352s-80.03-13.43-112.1-36.59C46.55 340.2 0 403.3 0 477.3C0 496.5 15.52 512 34.66 512H128v-64c0-17.75 14.25-32 32-32h128c17.75 0 32 14.25 32 32v64h93.34C432.5 512 448 496.5 448 477.3C448 403.3 401.5 340.2 336.1 315.4zM64 224h13.5C102.3 280.5 158.4 320 224 320s121.8-39.5 146.5-96H384c8.75 0 16-7.25 16-16v-96C400 103.3 392.8 96 384 96h-13.5C345.8 39.5 289.6 0 224 0S102.3 39.5 77.5 96H64C55.25 96 48 103.3 48 112v96C48 216.8 55.25 224 64 224zM104 136C104 113.9 125.5 96 152 96h144c26.5 0 48 17.88 48 40V160c0 53-43 96-96 96h-48c-53 0-96-43-96-96V136z" />
          </svg>
        </Link>
        <Link
          to={
            workspace.id
              ? `/workspaces/${
                  workspace.id + (workspace.route ? "/" + workspace.route : "")
                }/history`
              : "/history"
          }
          className={
            path.endsWith("/history")
              ? "text-white-200 cursor-default"
              : "text-white-700" +
                " relative cursor-pointer hover:after:absolute hover:after:bg-dark hover:after:p-2 hover:after:content-['History'] hover:after:-top-2 hover:after:left-12 hover:after:text-white-700"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 512 512"
            fill="currentColor"
          >
            <path d="M256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C201.7 512 151.2 495 109.7 466.1C95.2 455.1 91.64 436 101.8 421.5C111.9 407 131.8 403.5 146.3 413.6C177.4 435.3 215.2 448 256 448C362 448 448 362 448 256C448 149.1 362 64 256 64C202.1 64 155 85.46 120.2 120.2L151 151C166.1 166.1 155.4 192 134.1 192H24C10.75 192 0 181.3 0 168V57.94C0 36.56 25.85 25.85 40.97 40.97L74.98 74.98C121.3 28.69 185.3 0 255.1 0L256 0zM256 128C269.3 128 280 138.7 280 152V246.1L344.1 311C354.3 320.4 354.3 335.6 344.1 344.1C335.6 354.3 320.4 354.3 311 344.1L239 272.1C234.5 268.5 232 262.4 232 256V152C232 138.7 242.7 128 256 128V128z" />
          </svg>
        </Link>
      </nav>
    </div>
  );
}
