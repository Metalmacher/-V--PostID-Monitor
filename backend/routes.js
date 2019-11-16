const chanAPI = require('./chanAPI');
module.exports = function(app) {
    //fetch thread data
    app.get('/board/:board/thread/:threadID', async (req, res) => {
        let board = req.params.board,
            threadID = req.params.threadID;
        let data = await chanAPI.fetchThread(board, threadID);
        res.send(data);
    });

    //fetch board catalog
    app.get('/board/:board/thread/:threadID', async (req, res) => {
        let board = req.params.board;
        let data = await chanAPI.fetchCatalog(board);
        res.send(data);
    });

    //fetch board page data
    app.get('/board/:board/:page', async (req, res) => {
        let board = req.params.board,
            page = req.params.page;
        let data = await chanAPI.fetchAllThreadsOnPage(board, page);
        res.send(data);
    });
}