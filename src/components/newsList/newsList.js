import { useEffect, useState } from "react";
import NewsItem from "../newsItem/news.Item";
import NewsService from "../../service/NewsService";
import Spinner from "../spinner/Spinner";

import "./newsList.css";

const NewsList = () => {
  const [remember, setRememberNews] = useState(
    JSON.parse(localStorage.getItem("rememberNews"))
  );
  const [news, updateNews] = useState(remember || null);
  const [one, updateOne] = useState(null);
  const [idOne, updateIdOne] = useState(null);
  const [loading, setLoading] = useState(true);

  const newsService = new NewsService();

  const rememberNews = (obj) => {
    localStorage.setItem("rememberNews", JSON.stringify(obj));
    setRememberNews(JSON.parse(localStorage.getItem("rememberNews")));
    console.log(remember);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      rememberNews(news);
      getOne(idOne);
    }, 5000);
    return () => clearInterval(interval);
  });

  const getOne = async (id) => {
    console.log(id);
    await newsService.getOneNews(id).then((res) => {
      updateOne(res);

      if (res) {
        updateNews([...res, ...news]);
        updateIdOne(res[0].id);
      }
    });
  };

  const getNews = useEffect(() => {
    if (remember) {
      updateNews(remember);
      setLoading(false);
      updateIdOne(remember[0].id);
    } else {
      newsService.getAllNews().then((res) => {
        updateNews(res);
        setLoading(false);
        updateIdOne(res[res.length - 1].id);
      });
    }
  }, []);

  const View = () => {
    const newsList = news.map((item) => {
      return <NewsItem key={item.id} {...item} />;
    });
    return (
      <div>
        <ul className="news-list">{newsList}</ul>
      </div>
    );
  };

  return loading ? <Spinner /> : <View />;
};

export default NewsList;
