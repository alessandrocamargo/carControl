import { useState } from "react";
import {addVehicle} from "../repositories/vehiclesRepository"
export default function AddVehicle({onVehicleAdded}){
    const [plate, setPlate] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    function handleSubmit(event){
        event.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        try{
            const newVehicle = addVehicle(plate);
            onVehicleAdded();
            setSuccessMessage(`Veículo ${newVehicle.plate} cadastrado com sucesso!`);
            setPlate("")
        } catch(error){
            setErrorMessage(error.message)
        }
    }


    

    return(
        <form className="trip-form" onSubmit={handleSubmit}>
            <label htmlFor="plate">Placa:</label>
            <input type="text" id="plate" name="txtPlate" placeholder="Digite a placa" value={plate} onChange={(event) => setPlate(event.target.value)} aria-invalid={Boolean(errorMessage)} aria-describedby={errorMessage ? "plate-error" : undefined} />
            {errorMessage && (
                <p id="plate-error" className="form-error" role="alert">{errorMessage}</p>
            )}
            <button name="btnCadastrar" type="submit">Cadastrar Veiculo</button>
            {successMessage && (
                <p className="form-success" role="status">{successMessage}</p>
            )}
        </form>
    )
}