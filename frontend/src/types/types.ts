type ReactionType = "unreact" | "upvote" | "downvote";

//TODO use this file more

/**
 * @typedef {Object} Beer - A beer object
 */
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


/**
 * @description SortingItem is used to define the sorting options
 */
export type SortingItem = {
  key: string;
  label: string;
}