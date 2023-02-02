import { useAddress, useContract, useNFTBalance, Web3Button } from '@thirdweb-dev/react';
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

const Home = () => {
    const address = useAddress();
    //const token = useToken("");
    //const vote = useVote("");
    const editionDropAddress = "0x7aA9d078DD610cC9FF6e383612Af874f02E76f17"

    const shortenAddress = (str) => {
        return str.substring(0, 6) + "..." + str.substring(str.length - 4);
    };

    const { contract: editionDrop } = useContract(editionDropAddress, "edition-drop");
    const { data: nftBalance } = useNFTBalance(editionDrop, address, "0")

    const hasClaimedNFT = useMemo(() => {
        return nftBalance && nftBalance.gt(0)
    }, [nftBalance])
    
    const [isAccredited, setIsAccredited] = useState(false);
    const [memberTokenAmounts, setMemberTokenAmounts] = useState([]);
    const [memberAddresses, setMemberAddresses] = useState([]);
    //const [proposals, setProposals] = useState([]);
    //const [isVoting, setIsVoting] = useState(false);
    //const [hasVoted, setHasVoted] = useState(false);

    // This useEffect grabs all the addresses of our members holding our NFT.
    //useEffect(() => {
    //    if (!hasClaimedNFT) {
    //        return;
    //    }
    //
    //    // Just like we did in the 7-airdrop-token.js file! Grab the users who hold our NFT
    //    // with tokenId 0.
    //    const getAllAddresses = async () => {
    //        try {
    //            const memberAddresses = await editionDrop.history.getAllClaimerAddresses(0);
    //            setMemberAddresses(memberAddresses);
    //            console.log("🚀 Members addresses", memberAddresses);
    //        } catch (error) {
    //            console.error("failed to get member list", error);
    //        }
    //    };
    //    getAllAddresses();
    //}, [hasClaimedNFT, editionDrop.history]);
//    
//    // This useEffect grabs the # of token each member holds.
//    useEffect(() => {
//        if (!hasClaimedNFT) {
//            return;
//        }
//
//        const getAllBalances = async () => {
//            try {
//                const amounts = await token.history.getAllHolderBalances();
//                setMemberTokenAmounts(amounts);
//                console.log("👜 Amounts", amounts);
//            } catch (error) {
//                console.error("failed to get member balances", error);
//            }
//        };
//        getAllBalances();
//    }, [hasClaimedNFT, token.history]);
//
//    // Retrieve all our existing proposals from the contract.
//    useEffect(() => {
//        if (!hasClaimedNFT) {
//            return;
//        }
//    
//        // A simple call to vote.getAll() to grab the proposals.
//        const getAllProposals = async () => {
//            try {
//                const proposals = await vote.getAll();
//                setProposals(proposals);
//                console.log("🌈 Proposals:", proposals);
//            } catch (error) {
//                console.log("failed to get proposals", error);
//            }
//        };
//        getAllProposals();
//    }, [hasClaimedNFT, vote]);
//
//    
//    // We also need to check if the user already voted.
//    useEffect(() => {
//        if (!hasClaimedNFT) {
//            return;
//        }
//    
//        // If we haven't finished retrieving the proposals from the useEffect above
//        // then we can't check if the user voted yet!
//        if (!proposals.length) {
//            return;
//        }
//    
//        const checkIfUserHasVoted = async () => {
//            try {
//                const hasVoted = await vote.hasVoted(proposals[0].proposalId, address);
//                setHasVoted(hasVoted);
//                if (hasVoted) {
//                    console.log("🥵 User has already voted");
//                } else {
//                    console.log("🙂 User has not voted yet");
//                }
//            } catch (error) {
//                console.error("Failed to check if wallet has voted", error);
//            }
//        };
//        checkIfUserHasVoted();
//    }, [hasClaimedNFT, proposals, address, vote]);
//
//    // Now, we combine the memberAddresses and memberTokenAmounts into a single array
//    const memberList = useMemo(() => {
//        return memberAddresses.map((address) => {
//        // We're checking if we are finding the address in the memberTokenAmounts array.
//        // If we are, we'll return the amount of token the user has.
//        // Otherwise, return 0.
//        const member = memberTokenAmounts?.find(({ holder }) => holder === address);
//    
//        return {
//            address,
//            tokenAmount: member?.balance.displayValue || "",
//        }
//        });
//    }, [memberAddresses, memberTokenAmounts]);
//
    const onValueChange = (e) => {    
        if(e.target.value === "Yes") {
            setIsAccredited(true)
        } else {
            setIsAccredited(false)
        }
    }

    if (!address) {
        return (
            <div className="mainContainer">
                <h1 className='description'>Welcome to RocketListDAO</h1>
                <p className='innerText'>Connect your wallet to continue</p>
            </div>
        );
    }

    if (hasClaimedNFT) {
        return (
            <div className="mainContainer">
                <h1>DAO Member Page</h1>
                <Link className="button-74" to="/app/create">create a new investment dao</Link>

                <p>RocketListDAO is currently in closed alpha and should be used at your own risk. We take security seriously and our contracts have been thoroughly tested and formally verified but are pending audit and bugs may still exist. No materials on the Syndicate site should be construed as a solicitation or advice to buy any security.</p>
            </div>
        )
        //return (
        //    <div className="member-page">
        //        <h1>DAO Member Page</h1>
        //        <p>Congratulations on being a member</p>
        //        <div>
        //            <div>
        //                <h2>Member List</h2>
        //                <table className="card">
        //                    <thead>
        //                        <tr>
        //                            <th>Address</th>
        //                            <th>Voting Power</th>
        //                        </tr>
        //                    </thead>
        //                    <tbody>
        //                        {memberList.map((member) => {
        //                            return (
        //                            <tr key={member.address}>
        //                                <td>{shortenAddress(member.address)}</td>
        //                                <td>{member.tokenAmount}</td>
        //                            </tr>
        //                            );
        //                        })}
        //                    </tbody>
        //                </table>
        //            </div>
//
        //            <div>
        //                <h2>Active Proposals</h2>
        //                <form
        //                onSubmit={async (e) => {
        //                    e.preventDefault();
        //                    e.stopPropagation();
//
        //                    //before we do async things, we want to disable the button to prevent double clicks
        //                    setIsVoting(true);
//
        //                    // lets get the votes from the form for the values
        //                    const votes = proposals.map((proposal) => {
        //                    const voteResult = {
        //                        proposalId: proposal.proposalId,
        //                        //abstain by default
        //                        vote: 2,
        //                    };
        //                    proposal.votes.forEach((vote) => {
        //                        const elem = document.getElementById(
        //                        proposal.proposalId + "-" + vote.type
        //                        );
//
        //                        if (elem.checked) {
        //                        voteResult.vote = vote.type;
        //                        return;
        //                        }
        //                    });
        //                    return voteResult;
        //                    });
//
        //                    // first we need to make sure the user delegates their token to vote
        //                    try {
        //                    //we'll check if the wallet still needs to delegate their tokens before they can vote
        //                    const delegation = await token.getDelegationOf(address);
        //                    // if the delegation is the 0x0 address that means they have not delegated their governance tokens yet
        //                    if (delegation === AddressZero) {
        //                        //if they haven't delegated their tokens yet, we'll have them delegate them before voting
        //                        await token.delegateTo(address);
        //                    }
        //                    // then we need to vote on the proposals
        //                    try {
        //                        await Promise.all(
        //                        votes.map(async ({ proposalId, vote: _vote }) => {
        //                            // before voting we first need to check whether the proposal is open for voting
        //                            // we first need to get the latest state of the proposal
        //                            const proposal = await vote.get(proposalId);
        //                            // then we check if the proposal is open for voting (state === 1 means it is open)
        //                            if (proposal.state === 1) {
        //                            // if it is open for voting, we'll vote on it
        //                            return vote.vote(proposalId, _vote);
        //                            }
        //                            // if the proposal is not open for voting we just return nothing, letting us continue
        //                            return;
        //                        })
        //                        );
        //                        try {
        //                        // if any of the propsals are ready to be executed we'll need to execute them
        //                        // a proposal is ready to be executed if it is in state 4
        //                        await Promise.all(
        //                            votes.map(async ({ proposalId }) => {
        //                            // we'll first get the latest state of the proposal again, since we may have just voted before
        //                            const proposal = await vote.get(proposalId);
//
        //                            //if the state is in state 4 (meaning that it is ready to be executed), we'll execute the proposal
        //                            if (proposal.state === 4) {
        //                                return vote.execute(proposalId);
        //                            }
        //                            })
        //                        );
        //                        // if we get here that means we successfully voted, so let's set the "hasVoted" state to true
        //                        setHasVoted(true);
        //                        // and log out a success message
        //                        console.log("successfully voted");
        //                        } catch (err) {
        //                        console.error("failed to execute votes", err);
        //                        }
        //                    } catch (err) {
        //                        console.error("failed to vote", err);
        //                    }
        //                    } catch (err) {
        //                    console.error("failed to delegate tokens");
        //                    } finally {
        //                    // in *either* case we need to set the isVoting state to false to enable the button again
        //                    setIsVoting(false);
        //                    }
        //                }}
        //                >
        //                {proposals.map((proposal) => (
        //                    <div key={proposal.proposalId} className="card">
        //                    <h5>{proposal.description}</h5>
        //                    <div>
        //                        {proposal.votes.map(({ type, label }) => (
        //                        <div key={type}>
        //                            <input
        //                            type="radio"
        //                            id={proposal.proposalId + "-" + type}
        //                            name={proposal.proposalId}
        //                            value={type}
        //                            //default the "abstain" vote to checked
        //                            defaultChecked={type === 2}
        //                            />
        //                            <label htmlFor={proposal.proposalId + "-" + type}>
        //                            {label}
        //                            </label>
        //                        </div>
        //                        ))}
        //                    </div>
        //                    </div>
        //                ))}
        //                <button disabled={isVoting || hasVoted} type="submit">
        //                    {isVoting
        //                    ? "Voting..."
        //                    : hasVoted
        //                        ? "You Already Voted"
        //                        : "Submit Votes"}
        //                </button>
        //                {!hasVoted && (
        //                    <small>
        //                    This will trigger multiple transactions that you will need to
        //                    sign.
        //                    </small>
        //                )}
        //                </form>
        //            </div>
        //        </div>
        //    </div>
        //);
    };

    return (
        <div className="mainContainer">
            <h1 className='description'>Mint your free RocketListDAO Membership NFT</h1>
            <p className='innerText'>Are you an accredited investor?</p>
            
            <div className="radio">
                <label>
                <input type="radio" value="Yes" checked={isAccredited} onChange={onValueChange} />
                    Yes
                </label>
            </div>
            <br />
            <div className="radio">
                <label>
                <input type="radio" value="No" checked={!isAccredited} onChange={onValueChange} />
                    No
                </label>
            </div>

            <p className='innerText' >Not sure? <a target="_blank" rel="noopener noreferrer" href='https://www.investor.gov/introduction-investing/investing-basics/glossary/accredited-investors'>click here</a></p>

            <Web3Button
                isDisabled={!isAccredited}
                contractAddress={editionDropAddress}
                action={contract => {
                    contract.erc1155.claim(0, 1)
                }}
                onSuccess={() => {
                    console.log(`Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`);
                }}
                onError={error => {
                    toast("Failed to mint NFT", error);
                }}
                >
                Mint your NFT (FREE)
            </Web3Button>
        </div>
    );
}

export default Home;