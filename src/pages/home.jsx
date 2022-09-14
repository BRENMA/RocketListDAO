import { useAddress, useEditionDrop, useToken } from '@thirdweb-dev/react';
import { useState, useEffect, useMemo } from 'react';
import { toast } from "react-toastify";

const Home = () => {
    const address = useAddress();
    const token = useToken("0x2b300dbe816B01Ce67CE65eb3bC607d6AF129017");

    const shortenAddress = (str) => {
        return str.substring(0, 6) + "..." + str.substring(str.length - 4);
    };

    const editionDrop = useEditionDrop("0xaF44EA1Ea7444DcF975815bBDe877E33cA0A4A6E");
    const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
    const [isClaiming, setIsClaiming] = useState(false);
    const [isAccredited, setIsAccredited] = useState(false);
    const [memberTokenAmounts, setMemberTokenAmounts] = useState([]);
    const [memberAddresses, setMemberAddresses] = useState([]);

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

    
    // This useEffect grabs all the addresses of our members holding our NFT.
    useEffect(() => {
        if (!hasClaimedNFT) {
            return;
        }
    
        // Just like we did in the 7-airdrop-token.js file! Grab the users who hold our NFT
        // with tokenId 0.
        const getAllAddresses = async () => {
            try {
                const memberAddresses = await editionDrop.history.getAllClaimerAddresses(0);
                setMemberAddresses(memberAddresses);
                console.log("🚀 Members addresses", memberAddresses);
            } catch (error) {
                console.error("failed to get member list", error);
            }
        };
        getAllAddresses();
    }, [hasClaimedNFT, editionDrop.history]);
    
    // This useEffect grabs the # of token each member holds.
    useEffect(() => {
        if (!hasClaimedNFT) {
            return;
        }

        const getAllBalances = async () => {
            try {
                const amounts = await token.history.getAllHolderBalances();
                setMemberTokenAmounts(amounts);
                console.log("👜 Amounts", amounts);
            } catch (error) {
                console.error("failed to get member balances", error);
            }
        };
        getAllBalances();
    }, [hasClaimedNFT, token.history]);
    
    // Now, we combine the memberAddresses and memberTokenAmounts into a single array
    const memberList = useMemo(() => {
        return memberAddresses.map((address) => {
        // We're checking if we are finding the address in the memberTokenAmounts array.
        // If we are, we'll return the amount of token the user has.
        // Otherwise, return 0.
        const member = memberTokenAmounts?.find(({ holder }) => holder === address);
    
        return {
            address,
            tokenAmount: member?.balance.displayValue || "",
        }
        });
    }, [memberAddresses, memberTokenAmounts]);

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
                <div>
                    <div>
                    <h2>Member List</h2>
                    <table className="card">
                        <thead>
                            <tr>
                                <th>Address</th>
                                <th>Voting Power</th>
                            </tr>
                        </thead>
                        <tbody>
                            {memberList.map((member) => {
                                return (
                                <tr key={member.address}>
                                    <td>{shortenAddress(member.address)}</td>
                                    <td>{member.tokenAmount}</td>
                                </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    </div>
                </div>
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