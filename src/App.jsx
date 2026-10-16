import { Routes, Route, useParams } from "react-router-dom"
import AdminPage from "./pages/AdminPage"
import VehiclePage from "./pages/VehiclePage"
import NotFoundPage from "./pages/NotFoundPage"

function VehicleRoute(){
  const { plate } = useParams();

  return <VehiclePage key={plate} />
}

function App() {
  
  return (
    <>
      <Routes>
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/veiculo/:plate' element={<VehicleRoute />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
