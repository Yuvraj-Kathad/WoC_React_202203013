import React, {useState, useEffect} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=> {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const capitalize = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    // setLoading(true)
    let data = await fetch(url);
    props.setProgress(35);
    let parsedData = await data.json();
    props.setProgress(70);
    // console.log(parsedData);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setHasMore(page < Math.ceil(parsedData.totalResults/props.pageSize))
    // setLoading(false)
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitalize(props.category)} - NewsMonkey`;
    updateNews();
    //eslint-disable-next-line
  }, [])

  const fetchMoreData = async () => {
    
    if(!hasMore) return;
    const url = `https://newsapi.org/v2/top-headlines?category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    // setTotalResults(parsedData.totalResults)
    setHasMore(page+1 < Math.ceil(parsedData.totalResults / props.pageSize));
  };

    return (
      <>
        <h1 className="text-center" style={{ margin: "30px 0px", marginTop: '90px' }}>NewsMonkey - Top {capitalize(props.category)} Headlines</h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
        {articles.length > 0 ? (
          articles.map((element, index) => {
              return <div className="col-md-4" key={index}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description? element.description:""}
                    imageURL={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author} 
                    date={element.publishedAt || "Unknown Date"} 
                    source={element.source.name || "Unknown Source"}
                  />
                </div>
            })):""}
        </div>
        </div>
        </InfiniteScroll>
      </>
    );
}

News.defaultProps = {
  // q: "india",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  // q: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;