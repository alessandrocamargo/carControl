import { useRef, useState, useEffect } from "react";

export default function OdometerPhotoInput() {
    const OdometerPhotoInputRef = useRef(null);

    const [photo, setPhoto] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");

    useEffect(() => {
        if (!photo) {
            setPreviewUrl("");
            return;
        }

        const objectUrl = URL.createObjectURL(photo);
        setPreviewUrl(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [photo]);

    function handlePhotoChange(event) {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }
        setPhoto(file);
    }
    return (
        <>
            <button type="button" className="button-secondary" onClick={() => OdometerPhotoInputRef.current?.click()}>Fotografar Odometro</button>
            <input type="file" ref={OdometerPhotoInputRef} hidden accept="image/*" capture="environment" id="odometerInput" onChange={handlePhotoChange} />
            {
                previewUrl && (
                    <img src={previewUrl} alt="Prévia da fota do odômetro" className="odometer-preview" />
                )
            }
        </>
    )
}