import React, { memo, useContext, useState } from 'react'
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { AddressZero } from "@ethersproject/constants";
import { useAddress, useContract, useNFTBalance, Web3Button, useSDK, useSigner } from '@thirdweb-dev/react';
import'./stepsToCreate.css'
import { toast } from 'react-toastify';
  
const StepsToCreate = () => {
    const address = useAddress();
    const signer = useSigner();
    const thirdweb = new ThirdwebSDK(signer);
    const [stage, setStage] = useState("step1");

    const [company, setCompany] = useState('');
    const [round, setRound] = useState('');
    const [roundSize, setRoundSize] = useState('');
    const [instrument, setInstrument] = useState('');
    const [allocation, setAllocation] = useState('');
    const [coInvestors, setCoInvestors] = useState('');
    const [gpCommitment, setGpCommitment] = useState('');

    const [sameTerms, setSameTerms] = useState(true);
    const [otherTerms, setOtherTerms] = useState('none');
    const [diffGPTerms, setDiffGPTerms] = useState('');
        
    const [iInvestedInAPreviousRound, setIInvestedInAPreviousRound] = useState(false);
    const [iHaveAdvisorySharesWarrantsOrOtherShares, setIHaveAdvisorySharesWarrantsOrOtherShares] = useState(false);
    const [iAmAnOfficerOrEmployeeOfTheCompany, setIAmAnOfficerOrEmployeeOfTheCompany] = useState(false);
    const [iHaveARelativeOrSignificantOtherWorkingAtTheCompany, setIHaveARelativeOrSignificantOtherWorkingAtTheCompany] = useState(false);
    const [iHaveOtherPotentialConflictsToDisclose, setIHaveOtherPotentialConflictsToDisclose] = useState(false);
    const [iDoNotHaveAnyPotentialConflictsToDisclose, setIDoNotHaveAnyPotentialConflictsToDisclose] = useState(false);
    const [otherDisclosure, setOtherDisclosure] = useState('none');
    const [diffDisclosure, setDiffDisclosure] = useState(undefined);

    const [deck, setDeck] = useState('');
    const [memo, setMemo] = useState('');

    const tokenWrapper = (e) => {
        e.preventDefault();

        async function main() {
            const deployedAddress = await thirdweb.deployer.deployToken({
                name: "My Token",
                primary_sale_recipient: address,
            });
            console.log(deployedAddress);
        }
        main()
        .then(() => {
            setStage("stage4")
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (stage === 'step1') {
            setStage('step2')
        } else if (stage === 'step2') {
            setStage('step3')
        }
    }
 
    const onSameTermValueChange = (e) => {    
        if(e.target.value === "Yes") {
            setSameTerms(true)
            setOtherTerms('none')
        } else {
            setSameTerms(false)
            setOtherTerms('initial')
        }
    }

    const onDisclosureChange = (e) => { 
        if (e.target.value === "1") {
            if (iInvestedInAPreviousRound === true) {
                setIInvestedInAPreviousRound(false)
            } else {
                setIInvestedInAPreviousRound(true)
            }
        } else if (e.target.value === "2") {
            if (iHaveAdvisorySharesWarrantsOrOtherShares === true) {
                setIHaveAdvisorySharesWarrantsOrOtherShares(false)
            } else {
                setIHaveAdvisorySharesWarrantsOrOtherShares(true)
            }
        } else if (e.target.value === "3") {
            if (iAmAnOfficerOrEmployeeOfTheCompany === true) {
                setIAmAnOfficerOrEmployeeOfTheCompany(false)
            } else {
                setIAmAnOfficerOrEmployeeOfTheCompany(true)
            }
        } else if (e.target.value === "4") {
            if (iHaveARelativeOrSignificantOtherWorkingAtTheCompany === true) {
                setIHaveARelativeOrSignificantOtherWorkingAtTheCompany(false)
            } else {
                setIHaveARelativeOrSignificantOtherWorkingAtTheCompany(true)
            }
        } else if (e.target.value === "5") {
            if (iHaveOtherPotentialConflictsToDisclose === true) {
                setIHaveOtherPotentialConflictsToDisclose(false)
                setOtherDisclosure('none')
            } else {
                setIHaveOtherPotentialConflictsToDisclose(true)
                setOtherDisclosure('initial')
            }
        } else if (e.target.value === "6") {
            if (iDoNotHaveAnyPotentialConflictsToDisclose === true) {
                setIDoNotHaveAnyPotentialConflictsToDisclose(false)
            } else {
                setIDoNotHaveAnyPotentialConflictsToDisclose(true)
            }
        }
    }

    const onDeckChange = (e) => {    
        let file = e.target.files[0];
        setDeck(file)
    }

    if (stage === 'step1') {
        return (
            <div className='step'>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <h1><u>step 1</u></h1>
                        <label>
                            <p>Company</p>
                            <input required={true} value={company} placeholder='Company' onChange={e => setCompany(e.target.value)}/>
                        </label>

                        <label>
                            <p>Round</p>
                            <input required={true} value={round} placeholder='Round' onChange={e => setRound(e.target.value)}/>
                        </label>
                        
                        <label>
                            <p>Round Size ($USD)</p>
                            <input type='number' required={true} value={roundSize} placeholder='Round Size' onChange={e => setRoundSize(e.target.value)}/>
                        </label>

                        <label>
                            <p>Instrument</p>
                            <input required={true} value={instrument} placeholder='Instrument' onChange={e => setInstrument(e.target.value)}/>
                        </label>

                        <label>
                            <p>Allocation</p>
                            <input type='number' required={true} value={allocation} placeholder='Allocation' onChange={e => setAllocation(e.target.value)}/>
                        </label>

                        <label>
                            <p>Co-Investors</p>
                            <textarea className='smallTextInput' required={true} value={coInvestors} placeholder="Co-Investors" onChange={e => setCoInvestors(e.target.value)}/>
                        </label>
                        
                        <label>
                            <p>Your GP Commitment ($USD)</p>
                            <input type='number' required={true} value={gpCommitment} placeholder="GP Commitment" onChange={e => setGpCommitment(e.target.value)}/>
                        </label>

                        <label>
                            <p>Are you investing on the same terms as this SPV?</p>
                            <div>
                                <label>
                                    <input type="radio" value="Yes" checked={sameTerms} onChange={onSameTermValueChange}/>
                                    Yes
                                </label>
                            </div>
                            <br />
                            <div>
                                <label>
                                    <input type="radio" value="No" checked={!sameTerms} onChange={onSameTermValueChange}/>
                                    No
                                </label>
                            </div>                        
                        </label>

                        <label style={{'display': otherTerms}}>
                            <p>What term are you investing on?</p>
                            <textarea className='mediumTextInput' required={!sameTerms} placeholder="GP Terms" value={diffGPTerms} onChange={e => setDiffGPTerms(e.target.value)}/>
                        </label>

                        <label>
                            <p>Disclosures</p>
                            <div>
                                <label>
                                    <input type="checkbox" value="1" checked={iInvestedInAPreviousRound} onChange={onDisclosureChange} />
                                    I invested in a previous round
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input type="checkbox" value="2" checked={iHaveAdvisorySharesWarrantsOrOtherShares} onChange={onDisclosureChange}/>
                                    I have advisory shares, warrants, or other shares
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input type="checkbox" value="3" checked={iAmAnOfficerOrEmployeeOfTheCompany} onChange={onDisclosureChange}/>
                                    I am an officer or employee of the company
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input type="checkbox" value="4" checked={iHaveARelativeOrSignificantOtherWorkingAtTheCompany} onChange={onDisclosureChange}/>
                                    I have a relative or significant other working at the company
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input type="checkbox" value="5" checked={iHaveOtherPotentialConflictsToDisclose} onChange={onDisclosureChange}/>
                                    I have other potential conflicts to disclose
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input type="checkbox" value="6" checked={iDoNotHaveAnyPotentialConflictsToDisclose} onChange={onDisclosureChange}/>
                                    I do not have any potential conflicts to disclose
                                </label>
                            </div>
                        </label>

                        <label style={{'display': otherDisclosure}}>
                            <p>Other Disclosures</p>
                            <textarea className='mediumTextInput' required={iDoNotHaveAnyPotentialConflictsToDisclose} placeholder="Other Disclosures" value={diffDisclosure} onChange={e => setDiffDisclosure(e.target.value)}/>
                        </label>
                    </fieldset>
                    <br />
                    <button type="submit" className='button-1'>Next</button>
                </form>
            </div>
        )
    }

    if (stage === 'step2') {
        return (
            <div className='step'>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <h1><u>step 2</u></h1>
                        <p>pitch deck</p>
                        <input type="file" name='file' onChange={onDeckChange} />
                        <p>Investment Memo<br/>Be objective, no investing advice allowed</p>
                        <textarea className='largeTextInput' required={true} name="memo" value={memo} placeholder="Co-Investors" onChange={e => setMemo(e.target.value)}/>
                    </fieldset>
                    <br />
                    <button type="submit" className='button-1'>Next</button>
                </form>
            </div>
        )
    }

    if (stage === 'step3') {
        return (
            <div className='step'>
                <h1><u>step 3</u></h1>
                <button className='button-1' onClick={tokenWrapper}>deploy token contract</button>
            </div>
        )
    }
}

export default StepsToCreate;