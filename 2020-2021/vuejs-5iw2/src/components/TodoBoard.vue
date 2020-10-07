<template>
  <div>
    {{nbCount}}
    <a href="#" @click.ctrl="alertByMethod">By Method</a>
    <a href="#" @click.prevent="alertByComputed">By Computed</a>
    <ul class="board">
      <li v-for="(item, index) in todos" :key="index">{{ index }} {{ item }}</li>
    </ul>
    <button @click="addItem">Add item</button>
  </div>
</template>

<script>
export default {
  name: "Todos",
  props: {
    msg: String,
    theme: String,
    toggleTheme: Function,
  },
  data: () => ({
    todos: [],
  }),
  methods: {
    addItem: function () {
      this.$data.todos.push("Item");
    },
    nbCountMethod: function () {
      console.log("method value");
      return this.$data.todos.length;
    },
    alertByMethod: function () {
      alert(this.nbCountMethod());
    },
    alertByComputed: function () {
      alert(this.nbCount);
    },
  },
  created: () => console.log("created"),
  mounted: () => console.log("mounted"),
  updated: () => console.log("updated"),
  destroyed: () => console.error("destroyed"),
  computed: {
    nbCount: function () {
      console.log("compute value");
      return this.$data.todos.length;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
