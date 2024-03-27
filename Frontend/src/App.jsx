import { Route, Routes } from "react-router-dom"
import Pocetna from "./pages/Pocetna"
import { RoutesNames } from "./constants"
import NavBar from "./components/NavBar"
import Piloti from "./pages/piloti/Piloti"
import PilotiDodaj from "./pages/piloti/PilotiDodaj"
import PilotiPromjeni from "./pages/piloti/PilotiPromjeni"
import Zrakoplovi from "./pages/zrakoplovi/Zrakoplovi"
import ZrakoploviDodaj from "./pages/zrakoplovi/ZrakoploviDodaj"
import ZrakoploviPromjeni from "./pages/zrakoplovi/ZrakoploviPromjeni"
import Letovi from "./pages/letovi/Letovi"
import LetoviDodaj from "./pages/letovi/LetoviDodaj"
import LetoviPromjeni from "./pages/letovi/LetoviPromjeni"

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <>
          <Route path={RoutesNames.HOME} element={<Pocetna />} />
          <Route path={RoutesNames.PILOTI_PREGLED} element={<Piloti />} />
          <Route path={RoutesNames.PILOTI_NOVI} element={<PilotiDodaj />} />
          <Route path={RoutesNames.PILOTI_PROMJENI} element={<PilotiPromjeni />} />
          <Route path={RoutesNames.ZRAKOPLOVI_PREGLED} element={<Zrakoplovi />} />
          <Route path={RoutesNames.ZRAKOPLOVI_NOVI} element={<ZrakoploviDodaj />} />
          <Route path={RoutesNames.ZRAKOPLOVI_PROMJENI} element={<ZrakoploviPromjeni />} />
          <Route path={RoutesNames.LETOVI_PREGLED} element={<Letovi />} />
          <Route path={RoutesNames.LETOVI_NOVI} element={<LetoviDodaj />} />
          <Route path={RoutesNames.LETOVI_PROMJENI} element={<LetoviPromjeni />} />
        </>
      </Routes>
    </>
  )
}

export default App
