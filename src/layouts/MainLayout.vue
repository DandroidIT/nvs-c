<template>
  <q-layout view="hHh Lpr fFf">
    <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header elevated>
      <q-toolbar>
        <q-btn flat round dense icon="menu" @click="leftDrawer = !leftDrawer" />
        <q-toolbar-title>
          NVS-C <span class="text-caption"> {{ appVersion }}</span>
        </q-toolbar-title>
        <q-btn round flat icon="logout" @click="logout" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawer" show-if-above bordered class="bg-grey-1">
      <q-list>
        <Menu v-for="link in menuLink" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Menu from 'components/Menu.vue';
import { base } from 'src/core/setting';
import { userAuth } from '../core/store/auth.store';
export default defineComponent({
  name: 'LayoutMain',
  components: { Menu },
  setup() {
    const appVersion = process.env.VERSION;
    const menuLink = base.menu;
    const leftDrawer = ref(false);
    const { logout } = userAuth();
    return { appVersion, leftDrawer, menuLink, logout };
  },
});
</script>
