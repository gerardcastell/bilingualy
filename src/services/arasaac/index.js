import axios from 'axios';
import * as Constants from '../../constants'

//follow this pages for axios guide: https://www.codementor.io/@capocaccia/keeping-axios-where-it-belongs-o6xidrkrk

const arasaacApi = axios.create({
    baseURL: Constants.ARASAAC_API
});

async function getPictogramsByText(text) {
    try {
        const response = await arasaacApi.get(`es/search/${text}`)
        return response

    } catch (e) {
        console.log(e.response.status)
        if (e.response.status === 404) {
            return [];
        }
        console.log(`Error searching pictograms: ${e}`)
        return [];
    }
}

async function getPictogramsById(id) {
    const response = await arasaacApi.get(`${id}`,
        { responseType: 'arraybuffer' })
        .then(res => res.blob())
        .then(images => {
            return URL.createObjectURL(images)
        });

    return response;
}

export async function searchPictograms(searchText) {
    try {
        const matches = await getPictogramsByText(searchText);
        if (matches.length) {
            return [];
        } else {
            const responses = matches.data.map(match => `${Constants.ARASAAC_API}${match._id}`)
            return responses;
        }
    } catch (e) {
        console.log(e)
        return []
    }
}