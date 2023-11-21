type ReactionType = "unreact" | "upvote" | "downvote";

export type Beer = {
  abv: number;
  ibu: number;
  id: number;
  name: string;
  style: string;
  ounces: number;
  brewery_name: string;
  rating: number;
  vote_count: number;
  comment_count: number;
  user_vote: ReactionType;
};
