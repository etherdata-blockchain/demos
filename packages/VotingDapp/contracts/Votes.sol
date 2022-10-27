pragma solidity >=0.7.0 <0.9.0;

contract Votes {
    struct Proposal {
        string proposalName;
        uint totalVotes;
    }

    uint totalProposals;
    uint[] proposalIds;

    mapping(uint => Proposal) proposalsMap;

    constructor() {
        totalProposals = 0;
    }

    function getTotalProposals() public view returns(uint) {
        return totalProposals;
    }


    function getProposalIds() public view returns(uint[] memory){
        return proposalIds;
    }

    function getProposalNameById(uint id) public view returns(string memory) {
        return proposalsMap[id].proposalName;
    }

    function addProposal(string memory name) public {
        totalProposals++;
        uint id = totalProposals;
        
        proposalsMap[id].proposalName = name;
        proposalsMap[id].totalVotes = 0;
        
        proposalIds.push(id);
    }


    function isValid(uint id) view public returns (bool){
        if (id >= 0 && id <= totalProposals){
            return true;
        }
        return false;
    }

    function voteForProposal(uint id) public{
        proposalsMap[id].totalVotes += 1;
    }

    function totalVotes(uint id) public view returns(uint){
        return proposalsMap[id].totalVotes;
    }
}