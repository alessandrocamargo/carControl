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