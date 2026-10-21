import { createWorker } from "tesseract.js";

let workerPromise = null;

function getOcrWorker(){
    if(!workerPromise){
        workerPromise = createWorker("eng").catch((error) => {
            workerPromise = null;
            throw error;
        });
    }
    return workerPromise;
}

export async function recognizeOdometer(photo, onStatus = () => {}) {
    onStatus("Preparando o motor OCR...");
    const worker = await getOcrWorker();

        onStatus("Reconhecendo a imagem...");
        const result = await worker.recognize(photo);

        const text = result.data.text.trim();
        const normalizedText = text
            .replace(/\s+/g, "")
            .replace(/[.,]+$/, "");

        if (!/^\d+$/.test(normalizedText)) {
            throw new Error(
                 "Não foi possível identificar uma quilometragem válida."
                // `OCR bruto: ${JSON.stringify(result.data.text)} | Normalizado: ${JSON.stringify(normalizedText)}`
            );
            
        }

        return normalizedText;
}