<template>
  <div class="content">
    <fade-transition :duration="100" mode="out-in">
      <!-- your content here -->
      <div>
        <card>
          <h5 slot="header" class="title">Dashboard</h5>

        </card>
      </div>
      <router-view></router-view>
    </fade-transition>
  </div>
</template>
<script>
import {FadeTransition} from 'vue2-transitions';
import {mapState} from "vuex";

export default {
  components: {
    FadeTransition
  },
  data() {
    return {
      polling: null,
      identity: null,
      healthy: false,
    }
  },
  computed: {
    ...mapState([
      'services',
    ])
  },
  async created() {
    await this.refreshData();
    //this.pollData();
  },
  methods: {
    pollData() {
      this.polling = setInterval(this.refreshData, 1000)
    },
    beforeDestroy() {
      clearInterval(this.polling)
    },
    async refreshData() {
      try {
        this.identity = await this.services.ethereumClient.nodeAPI.identity();
        this.healthy =  await this.services.ethereumClient.nodeAPI.isHealthy();
      } catch (e) {
        this.$notifyMessage('danger', e);
      }
    },
  },
};
</script>
