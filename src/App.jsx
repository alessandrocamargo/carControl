import { Routes, Route } from "react-router-dom"
import AdminPage from "./pages/AdminPage"
import VehiclePage from "./pages/VehiclePage"
import NotFoundPage from "./pages/NotFoundPage"

function App() {
  
  return (
    <>
      <Routes>
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/veiculo/:plate' element={<VehiclePage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
