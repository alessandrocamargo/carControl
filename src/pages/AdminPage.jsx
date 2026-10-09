import { useEffect, useState } from "react"
import {getVehicles} from "../repositories/vehiclesRepository";
import AddVehicles from "../components/AddVehicles"
export default function AdminPage(){
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        function load() {
            const lista = getVehicles();
            setVehicles(lista);
        }
        load();
    }, []);
    return (
        <>
            <AddVehicles />
            <h1>Admin</h1>
            <p>Quantidade de veiculos: {vehicles.length}</p>
        </>
    )
}