export function getTrips() {
    const storedTrips = localStorage.getItem("trips");

    if (storedTrips === null) {
        return [];
    }

    let trips;

    try{
        trips = JSON.parse(storedTrips)
    } catch {
        throw new Error("Não foi possivel ler os dados de viagens armazenados")
    }

    if(!Array.isArray(trips)){
        throw new Error("Os dados de viagens armazenados não são uma lista")
    }

    return trips;
}

export function getOpenTripByPlate(plate) {
    const trips = getTrips();

    return trips.find((trip) => trip.plate === plate && trip.status === "open");
}

export function createTrip(tripData) {
    const trips = getTrips();
    const driverName = tripData.driverName.trim();
    const destination = tripData.destination.trim();
    const openTrip = getOpenTripByPlate(tripData.plate);
    if (!Number.isInteger(tripData.initialMileage) || tripData.initialMileage < 0) {
        throw new Error("Quilometragem inicial inválida.");
    }

    if (driverName === "" || destination === "") {
        throw new Error("Informe o Motorista e ou Destino")
    }

    if (openTrip) {
        throw new Error("Este veiculo já possui uma viagem aberta");
    }

    const newTrip = {
        id: crypto.randomUUID(),
        plate: tripData.plate,
        driverName: driverName,
        destination: destination,
        initialMileage: tripData.initialMileage,
        departureAt: new Date().toISOString(),
        finalMileage: null,
        returnedAt: null,
        status: "open"
    }
    const updatedTrips = [...trips, newTrip];
    localStorage.setItem("trips", JSON.stringify(updatedTrips));
    return newTrip

}

export function closeTrip(tripId, finalMileage) {
    const trips = getTrips();
    const trip = trips.find((trip) => trip.id === tripId);

    if (!trip) {
        throw new Error("Viagem não encontrada");
    }

    if (trip.status !== "open") {
        throw new Error("Esta viagem esta encerrada.");
    }

    if (finalMileage < trip.initialMileage || !Number.isInteger(finalMileage)) {
        throw new Error("Quilometragem final invalida")
    }

    const closedTrip = {
        ...trip,
        finalMileage: finalMileage,
        returnedAt: new Date().toISOString(),
        status: "closed"
    }

    const updatedTrips = trips.map((trip) => trip.id === tripId ? closedTrip : trip)
    localStorage.setItem("trips", JSON.stringify(updatedTrips))
    return closedTrip;
}