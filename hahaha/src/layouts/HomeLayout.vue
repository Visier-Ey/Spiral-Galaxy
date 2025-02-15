<script setup>

</script>

<template>
<main>
  <div class="edge"></div>
  <div class="wrapper">
    <div class="constraint">

    </div>
  </div>
</main>
</template>

<style scoped>
main {
  display: block;
  position: relative;
  top: -20px;
  width: 100%;
  height: auto;
}
.edge{
  position: absolute;
  top: -180px;
  left: 0;
  width: 0;
  height: 0;
  border-left: var(--primary-theme) 1000px solid;
  border-bottom: var(--primary-theme) 100px solid;
  border-right: transparent 100px solid;
  border-top: transparent 100px solid;
}
.wrapper{
  position: relative;
  width: 100%;
  height: 3100px;
  background: var(--primary-theme);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.constraint{
  margin-top: auto;
  width: 80%;
  height: 98%;
  border-left: 1px solid var(--secondary-theme);
  border-right: 1px solid var(--secondary-theme);
}
</style>
