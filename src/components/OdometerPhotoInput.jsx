import { useRef, useState, useEffect } from "react";
import { recognizeOdometer } from "../services/odometerOcr";

export default function OdometerPhotoInput({ mileage, onMileageChange, mileageInputRef, mileageError }) {
    const photoInputRef = useRef(null);

    const [photo, setPhoto] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [ocrError, setOcrError] = useState("");
    const [ocrStatus, setOcrStatus] = useState("");
    const [showMileageInput, setShowMileageInput] = useState(() => String(mileage ?? "") !== "");

    useEffect(() => {
        if (!photo) {
            setPreviewUrl("");
            return;
        }

        const objectUrl = URL.createObjectURL(photo);
        setPreviewUrl(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [photo]);

    async function handlePhotoChange(event) {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }
        setPhoto(file);
        setShowMileageInput(true)
        setIsProcessing(true);
        setOcrError("");


        try {
            onMileageChange("");

            const text = await recognizeOdometer(file, setOcrStatus);
            onMileageChange(text);
        } catch (error) {
            console.error(error);
            setOcrError(error.message);
        } finally {
            setIsProcessing(false);
        }
    }
    return (
        <>
            <button type="button" className="button-secondary" disabled={isProcessing} onClick={() => photoInputRef.current?.click()}>Fotografar Odometro</button>
            <input type="file" ref={photoInputRef} hidden accept="image/jpeg,image/png" id="odometerInput" onChange={handlePhotoChange} />
            {
                previewUrl && (
                    <img src={previewUrl} alt="Prévia da foto do odômetro" className="odometer-preview" />
                )
            }
            {isProcessing && <p>{ocrStatus || "Iniciando OCR..."}</p>}
            {ocrError && <p role="alert">{ocrError}</p>}
            {!showMileageInput && (
                <button type="button" className="button-secondary" onClick={() => setShowMileageInput(true)}>Informar Km manualmente</button>
            )}
            {showMileageInput && (
                <div>
                    <label htmlFor="initialMileage">KM identificada - confira o valor</label>
                    <input type="text" disabled={isProcessing} ref={mileageInputRef} inputMode="numeric" id="initialMileage" aria-invalid={Boolean(mileageError)} aria-describedby={mileageError ? "initalMileage-error" : undefined} value={mileage} onChange={(event) => onMileageChange(event.target.value)} />
                </div>
            )}
        </>
    )
}