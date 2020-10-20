import { findById } from '../common/find-by-id.js';


function newWavform(someArray, someId) {
    const itemNew = findById(pokeData, someId);
    const item = {
        id: someId,
        name: itemNew.pokemon,
        image: itemNew.url_image,
        encountered: 0,
        captured: 0,
    };
    someArray.push(item);
}