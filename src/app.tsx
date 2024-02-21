import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Navbar } from "./components/navbar";
import ConvertCsvToExe from "./routes/convert-csv-to-exe";
import ConvertExeToCsv from "./routes/convert-exe-to-csv";
import ConvertToCsv from "./routes/convert-to-csv";
import ConvertToData from "./routes/convert-to-data";
import Home from "./routes/home";

// eslint-disable-next-line global-require
window.Buffer = window.Buffer || require("buffer").Buffer;

function App(): JSX.Element {
  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-dark-gray">
        <Navbar />
        <main>
          <Routes>
            <Route path="/convert-to-data" element={<ConvertToData />} />
            <Route path="/convert-to-csv" element={<ConvertToCsv />} />
            <Route path="/convert-exe-to-csv" element={<ConvertExeToCsv />} />
            <Route path="/convert-csv-to-exe" element={<ConvertCsvToExe />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
