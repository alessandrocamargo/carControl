import { useParams } from "react-router-dom";
import normalizePlate, { isValidPlate } from "../utils/plate";
import { getVehicles } from "../repositories/vehiclesRepository";
import TripForm from "../components/TripForm";
import { useState } from "react";
import TripReview from "../components/TripReview";


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
               isReviewing  && tripDraft && <TripReview tripDraft={tripDraft} onEdit={() => setIsReviewing(false)} />
                    

            }
        </>
    )
}