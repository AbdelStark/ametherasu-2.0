<template>
  <div class="content">
    <fade-transition :duration="100" mode="out-in">
      <div>
        <b-modal id="modal-validator" :title="modal.title">
          <div>
            <div class="row">
              <vue-json-pretty
                :data="modal.body"
                highlightMouseoverNode
              >
              </vue-json-pretty>
            </div>
          </div>
          <template #modal-footer>
            <div class="row">
              <div class="col-md-2 mr-2">
                <base-button icon @click="downloadAttestationData">
                  <font-awesome-icon icon="download"/>
                </base-button>
              </div>
              <div class="col-md-2 ml-4">
                <base-button
                  icon
                  v-clipboard:copy="result.attestationDataJson"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                >
                  <font-awesome-icon icon="copy"/>
                </base-button>
              </div>
            </div>

          </template>
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
                <b-form-input v-model="produceAttestationDataRequest.committeeIndex" type="number"></b-form-input>
              </div>
              <div class="col-md-2 mt-2">
                <base-button
                  type="primary"
                  @click="produceAttestationData"
                >
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
        committeeIndexOptions: [],
      },
      result: {
        attestationData: null,
        attestationDataJson: '',
      }
    }
  },
  computed: {
    ...mapState([
      'services',
    ])
  },
  mounted() {
    for (let i = 0; i < 32; i++) {
      this.produceAttestationDataRequest.committeeIndexOptions.push({
        value: i,
        text: i,
      });
    }
  },
  methods: {
    async produceAttestationData() {
      try {
        const attestationDataResponse = await this.services.ethereumClient.validatorAPI.produceAttestationData(
          this.produceAttestationDataRequest.slot,
          this.produceAttestationDataRequest.committeeIndex,
        );
        this.result.attestationData = attestationDataResponse.data;
        this.result.attestationDataJson = JSON.stringify(this.result.attestationData, null, 2);
        this.showModal(
          'Attestation Data',
          this.result.attestationData,
        );
      } catch (e) {
        this.$notifyMessage('danger', e);
      }
    },
    async downloadAttestationData() {
      this.downloadFile(this.result.attestationData, 'attestation-data.json');
    },
    showModal(title, body) {
      this.modal.title = title;
      this.modal.body = body;
      this.$bvModal.show(this.modal.id);
    },
    downloadFile(data, name) {
      const contentType = 'application/json';
      const dData = JSON.stringify(data, null, 2);
      const blob = new Blob([dData], {type: contentType});
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = name;
      link.click();
      URL.revokeObjectURL(link.href);
    },
    onCopy() {
      this.$notifyMessage('success', 'Data copied to clipboard.');
    },
    onError() {
      this.$notifyMessage('danger', 'Data cannot be copied to clipboard.');
    }
  },
};
</script>
