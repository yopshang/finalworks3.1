import { getProducts } from "./action";
import { GETPRODUCTS } from "./mutation";
import { getter } from "./getter";

export default {
    state: {

    },
    action: {
        getProducts,
    },
    getters,
    mutations: {
        GETPRODUCTS,
    }
};