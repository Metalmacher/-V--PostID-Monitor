import Axios from "axios";

const client = Axios.create({
  baseURL: "http://localhost:3000",
  json: true
});

export default {
  executeGET(route) {
    return client({
      method: "GET",
      url: route
    }).then(res => {
      return res.data;
    });
  },
  async getThreads(board, page) {
    return await this.executeGET(`/board/${board}/${page}`);
  },
  async getThread(board, threadID) {
    return await this.executeGET(`/board/${board}/thread/${threadID}`);
  },
  async getCatalog(board) {
    return await this.executeGET(`/board/${board}/catalog`);
  }
};
