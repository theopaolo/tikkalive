<template>
  <div>
    <div class="card-content" v-for="document in response.results" :key="document.id">
      <router-link :to="linkResolver(document)" class="articleUrl">  
        <div class="articlerow">
          <p>{{ $prismic.asText(document.data.titre)}}</p>
          <div class='date'>{{document.data.date}}</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PagePublications',
  data() {
    return {
      response: null,
      linkResolver: this.$prismic.linkResolver
    }
  },
  methods: {
    async getContent() {
      // Query the API and assign the response to "response"
      const response = await this.$prismic.client.query(this.$prismic.Predicates.at('document.type','publications'))
      this.response = response
    }
  },
  created() {
    // Call the API query method
    this.getContent()
  }
}
</script>
<style lang="scss" scoped>
@import "../../../public/_variable.scss";
    .articlerow {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border: 1px solid $color3;
        padding: 1rem;
    }
    span {
        height: 100px;
        width: 100px;
    }
    img{
        object-fit: cover;
    }
    .date{ font-size:.8rem}
</style>