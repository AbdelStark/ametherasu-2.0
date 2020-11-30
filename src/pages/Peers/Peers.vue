<template>
  <div class="content">
    <fade-transition :duration="100" mode="out-in">
      <!-- your content here -->
      <div>
        <card>
          <h5 slot="header" class="title">Peers</h5>
          <base-table :columns="peersFields"
                      :data="peers"
                      thead-classes="text-primary">
          </base-table>
        </card>
      </div>
      <router-view></router-view>
    </fade-transition>
  </div>
</template>
<script>
import {FadeTransition} from 'vue2-transitions';
import {mapState} from "vuex";
import {BaseTable} from "@/components";

export default {
  components: {
    FadeTransition,
    BaseTable,
  },
  data() {
    return {
      adminPeersResponse: null,
      peersFields: ["peer_id", "address", "state", "direction"],
      peers: [],
    }
  },
  methods: {},
  computed: {
    ...mapState([
      'services',
    ])
  },
  async mounted() {
    try {
      const peers = await this.services.ethereumClient.nodeAPI.peers();
      peers.forEach(peer => {
        this.peers.push(peer);
      });
    } catch (e) {
      this.$notifyMessage('danger', e);
    }
  },
};
</script>
