<template>
  <div>
    <vue-draggable-resizable class='playerContainer'  w="auto" h="auto" :resizable="false">
      <div class="player">
        <div class="player-controls">
          <div id="play">
            <span @click.prevent="playing = !playing"
              :title="(playing) ? 'Pause' : 'Play'" >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path v-if="!playing"
                  fill="currentColor" d="M15,10.001c0,0.299-0.305,0.514-0.305,0.514l-8.561,5.303C5.51,16.227,5,15.924,5,15.149V4.852c0-0.777,0.51-1.078,1.135-0.67l8.561,5.305C14.695,9.487,15,9.702,15,10.001z" />
                <path v-else
                  fill="currentColor" d="M15,3h-2c-0.553,0-1,0.048-1,0.6v12.8c0,0.552,0.447,0.6,1,0.6h2c0.553,0,1-0.048,1-0.6V3.6C16,3.048,15.553,3,15,3z M7,3H5C4.447,3,4,3.048,4,3.6v12.8C4,16.952,4.447,17,5,17h2c0.553,0,1-0.048,1-0.6V3.6C8,3.048,7.553,3,7,3z"/>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </vue-draggable-resizable>
    <audio
      ref="audio"
      v-bind:src="audioSource"
      type="audio/mpeg"
      v-on:pause="playing = false"
      v-on:play="playing = true"
      preload="auto"
    >
    </audio>
  </div>
</template>

<script>

export default {
  name: 'Audioplayer',
  data() {
    return {
      audioSource: "https://objective-hypatia-e06e41.netlify.app/api/_a",
      playing: false,
      volume: 100
    }
  },
  watch: {
    playing(value) {
      if (value) {
        return this.$refs.audio.play();
      }
      this.$refs.audio.pause();
    }
  },
}
</script>

<style lang="scss"  >
@import "../../public/variable";
.playerContainer {
  color:$color3 ;
  // border-radius: 100pc;
  // border: 0.5px solid;
  display: table;
}
.player {
&:hover{cursor: move;}
div {
    display: block;
    line-height: 0;
    text-decoration: none;
   
    svg {
        display: inline-block;
        width: 5rem;
        &:hover{
          cursor: pointer;
          color: $color2;
        }
    }
	}
}
</style>