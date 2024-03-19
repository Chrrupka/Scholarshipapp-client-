
import axios from './axiosConfig'; // Zaimportuj skonfigurowaną instancję axios

const apiService = {
    createStudent: async (data) => {
        try {
            const response = await axios.post('/student', data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createDetails: async (data) => {
        try {
            const response = await axios.post('/details', data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createAttachment: async (formData) => {
        try {
            // Uwaga: formData to instancja FormData, która zawiera pliki do wysłania
            const response = await axios.post('/attachment', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createApplication: async (data) => {
        try {
            const response = await axios.post('/application', data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Dodatkowe metody związane z innymi endpointami mogą zostać tutaj dodane
};

export default apiService;
