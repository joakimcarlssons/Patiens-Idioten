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
        :style="`z-index: ${index}; animation: zoomInDown ${changedPile ? 0 : animationDelay}s;`"
        class="stack"
        :faceDown="name == 'trash'"
        @moveCard="moveCard"
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
        name : String,
        animationDelay : Number,
        changedPile : Boolean
    },
    methods: {

      // Selects the card to be trashed
      trashCard() {
          this.$emit('trash', this.cards[this.cards.length - 1], this.name)
      },

      // Selects the card to be moved
      moveCard(card) {

        // Emitting the card to be added to another pile, also emitting the pile name
        this.$emit('moveCard', card, this.name)
      }
    }
}
</script>

<style lang="scss">
@import url('https://cdn.jsdelivr.net/npm/animate.css@3.5.1');

.deck {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(1, 1fr);
}

.stack {
  grid-area: 1 / 1;
}

</style>