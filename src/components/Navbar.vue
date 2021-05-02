<template>
  <vue-draggable-resizable w="auto" h="auto">
    <div class="navigation boxed">
        <a  
        v-for="(navItem, index) in navItems" 
        :key="'card-'+index" 
        @click="passCardData(navItem.pageComp, $event)"> 
            {{navItem.name}} 
        </a>
    </div>
  </vue-draggable-resizable>
</template>

<script>

export default {
    name: 'navbar',

    data: function() {
        return {
            selected: false,
            selectedItem: null, 
            navItems: [
                {
                    name: 'Programmation',
                    pageComp: 'PageProg'
                }, 
                
                {
                    name: 'About',
                    pageComp: 'PageAbout'
                }, 
                
                {
                    name: 'Archive',
                    pageComp: 'PageArchive'
                }, 
                {
                    name: 'Publications',
                    pageComp: 'PagePublication'
                },
            ]
        }
    },
    methods: {
       passCardData: function(pcomp, event) {
        this.$emit('pageName', event.target.innerText, pcomp);
       }
    },
  }
</script>

<style lang="scss" scoped>
@import "../../public/variable";

    a { padding: 0 .5rem; 
        text-transform: uppercase;
        color: $color3;
      }

    .navigation {
        margin: 1rem auto; 
    }

</style>