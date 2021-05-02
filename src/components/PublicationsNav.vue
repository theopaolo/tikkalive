<template>
    <nav>
        <ul v-for="category in categories" :key="category.id">
            <li :class="category.name"
                :key="category.id">
            {{ category.name }}
            </li>
        </ul>
    </nav>
</template>
<script>
import gql from "graphql-tag";

export default {
    name:"pubNav",
    data() {
        return {
            categorie: []
        };
    },
    apollo: {
        categories: gql`
            query Categories {
                categories {
                    id
                    name
                }
            }
        `
    }
};
</script>

<style lang="scss">
    ul { list-style: none;}
    nav {display: flex;}
</style>