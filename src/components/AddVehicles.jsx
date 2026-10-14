import { useState } from "react";
import {addVehicle} from "../repositories/vehiclesRepository"
export default function AddVehicle({onVehicleAdded}){
    const [plate, setPlate] = useState("");

    function handleSubmit(event){
        event.preventDefault();

        try{
            const newVehicle = addVehicle(plate);
            onVehicleAdded();
            alert(`Veículo ${newVehicle.plate} cadastrado com sucesso!`);
            setPlate("")
        } catch(error){
            alert(error.message)
        }
    }


    

    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="plate">Placa:</label>
            <input type="text" id="plate" name="txtPlate" placeholder="Digite a placa" value={plate} onChange={(event) => setPlate(event.target.value)} />
            <button name="btnCadastrar" type="submit">Cadastrar</button>
        </form>
    )
}