class NewsService {
  getResourse = async (url, name, value) => {
    let formData = new FormData();
    formData.append("actionName", "MessagesLoad");
    formData.append(name, value);
    // formData.append("messageId", 0);
    // for (let [key, value] of formData) {
    //   console.log(`${key} - ${value}`);
    // }

    // formData.append("messageId", 0);
    const res = await fetch(`${url}`, {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body: formData,
    });

    let result = await res.json();
    return result.Messages;
  };

  getAllNews = async () => {
    const res = await this.getResourse(
      "http://a0830433.xsph.ru/",
      "messageId",
      "0"
    );
    // console.log(res);
    // console.log(res[res.length - 1].id);
    return res;
    // return this._transformNews(res);
  };

  getOneNews = async (id) => {
    // console.log(id);
    const res = await this.getResourse(
      "http://a0830433.xsph.ru/",
      "messageId",
      id
    );
    // console.log(res);
    return res;
    // return this._transformNews(res);
  };
}

export default NewsService;
