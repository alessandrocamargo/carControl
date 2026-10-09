import normalizePlate, { isValidPlate } from "../utils/plate";

export function  getVehicles() {
    // ler: string -> array
    const texto = localStorage.getItem("vehicles");
    if (texto === null){
        return[];
    }
    return JSON.parse(texto)

}

export function addVehicle(plate){
    const normalizedPlate = normalizePlate(plate);
    const plateIsValid = isValidPlate(normalizedPlate);

    if (!plateIsValid){
        throw new Error ("Placa inválida");
    }

    const vehicles = getVehicles();
    const vehiclesExists = vehicles.some(vehicle => vehicle.plate === normalizedPlate);

    if (vehiclesExists){
        throw new Error("Placa ja cadastrada")
    }
    const newVehicle = {
        id: Date.now(),
        plate: normalizedPlate
    };
    const updatedVehicles = [...vehicles,newVehicle];
    localStorage.setItem("vehicles", JSON.stringify(updatedVehicles));

    return newVehicle
}