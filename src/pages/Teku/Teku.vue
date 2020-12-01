<template>
  <div class="content">
    <fade-transition :duration="100" mode="out-in">
      <!-- your content here -->
      <div>
        <card>
          <h5 slot="header" class="title">Teku</h5>
          <card>
            <h5 slot="header" class="title">{{ $t('teku.changeLogLevelPanel.header') }}</h5>
            <h6>{{ $t('teku.changeLogLevelPanel.title') }}</h6>
            <div class="row">
              <div class="col-md-2 mt-2 form-inline">
                <label class="mr-2">{{ $t('teku.changeLogLevelPanel.labels.logLevel') }}</label>
                <b-form-select v-model="changeLogLevelRequest.level"
                               :options="changeLogLevelRequest.options"></b-form-select>
              </div>
              <div class="col-md-4  mt-2 form-inline">
                <label class="mr-2">{{ $t('teku.changeLogLevelPanel.labels.logLevel') }}</label>
                <b-form-tags v-model="changeLogLevelRequest.logFilter"
                             no-add-on-enter
                             placeholder="filters"
                             separator=" ,;"
                ></b-form-tags>
              </div>
              <div class="col-md-2">
                <base-button type="primary" @click="changeLogLevel">{{ $t('teku.changeLogLevelPanel.buttons.apply') }}
                </base-button>
              </div>
            </div>
          </card>
          <card>
            <h5 slot="header" class="title">{{ $t('teku.downloadStatePanel.header') }}</h5>
            <h6>{{ $t('teku.downloadStatePanel.title') }}</h6>
            <div class="row">
              <div class="col-md-1 mt-2">
                <b-form-checkbox v-model="sszStateRequest.customIdentifier"
                                 class="mt-2" switch>
                  {{ $t('teku.downloadStatePanel.labels.custom') }}
                </b-form-checkbox>
              </div>
              <div class="col-md-2 mt-2 form-inline">
                <label class="mr-2">{{ $t('teku.downloadStatePanel.labels.identifier') }}</label>
                <b-form-select
                  v-if="!sszStateRequest.customIdentifier"
                  v-model="sszStateRequest.identifier"
                  :options="sszStateRequest.options"></b-form-select>
                <base-input
                  v-if="sszStateRequest.customIdentifier"
                  v-model="sszStateRequest.identifier"
                ></base-input>
              </div>
              <div class="col-md-2">
                <base-button :loading="sszStateRequest.isDownloadingByState" type="primary" @click="downloadByStateId">
                  {{ $t('teku.downloadStatePanel.buttons.downloadByStateId') }}
                </base-button>
              </div>
              <div class="col-md-2">
                <base-button :loading="sszStateRequest.isDownloadingByBlock" type="warning" @click="downloadByBlockId">
                  {{ $t('teku.downloadStatePanel.buttons.downloadByBlockId') }}
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
      },
      sszStateRequest: {
        downloadLink: null,
        identifier: 'head',
        customIdentifier: false,
        isDownloadingByBlock: false,
        isDownloadingByState: false,
        options: [
          {value: 'head', text: 'head'},
          {value: 'genesis', text: 'genesis'},
          {value: 'finalized', text: 'finalized'},
          {value: 'justified', text: 'justified'},
        ]
      },
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
    async downloadByStateId() {
      try {
        this.sszStateRequest.isDownloadingByState = true;
        const response = await this.services.ethereumClient.tekuAPI.downloadByStateId(
          this.sszStateRequest.identifier,
        );
        this.downloadFile(response.data, 'state.ssz');
        this.sszStateRequest.isDownloadingByState = false;
      } catch (e) {
        this.$notifyMessage('danger', e);
        this.sszStateRequest.isDownloadingByState = false;
      }
    },
    async downloadByBlockId() {
      try {
        this.sszStateRequest.isDownloadingByBlock = true;
        const response = await this.services.ethereumClient.tekuAPI.downloadByBlockId(
          this.sszStateRequest.identifier,
        );
        this.downloadFile(response.data, 'state.ssz');
        this.sszStateRequest.isDownloadingByBlock = false;
      } catch (e) {
        this.$notifyMessage('danger', e);
        this.sszStateRequest.isDownloadingByBlock = false;
      }
    },
    downloadFile(data, name) {
      const blob = new Blob([data]);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = name;
      link.click();
      URL.revokeObjectURL(link.href);
    }
  },
};
</script>
