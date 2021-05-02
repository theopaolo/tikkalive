<template>
  <div>
    <vue-draggable-resizable w="auto" h="auto">
      <h1>TIKKA</h1>
    </vue-draggable-resizable>
  </div>  
</template>

<script>
export default {
  name: "TikkaLogo",
}
</script>
<style lang="scss" scoped>
@import "../../public/variable";
div {
  display: table;
}
  h1 {
    display: table;
    font-size: 4rem;
    line-height: 4rem;
    font-family: 'Trickster', sans-serif;
  }
  a {
    color: $color3;
    &:hover { font-style: normal;}
  }
</style>v