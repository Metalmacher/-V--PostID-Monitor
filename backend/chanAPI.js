const axios = require('axios');

const client = axios.create({
    baseURL: 'https://a.4cdn.org/',
    json: true
})

module.exports = {
    executeGET (route) {
        route += ".json";
        return client({
            method: 'GET',
            url: route
        }).then(res => {
            return res.data;
        }).catch(error => {
            console.log(error);  
        });
    },
    async fetchAllThreadsOnPage(board, page) {
        let route = `/${board}/${page}`;
        return await this.executeGET(route);
    },
    async fetchThread(board, threadID) {
        let route = `/${board}/thread/${threadID}`
        return await this.executeGET(route);
    },
    async fetchCatalog(board) {
        let route = `/${board}/catalog`;
        return await this.executeGET(route);
    }        
}