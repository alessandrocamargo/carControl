import { useEffect, useState } from "react"
import { getVehicles } from "../repositories/vehiclesRepository";
import AddVehicles from "../components/AddVehicles"
import VehicleCard from "../components/VehicleCard";
import logoLunelli from "../assets/LogoLunelli_branca.svg"
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
        <>
            <header className="admin-header">
                <img src={logoLunelli} alt="Logo Lunelli" />
            </header>
            <main className="admin-page">
                <h1>Administração de Veiculos</h1>
                <section className="admin-registration">
                    <h2>Cadastrar veículo</h2>
                    <AddVehicles onVehicleAdded={handleVehicleAdded} />
                </section>
                <p className="vehicle-count">
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-hidden="true"
                    >
                        <path d="M3 5h12v12H3zM15 10h4l3 4v3h-7" />
                        <circle cx="7" cy="18" r="2" fill="white" />
                        <circle cx="18" cy="18" r="2" fill="white" />
                    </svg>
                    <span>Veículos cadastrados</span>
                    <strong>{vehicles.length}</strong>
                </p>
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
        </>
    )
}