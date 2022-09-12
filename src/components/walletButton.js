import { useAddress, useMetamask, useDisconnect } from '@thirdweb-dev/react';

const WalletBtn = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnect = useDisconnect();

  return (
    <div>
      {address ? (
        <button onClick={disconnect}>disconnect {address.substring(0, 6) + "..." + address.substring(address.length - 4)}</button>
      ) : (
        <button onClick={connectWithMetamask}>Connect Metamask Wallet</button>
      )}
    </div>
  );
}

export default WalletBtn;