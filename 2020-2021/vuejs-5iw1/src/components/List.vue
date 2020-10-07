<template>
  <div>
    <h1>List</h1>
    <button @click="alertCountComputed">computed</button>
    <button @click="alertCountMethod">method</button>
    <button @click="addItem">add item</button>
    {{countList}} {{countListMethod()}}
    <ul>
      <li v-for="item in list" :key="item.id">{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "List",
  data: () => ({
    list: [{ id: 1, name: "mon item" }],
  }),
  methods: {
    addItem: function () {
      this.$data.list.push({
        id: Date.now(),
        name: `toto-${this.$data.list.length + 1}`,
      });
    },
    countListMethod: function () {
      console.error("count method");
      return this.$data.list.length;
    },
    alertCountComputed: function () {
      alert(this.countList);
    },
    alertCountMethod: function () {
      alert(this.countListMethod());
    },
  },
  created: () => console.log("created"),
  mounted: () => console.log("mounted"),
  updated: () => console.log("updated"),
  destroyed: () => console.error("destroyed"),
  computed: {
    countList: function () {
      console.error("count computed");
      return this.$data.list.length;
    },
  },
};
</script>