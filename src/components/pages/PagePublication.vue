<template>

    <div>
        <PubNav />
        <!-- <div v-if="error">
        {{ error }}
        </div>
        <ul v-else>
            <li v-for="article in articles" :key="article.id">
                {{ article.titre }}
            </li>
        </ul> -->
        <ArticlesList :articles="articles"></ArticlesList>
    </div>
</template>
<script>
// import axios from 'axios';
import PubNav from "../PublicationsNav.vue";
import ArticlesList from "../ArticlesList.vue";
import gql from "graphql-tag";

export default {
    name: "publications",
    components: {PubNav, ArticlesList},
    data: function() {
        return {
            articles: [],
            error: null
        }
    },
     apollo: {
        articles: gql`
        query Articles {
            articles {
                id
                titre
                contenu
                cover {
                    url
                }
                categories {
                    name
                }
            }
        }
        `
    }
    // async mounted () {
    //     try {
    //         const response = await axios.get('http://localhost:1337/articles')
    //         this.articles = response.data
    //     } catch (error) {
    //         this.error = error;
    //     }
    // },
}
</script>