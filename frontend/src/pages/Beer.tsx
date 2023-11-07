import BeerAttribute from "../components/beer-attribute/BeerAttribute";
import styles from "./Beer.module.css";
import { useParams } from "react-router";
import Logo from "../components/logo/Logo";
import { Spin } from "antd";
import useFetchBeer from "../utils/useFetchBeer";

const BeerPage = () => {
  const { id } = useParams<{ id: string }>();
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

  if (isError) {
    return <div>Error fetching beer</div>;
  }

  return (
    <main className={styles.main}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <a href="/" className={styles.menuButton}>
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
        {beer.ibu !== null && (
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
      </div>
      <hr className={styles.divider} />
      <div className={styles.commentListContainer}>
        {/* <InfiniteScroll
            dataLength={getCommentsLength(10)}
            next={fetchMoreComments}
            hasMore={comments.length < getCommentsLength(10) ? true : false}
            loader={<Spin />}
            scrollThreshold={1}
          >
            {comments.map((comment) => (
              <CommentItem
                key={comments.indexOf(comment)}
                user={comment.user_name}
                comment={comment.comment_text}
                timestamp={comment.created_at}
              />
            ))}
          </InfiniteScroll> */}
      </div>
    </main>
  );
};
export default BeerPage;
