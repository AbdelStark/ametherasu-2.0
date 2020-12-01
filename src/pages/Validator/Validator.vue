<template>
  <div class="content">
    <fade-transition :duration="100" mode="out-in">
      <div>
        <b-modal id="modal-validator" :title="modal.title">
          <div>
            <vue-json-pretty
              :data="modal.body"
              highlightMouseoverNode
            >
            </vue-json-pretty>
          </div>
        </b-modal>

        <!-- your content here -->
        <card>
          <h5 slot="header" class="title">Validator</h5>
          <card>
            <h5 slot="header" class="title">{{ $t('validator.produceAttestation.header') }}</h5>
            <h6>{{ $t('validator.produceAttestation.title') }}</h6>
            <div class="row">
              <div class="col-md-2 mt-2 form-inline">
                <label class="mr-2">{{ $t('validator.produceAttestation.labels.slot') }}</label>
                <base-input
                  v-model="produceAttestationDataRequest.slot"
                ></base-input>
              </div>
              <div class="col-md-3 mt-2 form-inline">
                <label class="mr-2">{{ $t('validator.produceAttestation.labels.committeeIndex') }}</label>
                <base-input
                  v-model="produceAttestationDataRequest.committeeIndex"
                ></base-input>
              </div>
              <div class="col-md-2 mt-2">
                <base-button type="primary" @click="produceAttestationData">
                  {{ $t('validator.produceAttestation.buttons.generate') }}
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
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

export default {
  components: {
    FadeTransition,
    VueJsonPretty
  },
  data() {
    return {
      modal: {
        id: 'modal-validator',
        title: '',
        body: '',
      },
      produceAttestationDataRequest: {
        slot: 0,
        committeeIndex: 0,
      }
    }
  },
  computed: {
    ...mapState([
      'services',
    ])
  },
  methods: {
    async produceAttestationData() {
      try {
        const attestationDataResponse = await this.services.ethereumClient.validatorAPI.produceAttestationData(
          this.produceAttestationDataRequest.slot,
          this.produceAttestationDataRequest.committeeIndex,
        );
        console.log(attestationDataResponse.data);
        this.showModal(
          'Attestation Data',
          attestationDataResponse.data,
        );
      } catch (e) {
        this.$notifyMessage('danger', e);
      }
    },
    showModal(title, body) {
      this.modal.title = title;
      this.modal.body = body;
      this.modal.show = true;
      this.$bvModal.show(this.modal.id);
    },
  },
};
</script>
