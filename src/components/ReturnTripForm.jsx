import { useState } from "react";

export default function ReturnTripForm({ initialMileage, onSubmitReturn, initialData }){
     const [finalMileage, setFinalMileage] = useState(initialData?.finalMileage ?? "");
     const [errorMessage, setErrorMessage] = useState("");
    
    function handleSubmit(event){
        event.preventDefault()
        const mileage = Number(finalMileage);
        setErrorMessage("");

        if(finalMileage === ""){
            setErrorMessage("Informe a quilometragem final.");
            return;
        }

        if (!Number.isInteger(mileage) || mileage < 0){
            setErrorMessage("KM final invalida");
            return;
        }

        if(mileage < initialMileage){
            setErrorMessage("A quilometragem final não pode ser menor que a inicial.");
            return;
        }

        onSubmitReturn({
            finalMileage: mileage
        })
    }

    return(
        <form className="trip-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="finalMileage">KM Final: </label>
            <input type="number" min="0" step="1" id="finalMileage" value={finalMileage} aria-invalid={Boolean(errorMessage)} aria-describedby={errorMessage ? "finalMileage-error" : undefined}  onChange={(event) => setFinalMileage(event.target.value)} placeholder="Digite a KM Final" />
            {errorMessage &&(
                <p id="finalMileage-error" className="form-error" role="alert">{errorMessage}</p>
            )}
            <button type="submit">Conferir Retorno</button>
        </form>
    )
}