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
    <q-card dark="" v-if="!state.success">
      <q-card-section>
        <q-icon name="mdi-alert" color="red" size="34px"></q-icon>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ state.error }}
      </q-card-section>
    </q-card>
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <div v-if="cam" class="row">
        {{ `${cam.name}` }}
      </div>
    </div>
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <canvas class="full-width full-height" id="videostream"></canvas>
    </div>
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <q-item dense="">
        <q-item-section avatar>
          <q-icon color="orange" name="volume_up" />
        </q-item-section>
        <q-item-section>
          <q-slider
            v-model="JSMpegPlayer.volume"
            :min="0"
            :max="100"
            label
            color="orange"
          />
        </q-item-section>
      </q-item>
    </div>

    <!--<div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <q-knob
          v-if="JSMpegPlayer"
          show-value
          class="text-white q-ma-md"
          v-model="JSMpegPlayer.volume"
          size="60px"
          :thickness="0.2"
          color="orange"
          center-color="grey-8"
          track-color="transparent"
        >
          <q-icon name="volume_up" />
          {{ JSMpegPlayer.volume }}
        </q-knob> -->
    <!-- </div>
      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6"> 
      </div>
    </div>-->

    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <q-card class="bg-primary">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey dark"
          active-color="white"
          indicator-color="red"
          align="justify"
          narrow-indicator
        >
          <q-tab name="home" label="Joy" />
          <q-tab name="presets" label="Presets" />
          <q-tab name="setting" label="Setting" />
          <q-tab
            name="screenshot"
            :label="`ScreenShot (${screenshots.length})`"
          />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tab" animated class="bg-primary">
          <q-tab-panel name="home">
            <joy-pad @directioncam="clickMove"></joy-pad>
          </q-tab-panel>
          <q-tab-panel name="presets">
            <presets @clickpreset="clickMove" />
          </q-tab-panel>
          <q-tab-panel name="setting">
            <div class="row justify-center">
              <div class="col-xs-6">
                <q-list>
                  <q-item tag="label" class="text-white" v-ripple>
                    <q-item-section avatar>
                      <q-toggle
                        icon="mdi-motion-sensor"
                        size="80px"
                        color="orange"
                        v-model="cam.motion"
                        @click="changeSetting('livemotion', cam.motion)"
                      />
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
              <div class="col-xs-6">
                <q-list>
                  <q-item
                    tag="label"
                    class="text-white justify-center"
                    v-ripple
                  >
                    <q-item-section avatar>
                      <q-toggle
                        icon="mdi-record-rec"
                        size="80px"
                        color="orange"
                        v-model="cam.liveH24"
                        @click="changeSetting('live24', cam.liveH24)"
                      />
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
            <div class="row justify-center">
              <div class="col-xs-12">
                <q-list
                  v-for="(val, index) in cam.information"
                  :key="index"
                  dense
                >
                  <q-item class="text-white" v-show="val[1]"
                    >{{ val[0] }}: {{ val[1] }}</q-item
                  >
                </q-list>
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel name="screenshot">
            <div
              class="col-lg-12 col-md-12 col-sm-12 col-xs-12"
              v-for="(img, i) in screenshots"
              :key="i"
            >
              <img class="full-width" :src="img" />
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import mCams from '../core/model/mcams';
import joyPad from 'components/Joypad.vue';
import presets from 'components/Presets.vue';

export default defineComponent({
  name: 'pCam',
  components: { joyPad, presets },
  setup() {
    const {
      state: state,
      tab,
      JSMpegPlayer,
      cam,
      screenshots,
      getScreenshot,
      clickMove,
      changeSetting,
    } = mCams();

    return {
      tab,
      state,
      JSMpegPlayer,
      cam: cam,
      screenshots,
      getScreenshot,
      clickMove,
      changeSetting,
    };
  },
});
</script>
