const OFFICE_LATITUDE = 52.502931;
const OFFICE_LONGITUDE = 13.408249;

const calculateDistance = (latitude, longitude) => {
    const R = 6371;
    const dLat = deg2rad(latitude-OFFICE_LATITUDE);
    const dLon = deg2rad(longitude-OFFICE_LONGITUDE); 
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(OFFICE_LATITUDE)) * Math.cos(deg2rad(latitude)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c;
    return d;
};

const deg2rad = (deg) => {
    return deg * (Math.PI/180);
}

module.exports = {
    calculateDistance: calculateDistance,
};
