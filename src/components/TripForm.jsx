import { useState } from "react"

export default function TripForm({onSubmitTrip, initialData }){
    const [driverName, setDriverName] = useState(initialData?.driverName??"");
    const [destination, setDestination] = useState(initialData?.destination??"");
    const [initialMileage, setInitialMileage] = useState(initialData?.initialMileage??"");
    

    function handleSubmit(event){
        event.preventDefault();
        const trimmedDriverName = driverName.trim();
        const trimmedDestination = destination.trim();
        const mileage = Number(initialMileage);

        if (trimmedDriverName === "" || trimmedDestination === ""){
            alert("Informe o motorista e o destino")
            return;
        }

        if (initialMileage === ""){
            alert("Obrigatorio preencher a km inicial");
            return;
        }


        if (!Number.isInteger(mileage) || mileage < 0){
            alert("KM inicial invalida");
            return;
        }


        onSubmitTrip({
            driverName: trimmedDriverName,
            destination: trimmedDestination,
            initialMileage: mileage
        })
    }

    return(
        <form onSubmit={handleSubmit} className="trip-form">
            <label htmlFor="driverName">Motorista:</label>
            <input type="text" id="driverName" placeholder="Digite o nome do motorista" value={driverName} onChange={(event) => setDriverName(event.target.value)} />
            <label htmlFor="destination">Destino</label>
            <input type="text" id="destination" placeholder="Digite o destino" value={destination} onChange={(event) => setDestination(event.target.value)} />
            <label htmlFor="initialMileage">KM Inicial</label>
            <input type="number" id="initialMileage" min="0" step="1" value={initialMileage} onChange={(event) => setInitialMileage(event.target.value)} placeholder="Digite a KM inicial" />
            <button type="submit">Conferir dados</button>
        </form>
    )
}