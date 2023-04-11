import React from "react";
import ReactDOM from "react-dom/client";
import "remixicon/fonts/remixicon.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import { BrowserRouter ,Routes, Route} from "react-router-dom";
// import Login from './Login';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    {/* <Routes>
      <Route path="/login" element={<Login/>}/>
    </Routes> */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
