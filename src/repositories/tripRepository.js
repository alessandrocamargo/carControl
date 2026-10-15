export function getTrips(){
    const storedTrips = localStorage.getItem("trips");

    if (storedTrips === null) {
        return[];
    }

    return JSON.parse(storedTrips);
}

export function getOpenTripByPlate(plate){
    const trips = getTrips();
    
    return trips.find((trip) => trip.plate === plate && trip.status === "open");
}

export function createTrip(tripData){
    const openTrip = getOpenTripByPlate(tripData.plate)
    const trips = getTrips();
    if (openTrip){
        throw new Error("Este veiculo já possui uma viagem aberta");
    }

    const newTrip = {
        id: crypto.randomUUID(),
        plate: tripData.plate,
        driverName: tripData.driverName,
        destination: tripData.destination,
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

export function closeTrip(tripId, finalMileage){
    const trips = getTrips();
    const trip = trips.find((trip) => trip.id === tripId);

    if(!trip){
        throw new Error("Viagem não encontrada");
    }

    if(trip.status !== "open"){
        throw new Error("Esta viagem esta encerrada.");
    }

    if(finalMileage < trip.initialMileage || !Number.isInteger(finalMileage)){
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