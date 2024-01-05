import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import CssBaseline from "@mui/material/CssBaseline";

import Allstud from "./Component/Student/Allstud";
import Navbar from "./Component/Navbar";
import Addstud from "./Component/Student/Addstud";
import Editstud from "./Component/Student/Editstud";
import Viewstud from "./Component/Student/Viewstud";
import Deletestud from "./Component/Student/Deletestud";

import Alllec from "./Component/Lecturer/Alllec";
import Addlec from "./Component/Lecturer/Addlec";
import Viewlec from "./Component/Lecturer/Viewlec";
import Editlec from "./Component/Lecturer/Editlec";
import Deletelec from "./Component/Lecturer/Deletelec";

import Allmod from "./Component/Module/Allmod";
import Editmod from "./Component/Module/Editmod";
import Deletemod from "./Component/Module/Deletemod";
import Addmod from "./Component/Module/Addmod";
import Viewmod from "./Component/Module/Viewmod";
import LecMaterial from "./Component/LecMaterial";
import ModSubmission from "./Component/ModSubmission";
import Login from "./pages/Login/LoginPage";
import StudModSubmission from "./Component/StudModSubmission";

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <h1>React APP</h1>
        <Navbar />
        <Routes>
          <Route path="/student/" element={<Allstud />} />
          <Route path="/student/addstud" element={<Addstud />} />
          <Route path="/student/editstud/:id" element={<Editstud />} />
          <Route path="/student/viewstud/:id" element={<Viewstud />} />
          <Route path="/student/deletestud/:id" element={<Deletestud />} />

          <Route path="/lecturer/" element={<Alllec />} />
          <Route path="/lecturer/addlec" element={<Addlec />} />
          <Route path="/lecturer/viewlec/:id" element={<Viewlec />} />
          <Route path="/lecturer/editlec/:id" element={<Editlec />} />
          <Route path="/lecturer/deletelec/:id" element={<Deletelec />} />

          <Route path="/module/" element={<Allmod />} />
          <Route path="module/addmod" element={<Addmod />} />
          <Route path="/module/viewmod/:id" element={<Viewmod />} />
          <Route path="/module/editmod/:id" element={<Editmod />} />
          <Route path="/module/deletemod/:id" element={<Deletemod />} />

          <Route path="/file/" element={<LecMaterial />} />
          <Route path="/modulefile/" element={<ModSubmission />} />
          <Route path="/studentfile/" element={<StudModSubmission />} />

          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
