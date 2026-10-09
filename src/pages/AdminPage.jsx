import { useEffect, useState } from "react"
import {getVehicles} from "../repositories/vehiclesRepository";

export default function AdminPage(){
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        async function load() {
            const lista = await getVehicles();
            setVehicles(lista);
        }
        load();
    }, []);
    return (
        <>
            <h1>Admin</h1>
            <p>Quantidade de veiculos: {vehicles.length}</p>
        </>
    )
}