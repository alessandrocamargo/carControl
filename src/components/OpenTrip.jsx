export default function OpenTrip({trip}){
            return (
                <section className="open-trip">
                    <h2>Viagem em andamento</h2>
                    <p>Motorista: {trip.driverName}</p>
                    <p>Destino: {trip.destination}</p>
                    <p>KM Inicial: {trip.initialMileage}</p>
                </section>
            )
}