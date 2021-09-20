<template>
  <div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <canvas
        style="border-style: solid; border-color: tomato"
        :width="vwidth"
        :height="vheight"
        class="full-width full-height"
        id="videostream"
      ></canvas>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, onBeforeUnmount } from 'vue';
import AuthCS from '../core/ctrl.store/auth.ctrl.store';
import JSMpeg from '@cycjimmy/jsmpeg-player';

export default defineComponent({
  name: 'CVideoStream',
  props: {
    wssurl: { type: String, default: '' },
    vwidth: { type: String, default: '2560' },
    vheight: { type: String, default: '1440' },
  },
  setup(props) {
    const { userState } = AuthCS();
    const _player = reactive({ val: { destroy: () => undefined, volume: 10 } });
    const _loadPlayer = () => {
      const canvas: HTMLElement | null = document.getElementById('videostream');
      console.log(
        'userState.user?.token:',
        userState.user?.token,
        ' props.wssurl:',
        props.wssurl,
        ' canvas: ',
        canvas
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      _player.val = new JSMpeg.Player(props.wssurl, {
        canvas: canvas,
        protocols: userState.user?.token,
      });
      _player.val.volume = 10;
    };
    onMounted(() => {
      _loadPlayer();
    });
    onBeforeUnmount(() => {
      try {
        if (_player) {
          _player.val.destroy();
          console.log(
            'cam beforeDestroy _player destroy  props.wssurl:',
            props.wssurl
          );
        }
      } catch (error) {
        console.log('error in camview beforeDestroy:', error);
      }
    });
  },
});
</script>
