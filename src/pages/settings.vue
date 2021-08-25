<template>
  <q-page class="bg-primary q-pa-sm">
    <q-dialog
      v-model="isLoading"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-spinner-puff color="red" size="20em" />
    </q-dialog>
    <q-card dark="" v-if="!userAuthStatus.success">
      <q-card-section>
        <q-icon name="mdi-alert" color="red" size="34px"></q-icon>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ userAuthStatus.error }}
      </q-card-section>
    </q-card>
    <q-card dark="" class="bg-transparent no-shadow no-border">
      <q-tabs
        v-model="tabN"
        dense
        class="text-grey dark"
        active-color="white"
        indicator-color="red"
        align="justify"
        narrow-indicator
      >
        <q-tab name="options" label="Options" />
        <q-tab name="users" label="Users" />
      </q-tabs>
      <q-tab-panels v-model="tabN" animated class="bg-primary">
        <q-tab-panel name="options">
          <div class="row justify-center">
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <q-list>
                <q-item tag="label" class="text-white" v-ripple>
                  <q-item-section avatar>
                    <q-toggle
                      icon="mdi-shield-lock"
                      size="80px"
                      color="orange"
                      v-model="ipPublicBlock"
                      @click="clickipPublicBlock"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Block access to public ip</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <q-list>
                <q-item tag="label" class="text-white" v-ripple>
                  <q-item-section avatar>
                    <q-toggle
                      disable
                      icon="mdi-alarm-light"
                      size="80px"
                      color="orange"
                      v-model="notifyAlarm"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Notify Alarm</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </q-tab-panel>
        <q-tab-panel name="users">
          <q-form ref="frmchangeUser">
            <div class="row">
              <div class="col-xs-12 text-white">
                <q-input
                  class=""
                  readonly=""
                  dark=""
                  filled
                  v-model="account.username"
                  label="Username"
                  lazy-rules
                  :rules="[(val) => !!val || 'Field is required']"
                />
              </div>
              <div class="col-xs-12">
                <q-input
                  clearable
                  dark=""
                  filled
                  v-model="account.password"
                  label="Password"
                  lazy-rules
                  :rules="[(val) => !!val || 'Field is required']"
                />
              </div>
              <div class="col-xs-12">
                <q-input
                  clearable
                  dark=""
                  filled
                  v-model="account.newpassword"
                  label="New Password"
                  lazy-rules
                  :rules="[(val) => !!val || 'Field is required']"
                />
              </div>
              <div class="col-xs-12">
                <q-input
                  clearable
                  dark=""
                  filled
                  v-model="account.checknewpassword"
                  label="Repeat New Password"
                  lazy-rules
                  :rules="[
                    (val) => !!val || 'Field is required',
                    (val) => val === account.newpassword || 'No mach',
                  ]"
                />
              </div>
              <div class="col-xs-12">
                <q-btn
                  label="Save"
                  type="button"
                  @click="clickSaveUser"
                  color="orange"
                />
              </div></div
          ></q-form>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { settingsCtrlPage } from '../core/ctrlPage/settingsCtrlPage';
export default defineComponent({
  name: 'Settings',
  setup() {
    const {
      tabN,
      account,
      clickSaveUser,
      userAuthStatus,
      blockIpPublic,
      getIpBlock,
      notifyAlarm,
    } = settingsCtrlPage();
    const clickipPublicBlock = () => {
      void getIpBlock();
    };
    return {
      tabN,
      account,
      clickSaveUser,
      userAuthStatus: userAuthStatus,
      ipPublicBlock: blockIpPublic,
      clickipPublicBlock,
      notifyAlarm,
    };
  },
});
</script>
