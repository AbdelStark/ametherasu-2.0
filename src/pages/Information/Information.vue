<template>
  <div class="content">
    <fade-transition :duration="100" mode="out-in">
      <!-- your content here -->
      <div>
        <card>
          <h5 slot="header" class="title">Information</h5>
          <div class="row">
            <div class="col-md-12 pr-md-1">
              <h5 class="card-category">{{ $t('dashboard.version') }}</h5>
              <h1 class="card-title text-success">
                {{ version == null ? '' : version.data.version }}
              </h1>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 pr-md-1">
              <h5 class="card-category">{{ $t('dashboard.peerId') }}</h5>
              <h3 class="card-title">
                <i class="tim-icons icon-badge text-success"></i>
                {{ identity == null ? '' : identity.data.peer_id }}
              </h3>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 pr-md-1">
              <h5 class="card-category">{{ $t('dashboard.enr') }}</h5>
              <h4 class="card-title">
                <i class="tim-icons icon-planet text-success"></i>
                {{ identity == null ? '' : identity.data.enr }}
              </h4>
            </div>
          </div>
          <div v-if="showP2PAddresses">
            <h4 class="title">P2P addresses</h4>
            <div v-for="p2pAddress in p2pAddresses" :key="p2pAddress" class="row">
              <div class="col-md-12 pr-md-1">
                <h4 class="card-title">
                  <i class="tim-icons icon-planet text-success"></i>
                  {{ p2pAddress }}
                </h4>
              </div>
            </div>
          </div>
          <div v-if="showDiscoveryAddresses">
            <h4 class="title">Discovery addresses</h4>
            <div v-for="address in discoveryAddresses" :key="address" class="row">
              <div class="col-md-12 pr-md-1">
                <h4 class="card-title">
                  <i class="tim-icons icon-planet text-success"></i>
                  {{ address }}
                </h4>
              </div>
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
      identity: null,
      healthy: false,
      version: null,
    }
  },
  computed: {
    p2pAddresses() {
      if (!this.showP2PAddresses) {
        return [];
      } else {
        return this.identity.data.p2p_addresses;
      }
    },
    showP2PAddresses() {
      return this.identity != null &&
        this.identity.data.hasOwnProperty('p2p_addresses') &&
        Array.isArray(this.identity.data.p2p_addresses);
    },
    discoveryAddresses() {
      if (!this.showDiscoveryAddresses) {
        return [];
      } else {
        return this.identity.data.discovery_addresses;
      }
    },
    showDiscoveryAddresses() {
      return this.identity != null &&
        this.identity.data.hasOwnProperty('discovery_addresses') &&
        Array.isArray(this.identity.data.discovery_addresses);
    },
    ...mapState([
      'services',
    ])
  },
  async created() {
    await this.refreshData();
    this.pollData();
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
        this.healthy = await this.services.ethereumClient.nodeAPI.isHealthy();
        this.version = await this.services.ethereumClient.nodeAPI.version();
      } catch (e) {
        this.$notifyMessage('danger', e);
      }
    },
  },
};
</script>
