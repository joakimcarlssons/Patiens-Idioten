<template>
  <main>

    <div class="top">
        <Deck
        v-for="(deck, index) in playDecks"
        :key="index"
        :name="deck.name"
        :cards="deck.cards"
        @trash="trashCard"
        />
    </div>

    <div class="bottom">

        <span @click="takeFour">
        <Deck
        :cards="mainDeck"
        />
        </span>

        <Deck
        :cards="trashDeck"
        :name="'trash'"
         />

    </div>

  </main>
</template>

<script>

import Deck from '@/components/Deck'
import * as Game from '@/game.js'

export default {
    data(){ return {

        // Deck to get cards from
        mainDeck : [],

        // Deck to throw cards in
        trashDeck: [],

        // Top 4 decks
        playDecks: [
        {"name":"Pile1", "cards":[]}, 
        {"name":"Pile2", "cards":[]}, 
        {"name":"Pile3", "cards":[]}, 
        {"name":"Pile4", "cards":[]}],

        // Trashable cards
        trashables : []
    }},
    components: {Deck},
    computed: {
        topCards() {
            return Game.getTopCards(this.playDecks)
        }
    },

    created() {
        this.mainDeck = Game.shuffle(Game.fillDeck())
    },
    methods: {
        takeFour(){
            Game.takeFour(this.mainDeck, this.playDecks)
            this.trashables = Game.checkForTrashables(this.playDecks)
        },
        trashCard(item) {

            // Item[0] = The card to be trashed
            // Item[1] = The name of the Pile to remove from


            for(let i = 0; i < this.trashables.length; i++) {
                if(this.trashables[i] == item[0]) {

                    // Get the correct card array
                    let cardArr = this.playDecks.find(x => x.name == item[1]).cards
                    
                    // Add the card to the trash array
                    this.trashDeck.push(item[0])

                    // Remove the card from the pile
                    cardArr.splice(cardArr.indexOf(
                        cardArr.find(x => x == item[0])
                    ), 1)
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>

main {
    display: flex;
    flex-direction: column;

    .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .bottom {
        display: flex;
        justify-content: space-between;
    }

}

</style>
