import axios from 'axios';

export const getOfferCount = async (url: string) => {
    try {
        const response = await axios.get(url);
        return response.data.count;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getRegisteredEnterprises = async () => {
    try {
        const response = await axios.get(process.env.REACT_APP_ADMIN as string);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getSingleOfferDetails = async (url: string) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getAllEnterpriseOffers = async (url: string) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteEnterpriseOffer = async (url: string) => {
    try {
        await axios.delete(url);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const registerEnterprise = async (username: string, password: string) => {
    try {
        await axios.post(process.env.REACT_APP_REGISTER as string, {username: username, password: password});
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const loginEnterprise = async (username: string, password: string) => {
    try {
        const response = await axios.post(process.env.REACT_APP_LOGIN as string, {username: username, password: password});
        
        if (response.data.auth) {
            return {auth: true};
        } else {
            return {admin: true};
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const submitUserFeedback = async (url: string, name: string, comment: string) => {
    try {
        const response = await axios.post(url, {name: name, comment: comment});
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getLocationsBasedOnOffers = async () => {
    try {
        const response = await axios.get(process.env.REACT_APP_GET_OFFER_LOC as string);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getAllOffers = async () => {
    try {
        const response = await axios.get(process.env.REACT_APP_GET_OFFERS as string);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
