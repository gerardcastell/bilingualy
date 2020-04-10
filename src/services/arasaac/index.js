import axios from 'axios';
import * as Constants from '../../constants'

//follow this pages for axios guide: https://www.codementor.io/@capocaccia/keeping-axios-where-it-belongs-o6xidrkrk

const arasaacApi = axios.create({
    baseURL: Constants.ARASAAC_API
});

async function getPictogramsByText(text) {
    const response = await arasaacApi.get(`es/search/${text}`)
        .then(res => {
            return res
        }).catch(err => {
            console.log(`Error searching pictograms: ${err}`)
            return [];
        })
    return response;
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
    const matches = await getPictogramsByText(searchText);
    const idMatches = matches.data.map(match => match._id);
    if (idMatches.length === 0) {
        return null;
    } else {
        const responses = idMatches.map(match => {
            return `${Constants.ARASAAC_API}${match}`;
        })
        return responses;
    }
}