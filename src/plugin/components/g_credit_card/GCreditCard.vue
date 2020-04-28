<template lang="html">
  <div class="g-credit-card p-4 text-white rounded shadow-md">
    <div class="card-header flex justify-between">
      <span>{{ card.funding | capitalize }} Card</span>
      <img v-if="cardBrandAvailable" :src="cardIconSrc" alt="credit card icon">
    </div>
    <div class="card-number">
      <span class="mr-1" v-for="n in 3" :key="n">
        <g-icon
          name="fas fa-star-of-life"
          size="small"
          color="white"
          class="number-mask mr-1"
          v-for="n in 4"
          :key="n"
        />
      </span>
      <span class="last4">{{ card.last4 }}</span>
    </div>
    <div class="card-footer flex justify-between">
      <span>{{ userName | upcase }}</span>
      <span>Exp: {{ `${card.exp_month}/${card.exp_year}`}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GCreditCard',

  props: {
    card: { type: Object, required: true },
  },

  data() {
    return {
      cardBrands: [
        'amazon', 'american_express', 'cirrus', 'direct_debit', 'maestro',
        'mastercard', 'paypal', 'sage', 'shopify', 'visa', 'visa_electro',
        'western_union', 'worldpay',
      ],
    };
  },

  computed: {
    cardBrandAvailable() {
      return (this.cardBrands.indexOf(this.cardBrand) !== -1);
    },

    cardIconSrc() {
      return require(`../../assets/images/credit_cards/dark/${this.cardBrand}.png`)
    },

    cardBrand() {
      return this.card.brand.toLowerCase();
    },

    userName() {
      if (this.currentUser) return this.currentUser.name
      return 'Your card'
    }
  },
};
</script>

<style lang="css" scoped>
.g-credit-card {
  background: rgb(237,116,92);
  background: linear-gradient(315deg, rgba(237,116,92,1) 0%, rgba(255,170,90,1) 100%);
}
.card-header {
  & img {
    width: auto;
    height: 40px;
  }
}
.card-number {
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
