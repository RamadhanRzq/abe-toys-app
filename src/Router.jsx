import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import "./index.css";


function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:namaToko/:alamat" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
