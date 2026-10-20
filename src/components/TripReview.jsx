export default function TripReview({tripDraft, onEdit, onConfirm, errorMessage}){
    return(
        <div className="trip-review">
            <h2>Confira os dados</h2>
            <p>Motorista: {tripDraft.driverName}</p>
            <p>Destino: {tripDraft.destination}</p>
            <p>KM Inicial: {tripDraft.initialMileage} Km</p>
            {errorMessage && (
                <p className="form-error" role="alert">{errorMessage}</p>
            )}
            <div className="review-actions">
                <button type="button" className="button-secondary" onClick={onEdit}>Editar dados</button>
                <button type="button" className="button-primary" onClick={onConfirm}>Confirmar Saida</button>
            </div>
        </div>
    )
}