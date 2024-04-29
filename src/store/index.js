import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    products: [],
    productsInBag: [],
  },
  mutations: {
    loadProducts(state, products) {
      state.products = products;
    },
    loadBag(state, products) {
      state.productsInBag = products;
    },
    addToBag(state, product) {
      state.productsInBag.push(product);
      localStorage.setItem(
        "productsInBag",
        JSON.stringify(this.state.productsInBag)
      );
    },
    removeFromBag(state, productId) {
      var updatedBag = state.productsInBag.filter(
        (item) => item.id != productId
      );
      state.productsInBag = updatedBag;
      localStorage.setItem(
        "productsInBag",
        JSON.stringify(this.state.productsInBag)
      );
    },
  },
  actions: {
    loadProducts({ commit }) {
      axios.get("https://fakestoreapi.com/products").then((response) => {
        commit("loadProducts", response.data);
      });
    },
    loadBag({ commit }) {
      if (localStorage.getItem("productsInBag")) {
        commit(
          "loadBag",
          JSON.stringify(localStorage.getItem("productsInBag"))
        );
      }
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
