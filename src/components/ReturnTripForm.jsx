import { useState } from "react";

export default function ReturnTripForm({ initialMileage, onSubmitReturn, initialData }){
     const [finalMileage, setFinalMileage] = useState(initialData?.finalMileage ?? "");
    
    function handleSubmit(event){
        event.preventDefault()
        const mileage = Number(finalMileage);

        if(finalMileage === ""){
            alert("Informe a quilometragem final.");
            return;
        }

        if (!Number.isInteger(mileage) || mileage < 0){
            alert("KM final invalida");
            return;
        }

        if(mileage < initialMileage){
            alert("A quilometragem final não pode ser menor que a inicial.");
            return;
        }

        onSubmitReturn({
            finalMileage: mileage
        })
    }

    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="finalMileage">KM Final: </label>
            <input type="number" min="0" step="1" id="finalMileage" value={finalMileage}  onChange={(event) => setFinalMileage(event.target.value)} placeholder="Digite a KM Final" />
            <button type="submit">Conferir Retorno</button>
        </form>
    )
}