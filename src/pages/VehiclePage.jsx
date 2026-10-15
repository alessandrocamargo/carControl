import { useParams } from "react-router-dom";
import normalizePlate, { isValidPlate } from "../utils/plate";
import { getVehicles } from "../repositories/vehiclesRepository";
import TripForm from "../components/TripForm";
import { useState } from "react";
import TripReview from "../components/TripReview";
import { createTrip, getOpenTripByPlate } from "../repositories/tripRepository";
import OpenTrip from "../components/OpenTrip";

export default function VehiclePage(){
    const [tripDraft, setTripDraft] = useState(null);
    const {plate} = useParams();
    const normalizedPlate = normalizePlate(plate);
    const plateIsValid = isValidPlate(normalizedPlate);
    const [isReviewing, setIsReviewing] = useState(false);
    const [openTrip, setOpenTrip] = useState(
        () => getOpenTripByPlate(normalizedPlate)
    );
    

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

    function handleConfirmTrip(){
       try{
            const createdTrip = createTrip({
                ...tripDraft,
                plate: normalizedPlate
            });
            setOpenTrip(createdTrip);
            alert("Saida registrada com sucesso!")
       } catch (error) {
            alert(error.message);
       }
    }
    if(openTrip){
        return (
            <>
                <h1>Veículo: {normalizedPlate}</h1>
                <OpenTrip trip={openTrip} />
            </>
        )
    }

    return(
        <>
            <h1>Veículo: {normalizedPlate}</h1>
            {
                !isReviewing && <TripForm onSubmitTrip={handleSubmitTrip} initialData={tripDraft} />
            }
            
            
            {
               isReviewing  && tripDraft && <TripReview tripDraft={tripDraft} onEdit={() => setIsReviewing(false)} onConfirm={handleConfirmTrip} />
                    

            }
        </>
    )
}