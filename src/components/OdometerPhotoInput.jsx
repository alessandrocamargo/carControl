import { useRef, useState, useEffect } from "react";
import { recognizeOdometer } from "../services/odometerOcr";

export default function OdometerPhotoInput({ mileage, onMileageChange, mileageInputRef, mileageError, onProcessingChange }) {
    const photoInputRef = useRef(null);
    const previewImageRef = useRef(null);

    const [photo, setPhoto] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [ocrError, setOcrError] = useState("");
    const [ocrStatus, setOcrStatus] = useState("");
    const [croppedPreviewUrl, setCroppedPreviewUrl] = useState("");
    const [showMileageInput, setShowMileageInput] = useState(() => String(mileage ?? "") !== "");
    const [crop, setCrop] = useState({
        x: 39,
        y: 40.4,
        width: 14.5,
        height: 2.7 ,
    })

    useEffect(() => {
        if (!photo) {
            setPreviewUrl("");
            return;
        }

        const objectUrl = URL.createObjectURL(photo);
        setPreviewUrl(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [photo]);

    useEffect(() => {
        if (mileageError) {
            setShowMileageInput(true);
        }
    }, [mileageError]);

    useEffect(() => {
        if (showMileageInput && mileageError && !isProcessing){
            mileageInputRef.current?.focus();
        }
    }, [showMileageInput, mileageError, isProcessing, mileageInputRef]);

    function createCroppedImage(){
        const image = previewImageRef.current;

        if (!image || !image.complete || !image.naturalWidth){
            throw new Error("Aguarde o carregamento da imagem");
        }

        const sourceX = image.naturalWidth * crop.x / 100;
        const sourceY = image.naturalHeight * crop.y / 100;
        const sourceWidth = image.naturalWidth * crop.width / 100;
        const sourceHeight = image.naturalHeight * crop.height / 100;

        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(sourceWidth));
        canvas.height = Math.max(1, Math.round(sourceHeight));
        const context = canvas.getContext("2d");

    if(!context) {
        throw new Error("Não foi possível preparar o recorte");
    }

    context.drawImage(
        image,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        canvas.width,
        canvas.height
    );
    return canvas.toDataURL("image/png");
    }

    

    function handlePreviewCrop(){
        try {
            setOcrError("");
            const croppedImage = createCroppedImage();
            setCroppedPreviewUrl(croppedImage);
        } catch (error) {
            setOcrError(error.message)
        }
    }

    function handlePhotoChange(event) {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }
        setPhoto(file);
        setCroppedPreviewUrl("");
        event.target.value = "";
        
    }

    async function handleRecognizePhoto() {
        if(!photo || isProcessing){
            return;
        }

        setShowMileageInput(true)
        setIsProcessing(true);
        onProcessingChange(true)
        setOcrError("");

        try {
            onMileageChange("");

            const croppedImage = createCroppedImage();
            setCroppedPreviewUrl(croppedImage);
            const text = await recognizeOdometer(croppedImage, setOcrStatus);
            onMileageChange(text);
        } catch (error) {
            console.error(error);
            setOcrError(error.message);
        } finally {
            setIsProcessing(false);
            onProcessingChange(false);
        }
    }
    return (
        <>
            <button type="button" className="button-secondary" disabled={isProcessing} onClick={() => photoInputRef.current?.click()}>Fotografar Odometro</button>
            <input type="file" ref={photoInputRef} hidden accept="image/jpeg,image/png" id="odometerInput" onChange={handlePhotoChange} />
            {
                previewUrl && (
                    <div className="odometer-crop-area">
                        <img src={previewUrl} ref={previewImageRef} alt="Prévia da foto do odômetro" className="odometer-preview" />
                        <div className="odometer-crop-box" aria-hidden="true" style={{ 
                            left: `${crop.x}%`,
                            top: `${crop.y}%`,
                            width: `${crop.width}%`,
                            height: `${crop.height}%`,
                        }} />
                    </div>
                )
            }
            {
                previewUrl && (
                    <>
                        <label htmlFor="crop-x">Posição horizontal do recorte</label>
                    </>
                )
            }
            {isProcessing && <p>{ocrStatus || "Iniciando OCR..."}</p>}
            {ocrError && <p role="alert">{ocrError}</p>}
            { 
                previewUrl && (
                    <button type="button" className="button-secondary" disabled={isProcessing} onClick={handlePreviewCrop}>Visualizar recorte</button>
                )
            }
            {
                croppedPreviewUrl && (
                    <img src={croppedPreviewUrl} alt="Recorte da Km para conferencia" className="odometer-preview" />
                )
            }
            {
                photo && (
                    <button type="button" className="button-secondary" disabled={isProcessing} onClick={handleRecognizePhoto}>Ler KM</button>
                )
            }
            {!showMileageInput && (
                <button type="button" className="button-secondary" onClick={() => setShowMileageInput(true)}>Informar Km manualmente</button>
            )}
            {showMileageInput && (
                <div>
                    <label htmlFor="initialMileage">KM identificada - confira o valor</label>
                    <input type="text" disabled={isProcessing} ref={mileageInputRef} inputMode="numeric" id="initialMileage" aria-invalid={Boolean(mileageError)} aria-describedby={mileageError ? "initialMileage-error" : undefined} value={mileage} onChange={(event) => onMileageChange(event.target.value)} />
                </div>
            )}
        </>
    )
}