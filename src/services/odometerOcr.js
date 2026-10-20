import { createWorker} from "tesseract.js"
export async function recognizeOdometer(photo) {
    const worker = await createWorker("eng");
    
    try{
        const result = await worker.recognize(photo)
        const text = result.data.text.trim();
        const normalizedText = text.replace(/\s+/g,"");
        if(!/^\d+$/.test(normalizedText)) {
            throw new Error("Não foi possivel identificar uma quilometragem válida.")
        }
        return normalizedText
    } finally {
        await worker.terminate();
    }
}