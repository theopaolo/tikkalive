<template v-slot:header>
  <vue-draggable-resizable>
    <article class='card'>
        <div class="cardHeader">
          <div class="cardTitle">{{name}}</div>
          <div class="cardClose" @click="removeCard()">x</div>
        </div>
        <div class="cardContent" >
          <component :is="getPageComp"></component>
        </div>
    </article>
  </vue-draggable-resizable>
</template>

<script>
import PageProg from '@/components/pages/PageProg.vue'
import PageArchive from '@/components/pages/PageArchive.vue'
import PageAbout from '@/components/pages/PageAbout.vue'
import PagePublication from "@/components/pages/PagePublication.vue"

export default {
  name: 'carte',
  components: {
    PageProg,
    PageArchive,
    PageAbout,
    PagePublication
  },
  props: {
    name: String,
    content: String,
    pageComponent: String
  },
  data() {
    return {
      myContent: "Parent component data or var",
      getPageComp: this.pageComponent,
    }
  },
  methods: {
    removeCard: function () {
      this.$emit('removeCard', this.name, this.pageComponent)
    }
  },
}
</script>

<style scoped lang='scss'>
  button {
      margin-right: .5rem;
      margin-bottom: 1rem;
  }
</style>