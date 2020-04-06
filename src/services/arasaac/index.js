import axios from 'axios';


//follow this pages for axios guide: https://www.codementor.io/@capocaccia/keeping-axios-where-it-belongs-o6xidrkrk

const arasaacApi = axios.create({
    baseURL: 'https://api.arasaac.org/api/pictograms/'
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
    {responseType: 'arraybuffer'})
    .then(res => res.blob())
    .then(images =>{
        return URL.createObjectURL(images)
    });
    // const response = await axios({
    //   method: 'get',
    //   url: `https://api.arasaac.org/api/pictograms/${id}`,
    //   headers: {"accept": "image/png"}
    // })
    
    return response;
}

export async function searchPictograms(searchText) {
    const matches = await getPictogramsByText(searchText);
    const idMatches = matches.data.map(match => match._id);
    if (idMatches.length === 0) {
        return null;
    } else {
        const responses = idMatches.map(match => {
            return `https://api.arasaac.org/api/pictograms/${match}`;
        })
        // const response = await getPictogramsById(idMatches[0])
        // .then(res => {
        //     return res
        // }).catch(err =>{
        //     return err
        // })
        return responses;
    }
}