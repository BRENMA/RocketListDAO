import { useAddress, useMetamask, useDisconnect } from '@thirdweb-dev/react';

const WalletBtn = () => {
    const address = useAddress();
    const connectWithMetamask = useMetamask();
    const disconnect = useDisconnect();

    return (
        <div className='walletConnect'>
            {address ? (
                <button className='button-1' onClick={disconnect}>disconnect {address.substring(0, 6) + "..." + address.substring(address.length - 4)}</button>
            ) : (
                <button className='button-1' onClick={connectWithMetamask}>Connect Metamask Wallet</button>
            )}
        </div>
    );
}

export default WalletBtn;