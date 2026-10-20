import { useRef, useState, useEffect } from "react";
import { recognizeOdometer } from "../services/odometerOcr";

export default function OdometerPhotoInput() {
    const photoInputRef = useRef(null);

    const [photo, setPhoto] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [ocrText, setOcrText] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

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
        setOcrText("");
        setIsProcessing(true);
        try {
            const text  = await recognizeOdometer(file);
            setOcrText(text.trim() || "Nenhum texto identificado.");
            
        } catch (error) {
            console.error("erro ao reconehcer o odometro:", error);
            setOcrText("Não foi possivel ler a imagem. tente outra foto");
        } finally {
            setIsProcessing(false);
        }
    }
    return (
        <>
            <button type="button" className="button-secondary" disabled={isProcessing} onClick={() => photoInputRef.current?.click()}>Fotografar Odometro</button>
            <input type="file" ref={photoInputRef} hidden accept="image/jpeg,image/png"  id="odometerInput" onChange={handlePhotoChange} />
            {
                previewUrl && (
                    <img src={previewUrl} alt="Prévia da foto do odômetro" className="odometer-preview" />
                )
            }
            {isProcessing && <p>Lendo odômetro...</p>}
            {ocrText && <pre>{ocrText}</pre>}
        </>
    )
}