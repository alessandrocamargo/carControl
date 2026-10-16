import { QRCodeSVG } from "qrcode.react";
export default function VehicleCard({ vehicle }) {
    const vehicleUrl = `${window.location.origin}/veiculo/${vehicle.plate}`;
    return(
        <>
            <p>{vehicle.plate}</p>
            <p>{vehicleUrl}</p>
            <QRCodeSVG value={vehicleUrl} size={160} />
        </>
    )
}