<template>
  <div @click="zindex += 10" :style="addzindex">
    <vue-draggable-resizable w="auto" h="auto">
      <section v-if="errored" class="winbox">
        <p>Pas de tracks à l'instant présent. Revenir un peu plus tard 💛</p>
      </section>
     
      <section class='winbox' v-else >
        <div class='track tracka'>
          <div class='now nownext'>now</div>
          <marquee-text :repeat="10">
            {{currentName}}
          </marquee-text>
        </div>
        
        <div class='track trackb'>
          <div class='next nownext'>next</div>
          <marquee-text :repeat="10" :reverse="true">
            {{nextName}}
          </marquee-text>
        </div>
      </section>
    </vue-draggable-resizable>
  </div>  
</template>

<script>
export default {
  name: "liveinfo",
  props: ['zindex'],
  data() {
    return {
      loading: false,
      livedata: [],
      current: "",
      next: "",    
      errored: false,
      errorMessage: []
    }
  },
  mounted() {
    fetch("https://tikkalibre.xyz/api/live-info")
    .then(async response => {
      this.livedata = await response.json();
      
      this.current = this.livedata.current['name']
      this.next = this.livedata.next['name']
 
      // check for error response
      if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (this.progData && this.progData.message) || response.statusText;
          return Promise.reject(error);
      }
    })
    .catch(error => {
        this.errorMessage = error;
        console.error("There was an error!", error);
        this.errored = true
    })
    .finally(() => this.loading = false);  
  },
  computed: {
    currentName: function(){
      return this.current.replace(".mp3",'')
    },
    nextName: function(){
      return this.next.replace(".mp3",'')
    },
    addzindex() {
      return {
        "z-index": this.zindex
      };
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../public/variable"; 
 .winbox{
    width: 30vw;
    p{
      padding:1rem
    }
  }

  .track{
    height:3rem;
    display: flex;
    align-items: center;
  }

  .trackb {
    display: flex;
    justify-content: flex-end;
  }

  .nownext{
    color: $color3;
    z-index: 999;
    font-size: 1rem;
    line-height: 1rem;
    position: absolute;
    background-color: black;
  }

  .marquee-text-text{
    text-transform: uppercase;
    padding: 0 8px;
  }
</style>