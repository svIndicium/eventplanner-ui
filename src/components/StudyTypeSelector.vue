<template>
  <div>
    <div v-for="type in availableTypes" v-bind:key="type['id']">
      <input
        type="checkbox"
        :id="getCheckboxId(type['id'])"
        @change="updateType"
      /><label :for="getCheckboxId(type['id'])">{{ type["name"] }}</label>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "StudyTypeSelector",
  props: {
    onChange: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      selectedTypes: [],
      availableTypes: []
    };
  },
  methods: {
    getCheckboxId(typeId) {
      return "studytype-" + typeId;
    },
    getTypeId(name) {
      return parseInt(name.split("-")[1]);
    },
    updateType(event) {
      const name = this.getTypeId(event.target.id);
      if (this.selectedTypes.indexOf(name) !== -1) {
        this.selectedTypes.pop(name);
      } else {
        this.selectedTypes.push(name);
      }
      this.onChange(this.selectedTypes);
    }
  },
  mounted() {
    axios
      .get("http://localhost:8080/types")
      .then(res => (this.availableTypes = res.data));
  }
};
</script>

<style scoped lang="scss">
</style>
