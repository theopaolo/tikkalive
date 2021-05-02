<template>
  <div id="app">
    
    <tikkalogo />
    <audioplayer />
    <navbar @pageName="handleCards"></navbar>
    <liveinfo :zindex="zindex"/>
    <TikkaSocials />
    <PrismicPubs/>
    <div class="cardsContainer">
      <router-view :key="$route.fullPath"></router-view>

      <div v-for="card in appCards" :key="card" >
        <card 
          @click="addindex"
          @removeCard="delCard"
          :content="noContent"
          :name="card"
          :pageComponent="pageComps"
        >
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import Tikkalogo from '@/components/TikkaLogo.vue'
import Audioplayer from '@/components/AudioPlay.vue'
import Liveinfo from '@/components/LiveInfo.vue'
import TikkaSocials from '@/components/TikkaSocials.vue'

import Navbar from './components/Navbar.vue'

import Card from '@/components/card.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Card,
    Audioplayer,
    Liveinfo,
    Tikkalogo,
    TikkaSocials
  },

  data: function() {
    return {
      appCards: [],
      pageComps: "",
      noContent: "noContent",
    }
  },

  methods: {
    handleCards(cardName, pageComp){
      if(this.appCards.includes(cardName)) {
        this.appCards = this.appCards.filter(function(card) { return card !== cardName; })
      } else {
        this.appCards.push(cardName)
        this.pageComps = pageComp
      }
    },
    
    delCard(cardName, pageComp){
      this.appCards = this.appCards.filter(function(card) { return card !== cardName; })
      if(this.pageComps === pageComp) {
        this.pageComps = ""
      }
    },
  }
}
</script>

<style lang="scss">
  @import '../public/reset.css';
  @import '../public/main.scss';
  
  .cardsContainer {
    display: flex;
  }
</style>