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
                <base-input v-model="changeLogLevelRequest.level">
                </base-input>
              </div>
              <div class="col-md-2  mt-2 form-inline">
                <label class="mr-2">Log filter</label>
                <base-input v-model="changeLogLevelRequest.logFilter">
                </base-input>
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
    changeLogLevel() {
      //this.services.ethereumClient.tekuAPI.logLevel()
      console.log(this.changeLogLevelRequest);
    },
  },
};
</script>
