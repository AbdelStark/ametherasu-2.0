<template>
  <div class="content">
    <fade-transition :duration="100" mode="out-in">
      <!-- your content here -->
      <div>
        <card>
          <h5 slot="header" class="title">Validator</h5>
          <card>
            <h5 slot="header" class="title">{{ $t('validator.produceAttestation.header') }}</h5>
            <h6>{{ $t('validator.produceAttestation.title') }}</h6>
            <div class="row">
              <div class="col-md-2 mt-2 form-inline">
                <label class="mr-2">{{ $t('validator.produceAttestation.labels.slot') }}</label>
                <base-input

                ></base-input>
              </div>
              <div class="col-md-3 mt-2 form-inline">
                <label class="mr-2">{{ $t('validator.produceAttestation.labels.committeeIndex') }}</label>
                <base-input

                ></base-input>
              </div>
              <div class="col-md-2 mt-2">
                <base-button type="primary" @click="">{{ $t('validator.produceAttestation.buttons.generate') }}
                </base-button>
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
    return {}
  },
  computed: {
    ...mapState([
      'services',
    ])
  },
  methods: {},
};
</script>
