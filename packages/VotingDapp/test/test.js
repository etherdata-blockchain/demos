const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting contract", function () {

    beforeEach(async function () {
        [addr1, addr2, ...addrs] = await ethers.getSigners();
        votes = await ethers.getContractFactory("Votes");
    
        hardhatvotes = await votes.deploy();

        await hardhatvotes.deployed();
        console.log('Voting deployed at:'+ hardhatvotes.address)
    });

    it("Test votes initialization", async function () {
        const number = await hardhatvotes.getTotalProposals();
        expect(number).to.equal(0);
    });
    it("Test votes add proposals", async function () {
        await hardhatvotes.addProposal("Jones");
        const ids = await hardhatvotes.getProposalIds();
        const proposals = await hardhatvotes.getProposalNameById(ids[0]).then();
        expect(await hardhatvotes.getTotalProposals()).to.equal(ids.length);
        expect(proposals).to.equal("Jones");
    });
    it("Test votes voting and totalvotes", async function () {
        await hardhatvotes.addProposal("Jones");
        await hardhatvotes.addProposal("Alice");
        await hardhatvotes.addProposal("Sarah");
        const ids = await hardhatvotes.getProposalIds();
        await hardhatvotes.voteForProposal(ids[0]);
        await hardhatvotes.voteForProposal(ids[0]);
        await hardhatvotes.voteForProposal(ids[0]);
        await hardhatvotes.voteForProposal(ids[0]);
        await hardhatvotes.voteForProposal(ids[1]);
        await hardhatvotes.voteForProposal(ids[1]);
        await hardhatvotes.voteForProposal(ids[2]);
        const total = await hardhatvotes.totalVotes(ids[0]).then();
        expect(total).to.equal(4);
        const total2 = await hardhatvotes.totalVotes(ids[1]).then();
        expect(total2).to.equal(2);
        const total3 = await hardhatvotes.totalVotes(ids[2]).then();
        expect(total3).to.equal(1);
    });
});