export default function normalizePlate(plate){
    if (typeof plate !== "string") {
        return "";
    }

    const normalizedPlate = plate.trim().toUpperCase();

    return normalizedPlate;
}

export function isValidPlate(plate) {
    const pattern = /^[A-Z]{3}[0-9]{4}$|^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;

    return pattern.test(plate);
}