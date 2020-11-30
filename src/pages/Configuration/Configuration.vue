<template>
  <div class="content">
    <fade-transition :duration="100" mode="out-in">
      <!-- your content here -->
      <div>
        <card>
          <h5 slot="header" class="title">Configuration</h5>
          <base-table :columns="fields"
                      :data="data"
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
      fields: ["Key", "Value"],
      data: [],
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
      const specResponse = await this.services.ethereumClient.configAPI.spec();
      const data  = specResponse.data;
      Object.keys(data).forEach(key => {
        this.data.push({
          key: key,
          value: data[key],
        });
      });

    } catch (e) {
      this.$notifyMessage('danger', e);
    }
  },
};
</script>
