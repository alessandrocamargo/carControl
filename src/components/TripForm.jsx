import { useState, useRef } from "react"

export default function TripForm({onSubmitTrip, initialData }){
    const [driverName, setDriverName] = useState(initialData?.driverName??"");
    const [destination, setDestination] = useState(initialData?.destination??"");
    const [initialMileage, setInitialMileage] = useState(initialData?.initialMileage??"");
    const [errors, setErrors] = useState({});

    const driverNameRef = useRef(null);
    const destinationRef = useRef(null);
    const initialMileageRef = useRef(null);

    function handleSubmit(event){
        event.preventDefault();
        const trimmedDriverName = driverName.trim();
        const trimmedDestination = destination.trim();
        const mileage = Number(initialMileage);
        const nextErrors = {};

        if(trimmedDriverName === ""){
            nextErrors.driverName = "Informe o motorista";
        }

        if(trimmedDestination === ""){
            nextErrors.destination = "Informe o destino";
        }

        if(initialMileage === ""){
            nextErrors.initialMileage = "Informe a quilometragem inicial.";
        } else if (!Number.isInteger(mileage) || mileage <= 0) {
            nextErrors.initialMileage = "Informe um numero inteiro, maior que zero"
        }

        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0){
            if(nextErrors.driverName){
                driverNameRef.current?.focus();
            }
            else if(nextErrors.destination){
                destinationRef.current?.focus();
            }
            else if(nextErrors.initialMileage){
                initialMileageRef.current?.focus();
            }
            return;
        }

        onSubmitTrip({
            driverName: trimmedDriverName,
            destination: trimmedDestination,
            initialMileage: mileage
        })
    }

    return(
        <form onSubmit={handleSubmit} className="trip-form" noValidate>
            <label htmlFor="driverName">Motorista:</label>
            <input type="text" id="driverName" ref={driverNameRef} aria-invalid={Boolean(errors.driverName)} aria-describedby={errors.driverName ? "driverName-error" : undefined} placeholder="Digite o nome do motorista" value={driverName} onChange={(event) => setDriverName(event.target.value)} />
            {errors.driverName &&(
                <p id="driverName-error" className="form-error" role="alert">{errors.driverName}</p>
            )}
            <label htmlFor="destination">Destino</label>
            <input type="text" id="destination" ref={destinationRef} aria-invalid={Boolean(errors.destination)} aria-describedby={errors.destination ? "destination-error" : undefined} placeholder="Digite o destino" value={destination} onChange={(event) => setDestination(event.target.value)} />
            {errors.destination && (
                <p id="destination-error" className="form-error" role="alert">{errors.destination}</p>
            )}
            <label htmlFor="initialMileage">KM Inicial</label>
            <input type="number" id="initialMileage" ref={initialMileageRef} aria-invalid={Boolean(errors.initialMileage)} aria-describedby={errors.initialMileage ? "initialMileage-error" : undefined} min="1" step="1" value={initialMileage} onChange={(event) => setInitialMileage(event.target.value)} placeholder="Digite a KM inicial" />
            {errors.initialMileage && (
                <p id="initialMileage-error" className="form-error" role="alert">{errors.initialMileage}</p>
            )}
            <button type="submit">Conferir dados</button>
        </form>
    )
}