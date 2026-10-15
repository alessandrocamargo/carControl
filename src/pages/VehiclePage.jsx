import { useParams } from "react-router-dom";
import normalizePlate, { isValidPlate } from "../utils/plate";
import { getVehicles } from "../repositories/vehiclesRepository";
import TripForm from "../components/TripForm";
import { useState } from "react";
import TripReview from "../components/TripReview";
import { createTrip, getOpenTripByPlate } from "../repositories/tripRepository";
import OpenTrip from "../components/OpenTrip";
import ReturnTripForm from "../components/ReturnTripForm";

export default function VehiclePage(){
    const [tripDraft, setTripDraft] = useState(null);
    const {plate} = useParams();
    const normalizedPlate = normalizePlate(plate);
    const plateIsValid = isValidPlate(normalizedPlate);
    const [isReviewing, setIsReviewing] = useState(false);
    const [openTrip, setOpenTrip] = useState(
        () => getOpenTripByPlate(normalizedPlate)
    );
    const [returnDraft, setReturnDraft] = useState(null);
    const [isReviewingReturn, setIsReviewingReturn] = useState(false);
    

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

    function handleSubmitReturn(returndata){
        setReturnDraft(returndata);
        setIsReviewingReturn(true);
    }

    if(openTrip){
        return(
            <>
                <h1>Veiculo: {normalizedPlate}</h1>
                <OpenTrip trip={openTrip} />
                {
                    !isReviewingReturn && (
                        <ReturnTripForm initialMileage={openTrip.initialMileage} initialData={returnDraft} onSubmitReturn={handleSubmitReturn} />
                    )
                }
                {
                    isReviewingReturn && returnDraft && (
                        <div>
                            <h2>Confira o retorno:</h2>
                            <p>KM Final: {returnDraft.finalMileage} km</p>
                            <p>
                                Distância Percorrida: {" "}
                                {returnDraft.finalMileage - openTrip.initialMileage} km
                            </p>
                            <button type="button" onClick={() => setIsReviewingReturn(false)}>Editar retorno</button>
                        </div>
                    )
                }
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