import { Provider } from "@ethersproject/abstract-provider";
import { Clear, Done } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Card,
  CardContent,
  Collapse,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import moment from "moment";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useVoting } from "ui";
import { Config } from "../configs/config";

interface Props {
  page: number;
}

const Input = styled("input")({
  display: "none",
});

const width = "80vw";

export default function Voting({ page }: Props) {
  
  const { proposals, name1, name2, name3, name4, name5, vote1, vote2, vote3, vote4, vote5, error, provider } = useVoting({ });


  React.useEffect(() => {
    const timeout = setTimeout(() =>
      initProposals(), 300);
    return () => clearTimeout(timeout);
    async function initProposals() {
      provider?.addProposal("Harry");
      provider?.addProposal("Jones");
      provider?.addProposal("Lily");
      provider?.addProposal("William");
      provider?.addProposal("Alice");
    }
    initProposals();
  }, []);

  
  /**/
  //initProposals();
  const [value, setValue] = React.useState<any>("");
  const router = useRouter();

	const [newCandidateID, setNewCandidateID] = React.useState();
	const [voteForCandidateID, setVoteForCandidateID] = React.useState('');

  const handleVoteForCandidateID = (e) => {
		setNewCandidateID(e.target.value);
	};
  

	return (
		<div style={{ padding: '3rem 5rem' }}>
			<h1>Voting System</h1>
			<div>
				<h4>Candidate Number: {proposals}</h4>
        <h5>Candidate [1]: {name1}; total votes is: {vote1}</h5>
        <h5>Candidate [2]: {name2}; total votes is: {vote2}</h5>
        <h5>Candidate [3]: {name3}; total votes is: {vote3}</h5>
        <h5>Candidate [4]: {name4}; total votes is: {vote4}</h5>
        <h5>Candidate [5]: {name5}; total votes is: {vote5}</h5>
			</div>
			
			<div>
				<h4>Give Votes to a candidate (Fill in her/his ID)</h4>
				<div
					style={{
						width: '15em',
						display: 'flex',
						justifyContent: 'space-between',
					}}>
					<input type="text" value={value} onChange={(e)=>setValue(e.target.value)} />
					<button onClick={async () => {
                        await provider?.voteForProposal(value);
                      }}>Vote For</button>
				</div>
			</div>
		</div>
		
	);
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const page = parseInt((ctx.query.page as string) || "1");

  return {
    props: {
      page,
    },
  };
};
