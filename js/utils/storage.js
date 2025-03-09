// Storage utility functions
const StorageUtil = {
    // Save data to localStorage
    saveData: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    },

    // Get data from localStorage
    getData: function(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Error getting data from localStorage:', error);
            return defaultValue;
        }
    },

    // Remove data from localStorage
    removeData: function(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing data from localStorage:', error);
            return false;
        }
    },

    // Check if data exists in localStorage
    hasData: function(key) {
        return localStorage.getItem(key) !== null;
    },

    // Clear all data from localStorage
    clearAll: function() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    }
};