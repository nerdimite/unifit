import React from "react";
import Link from "next/link";
// components

import IndexDropdown from "components/Dropdowns/IndexDropdown.js";

export default function WorkoutNavbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className=" bg-slate-700 top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-1.5 navbar-expand-lg shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          {/* <a href="/">
            <img
              src="images/UniFit.png"
              className="w-20 h-20"
              width={25}
              height={25}
            />
          </a> */}
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href="/">
              <a
                className=" text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                href="/"
              >
                UniFit
              </a>
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none mr-auto">
              <li className="flex items-center">
                <a
                  className="hover:text-slate-500 text-white px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="/app"
                >
                  <i className="text-white far fa-file-alt text-lg leading-lg mr-2" />{" "}
                  Dashboard
                </a>
              </li>
            </ul>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              {/* <li className='flex items-center'>
                <IndexDropdown />
              </li> */}
              {/* <li className='flex items-center'>
                <a
                  className='hover:text-slate-500 text-slate-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold'
                  href='#features'
                >
                  <i className='text-slate-400 fab fa-facebook text-lg leading-lg ' />
                  <span className='inline-block ml-2'>Features</span>
                </a>
              </li> */}

              {/* <li className='flex items-center'>
                <a
                  className='hover:text-slate-500 text-slate-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold'
                  href='#team'
                >
                  <i className='text-slate-400 fab fa-twitter text-lg leading-lg ' />
                  <span className=' inline-block ml-2'>Team</span>
                </a>
              </li> */}

              {/* <li className='flex items-center'>
                <a
                  className='hover:text-slate-500 text-slate-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold'
                  href='https://github.com/creativetimofficial/notus-nextjs?ref=nnjs-index-navbar'
                  target='_blank'
                >
                  <i className='text-slate-400 fab fa-github text-lg leading-lg ' />
                  <span className='inline-block ml-2'>Star</span>
                </a>
              </li> */}

              {/* <li className="flex items-center">
                <button
                  className="bg-slate-700 text-white active:bg-slate-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button"
                >
                  <i className="fas fa-arrow-alt-circle-down"></i> Sign Up /
                  Login
                </button>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
