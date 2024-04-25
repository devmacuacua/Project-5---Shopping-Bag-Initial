import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    products: [],
    productsInBag: [],
  },
  mutations: {
    loadProducts(state, products) {
      console.log("----mutations---", products);
      state.products = products;
    },
    addToBag(state, product) {
      state.productsInBag.push(product);
    },
    removeFromBag(state, productId) {
      var updatedBag = state.productsInBag.filter(
        (item) => item.id != productId
      );
      state.productsInBag = updatedBag;
    },
  },
  actions: {
    loadProducts({ commit }) {
      axios.get("https://fakestoreapi.com/products").then((Response) => {
        commit("loadProducts", Response.data);
      });
    },

    addToBag({ commit }, product) {
      commit("addToBag", product);
    },

    removeFromBag({ commit }, productId) {
      if (confirm("Are you sure to remove item?")) {
        commit("removeFromBag", productId);
      }
    },
  },
  modules: {},
});
