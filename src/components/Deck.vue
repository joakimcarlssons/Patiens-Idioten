<template>
  <article class="deck" @click="trashCard">
      <div v-if="cards === undefined || cards.length == 0" class="stack">
          <Card
            :isEmpty="true"
           />
      </div>
        <Card 
        v-for="(card, index) in cards" 
        :key="card.suite+card.value"
        :card="card"
        :style="`z-index: ${index}`"  
        class="stack"
        :faceDown="name == 'trash'"
        @cardDropped="cardDropped"
        />
  </article>
</template>

<script>

import Card from './Card.vue'

export default {
    components: {Card},

    props: {
        cards: Array,
        faceDown: Boolean,
        name : String
    },

    methods: {
      trashCard() {
          this.$emit('trash', [this.cards[this.cards.length - 1], this.name])
      },
      cardDropped(payload) {
        this.$emit('cardDropped', payload, this.name)
      },
    }
}
</script>

<style>

.deck {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(1, 1fr);
}

.stack {
  grid-area: 1 / 1;
}

</style>