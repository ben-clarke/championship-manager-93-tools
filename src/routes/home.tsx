import clsx from "clsx";
import { Link } from "react-router-dom";
import {
  HOME_CONVERT_DAT_TO_CSV,
  HOME_CONVERT_EXE_TO_CSV,
  HOME_DAT_EDITING,
  HOME_DAT_EDITING_NOTE,
  HOME_EXE_EDITING,
  HOME_EXE_EDITING_NOTE,
  HOME_FLOW,
  HOME_FLOWS,
  HOME_HEADER,
  HOME_INTRO,
  HOME_NOT_SUPPORTED,
  HOME_NOT_SUPPORTED_VERSION,
  HOME_REVERT_DAT_FROM_CSV,
  HOME_REVERT_EXE_FROM_CSV,
  HOME_SUPPORTED,
  HOME_SUPPORTED_VERSION,
} from "../constants/strings";

const Home = (): JSX.Element => (
  <div className="text-center bg-dark-gray text-white flex flex-wrap items-center justify-center">
    <div className="flex flex-wrap items-center justify-center w-full">
      <div className="w-4/6 text-sm pl-8 pr-4 text-justify text-gray-400 font-medium my-8">
        <h1 className="text-xl mb-6 text-gray-200">{HOME_HEADER}</h1>
        <p className="mb-4">{HOME_INTRO}</p>
        <p className="mb-2">{HOME_SUPPORTED}</p>
        <ul className="list-disc px-8 text-left mb-4">
          {HOME_SUPPORTED_VERSION.map((v) => (
            <li className="pb-1">{v}</li>
          ))}
        </ul>
        <p className="mb-2">{HOME_NOT_SUPPORTED}</p>
        <ul className="list-disc px-8 text-left mb-4">
          {HOME_NOT_SUPPORTED_VERSION.map((v) => (
            <li className="pb-1">{v}</li>
          ))}
        </ul>
        <p className="text-lg text-gray-200">{HOME_DAT_EDITING}</p>
        <p className="mb-2 text-xs">{HOME_DAT_EDITING_NOTE}</p>
        <div className="flex flex-wrap mb-4">
          <Link
            to="/convert-to-csv"
            className={clsx(linkClass, "mr-4 hover:bg-gray-400 bg-gray-300")}
          >
            {HOME_CONVERT_DAT_TO_CSV}
          </Link>
          <Link to="/convert-to-dat" className={clsx(linkClass, "hover:bg-gray-400 bg-gray-300")}>
            {HOME_REVERT_DAT_FROM_CSV}
          </Link>
        </div>
        <p className="text-lg text-gray-200">{HOME_EXE_EDITING}</p>
        <p className="mb-2 text-xs">{HOME_EXE_EDITING_NOTE}</p>
        <div className="flex flex-wrap mb-8">
          <Link
            to="/convert-exe-to-csv"
            className={clsx(linkClass, "mr-4 bg-yellow-300 hover:bg-yellow-500")}
          >
            {HOME_CONVERT_EXE_TO_CSV}
          </Link>
          <Link
            to="/convert-csv-to-exe"
            className={clsx(linkClass, "bg-yellow-300 hover:bg-yellow-500")}
          >
            {HOME_REVERT_EXE_FROM_CSV}
          </Link>
        </div>
        <p className="mb-2">{HOME_FLOW}</p>
        <ol className="list-decimal px-8 text-left">
          {HOME_FLOWS.map((v) => (
            <li className="pb-2">{v}</li>
          ))}
        </ol>
      </div>
    </div>
  </div>
);

const linkClass = "block py-3 px-4 text-dark-gray rounded-xl";

export default Home;
