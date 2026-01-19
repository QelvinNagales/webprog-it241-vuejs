<template>
  <div class="page">
    <h1 class="page-title">Fruits</h1>

    <div class="cards-row">
      <!-- First fruit card (example: Banana) -->
      <div class="fruit-card banana-card">
        <h2 class="fruit-name">Banana</h2>
        <p class="fruit-text">I like Banana</p>
      </div>

      <!-- Second fruit card (example: Watermelon) -->
      <div class="fruit-card watermelon-card">
        <h2 class="fruit-name">Watermelon</h2>
        <p class="fruit-text">I like Watermelon</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FoodItem'
}
</script>

<style scoped>
.page {
  padding: 2rem;
}

.page-title {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

/* layout similar to screenshot: two cards in a row */
.cards-row {
  display: flex;
  gap: 1rem;
}

/* base card style (like the santol/mango & Watermelon boxes) */
.fruit-card {
  padding: 1.5rem;
  border: 2px dashed #000;
  width: 220px;
}

/* Banana = yellow */
.banana-card {
background-color:  #ffeb3b;
}

/* Watermelon = green-ish */
.watermelon-card {
  background-color: #8bc34a;
}

.fruit-name {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.fruit-text {
  font-size: 1.1rem;
}
</style>
