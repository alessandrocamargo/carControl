import { createWorker } from "tesseract.js";

export async function recognizeOdometer(photo, onStatus = () => {}) {
    onStatus("Preparando o motor OCR...");
    const worker = await createWorker("eng");

    try {
        onStatus("Reconhecendo a imagem...");
        const result = await worker.recognize(photo);

        const text = result.data.text.trim();
        const normalizedText = text
            .replace(/\s+/g, "")
            .replace(/[.,]+$/, "");

        if (!/^\d+$/.test(normalizedText)) {
            throw new Error(
                "Não foi possível identificar uma quilometragem válida."
            );
        }

        return normalizedText;
    } finally {
        onStatus("Finalizando o OCR...");
        await worker.terminate();
    }
}