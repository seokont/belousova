import * as axios from "axios";
import "babel-polyfill"
let instance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",

})


export const getPosts = {
    getPostsArgument(args) {
        return instance.get(`/${args}/`)
    },
}
