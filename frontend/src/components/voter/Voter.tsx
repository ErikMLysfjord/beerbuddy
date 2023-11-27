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
  onSuccess?: () => void;
}

/**
 * Vote on a beer.
 * @param beerId - id of the beer to vote on.
 * @param reaction - the reaction to vote with.
 */
const vote = async (beerId: number, reaction: ReactionType) => {
  const userId = await localStorage.getItem("userIdBeerBuddy");

  await fetch(import.meta.env.VITE_APP_BACKEND_URL + "/action", {
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

/**
 * UI component to perform the vote action.
 * @param votes - number of votes
 * @param reaction - the reaction to vote with
 * @param beerId - id of the beer to vote on
 * @returns - the voter component
 */
const Voter = (props: VoterInterface) => {
  const handleVote =
    (reaction: ReactionType) =>
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      event.preventDefault();
      if (await protectRoute()) return "Error";
      const newReaction = action === reaction ? "unreact" : reaction;
      setAction(newReaction);
      vote(props.beerId, newReaction);
      if (props.onSuccess) props.onSuccess();
    };

  const [action, setAction] = useState(props.reaction);

  /**
   * Give values to the different reactions.
   * This is used to calculate the total number of votes.
   */
  const values = {
    upvote: 2,
    unreact: 1,
    downvote: 0,
  };

  const total =
    parseInt(`${props.votes}`) + values[action] - values[props.reaction];

  const highlightColor = "#ffbc0d";

  return (
    <div className={styles.wrapper}>
      <Button
        type="primary"
        icon={<CaretUpFilled />}
        onClick={handleVote("upvote")}
        aria-label="Upvote this beer"
        style={{
          backgroundColor: action === "upvote" ? highlightColor : "",
          filter: action === "upvote" ? "" : "brightness(0.8)",
        }}
      />
      <h2 className={styles.count}>{!isNaN(total) ? total : 0}</h2>
      <Button
        type="primary"
        icon={<CaretDownFilled />}
        onClick={handleVote("downvote")}
        aria-label="Downvote this beer"
        style={{
          backgroundColor: action === "downvote" ? highlightColor : "",
          filter: action === "downvote" ? "" : "brightness(0.8)",
        }}
      />
    </div>
  );
};
export default Voter;
