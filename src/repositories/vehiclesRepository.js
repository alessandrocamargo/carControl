export async function  getVehicles() {
    // ler: string -> array
    const texto = localStorage.getItem("vehicles");
    if (texto === null){
        return[];
    }
    return JSON.parse(texto)

}