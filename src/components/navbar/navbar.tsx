import { Link } from "react-router-dom";
import { NAV_CSV, NAV_DAT, NAV_EXE, NAV_EXE_CSV, NAV_HEADING } from "src/constants/strings";
import { GitHub } from "../icons";

const NavBar = (): JSX.Element => (
  <nav className="bg-dark-gray text-white border-gray-300 border-b-2">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          {NAV_HEADING}
        </span>
      </div>
      <button
        data-collapse-toggle="navbar-default"
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
      <div className="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
          <li>
            <Link
              to="/convert-to-csv"
              className="block py-2 px-3 text-gray-300 rounded hover:text-gray-100 md:hover:bg-transparent md:border-0  md:p-0"
            >
              {NAV_CSV}
            </Link>
          </li>
          <li>
            <a
              href="/convert-to-data"
              className="block py-2 px-3 text-gray-300 rounded hover:text-gray-100 md:hover:bg-transparent md:border-0  md:p-0"
            >
              {NAV_DAT}
            </a>
          </li>
          <li>
            <a
              href="/convert-exe-to-csv"
              className="block py-2 px-3 text-yellow-300 rounded hover:text-gray-100 md:hover:bg-transparent md:border-0  md:p-0"
            >
              {NAV_EXE_CSV}
            </a>
          </li>
          <li>
            <a
              href="/convert-csv-to-exe"
              className="block py-2 px-3 text-yellow-300 rounded hover:text-gray-100 md:hover:bg-transparent md:border-0  md:p-0"
            >
              {NAV_EXE}
            </a>
          </li>
          <li>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <a
              href="https://github.com/ben-clarke/championship-manager-93-tools"
              className="block py-2 px-3 text-gray-300 rounded hover:text-gray-100 md:hover:bg-transparent md:border-0  md:p-0"
              target="_blank"
              rel="noreferrer"
            >
              <div className="w-6 h-6">
                <GitHub />
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default NavBar;
