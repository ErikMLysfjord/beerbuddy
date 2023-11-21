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

const Voter = (props: VoterInterface) => {
  const upvote = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    if (await protectRoute()) return "Error";
    const reaction = action === "upvote" ? "unreact" : "upvote";
    setAction(reaction);
    await vote(props.beerId, reaction);
    if (props.onSuccess) props.onSuccess();
  };

  const downvote = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    if (await protectRoute()) return "Error";
    const reaction = action === "downvote" ? "unreact" : "downvote";
    setAction(reaction);
    await vote(props.beerId, reaction);
    if (props.onSuccess) props.onSuccess();
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
