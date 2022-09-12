import { Navigate } from "react-router-dom";
import { useAddress, useMetamask, useEditionDrop, useToken } from '@thirdweb-dev/react';

function RequireAuth({ children }) {
    const address = useAddress();
    const editionDrop = useEditionDrop("0xaF44EA1Ea7444DcF975815bBDe877E33cA0A4A6E");
    
    const balance = async() => {
        const balancePre = await editionDrop.balanceOf(address, 0);
        return balancePre
    }

    if (!address) {
        return <Navigate to="/" />;
    } 

    if (!balance().gt(0)) {
        return <Navigate to="/" />;
    }

    return children;
}

export default RequireAuth;