<template>
  <div class="content">
    <fade-transition :duration="100" mode="out-in">
      <!-- your content here -->
      <div>
        <card>
          <h5 slot="header" class="title">Teku</h5>
          <card>
            <h5 slot="header" class="title">Logging</h5>
            <div class="row">
              <div class="col-md-2 mt-2 form-inline">
                <label class="mr-2">Log level</label>
                <b-form-select v-model="changeLogLevelRequest.level"
                               :options="changeLogLevelRequest.options"></b-form-select>
              </div>
              <div class="col-md-8  mt-2 form-inline">
                <label class="mr-2">Filters</label>
                <b-form-tags v-model="changeLogLevelRequest.logFilter"
                             no-add-on-enter
                             placeholder="filters"
                             separator=" ,;"
                ></b-form-tags>
              </div>
              <div class="col-md-2">
                <base-button type="primary" @click="changeLogLevel">Apply</base-button>
              </div>
            </div>
          </card>
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
      changeLogLevelRequest: {
        level: 'INFO',
        logFilter: [],
        options: [
          {value: 'INFO', text: 'INFO'},
          {value: 'OFF', text: 'OFF'},
          {value: 'FATAL', text: 'FATAL'},
          {value: 'ERROR', text: 'ERROR'},
          {value: 'WARN', text: 'WARN'},
          {value: 'DEBUG', text: 'DEBUG'},
          {value: 'TRACE', text: 'TRACE'},
          {value: 'ALL', text: 'ALL'},
        ]
      }
    }
  },
  computed: {
    ...mapState([
      'services',
    ])
  },
  async created() {
  },
  methods: {
    async changeLogLevel() {
      try {
        const result = await this.services.ethereumClient.tekuAPI.logLevel(
          this.changeLogLevelRequest.level,
          this.changeLogLevelRequest.logFilter
        );
        if (result) {
          this.$notifyMessage('success', 'Log level successfully applied.');
        } else {
          this.$notifyMessage('danger', 'Log level cannot be applied.');
        }
      } catch (e) {
        this.$notifyMessage('danger', e);
      }
    },
  },
};
</script>
