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
import protectRoute from "../utils/protectRoute";
import useWindowDimensions from "../utils/useWindowDimensions";
import MobileBeerAttribute from "../components/beer-attribute/MobileBeerAttribute";
import Voter from "../components/voter/Voter";

type CommentInterface = {
  id: number;
  user_id: string;
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

  return await fetch(import.meta.env.VITE_APP_BACKEND_URL, {
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

/**
 * BeerPage component that displays detailed information about a beer and its comments.
 * @returns a BeerPage component
 */
const BeerPage = () => {
  useEffect(() => {
    protectRoute();
  }, []);
  const { id } = useParams<{ id: string }>();
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [newVote, setNewVote] = useState(false);
  const [newComment, setNewComment] = useState(false);
  const { width } = useWindowDimensions();

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
    newVote,
    newComment,
  });

  const AttributeValues = [
    {
      attribute: "Style",
      icon: "/yellowBottle.svg",
      altText: "Bottle icon",
      value: beer?.style,
    },
    {
      attribute: "ABV",
      icon: "/yellowPercent.svg",
      altText: "Percentage icon",
      value: String(beer?.abv ?? 0 * 100) + "%",
    },
    {
      attribute: "IBU",
      icon: "/yellowHop.svg",
      altText: "Hop icon",
      value: beer?.ibu,
    },
    {
      attribute: "Volume",
      icon: "/yellowVolume.svg",
      altText: "Glass volume",
      value: beer?.ounces + "oz",
    },
  ];

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
      {width > 1000 ? (
        <>
          <div className={styles.logo}>
            <Logo />
          </div>
          <a href="/" className={styles.menuButton}>
            {"Back to menu"}
          </a>
        </>
      ) : (
        <>
          <header className={styles.headingWrapper}>
            <Logo />
          </header>
          <hr className={styles.separator} />
        </>
      )}

      <p className={styles.breweryName}>{beer?.brewery_name}</p>
      <h1 className={styles.beerName}>{beer.name}</h1>
      <div className={styles.rating}>
        <Voter
          votes={beer.rating || 0}
          reaction={beer.user_vote}
          beerId={beer.id}
          onSuccess={() => {
            setNewVote(!newVote);
          }}
        />
      </div>
      <p className={styles.basedOn}>
        Based on {beer.vote_count !== null ? beer.vote_count : "0"} review
        {beer.vote_count === 1 ? "" : "s"}
      </p>
      <section className={styles.info} aria-label="Beer attributes">
        {width > 768 ? (
          <>
            <BeerAttribute
              attribute="Style"
              icon={"/bottle.svg"}
              altText={"Bottle icon"}
              value={beer.style}
            />
            <BeerAttribute
              attribute="ABV"
              icon={"/percent.svg"}
              altText={"Percentage icon"}
              value={String((beer.abv * 100).toFixed(1)) + "%"}
            />
            {beer.ibu !== 0 && (
              <BeerAttribute
                icon={"/hop.svg"}
                altText={"Hop icon"}
                attribute="IBU"
                value={String(beer.ibu).split(".")[0]}
              />
            )}
            <BeerAttribute
              icon={"/volume.svg"}
              altText={"Glass volume"}
              attribute="Volume"
              value={beer.ounces + "oz"}
            />
          </>
        ) : (
          <MobileBeerAttribute attributeProps={AttributeValues} />
        )}
      </section>
      <hr className={styles.divider} />
      <InfiniteScroll
        style={{ overflow: "hidden", minHeight: "33vh" }}
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
        <ul
          className={styles.commentListContainer}
          aria-label="List of comments"
        >
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
                  id={comment.id}
                  userId={comment.user_id}
                  username={comment.username}
                  commentText={comment.comment_text}
                  timestamp={comment.created_at}
                  onDelete={() => setNewComment(true)}
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
