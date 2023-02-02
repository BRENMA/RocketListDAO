import StepsToCreate from "./stepsToCreate";
import WalletBtn from "../components/walletButton";
import LaunchDaoHeader from '../components/launchDaoHeader';


const CreateDao = () => {
    return (
        <div className="daoPage">
            <WalletBtn />
            <LaunchDaoHeader />
            <StepsToCreate />
        </div>
    )
}

export default CreateDao;