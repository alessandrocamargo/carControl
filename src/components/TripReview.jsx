export default function TripReview({tripDraft, onEdit}){
    return(
        <div>
            <h2>Confira os dados</h2>
            <p>Motorista: {tripDraft.driverName}</p>
            <p>Destino: {tripDraft.destination}</p>
            <p>KM Inicial: {tripDraft.initialMileage} Km</p>
            <button type="button" onClick={onEdit}>Editar dados</button>
        </div>
    )
}