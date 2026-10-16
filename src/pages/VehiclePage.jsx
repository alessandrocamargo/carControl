import { Link, useParams } from "react-router-dom";
import normalizePlate, { isValidPlate } from "../utils/plate";
import { getVehicles } from "../repositories/vehiclesRepository";
import TripForm from "../components/TripForm";
import { useState } from "react";
import TripReview from "../components/TripReview";
import { createTrip, getOpenTripByPlate, closeTrip } from "../repositories/tripRepository";
import OpenTrip from "../components/OpenTrip";
import ReturnTripForm from "../components/ReturnTripForm";
import ReturnTripReview from "../components/ReturnTripReview";

export default function VehiclePage() {
    const [tripDraft, setTripDraft] = useState(null);
    const { plate } = useParams();
    const normalizedPlate = normalizePlate(plate);
    const plateIsValid = isValidPlate(normalizedPlate);
    const [isReviewing, setIsReviewing] = useState(false);
    const [returnDraft, setReturnDraft] = useState(null);
    const [isReviewingReturn, setIsReviewingReturn] = useState(false);
    const [tripLoadResult] = useState(() => {
        try {
            return {
                trip: getOpenTripByPlate(normalizedPlate),
                error: null
            }
        } catch (error) {
            return {
                trip: null,
                error: error.message
            }
        }
    })
    const [openTrip, setOpenTrip] = useState(tripLoadResult.trip);

    if (tripLoadResult.error) {
        return (
            <>
                <h1>Veículo: {normalizedPlate}</h1>
                <p role="alert">{tripLoadResult.error}</p>
            </>
        );
    }

    if (!plateIsValid) {
        return <p>Placa inválida</p>
    }

    const vehicles = getVehicles();

    const registeredVehicle = vehicles.find((vehicle) => vehicle.plate === normalizedPlate)

    if (!registeredVehicle) {
        return <p>Placa não cadastrada</p>
    }

    function handleSubmitTrip(tripData) {
        setTripDraft(tripData);
        setIsReviewing(true);
    }

    function handleConfirmTrip() {
        try {
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

    function handleSubmitReturn(returndata) {
        setReturnDraft(returndata);
        setIsReviewingReturn(true);
    }

    function handleConfirmReturn() {
        try {
            closeTrip(openTrip.id, returnDraft.finalMileage);

            setOpenTrip(null);
            setReturnDraft(null);
            setIsReviewingReturn(false);
            setTripDraft(null);
            setIsReviewing(false);

            alert("Retorno registrado com sucesso!")
        } catch (error) {
            alert(error.message);
        }
    }

    if (openTrip) {
        return (
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
                        <ReturnTripReview returnDraft={returnDraft} initialMileage={openTrip.initialMileage} onEdit={() => setIsReviewingReturn(false)} onConfirm={handleConfirmReturn} />
                    )
                }
            </>
        )
    }

    return (
        <>
            <h1>Veículo: {normalizedPlate}</h1>
            {
                !isReviewing && <TripForm onSubmitTrip={handleSubmitTrip} initialData={tripDraft} />
            }


            {
                isReviewing && tripDraft && <TripReview tripDraft={tripDraft} onEdit={() => setIsReviewing(false)} onConfirm={handleConfirmTrip} />


            }
        </>
    )
}