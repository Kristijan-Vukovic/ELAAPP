import { Route, Routes } from "react-router-dom"
import Pocetna from "./pages/Pocetna"
import { RoutesNames } from "./constants"
import NavBar from "./components/NavBar"
import Piloti from "./pages/piloti/Piloti"

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import PilotiDodaj from "./pages/piloti/PilotiDodaj"

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <>
          <Route path={RoutesNames.HOME} element={<Pocetna />} />
          <Route path={RoutesNames.PILOTI_PREGLED} element={<Piloti />} />
          <Route path={RoutesNames.PILOTI_NOVI} element={<PilotiDodaj />} />
        </>
      </Routes>
    </>
  )
}

export default App
