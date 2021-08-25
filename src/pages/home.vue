<template>
  <q-page class="bg-primary q-pa-sm">
    <q-dialog
      v-model="status.isawait"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-spinner-puff color="red" size="20em" />
    </q-dialog>
    <q-card dark="" class="bg-transparent no-shadow no-border">
      <q-card dark="" v-if="!status.success">
        <q-card-section>
          <q-icon name="mdi-alert" color="red" size="34px"></q-icon>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ status.error }}
        </q-card-section>
      </q-card>
      <q-item v-show="!cams.list?.length" dark="" class="q-pa-none q-ml-xs">
        <q-item-section side>
          <q-btn
            label="Goto Radar"
            align="left"
            icon="mdi-radar"
            size="55px"
            color="orange"
            flat
            padding="xs"
            class="full-width text-capitalize"
            to="setup"
          ></q-btn>
        </q-item-section>
      </q-item>
      <!-- <q-list v-for="(c, i) in cams.list" :key="i"> -->
      <q-item
        v-show="cams.list?.length"
        dark=""
        class="q-pa-none q-ml-xs"
        v-for="(c, i) in cams.list"
        :key="i"
        clickable
      >
        <q-item-section
          side
          class="q-pa-lg q-mr-none"
          style="background-color: #464646"
        >
          <q-icon name="mdi-cctv" color="orange" size="34px"></q-icon>
          <q-icon
            v-show="c.inerror === true"
            name="sync_problem"
            color="white"
            size="24px"
          ></q-icon>
        </q-item-section>
        <q-item-section
          @click="c.inerror === false ? clickgotoCam(c.id) : null"
          class="q-pa-md q-ml-none text-white"
        >
          <q-item-label class="text-white text-weight-bolder"
            >{{ c.name }} ({{ c.id }})</q-item-label
          >
          <!-- <q-item-label>{{ item.id }} {{item.inerror}}</q-item-label> -->
        </q-item-section>
        <q-item-section side>
          <q-btn
            @click="clickDeleteCam(c.id)"
            flat
            dense
            size="lg"
            color="orange"
            icon="mdi-delete"
            class="t"
          ></q-btn>
        </q-item-section>
      </q-item>
      <!--  </q-list> -->
    </q-card>
    <!-- content -->
  </q-page>
</template>

<script lang="ts">
import { homeCtrlPage } from '../core/ctrlPage/homeCtrlPage';

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Dashboard',
  setup() {
    const { clickgotoCam, status, clickDeleteCam, cams } = homeCtrlPage();
    return {
      clickgotoCam,
      status,
      cams,
      clickDeleteCam,
    };
  },
});
</script>
