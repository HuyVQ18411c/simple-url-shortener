import { createHash } from "crypto";

const URL_PATTERN = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

export function validateUrl(link){
    const isMatched = link.match(new RegExp(URL_PATTERN));
    return isMatched;
}

export function getUrlSlug(data){
    const hasher = createHash("sha256");
    for(const key of data.keys){
        hasher.update(key);
    }

    return hasher.digest('base64').slice(10, 20);
}
