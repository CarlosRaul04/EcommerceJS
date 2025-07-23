const Searches = require('../models/Searches');
const AppError = require('../utils/AppError');

const searchService = {
    saveSearch: async( userId, query ) => {
        if( !query || query.trim() === '') {
            throw new AppError('La búsqueda no puede estar vacia', 400);
        }

        const newSearch = new Searches({ userId, query: query.trim() });
        await newSearch.save();

        return {
            message: 'Busqueda guardada correctamente',
            data: newSearch
        };
    },

    getUserSearches: async( userId, limit = 10) => {
        const searches = await Searches.find({ userId })
            .sort({ createdAt: -1 })
            .limit(limit);
        
        return {
            message: 'Historial de búsquedas obtenido',
            data: searches
        };
    },

    deleteUserSearches: async( userId ) => {
        const result = await Searches.deleteMany({ userId });

        return {
            message: `Se eliminaron ${result.deletedCount} búsquedas del usuario`
        };
    }
};

module.exports = searchService;