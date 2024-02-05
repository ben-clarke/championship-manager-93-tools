import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Navbar } from "./components/navbar";
import ConvertToCsv from "./routes/convert-to-csv";
import ConvertToData from "./routes/convert-to-data";

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
            <Route path="/" element={<ConvertToCsv />} />
            <Route path="*" element={<ConvertToCsv />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

// TODO - BC | Refresh thing and spinner and length of time now...

// TODO - BC | Team is fine - league and foreign are not...
