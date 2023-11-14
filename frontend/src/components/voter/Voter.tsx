import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";
import { Button } from "antd";
import styles from "./Voter.module.css";
import { useState } from "react";
import protectRoute from "../../utils/protectRoute";

type ReactionType = "unreact" | "upvote" | "downvote";
interface VoterInterface {
  votes: number;
  reaction: ReactionType;
  beerId: number;
}

const vote = async (beerId: number, reaction: ReactionType) => {
  const userId = await localStorage.getItem("userIdBeerBuddy");

  await fetch("http://it2810-15.idi.ntnu.no:4000/action", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `{
        react(userId: "${userId}" beerId: ${beerId}, action: "${reaction}")
      }`,
    }),
  });
};

const Voter = (props: VoterInterface) => {
  const upvote = (event: React.MouseEvent<HTMLButtonElement>) => {
    protectRoute();
    event.stopPropagation();
    event.preventDefault();
    const reaction = action === "upvote" ? "unreact" : "upvote";
    setAction(reaction);
    vote(props.beerId, reaction);
  };

  const downvote = (event: React.MouseEvent<HTMLButtonElement>) => {
    protectRoute();
    event.stopPropagation();
    event.preventDefault();
    const reaction = action === "downvote" ? "unreact" : "downvote";
    setAction(reaction);
    vote(props.beerId, reaction);
  };
  const [action, setAction] = useState(props.reaction);

  const values = {
    upvote: 2,
    unreact: 1,
    downvote: 0,
  };

  const total =
    parseInt(`${props.votes}`) + values[action] - values[props.reaction];
  const colorHighligt = "#ffbc0d";
  return (
    <div className={styles.wrapper}>
      <Button
        type="primary"
        icon={<CaretUpFilled />}
        onClick={upvote}
        aria-label="Upvote this beer"
        style={{
          backgroundColor: action === "upvote" ? colorHighligt : "",
          filter: action === "upvote" ? "" : "brightness(0.8)",
        }}
      />
      <p className={styles.count}>{total}</p>
      <Button
        type="primary"
        icon={<CaretDownFilled />}
        onClick={downvote}
        aria-label="Downvote this beer"
        style={{
          backgroundColor: action === "downvote" ? colorHighligt : "",
          filter: action === "downvote" ? "" : "brightness(0.8)",
        }}
      />
    </div>
  );
};
export default Voter;
