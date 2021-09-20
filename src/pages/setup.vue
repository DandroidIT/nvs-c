<template>
  <q-page class="bg-primary q-pa-sm">
    <q-dialog
      v-model="state.isawait"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-spinner-puff color="red" size="20em" />
      <!--  -->
    </q-dialog>
    <q-card dark="" v-if="!state.success">
      <q-card-section>
        <q-icon name="mdi-alert" color="red" size="34px"></q-icon>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ state.msgError }}
      </q-card-section>
    </q-card>
    <q-stepper
      v-model="stepN"
      ref="stepper"
      dark
      class="bg-grey-10"
      active-color="deep-orange"
      done-color="orange"
      animated
    >
      <q-step
        :name="1"
        title="Start Radar"
        :caption="stepN === 1 ? 'push to start' : ''"
        icon="settings"
        :done="stepN > 1"
      >
        <div class="row items-start q-gutter-md">
          <q-responsive :ratio="16 / 9" class="col">
            <div class="rounded-borders bg-primary text-white flex flex-top">
              <q-btn
                icon="mdi-radar"
                size="55px"
                color="orange"
                flat
                padding="xs"
                class="full-width text-capitalize"
                @mousedown="startRadar()"
              ></q-btn>
            </div>
          </q-responsive>
        </div>
      </q-step>
      <q-step
        :name="2"
        title="View Result"
        :caption="!probeCams.length ? 'No cams' : `Cams n.${probeCams.length}`"
        icon="mdi-format-list-checks"
        :done="stepN > 2"
      >
        <q-list dark padding bordered class="rounded-borders" style="">
          <q-expansion-item
            group="somegroup"
            v-for="(cam, i) in probeCams"
            :key="i"
            :disable="cam.exist"
          >
            <template v-slot:header>
              <q-item-section
                side
                class="q-pa-lg q-mr-none"
                style="background-color: #464646"
              >
                <q-icon :name="'mdi-cctv'" color="orange" size="34px"></q-icon>
              </q-item-section>

              <q-item-section class="q-pa-md q-ml-none text-white">
                <q-item-label class="text-white text-weight-bolder"
                  >{{ cam.name }}
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <div class="row items-center">
                  <q-icon
                    v-if="!cam.exist"
                    name="mdi-new-box"
                    color="red"
                    size="34px"
                  />
                </div>
              </q-item-section>
            </template>
            <q-card class="bg-grey-9" v-if="!cam.exist">
              <q-card-section>
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <q-input
                    class=""
                    dark=""
                    filled
                    v-model="cam.name"
                    label="Cam name"
                    lazy-rules
                    :rules="[(val) => !!val || 'Field is required']"
                  />
                  <q-input
                    class=""
                    dark=""
                    filled
                    v-model="cam.username"
                    label="Username"
                    lazy-rules
                    :rules="[(val) => !!val || 'Field is required']"
                  />
                  <q-input
                    class=""
                    dark=""
                    filled
                    v-model="cam.password"
                    label="Password"
                    lazy-rules
                    :rules="[(val) => !!val || 'Field is required']"
                  />
                  <q-btn @click="clickSave(cam)">Save</q-btn>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </q-step>
      <!--      <q-step :name="3" title="Finish" icon="mdi-check-outline">
        Setup Finish
      </q-step> -->
      <template v-slot:navigation>
        <q-stepper-navigation>
          <!-- v-if="step > 2"-->
          <!-- <q-btn @click="navTabs()" color="deep-orange" label="Finish" /> -->
          <q-btn
            v-if="stepN > 1"
            flat
            color="deep-orange"
            @click="navTabs('prev')"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import mSetup from '../core/model/msetup';
export default defineComponent({
  name: 'pSetup',
  setup() {
    const { stepN, probeCams, state, navTabs, startRadar, saveCamProbe } =
      mSetup();

    return {
      stepN,
      startRadar,
      state,
      navTabs,
      probeCams,
      clickSave: saveCamProbe,
    };
  },
});
</script>
