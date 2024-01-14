<template>
  <div>
    <h2>Корзина</h2>
    <ul>
      <li v-for="(item, index) in cartItems" :key="index">
        {{ item.name }} - {{ item.price }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartItems: []
    };
  },
  mounted() {
    this.loadCartItems();
  },
  methods: {
    addToCart(item) {
      this.cartItems.push(item);
      this.saveCartItems();
    },
    saveCartItems() {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    },
    loadCartItems() {
      const items = localStorage.getItem('cartItems');
      if (items) {
        this.cartItems = JSON.parse(items);
      }
    }
  }
};
</script>