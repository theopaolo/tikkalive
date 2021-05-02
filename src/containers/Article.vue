<template>
<div>
  <vue-draggable-resizable>
    <article class="card">
      <div class="cardHeader">
        <div class="cardTitle">{{ article.titre }}</div>
        <router-link :to="{ path: '/'}">x</router-link>
      </div>
      <div class="card-content">
        <perfect-scrollbar>
        <figure v-if="article.cover">
          <img :src="api_url + article.cover.url" alt="">
        </figure>
         <p v-if="article.published_at">
          {{ moment(article.published_at).format("MMM Do YY") }}
        </p>
        <markdown-it-vue-light v-if="article.contenu" :content="mdcontenturl"/>
        </perfect-scrollbar>
      </div>
    </article>
  </vue-draggable-resizable>
</div>
</template>
<script>
var moment = require("moment");
import MarkdownItVueLight from 'markdown-it-vue/dist/markdown-it-vue-light.umd.min.js'

import gql from "graphql-tag";

export default {
  data() {
    return {
      article: {},
      moment: moment,
      api_url: process.env.VUE_APP_STRAPI_API_URL,
      routeParam: this.$route.params.id,
    };
  },
  components: {
    MarkdownItVueLight
  },
  apollo: {
    article: {
      query: gql`
        query Articles($id: ID!) {
          article(id: $id) {
            id
            titre
            contenu
            cover {
              url
            }
            published_at
          }
        }
      `,
      variables() {
        return {
          id: this.routeParam
        };
      },
    }
  },
  computed: {
    mdcontenturl: function(){
       return this.article.contenu.split('/uploads/').join(`${this.api_url}/uploads/` );
    }
  },
};
</script>
<style lang="scss">
  figure {margin-bottom: 1rem;}
</style>