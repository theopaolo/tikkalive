<template>
<div>
  <vue-draggable-resizable>
    <article class="card">

      <div class="cardHeader">
        <div class="cardTitle">
          {{ $prismic.asText(fields.titre) }} 
          <span class="created-at">{{ Intl.DateTimeFormat('en-US').format(new Date(fields.date)) }}</span>
        </div>
        
        <router-link :to="{ path: '/'}">x</router-link>
      </div>

      <div class="card-content">
        <perfect-scrollbar>
          <prismic-image :field="fields.cover" />
          <prismic-rich-text :field="fields.content"  />
        </perfect-scrollbar>
      </div>

    </article>
  </vue-draggable-resizable>
</div>
</template>
<script>

export default {
  data() {
    return {
      documentId: '',
       fields: {
        title: null,
        date: null,
        cover: null,
        content: null
      },
    };
  },methods: {
    getContent(uid) {
      //Query to get post content
      this.$prismic.client.getByUID('publications', uid)
        .then((document) => {
          if (document) {
            this.documentId = document.id
            this.fields.titre = document.data.titre
            this.fields.date = document.data.date
            this.fields.cover = document.data.couve
            this.fields.content = document.data.contenu
          } 
          else {
            //returns error page
            this.$router.push({ name: 'not-found' })
          }
        })
    }
  },
  created () {
    this.getContent(this.$route.params.uid)
    console.log(this.fields);
  },
  beforeRouteUpdate (to, from, next) {
    this.getContent(to.params.uid)
    next()
  }
};
</script>
<style lang="scss" scoped>

  .cardTitle {
    display: flex;
    flex-direction: column;
  }
  .card-content {
    p, h2 {
      margin-bottom: 1rem;
    }
    img{
      margin-bottom: 2rem;
    }
  }

</style>