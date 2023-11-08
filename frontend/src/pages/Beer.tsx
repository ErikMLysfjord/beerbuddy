import BeerAttribute from "../components/beer-attribute/BeerAttribute";
import styles from "./Beer.module.css";
import { useParams } from "react-router";
import Logo from "../components/logo/Logo";
import { Spin } from "antd";
import useFetchBeer from "../utils/useFetchBeer";
import InfiniteScroll from "react-infinite-scroll-component";
import CommentItem from "../components/comment-item/CommentItem";
import { useEffect, useState } from "react";
import CommentBar from "../components/comment-bar/CommentBar";

type CommentInterface = {
  username: string;
  comment_text: string;
  created_at: string;
};

/**
 * Fetches comments from the backend.
 * @param id - The ID of the beer to fetch comments for.
 * @param offset - The offset to start fetching comments from.
 * @returns - An array of comments.
 */
const fetchComments = async (id: string, offset: number) => {
  const query = {
    query: `{ comments(id: ${id}, size: 5, start: ${offset}) }`,
  };

  return await fetch("http://it2810-15.idi.ntnu.no:4000/beer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(query),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data.data.comments;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

const BeerPage = () => {
  const { id } = useParams<{ id: string }>();
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [newComment, setNewComment] = useState(false);

  const limit = 5;
  const [comments, setComments] = useState<CommentInterface[]>([]);

  useEffect(() => {
    /* If there is no ID, then we must do an early return */
    if (id === undefined) return;

    setCommentsLoading(true);
    setOffset(0);
    fetchComments(id, 0)
      .then((data) => {
        setComments(data !== undefined ? data : []);
      })
      .finally(() => {
        setCommentsLoading(false);
        setNewComment(false);
      });
  }, [id, newComment]);

  const { beer, isLoading, isError } = useFetchBeer({
    id: Number(id),
  });

  if (isLoading || beer === undefined) {
    return (
      <div className={styles.centerContent}>
        <Spin size="large" />
      </div>
    );
  }

  if (isError || id === undefined) {
    return <div>Error fetching beer</div>;
  }

  return (
    <main className={styles.main}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <a href="/project2" className={styles.menuButton}>
        {"Back to menu"}
      </a>
      <p className={styles.breweryName}>{beer?.brewery_name}</p>
      <h1 className={styles.beerName}>{beer.name}</h1>
      <div className={styles.rating}>
        <h2 className={styles.ratingText}>
          <span>{beer.rating !== null ? beer.rating : "0"}</span> rated
        </h2>
      </div>
      <p className={styles.basedOn}>
        Based on {beer.vote_count !== null ? beer.vote_count : "0"} reviews
      </p>
      <div className={styles.info}>
        <BeerAttribute
          attribute="Style"
          icon={"/project2/bottle.svg"}
          altText={"Bottle icon"}
          value={beer.style}
        />
        <BeerAttribute
          attribute="ABV"
          icon={"/project2/percent.svg"}
          altText={"Percentage icon"}
          value={String((beer.abv * 100).toFixed(1)) + "%"}
        />
        {beer.ibu !== null && (
          <BeerAttribute
            icon={"/project2/hop.svg"}
            altText={"Hop icon"}
            attribute="IBU"
            value={String(beer.ibu).split(".")[0]}
          />
        )}
        <BeerAttribute
          icon={"/project2/volume.svg"}
          altText={"Glass volume"}
          attribute="Volume"
          value={beer.ounces + "oz"}
        />
      </div>
      <hr className={styles.divider} />
      <InfiniteScroll
        style={{ overflow: "hidden", minHeight: "35vh" }}
        dataLength={comments.length}
        next={() => {
          /* Fetch the next comments we need, and add them to the comments state */
          fetchComments(id, offset + limit).then((data) => {
            setComments([...comments, ...data]);
            setOffset(offset + limit);
          });
        }}
        hasMore={comments.length < beer.comment_count}
        loader={
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Spin size="default" />
          </div>
        }
        scrollThreshold={1}
      >
        <ul className={styles.commentListContainer}>
          {commentsLoading ? (
            <div className={styles.centerContent}>
              <Spin size="default" />
            </div>
          ) : (
            comments.map((comment) => (
              <li
                className={styles.listItem}
                key={`${comment.username}-${comment.created_at}}`}
              >
                <CommentItem
                  username={comment.username}
                  commentText={comment.comment_text}
                  timestamp={comment.created_at}
                />
              </li>
            ))
          )}
        </ul>
      </InfiniteScroll>
      <CommentBar onSuccess={() => setNewComment(true)} />
    </main>
  );
};
export default BeerPage;
