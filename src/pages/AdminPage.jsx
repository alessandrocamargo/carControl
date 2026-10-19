import { useEffect, useState } from "react"
import { getVehicles } from "../repositories/vehiclesRepository";
import AddVehicles from "../components/AddVehicles"
import VehicleCard from "../components/VehicleCard";
export default function AdminPage() {
    const [vehicles, setVehicles] = useState([]);

    function handleVehicleAdded() {
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
        <main className="admin-page">
            <h1>Administração de Veiculos</h1>
            <section className="admin-registration">
                <h2>Cadastrar veículo</h2>
                <AddVehicles onVehicleAdded={handleVehicleAdded} />
            </section>
            <p className="vehicle-count">Quantidade de veiculos: {vehicles.length}</p>
            {vehicles.length === 0 && <p className="vehicle-count">Nenhum veiculo Cadastrado</p>}
            <ul className="vehicle-list">
                {vehicles.map((vehicle) => {
                    
                    return (
                        <li key={vehicle.plate}>
                            <VehicleCard vehicle={vehicle} />
                        </li>
                    );
                })}
            </ul>
        </main>
    )
}