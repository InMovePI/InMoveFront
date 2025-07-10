<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  items: {
    type: Object,
    required: true,
  },
  search: {
    type: Function,
    required: true,
  },
  itemText: {
    type: String,
    default: "nome",
  },
  placeholder: {
    type: String,
    default: "Digite para pesquisar",
  },
});

const handleKeyDown = (event) => {
  if (!searching.value) return;

  const items = Object.values(props.items);
  const totalItems = items.length;

  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();
      selectedItemIndex.value = (selectedItemIndex.value + 1) % totalItems;
      break;
    case "ArrowUp":
      event.preventDefault();
      selectedItemIndex.value = (selectedItemIndex.value - 1 + totalItems) % totalItems;
      break;
    case "Enter":
      if (selectedItemIndex.value >= 0) {
        const selectedItem = items[selectedItemIndex.value];
        selectItem(selectedItem);
      }
      break;
    case "Escape":
      searching.value = false;
      selectedItemIndex.value = -1;
      break;
  }
};

const model = defineModel();
const value = ref(model.value || "");

const searching = ref(false);
const timer = ref(null);

const selectItem = (item) => {
  model.value = item.id;
  value.value = item[props.itemText];
  searching.value = false;
};

const filterItems = (event) => {
  const searchTerm = event.target.value;
  value.value = searchTerm;
  clearTimeout(timer.value);
  timer.value = setTimeout(() => {
    props.search(searchTerm);
  }, 500);
};

const selectedItemIndex = ref(-1); // Novo estado para rastrear o item selecionado

const openSearch = () => {
  searching.value = true;
  document.getElementById("autocomplete-list").focus();
};

// watch(value, (newValue) => {
//   model.value = newValue;
// });

// watch(model, (newValue) => {
//   value.value = newValue;
// });
</script>
<template>
  <div @keydown="handleKeyDown">
    <div class="autocomplete">
      <input
        @input="filterItems"
        :value="value"
        type="text"
        :placeholder="props.placeholder"
        @focus="openSearch"
      />
      <ul v-show="searching" id="autocomplete-list" class="autocomplete-list">
        <li
          v-for="(item, index) in props.items"
          :key="item.id"
          @click="selectItem(item)"
          :class="{ 'selected-item': selectedItemIndex === index }"
          tabindex="0"
        >
          {{ item[props.itemText] }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.autocomplete {
  position: relative;
  display: inline-block;
}

.autocomplete-list {
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  width: 100%;
  z-index: 1000;
}
.autocomplete-list li {
  padding: 10px;
  cursor: pointer;
  z-index: 1001;
}
.autocomplete-list li:hover {
  background-color: #f0f0f0;
}

.selected-item {
  background-color: #e3f2fd;
  color: #1976d2;
}
</style>
