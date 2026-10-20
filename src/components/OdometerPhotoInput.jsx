import { useRef } from "react";

export default function OdometerPhotoInput(){
    const OdometerPhotoInputRef = useRef(null);

    function handlePhotoChange(event) {
        const file = event.target.files?.[0];
        if(!file){
            return;
        }
        console.log(file);
    }
    return (
        <>
            <button type="button" className="button-secondary" onClick={() => OdometerPhotoInputRef.current?.click()}>Fotografar Odometro</button>
            <input type="file" ref={OdometerPhotoInputRef} hidden accept="image/*" capture="environment" id="odometerInput" onChange={handlePhotoChange} />
        </>
    )
}