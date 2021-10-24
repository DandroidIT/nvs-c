<template>
  <q-layout view="hHh Lpr fFf">
    <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header reveal elevated>
      <q-toolbar>
        <q-btn flat round dense icon="menu" @click="leftDrawer = !leftDrawer" />
        <q-toolbar-title>
          {{ appTitle }} <span class="text-caption"> {{ appVersion }}</span>
        </q-toolbar-title>
        <q-btn round flat icon="logout" @click="logout" />
        <q-btn
          round
          dense
          flat
          color="white"
          :icon="Qsr.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
          @click="Qsr.fullscreen.toggle()"
        ></q-btn>
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
import { useQuasar } from 'quasar';
import Menu from 'components/Menu.vue';
import { base } from 'src/core/setting';
import { useRouter } from 'vue-router';
import AuthCS from '../core/ctrl.store/auth.ctrl.store';
export default defineComponent({
  name: 'LayoutMain',
  components: { Menu },
  setup() {
    const Qsr = useQuasar();
    const appVersion = process.env.VERSION;
    const appTitle = base.title;
    const menuLink = base.menu;
    const leftDrawer = ref(false);
    const router = useRouter();

    const logout = async () => {
      await AuthCS().postLogout();
      void router.push({ path: '/login' });
    };
    return { Qsr, appVersion, appTitle, leftDrawer, menuLink, logout };
  },
});
</script>
