// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract owned {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        owner = newOwner;
    }
}

contract tokenRecipient {
    event receivedEther(address sender, uint256 amount);
    event receivedTokens(
        address _from,
        uint256 _value,
        address _token,
        bytes _extraData
    );

    function receiveApproval(
        address _from,
        uint256 _value,
        address _token,
        bytes memory _extraData
    ) public {
        Token t = Token(_token);
        require(t.transferFrom(_from, address(this), _value));
        emit receivedTokens(_from, _value, _token, _extraData);
    }
}

interface Token {
    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) external returns (bool success);
}

contract Congress is owned, tokenRecipient {
    uint256 public minimumQuorum;
    uint256 public debatingPeriodInMinutes;
    int256 public majorityMargin;
    Proposal[] public proposals;
    uint256 public numProposals;
    mapping(address => uint256) public memberId;
    Member[] public members;

    event ProposalAdded(
        uint256 proposalId,
        address recipient,
        uint256 amount,
        string description
    );
    event Voted(
        uint256 proposalId,
        bool position,
        address voter,
        string justification
    );
    event ProposalTallied(
        uint256 proposalId,
        int256 result,
        uint256 quorum,
        bool active
    );
    event MembershipChanged(address member, bool isMember);
    event ChangeOfRules(
        uint256 newMinimumQuorum,
        uint256 newDebatingPeriodInMinutes,
        int256 newMajorityMargin
    );

    struct Proposal {
        address recipient;
        uint256 amount;
        string description;
        uint256 minExecutionDate;
        bool executed;
        bool proposalPassed;
        uint256 numberOfVotes;
        int256 currentResult;
        bytes32 proposalHash;
        Vote[] votes;
        mapping(address => bool) voted;
    }

    struct Member {
        address member;
        string name;
        uint256 memberSince;
    }

    struct Vote {
        bool isSupport;
        address voter;
        string justification;
    }

    modifier onlyMember() {
        require(memberId[msg.sender] != 0);
        _;
    }

    constructor(
        uint256 minimumQuorumForProposals,
        uint256 minuteForDebate,
        int256 marginOfVotesForMajority
    ) payable {
        emit ChangeOfRules(
            minimumQuorumForProposals,
            minuteForDebate,
            marginOfVotesForMajority
        );
        addMember(owner, "founder");
    }

    /**
     * add member
     */
    function addMember(address targetMember, string memory memberName)
        public
        onlyOwner
    {
        uint256 id = memberId[targetMember];
        //不存在该成员
        if (id == 0) {
            memberId[targetMember] = members.length;
            id = members.length + 1;
        }

        members[id] = Member({
            member: targetMember,
            name: memberName,
            memberSince: block.timestamp
        });
        emit MembershipChanged(targetMember, true);
    }

    function removeMember(address targetMember) public onlyOwner {
        require(memberId[targetMember] != 0);
        for (uint256 i = memberId[targetMember]; i < members.length - 1; i++) {
            members[i] = members[i + 1];
            memberId[members[i].member] = i;
        }
        memberId[targetMember] = 0;
        delete members[members.length - 1];
    }

    function changeVotingRules(
        uint256 minimumQuorumForProposals,
        uint256 minuteForDebate,
        int256 marginOfVotesForMajority
    ) public onlyOwner {
        minimumQuorum = minimumQuorumForProposals;
        debatingPeriodInMinutes = minuteForDebate;
        majorityMargin = marginOfVotesForMajority;

        emit ChangeOfRules(
            minimumQuorum,
            debatingPeriodInMinutes,
            majorityMargin
        );
    }

    function newProposal(
        address beneficary,
        uint256 weiAmount,
        string memory _desciption,
        bytes memory transantionBytecode
    ) public onlyMember returns (uint256 proposalID) {
        proposalID = proposals.length + 1;

        Proposal storage newProp = proposals[proposalID];

        newProp.recipient = beneficary;
        newProp.amount = weiAmount;
        newProp.description = _desciption;
        newProp.proposalHash = keccak256(
            abi.encodePacked(beneficary, weiAmount, transantionBytecode)
        );
        newProp.minExecutionDate = block.timestamp + debatingPeriodInMinutes;
        newProp.executed = false;
        newProp.proposalPassed = false;
        newProp.numberOfVotes = 0;

        numProposals++;
        emit ProposalAdded(proposalID, beneficary, weiAmount, _desciption);
        return proposalID;
    }

    function checkProposalCode(
        uint256 proposalNumber,
        address beneficiary,
        uint256 weiAmount,
        bytes memory transactionBytecode
    ) public view returns (bool codeChecksOut) {
        Proposal storage p = proposals[proposalNumber];
        return
            p.proposalHash ==
            keccak256(
                abi.encodePacked(beneficiary, weiAmount, transactionBytecode)
            );
    }

    function vote(
        uint256 proposalNumber,
        bool isSupport,
        string memory justification
    ) public onlyMember returns (uint256 voteId) {
        Proposal storage p = proposals[proposalNumber];
        require(!p.voted[msg.sender]);
        p.voted[msg.sender] = true;
        p.numberOfVotes++;
        if (isSupport) {
            p.currentResult++;
        } else {
            p.currentResult--;
        }

        emit Voted(proposalNumber, isSupport, msg.sender, justification);

        return p.numberOfVotes;
    }

    function executeProposal(
        uint256 proposalNumber,
        bytes memory transactionBytecode
    ) public {
        Proposal storage p = proposals[proposalNumber];
        require(
            block.timestamp > p.minExecutionDate &&
                !p.executed &&
                p.proposalHash ==
                keccak256(
                    abi.encodePacked(p.recipient, p.amount, transactionBytecode)
                ) &&
                p.numberOfVotes >= minimumQuorum
        );

        if (p.currentResult > majorityMargin) {
            p.executed = true;
            (bool success, ) = p.recipient.call{value: p.amount}(
                transactionBytecode
            );
            require(success);
            p.proposalPassed = true;
        } else {
            p.executed = true;
            p.proposalPassed = false;
        }

        emit ProposalTallied(
            proposalNumber,
            p.currentResult,
            p.numberOfVotes,
            p.proposalPassed
        );
    }
}
