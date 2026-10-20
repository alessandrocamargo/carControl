import { useParams } from "react-router-dom";
import normalizePlate, { isValidPlate } from "../utils/plate";
import { getVehicles } from "../repositories/vehiclesRepository";
import TripForm from "../components/TripForm";
import { useState, useEffect } from "react";
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
    const [departureError, setDepartureError] = useState("");
    const [returnError, setReturnError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect (() => {
        if(!successMessage){
            return;
        }

        const timeoutId = setTimeout(() => {
           setSuccessMessage(""); 
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, [successMessage]);

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
        setDepartureError("");
        setSuccessMessage("");
    }

    function handleConfirmTrip() {
        setDepartureError("");
        setSuccessMessage("");
        try {
            const createdTrip = createTrip({
                ...tripDraft,
                plate: normalizedPlate
            });
            setOpenTrip(createdTrip);
            setSuccessMessage("Saída registrada com sucesso!");
        } catch (error) {
            setDepartureError(error.message);
        }
    }

    function handleSubmitReturn(returndata) {
        setReturnDraft(returndata);
        setIsReviewingReturn(true);
        setReturnError("");
        setSuccessMessage("");
    }

    function handleConfirmReturn() {
        setReturnError("");
        setSuccessMessage("");
        try {
            closeTrip(openTrip.id, returnDraft.finalMileage);

            setOpenTrip(null);
            setReturnDraft(null);
            setIsReviewingReturn(false);
            setTripDraft(null);
            setIsReviewing(false);

            setSuccessMessage("Retorno registrado com sucesso!");
        } catch (error) {
            setReturnError(error.message);
        }
    }

    if (openTrip) {
        return (
            <main className="vehicle-page">
                <h1>Veiculo: {normalizedPlate}</h1>
                {
                    successMessage && (
                        <p className="form-success">{successMessage}</p>
                    )
                }
                <OpenTrip trip={openTrip} />
                {
                    !isReviewingReturn && (
                        <ReturnTripForm initialMileage={openTrip.initialMileage} initialData={returnDraft} onSubmitReturn={handleSubmitReturn} />
                    )
                }
                {
                    isReviewingReturn && returnDraft && (
                        <ReturnTripReview returnDraft={returnDraft} initialMileage={openTrip.initialMileage} onEdit={() => setIsReviewingReturn(false)} errorMessage={returnError} onConfirm={handleConfirmReturn} />
                    )
                }
            </main>
        )
    }

    return (
        <main className="vehicle-page">
            <h1>Veículo: {normalizedPlate}</h1>
            {
                successMessage && (
                    <p className="form-success">{successMessage}</p>
                )
            }
            {
                !isReviewing && <TripForm onSubmitTrip={handleSubmitTrip} initialData={tripDraft} />
            }


            {
                isReviewing && tripDraft && <TripReview tripDraft={tripDraft} onEdit={() => setIsReviewing(false)} errorMessage={departureError} onConfirm={handleConfirmTrip} />


            }
        </main>
    )
}