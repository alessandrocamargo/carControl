import { useParams } from "react-router-dom";
import normalizePlate, { isValidPlate } from "../utils/plate";
import { getVehicles } from "../repositories/vehiclesRepository";
import TripForm from "../components/TripForm";
import { useState } from "react";


export default function VehiclePage(){
    const [tripDraft, setTripDraft] = useState(null);
    const {plate} = useParams();
    const normalizedPlate = normalizePlate(plate);
    const plateIsValid = isValidPlate(normalizedPlate);
    const [isReviewing, setIsReviewing] = useState(false);
    

    if (!plateIsValid){
        return <p>Placa inválida</p>
    }

    const vehicles = getVehicles();

    const registeredVehicle = vehicles.find((vehicle) => vehicle.plate === normalizedPlate)

    if(!registeredVehicle){
        return <p>Placa não cadastrada</p>
    }

    function handleSubmitTrip(tripData) {
        setTripDraft(tripData);
        setIsReviewing(true);
    }

    return(
        <>
            <h1>Veículo: {normalizedPlate}</h1>
            {
                !isReviewing && <TripForm onSubmitTrip={handleSubmitTrip} initialData={tripDraft} />
            }
            
            
            {
               isReviewing  && tripDraft && ( <div>
                    <h2>Confira os dados</h2>
                    <p>Motorista: {tripDraft.driverName}</p>
                    <p>Destino: {tripDraft.destination}</p>
                    <p>KM Inicial: {tripDraft.initialMileage} Km</p>
                    <button type="button" onClick={() => setIsReviewing(false)}>Editar dados</button>
                </div>)
                    

            }
        </>
    )
}