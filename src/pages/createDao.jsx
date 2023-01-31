import AragonCreate from "./aragonCreate";
import WalletBtn from "../components/walletButton";

const CreateDao = () => {
    return (
        <div className="daoPage">
            <WalletBtn />
            <br />
            <AragonCreate />
        </div>
    )
}

export default CreateDao;