import { useAddress, useEditionDrop, useToken } from '@thirdweb-dev/react';
import { useState, useEffect, useMemo } from 'react';
import { toast } from "react-toastify";

const Home = () => {
    const address = useAddress();
    const token = useToken("0x2b300dbe816B01Ce67CE65eb3bC607d6AF129017");

    const shortenAddress = (str) => {
        return str.substring(0, 6) + "..." + str.substring(str.length - 4);
    };

    //Initialize our editionDrop contract
    const editionDrop = useEditionDrop("0xaF44EA1Ea7444DcF975815bBDe877E33cA0A4A6E");
    //State variable for us to know if user has our NFT.
    const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
    // isClaiming lets us easily keep a loading state while the NFT is minting.
    const [isClaiming, setIsClaiming] = useState(false);
    
    const [isAccredited, setIsAccredited] = useState(false)

    useEffect(() => {
        // If they don't have a connected wallet, exit!
        if (!address) {
            return;
        }

        const checkBalance = async () => {
            try {
                const balance = await editionDrop.balanceOf(address, 0);
                if (balance.gt(0)) {
                    setHasClaimedNFT(true);
                    console.log("🌟 this user has a membership NFT!");
                } else {
                    setHasClaimedNFT(false);
                    console.log("😭 this user doesn't have a membership NFT.");
                }
            } catch (error) {
                setHasClaimedNFT(false);
                console.error("Failed to get balance", error);
            }
        };
        checkBalance();
    }, [address, editionDrop]);

    const onValueChange = (e) => {    
        if(e.target.value === "Yes") {
            setIsAccredited(true)
        } else {
            setIsAccredited(false)
        }
    }

    const formSubmit = (e) => {
        e.preventDefault();

        if (!isAccredited) {
            toast.error("You need to be an accredited investor to join RocketListDAO")
        } else {
            mintNft();
        }
    }

    const mintNft = async () => {
        try {
            setIsClaiming(true);
            await editionDrop.claim("0", 1);
            console.log(`🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`);
            setHasClaimedNFT(true);
        } catch (error) {
            setHasClaimedNFT(false);
            console.error("Failed to mint NFT", error);
        } finally {
            setIsClaiming(false);
        }
    };

    if (!address) {
        return (
            <div className="landing">
                <h1>Welcome to RocketListDAO</h1>
                <p>Connect your wallet to continue</p>
            </div>
        );
    }

    if (hasClaimedNFT) {
        return (
            <div className="member-page">
                <h1>DAO Member Page</h1>
                <p>Congratulations on being a member</p>

            </div>
        );
    };

    return (
        <div className="mint-nft">
            <h1>Mint your free RocketListDAO Membership NFT</h1>
            <p>Are you an accredited investor?</p>
            
            <form onSubmit={formSubmit}>
                <div className="radio">
                    <label>
                    <input type="radio" value="Yes" checked={isAccredited} onChange={onValueChange} />
                        Yes
                    </label>
                </div>

                <div className="radio">
                    <label>
                    <input type="radio" value="No" checked={!isAccredited} onChange={onValueChange} />
                        No
                    </label>
                </div>

                <p>Not sure? <a target="_blank" rel="noopener noreferrer" href='https://www.investor.gov/introduction-investing/investing-basics/glossary/accredited-investors'>This SEC site has the full definition</a></p>

                <button type='submit' disabled={isClaiming} >
                    {isClaiming ? "Minting..." : "Mint your NFT"}
                </button>
            </form>
        </div>
    );
}

export default Home;