import { ethers } from "ethers";
import React, { useContext, useMemo } from 'react'
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useAddress, useContract, useNFTBalance, Web3Button } from '@thirdweb-dev/react';

const AragonCreate = () => {

    const address = useAddress();
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();

    const sdk = ThirdwebSDK.fromSigner(signer, "mumbai");
    
    async function createToken() {
        const contractAddress = await sdk.deployer.deployToken({
            name: "My Token",
            primary_sale_recipient: address,
        });
        
        return contractAddress
    }

    createToken()

    return(
        <div>
            <button>create</button>
        </div>
    )
}

export default AragonCreate;