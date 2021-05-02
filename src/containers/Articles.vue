<template>
    <div>
      <h1>articles</h1>
        <div
            v-if="article.cover"
            class="banner"
            :data-src="api_url + article.cover.url"
        ></div>
           <h1 class="articleTile">{{ article.titre }}</h1>
          <div>
              <vue-markdown-it
              v-if="article.contenu"
              :source="article.contenu"
              id="editor"
              />
              <p v-if="article.published_at">
              {{ moment(article.published_at).format("MMM Do YY") }}
              </p>
        </div>
    </div>
</template>
<script>
var moment = require("moment");
import VueMarkdownIt from "vue-markdown-it";
import gql from "graphql-tag";

export default {
  data() {
    return {
      article: {},
      moment: moment,
      api_url: process.env.VUE_APP_STRAPI_API_URL,
      routeParam: this.$route.params.id
    };
  },
  components: {
    VueMarkdownIt
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
      }
    }
  }
};
</script>