<template>
  <div class="content">
    <fade-transition :duration="100" mode="out-in">
      <!-- your content here -->
      <div>
        <card>
          <h5 slot="header" class="title">Teku</h5>
          <div class="row">
            <div class="col-md-3">
              <base-input label="Log level"
                          v-model="changeLogLevelRequest.level">
              </base-input>
            </div>
            <div class="col-md-3">
              <base-input label="Filter"
                          v-model="changeLogLevelRequest.logFilter">
              </base-input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <base-button type="primary" @click="changeLogLevel">Apply</base-button>
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
      changeLogLevelRequest: {
        level: 'INFO',
        logFilter: null,
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
      changeLogLevel(){
        //this.services.ethereumClient.tekuAPI.logLevel()
      },
  },
};
</script>
