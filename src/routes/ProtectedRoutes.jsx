/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const ProtecteedRoute =({children})=>{
    //recupero el token que lo guarden en el localstorage en el login y register
const token = JSON.parse(localStorage.getItem("user-token")) || null;
console.log("Token:", token);
if (!token  || token.userRole !== "admin" ){
    return <Navigate to={'/auth/login'}/>

}else {
    return children;
}
}

export default ProtecteedRoute;