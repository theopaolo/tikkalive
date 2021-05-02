<template>
  <div>   
    <div class="card-content" v-for="article in articles" :key="article.id" >
        <router-link :to="{ path: '/article/' + article.id }" :key="article.id" class="articleUrl">   
          <div class="articlerow">
            <p> {{article.titre}}</p>
          </div>
        </router-link>
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

<style lang="scss" scoped>
@import "../../public/variable";
    .articlerow {
        display: flex;
        flex-direction: row;
        align-items: center;
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
</style>