<template>
  <div class="row justify-center">
    <div class="col-xs-3">
      <q-btn
        icon="mdi-arrow-top-left-thick"
        color="orange"
        flat
        size="xl"
        padding="xs"
        class="full-width text-capitalize"
        @mousedown="clickCmd('UPLEFT')"
      ></q-btn>
    </div>
    <div class="col-xs-3">
      <q-btn
        icon="mdi-arrow-up-thick"
        color="orange"
        flat
        size="xl"
        padding="xs"
        class="full-width text-capitalize"
        @mousedown="clickCmd('UP')"
      ></q-btn>
    </div>
    <div class="col-xs-3">
      <q-btn
        icon="mdi-arrow-top-right-thick"
        color="orange"
        flat
        size="xl"
        padding="xs"
        class="full-width text-capitalize"
        @mousedown="clickCmd('UPRIGHT')"
      ></q-btn>
    </div>
    <div class="col-xs-3">
      <q-btn
        icon="mdi-plus-thick"
        color="orange"
        flat
        size="xl"
        padding="xs"
        class="full-width text-capitalize"
        @mousedown="clickCmd('ZOOMIN')"
      ></q-btn>
    </div>
  </div>
  <div class="row justify-center">
    <div class="col-xs-3">
      <q-btn
        icon="mdi-arrow-left-thick"
        color="orange"
        flat
        size="xl"
        padding="xs"
        class="full-width text-capitalize"
        @mousedown="clickCmd('LEFT')"
      ></q-btn>
    </div>
    <div class="col-xs-3">
      <q-btn
        icon="mdi-home"
        color="orange"
        flat
        size="xl"
        padding="xs"
        class="full-width text-capitalize"
        @mousedown="clickCmd('preset')"
      ></q-btn>
    </div>
    <div class="col-xs-3">
      <q-btn
        icon="mdi-arrow-right-thick"
        color="orange"
        flat
        size="xl"
        padding="xs"
        class="full-width text-capitalize"
        @mousedown="clickCmd('RIGHT')"
      ></q-btn>
    </div>
    <div class="col-xs-3">
      <q-btn
        icon="mdi-camera"
        color="orange"
        flat
        size="xl"
        padding="xs"
        class="full-width text-capitalize"
        @mousedown="clickCmd('screenshot')"
      ></q-btn>
    </div>
  </div>
  <div class="row justify-center">
    <div class="col-xs-3">
      <q-btn
        icon="mdi-arrow-bottom-left-thick"
        color="orange"
        flat
        size="xl"
        padding="xs"
        class="full-width text-capitalize"
        @mousedown="clickCmd('DOWNLEFT')"
      ></q-btn>
    </div>
    <div class="col-xs-3">
      <q-btn
        icon="mdi-arrow-down-thick"
        color="orange"
        flat
        size="xl"
        padding="xs"
        class="full-width text-capitalize"
        @mousedown="clickCmd('DOWN')"
      ></q-btn>
    </div>
    <div class="col-xs-3">
      <q-btn
        icon="mdi-arrow-bottom-right-thick"
        color="orange"
        flat
        size="xl"
        padding="xs"
        class="full-width text-capitalize"
        @mousedown="clickCmd('DOWNRIGHT')"
      ></q-btn>
    </div>
    <div class="col-xs-3">
      <q-btn
        icon="mdi-minus-thick"
        color="orange"
        flat
        size="xl"
        padding="xs"
        class="full-width text-capitalize"
        @mousedown="clickCmd('ZOOMOUT')"
      ></q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'ComponentJoyPad',
  setup(props, { emit }) {
    const clickCmd = (direction: string) => {
      emit('directioncam', direction);
    };
    return { clickCmd };
  },
});
</script>
