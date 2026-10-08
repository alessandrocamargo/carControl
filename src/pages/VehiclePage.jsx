import { useParams } from "react-router-dom";
import normalizePlate, { isValidPlate } from "../utils/plate";


export default function VehiclePage(){
    const {plate} = useParams();
    const normalizedPlate = normalizePlate(plate);
    const plateIsValid = isValidPlate(normalizedPlate);

    if (!plateIsValid){
        return <p>Placa inválida</p>
    }
    return(
        
        <>
            <h1>Veículo: {normalizedPlate}</h1>
        </>
    )
}