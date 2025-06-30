import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Invoice from "./pages/Invoices";
import FormMainan from "./utils/FormMainan"
import "./index.css";


function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:namaToko/:alamat" element={<Home />} />
        <Route path="/:namaToko/:alamat/Invoices" element={<Invoice />} />
        <Route path="/FormMainan" element={<FormMainan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
