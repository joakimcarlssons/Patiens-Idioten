<template>
  <main>

    <div class="top">
        <Drop v-for="(deck, index) in playDecks" 
            :key="index"
            @drop="findDeck(deck.name)">
            <div>
                    <Deck
                    :name="deck.name"
                    :cards="deck.cards"
                    @trash="trashCard"
                    @cardDropped="cardDropped"
                    />
            </div>
        </Drop>
    </div>

    <div class="bottom">

        <span @click="takeFour">
        <Deck
        :cards="mainDeck"
        />
        <p>Cards left: {{cardsLeft}}</p>
        </span>

        <Deck
        :cards="trashDeck"
        :name="'trash'"
         />
    </div>

    <transition enter-active-class="animated fadeInLeft slow">
        <div class="footer" v-if="cardsLeft == 0">
            <p>YOU LOSE IDIOT</p>
            <button @click="playAgain">
                Another?
            </button>
        </div>
    </transition>

  </main>
</template>

<script>

import Deck from '@/components/Deck'
import * as Game from '@/game.js'
import {Drop} from 'vue-drag-drop'

export default {
    data(){ return {

        deckToDropTo: String,
        retry: 1,

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
        trashables : [],

        cardsLeft: 52,
    }},
    components: {Deck, Drop},
    computed: {
        topCards() {
            return Game.getTopCards(this.playDecks)
        }
    },

    created() {
        this.mainDeck = Game.shuffle(Game.fillDeck())
    },
    beforeUpdate() {
        this.trashables = Game.checkForTrashables(this.playDecks)
    },

    methods: {
        takeFour(){
            Game.takeFour(this.mainDeck, this.playDecks)
            this.trashables = Game.checkForTrashables(this.playDecks)
            this.cardsLeft -= 4
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
        },
        playAgain() {
            this.$emit('test', this.retry)
            this.retry++
        },
        cardDropped(card) {
            
            //TODO
            removeCardFromPile()
            let deckToAddTo = this.playDecks.find((x) => x.name == this.deckToDropTo)
                
            if(deckToAddTo.cards.length == 0) {
            

                deckToAddTo.cards.push(card)
            }
        },
        findDeck(name) {
            this.deckToDropTo = name
        },
        removeCardFromPile(card, name) {
            let deckToRemoveFrom = this.playDecks.find((x) => x.name == name) 
            deckToRemoveFrom.cards.splice(deckToRemoveFrom.cards.indexOf(card), 1)
        }
    },
}
</script>

<style lang="scss" scoped>
@import url('https://cdn.jsdelivr.net/npm/animate.css@3.5.1');

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

p { 
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: 700;
    font-size: 2rem;
    padding-left: 4rem;
}

.footer {
    text-align: center;
    p {
        font-size: 14rem;
    }
}
.slow {
    animation-duration: 2s;    
}

</style>
