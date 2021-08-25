<template>
  <div class="row justify-center">
    <div class="col-xs-3">
      <q-btn
        icon="mdi-content-save-all"
        color="orange"
        flat
        size="xl"
        padding="xs"
        class="full-width text-capitalize"
        @mousedown="emit('clickpreset', 'save_preset', preset)"
      ></q-btn>
    </div>
    <div class="col-xs-6">
      <q-select
        filled
        label-color="white"
        color="white"
        v-model="preset"
        :options="listPreset"
        class="float-center text-white"
        label="Preset"
        id="selectpreset"
      />
    </div>
    <div class="col-xs-3">
      <q-btn
        icon="mdi-image-filter-center-focus-strong"
        color="orange"
        flat
        size="xl"
        padding="xs"
        class="full-width text-capitalize"
        @mousedown="emit('clickpreset', 'preset', preset)"
      ></q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
export default defineComponent({
  name: 'ComponentPresets',
  setup(props, { emit }) {
    const preset = ref('1');
    const listPreset = ref<Array<string>>([]);
    for (let index = 1; index < 20; index++) {
      listPreset.value.push(`${index}`);
    }

    watch(preset, () => {
      emit('clickpreset', 'preset', preset.value);
    });

    return { emit, preset, listPreset };
  },
});
</script>
