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
    <q-card dark="" class="bg-transparent no-shadow no-border">
      <!-- content -->
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <q-btn-toggle
            v-model="selectCam"
            spread
            no-caps
            toggle-color="orange"
            color="white"
            text-color="black"
            :options="listCams"
          />
        </div>
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <q-date
            class="full-width full-height"
            today-btn
            minimal
            event-color="red"
            v-model="selectDay"
            :events="listDateAlarmsString"
            :emit-immediately="true"
            @update:model-value="clickDay"
            dark
            color="orange"
            mask="YYYY-MM-DD"
          />
        </div>

        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <q-toolbar
            v-show="AlarmsDetlist.length > 0"
            class="bg-primary text-white shadow-2"
          >
            <q-toolbar-title class="text-caption">
              <q-icon name="mdi-clipboard-list-outline" color="orange"></q-icon>
              <!--  day: {{ selectDay }}<br /> -->
              Items n. {{ AlarmsDetlist.length }}
            </q-toolbar-title>
            <q-space />
            <q-toolbar-title class="text-caption text-right">
              <q-icon name="mdi-calendar" color="orange"></q-icon>
              {{ selectDay }}
            </q-toolbar-title>
          </q-toolbar>
          <q-virtual-scroll
            style="max-height: 600px"
            :items="AlarmsDetlist"
            separator
          >
            <template v-slot="{ item, index }">
              <q-item :key="index" clickable @click="viewDet(item.id)">
                <q-item-section avatar>
                  <q-icon
                    name="mdi-alarm-check"
                    color="orange"
                    style="font-size: 1.9rem"
                  ></q-icon>
                </q-item-section>
                <q-item-section>
                  {{ item.namecam }}
                  {{ helpers.dataIsoTo(item.stamptime, 'time') }}
                </q-item-section>
              </q-item>
              <q-separator spaced inset="item" />
            </template>
          </q-virtual-scroll>
          <q-dialog
            v-model="openDialog"
            :maximized="maximizedToggle"
            transition-show="slide-up"
            transition-hide="slide-down"
          >
            <q-card class="bg-primary text-white">
              <q-bar>
                <q-space />

                <q-btn
                  dense
                  flat
                  icon="minimize"
                  @click="maximizedToggle = false"
                  :disable="!maximizedToggle"
                >
                  <q-tooltip
                    v-if="maximizedToggle"
                    class="bg-white text-primary"
                    >Minimize</q-tooltip
                  >
                </q-btn>
                <q-btn
                  dense
                  flat
                  icon="crop_square"
                  @click="maximizedToggle = true"
                  :disable="maximizedToggle"
                >
                  <q-tooltip
                    v-if="!maximizedToggle"
                    class="bg-white text-primary"
                    >Maximize</q-tooltip
                  >
                </q-btn>
                <q-btn dense flat icon="close" v-close-popup>
                  <q-tooltip class="bg-white text-primary">Close</q-tooltip>
                </q-btn>
              </q-bar>

              <q-card-section>
                <div class="row">
                  <div class="col-xs-3">
                    <q-btn
                      label="prev"
                      icon="mdi-arrow-left-bold"
                      color="orange"
                      flat
                      size="xl"
                      padding="xs"
                      class="float-left full-width text-capitalize"
                      @mousedown="navigateAlarms('left')"
                    ></q-btn>
                  </div>
                  <div class="col-xs-6">
                    <q-item class="text-white">
                      <q-item-section class="text-center">
                        <q-item-label>
                          <div class="text-h6">
                            {{ alarmDet.namecam }}
                          </div>
                        </q-item-label>
                        <q-item-label caption class="text-white">
                          {{ alarmDet.stamptime }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </div>
                  <div class="col-xs-3">
                    <q-btn
                      label="next"
                      icon-right="mdi-arrow-right-bold"
                      color="orange"
                      flat
                      size="xl"
                      padding="xs"
                      class="float-right full-width text-capitalize"
                      @mousedown="navigateAlarms('right')"
                    ></q-btn>
                  </div>
                </div>
              </q-card-section>
              <q-card-section class="q-pt-none">
                <div class="row q-col-gutter-sm q-py-sm">
                  <div
                    class="col-lg-6 col-md-6 col-sm-12 col-xs-12"
                    v-for="(img, i) in alarmDet.datarif.split('|')"
                    :key="i"
                  >
                    <img class="full-width" :src="img" />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-dialog>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import mAlarms from '../core/model/mcalendaralarms';
import { helpers } from '../core/lib/helpers';
export default defineComponent({
  name: 'pCalendarAlarms',
  setup() {
    const {
      openDialog,
      alarmDet,
      state,
      selectDay,
      selectCam,
      listCams,
      clickDay,
      viewDet,
      navigateAlarms,
      listDateAlarmsString,
      AlarmsDetlist,
    } = mAlarms();

    return {
      navigateAlarms,
      alarmDet,
      openDialog,
      maximizedToggle: ref(true),
      AlarmsDetlist,
      viewDet,
      helpers,
      state,
      listCams,
      selectCam,
      listDateAlarmsString,
      selectDay,
      clickDay,
    };
  },
});
</script>
