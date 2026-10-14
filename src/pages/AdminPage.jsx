import { useEffect, useState } from "react"
import {getVehicles} from "../repositories/vehiclesRepository";
import AddVehicles from "../components/AddVehicles"
export default function AdminPage(){
    const [vehicles, setVehicles] = useState([]);
    
    function handleVehicleAdded(){
        const updatedVehicles = getVehicles();
        setVehicles(updatedVehicles);
    }

    useEffect(() => {
        function load() {
            const lista = getVehicles();
            setVehicles(lista);
        }
        load();
    }, []);
    return (
        <>
            <AddVehicles onVehicleAdded={handleVehicleAdded} />
            <h1>Admin</h1>
            <p>Quantidade de veiculos: {vehicles.length}</p>
            {vehicles.length === 0 && <p>Nenhum veiculo Cadastrado</p>}
            <ul>
                {
                   vehicles.map((vehicle) =>(
                        <li key={vehicle.plate}>{vehicle.plate}</li>
                    ))
                }
            </ul>
        </>
    )
}