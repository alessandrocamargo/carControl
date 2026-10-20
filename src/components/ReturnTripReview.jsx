export default function ReturnTripReview({ returnDraft, initialMileage, onEdit, onConfirm, errorMessage}){
    return(
        <div className="trip-review">
                            <h2>Confira o retorno:</h2>
                            <p>KM Final: {returnDraft.finalMileage} km</p>
                            <p>
                                Distância Percorrida: {" "}
                                {returnDraft.finalMileage - initialMileage} km
                            </p>
                            {
                                errorMessage && (
                                    <p className="form-error" role="alert">{errorMessage}</p>
                                )
                            }
                            <div className="review-actions">
                                <button type="button" className="button-secondary" onClick={onEdit}>Editar retorno</button>
                                <button type="button" className="button-primary" onClick={onConfirm}>Confirmar retorno</button>
                            </div>
                        </div>
    )
}