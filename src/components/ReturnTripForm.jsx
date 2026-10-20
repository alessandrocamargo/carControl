import { useState, useRef } from "react";

export default function ReturnTripForm({ initialMileage, onSubmitReturn, initialData }){
     const [finalMileage, setFinalMileage] = useState(initialData?.finalMileage ?? "");
     const [errorMessage, setErrorMessage] = useState("");

     const finalMileageRef = useRef(null);
    
    function handleSubmit(event){
        event.preventDefault()
        const mileage = Number(finalMileage);
        setErrorMessage("");

        if(finalMileage === ""){
            setErrorMessage("Informe a quilometragem final.");
            finalMileageRef.current?.focus();
            return;
        }

        if (!Number.isInteger(mileage) || mileage < 0){
            setErrorMessage("KM final invalida");
            finalMileageRef.current?.focus();
            return;
        }

        if(mileage < initialMileage){
            setErrorMessage("A quilometragem final não pode ser menor que a inicial.");
            finalMileageRef.current?.focus();
            return;
        }
        
        onSubmitReturn({
            finalMileage: mileage
        })
    }

    return(
        <form className="trip-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="finalMileage">KM Final: </label>
            <input type="number" min="0" step="1" ref={finalMileageRef} id="finalMileage" value={finalMileage} aria-invalid={Boolean(errorMessage)} aria-describedby={errorMessage ? "finalMileage-error" : undefined}  onChange={(event) => setFinalMileage(event.target.value)} placeholder="Digite a KM Final" />
            {errorMessage &&(
                <p id="finalMileage-error" className="form-error" role="alert">{errorMessage}</p>
            )}
            <button type="submit" className="button-primary">Conferir Retorno</button>
        </form>
    )
}