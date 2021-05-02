<template>
    <div>
       
        <div class="card-content" v-for="article in articles" :key="article.id" >
            <router-link
            :to="{ path: '/article/' + article.id }"
            :key="article.id"
            class="articleUrl"
            >
          
                <div class="articlerow">
                    <p>Titre: {{article.titre}}</p>

                    <span  v-if="article.cover">
                        <img :src="api_url + article.cover.url" alt=""/>
                </span>
                </div>
                

                <p v-for="(category) in article.categories" :key="category.index">
                    {{category.name}}
                </p>
            </router-link>
            <br>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                api_url: process.env.VUE_APP_STRAPI_API_URL,
            };
        },
        props: {
            articles: Array
        }
    }
</script>

<style lang="scss">

    .articlerow {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    span {
        height: 100px;
        width: 100px;
    }
    img{
        border-radius: 8px;
        object-fit: cover;
    }
</style>