const searchService = require('../services/search.service');

exports.saveSearch = async(req, res, next) => {
    try {
        const userId = req.user.id;
        const { query } = req.body;
        const result = await searchService.saveSearch(userId, query);
        res.status(201).json(result);
    } catch (err) {
        next(err)
    }
};

exports.getUserSearches = async(req, res, next) => {
    try {
        const userId = req.user.id;
        const limit = parseInt(req.query.limit) || 10;

        const result = await searchService.getUserSearches(userId, limit);
        res.json(result);
    } catch (err) {
        next(err)
    }
}

exports.deleteUserSearches = async(req, res, next) => {
    try {
        const userId = req.user.id;

        const result = await searchService.deleteUserSearches(userId);
        res.status(200).json(result);
    } catch (err) {
        next(err)
    }
}