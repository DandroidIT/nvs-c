<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card
          v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '30%' }"
        >
          <q-card-section>
            <q-avatar size="100px" class="absolute-center shadow-10">
              <img class="quasar-logo__img" src="quasar.jpg" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">Log in</div>
            </div>
          </q-card-section>
          <q-card-section v-show="!state.success">
            {{ state.msgError }}
          </q-card-section>
          <q-card-section>
            <q-form ref="frmlogin" class="q-gutter-md">
              <q-input
                filled
                v-model="userForm.username"
                label="Username"
                :rules="[(val) => !!val || 'Field is required']"
                lazy-rules
              />

              <q-input
                type="password"
                filled
                v-model="userForm.password"
                label="Password"
                :rules="[(val) => !!val || 'Field is required']"
                lazy-rules
              />

              <q-input
                style="display: none"
                filled
                v-model="userForm.ip"
                label="Ip"
                :rules="[(val) => !!val || 'Field is required']"
                lazy-rules
              />
              <!-- <q-select  
                :rules="[(val) => !!val || 'Field is required']"
                style="min-width: 200px"
                v-model="presetIp"
                :options="listPresetIp"
                emit-value
                class="float-center"
                label="Select Ip"
                @input="changePresetIp"
              /> -->
              <div>
                <q-btn
                  label="Login"
                  type="button"
                  @click="sendlogin"
                  color="primary"
                />
              </div>
            </q-form>
            <div></div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<style>
.quasar-logo__img:hover {
  transition: transform 0.8s ease-in-out;
  -webkit-transform: rotate3d(0, 0, 1, -360deg) !important /* rtl:ignore */;
  transform: rotate3d(0, 0, 1, -360deg) !important /* rtl:ignore */;
}
.bg-image {
  background-image: linear-gradient(135deg, #000000 0%, #8b8b8a 100%);
}
</style>
<script lang="ts">
import { defineComponent } from 'vue';
import mlogin from '../core/model/mlogin';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'pLogin',
  setup(/* props: any, context: SetupContext */) {
    const { userForm, sendlogin, state } = mlogin(useRouter());
    return { sendlogin, userForm, state };
  },
});
</script>
