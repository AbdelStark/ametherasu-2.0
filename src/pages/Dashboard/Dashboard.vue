<template>
  <div class="content">
    <fade-transition :duration="100" mode="out-in">
      <!-- your content here -->
      <div>
        <card>
          <h5 slot="header" class="title">Dashboard</h5>
          <div class="row">
            <div class="col-md-2 pr-md-1">
              <h5 class="card-category">{{ $t('dashboard.headSlot') }}</h5>
              <h2 class="card-title">
                {{ syncing == null ? '' : syncing.data.head_slot }}
              </h2>
            </div>
            <div class="col-md-2 pr-md-1">
              <h5 class="card-category">{{ $t('dashboard.syncDistance') }}</h5>
              <h2 class="card-title">
                {{ syncing == null ? '' : syncing.data.sync_distance }}
              </h2>
            </div>
            <div class="col-md-2 pr-md-1">
              <h5 class="card-category">{{ $t('dashboard.peerCount') }}</h5>
              <h2 class="card-title">
                {{ peerCount }}
              </h2>
            </div>
          </div>
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
      healthy: false,
      syncing: null,
      peerCount: 0,
    }
  },
  computed: {
    ...mapState([
      'services',
      'cache',
    ])
  },
  async created() {
    await this.refreshData();
    this.pollData();
  },
  methods: {
    pollData() {
      this.polling = setInterval(this.refreshData, 2000)
    },
    beforeDestroy() {
      clearInterval(this.polling)
    },
    async refreshData() {
      try {
        this.identity = await this.services.ethereumClient.nodeAPI.identity();
        this.syncing = await this.services.ethereumClient.nodeAPI.syncing();
        this.version = await this.services.ethereumClient.nodeAPI.version();
        const peers = await this.services.ethereumClient.nodeAPI.peers();
        if (peers != null) {
          this.peerCount = peers.length;
        }
      } catch (e) {
        this.$notifyMessage('danger', e);
      }
    },
  },
};
</script>
