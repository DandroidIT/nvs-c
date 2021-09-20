<template>
  <q-page class="bg-primary q-pa-sm">
    <q-dialog
      v-model="state.isawait"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-spinner-puff color="red" size="20em" />
    </q-dialog>
    <div class="row q-col-gutter-xs">
      <div
        class="col-lg-6 col-md-6 col-sm-6 col-xs-12"
        v-for="(cam, i) in cams.list"
        :key="i"
      >
        <q-card class="bg-primary active">
          <q-card-section
            class="bg-dark text-center text-white"
            style="padding: 0px"
          >
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-h6">
                  {{ `${cam.name}` }}
                </div>
              </div>
              <div class="col-auto">
                <q-radio
                  @click="setCam(cam)"
                  v-model="selection"
                  :val="cam.id"
                  label=""
                  color="red"
                />
                <q-btn color="grey-7" round flat icon="more_vert">
                  <q-menu cover auto-close>
                    <q-list>
                      <q-item clickable>
                        <q-item-section>
                          <q-btn
                            flat
                            round
                            color="teal"
                            icon="mdi-cctv"
                            :to="'/cam/' + cam.id"
                        /></q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </div>
          </q-card-section>
          <q-card-section class="q-pa-none">
            <canvas
              :class="[selection === cam.id ? 'select' : '']"
              class="full-width"
              :id="'canvas' + cam.id"
              :ref="($el) => (listCanvas[i] = $el)"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div :class="[selection === '' ? 'disabled' : '']">
      <joy-pad @directioncam="clickMove"></joy-pad>
    </div>
  </q-page>
</template>

<style scoped>
.select {
  border-bottom: 4px solid red;
}
.noselect {
  border-bottom: 4px solid green;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import mVideoWall from '../core/model/mvideowall';
import joyPad from 'components/Joypad.vue';
export default defineComponent({
  name: 'pVideoWall',
  components: { joyPad },
  setup() {
    const { state, cams, listCanvas, setCam, clickMove, selection } =
      mVideoWall();

    return {
      selection,
      state,
      cams,
      listCanvas,
      setCam,
      clickMove,
    };
  },
});
</script>
