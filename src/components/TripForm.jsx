import { useState } from "react"

export default function TripForm({onSubmitTrip}){
    const [driverName, setDriverName] = useState("");
    const [destination, setDestination] = useState("");

    function handleSubmit(event){
        event.preventDefault();
        const trimmedDriverName = driverName.trim();
        const trimmedDestination = destination.trim();

        if (trimmedDriverName === "" || trimmedDestination === ""){
            alert("Informe o motorista e o destino")
            return;
        }

        onSubmitTrip({
            driverName: trimmedDriverName,
            destination: trimmedDestination
        })
    }

    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="driverName">Motorista:</label>
            <input type="text" id="driverName" placeholder="Digite o nome do motorista" value={driverName} onChange={(event) => setDriverName(event.target.value)} />
            <label htmlFor="destination">Destino</label>
            <input type="text" id="destination" placeholder="Digite o destino" value={destination} onChange={(event) => setDestination(event.target.value)} />
            <button type="submit">Registrar Saida</button>
        </form>
    )
}