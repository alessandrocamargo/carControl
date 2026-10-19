import { QRCodeSVG } from "qrcode.react";
export default function VehicleCard({ vehicle }) {
    const vehicleUrl = `${window.location.origin}/veiculo/${vehicle.plate}`;
    return(
        <div className="vehicle-card">
            <h2 className="vehicle-card-plate">{vehicle.plate}</h2>
            <p className="vehicle-car-url">{vehicleUrl}</p>
            <QRCodeSVG value={vehicleUrl} size={160} />
        </div>
    )
}