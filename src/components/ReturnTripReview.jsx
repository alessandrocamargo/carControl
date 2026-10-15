export default function ReturnTripReview({ returnDraft, initialMileage, onEdit, onConfirm}){
    return(
        <div>
                            <h2>Confira o retorno:</h2>
                            <p>KM Final: {returnDraft.finalMileage} km</p>
                            <p>
                                Distância Percorrida: {" "}
                                {returnDraft.finalMileage - initialMileage} km
                            </p>
                            <button type="button" onClick={onEdit}>Editar retorno</button>
                            <button type="button" onClick={onConfirm}>Confirmar retorno</button>
                        </div>
    )
}