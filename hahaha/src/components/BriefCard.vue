<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  props: {
    header: String,
    content: String,
    link: String,
  },
})
</script>

<template>
  <div class="brief-card">
    <div class="box">
      <span> </span>
      <div class="content">
        <h2>{{ props.props.header }}</h2>
        <p>{{ props.props.content }}</p>
        <a :href="props.props.link">learn more</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: Consolas;
}
.brief-card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.box {
  position: relative;
  display: flex;
  width: 320px;
  height: 400px;
  justify-content: center;
  align-items: center;
  margin: 40px 30px;
  transition: 0.5s;
}
.content {
  position: relative;
  width: 100%;
  height: 75%;
  left: 0;
  padding: 20px 40px;
  color: white;
  background: rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 1;
  transition: 0.5s;
}
.content h2 {
  font-size: 2em;
  color: white;
  margin-bottom: 10px;
}
.content p {
  font-size: 1.1em;
  line-height: 1.4em;
  margin-bottom: 10px;
}
.content a {
  display: inline-block;
  font-size: 1.1em;
  color: black;
  background: white;
  padding: 10px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 700;
  margin-top: 5px;
  transition: 0.6s;
}
.box:hover .content {
  left: -25px;
  padding: 60px 40px;
}
.content a:hover {
  background: black;
  color: white;
  border-radius: 16px;
  box-shadow: 0 2px 15px black;
}
.box::before,
.box::after {
  content: '';
  position: absolute;
  background: linear-gradient(0deg, var(--secondary-color), var(--primary-color));
  top: 0;
  left: 50px;
  width: 50%;
  height: 100%;
  text-decoration: none;
  border-radius: 8px;
  transform: skewX(15deg);
  transition: 0.5s;
}
.box::after {
  filter: blur(30px);
}
.box:hover::before,
.box:hover::after {
  transform: skewX(0deg);
  left: 20px;
  width: calc(100% - 90px);
}
</style>
