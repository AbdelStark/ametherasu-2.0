<template>
  <div class="content">
    <fade-transition :duration="100" mode="out-in">
      <!-- your content here -->
      <div>
        <b-modal id="modal-launcher" :title="modal.title">
          <div>
            <div v-for="option in escapedOptions" :key="option">
              <div class="col-md-12 pr-md-1">
                {{ option }}
              </div>
            </div>
          </div>
          <template #modal-footer>
            <div class="row">
              <div class="col-md-2 mr-2">
                <base-button icon @click="downloadConfiguration">
                  <font-awesome-icon icon="download"/>
                </base-button>
              </div>
              <div class="col-md-2 ml-4">
                <base-button
                  v-clipboard:copy="configuration"
                  v-clipboard:error="onError"
                  v-clipboard:success="onCopy"
                  icon
                >
                  <font-awesome-icon icon="copy"/>
                </base-button>
              </div>
            </div>
          </template>
        </b-modal>
        <card>
          <h5 slot="header" class="title">Launcher</h5>
          <div class="row">
            <div class="col-md-6 mt-2">
              <div v-if="steps.nodeType.show">
                <card>
                  <h6 class="title">Select node type.</h6>
                  <div class="row">
                    <div class="col-md-2 mt-2 form-inline">
                      <b-form-checkbox
                        v-model="steps.nodeType.beacon"
                      >
                        Beacon node
                      </b-form-checkbox>

                    </div>
                    <div class="col-md-2 mt-2 form-inline">
                      <b-form-checkbox
                        v-model="steps.nodeType.validator"
                      >
                        Validator client
                      </b-form-checkbox>
                    </div>
                  </div>
                </card>
              </div>
            </div>
            <div class="col-md-6 mt-2">
              <div v-if="steps.network.show">
                <card>
                  <h6 class="title">Configure Network Options.</h6>
                  <div class="row">
                    <div class="col-md-4 mt-2 form-inline">
                      <label class="mr-2">Network</label>
                      <b-form-select
                        v-model="steps.network.networkValue"
                        :options="steps.network.networkOptions"></b-form-select>
                    </div>
                  </div>
                </card>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mt-2">
              <div v-if="steps.rest.show">
                <card>
                  <h6 class="title">Configure Rest API options. </h6>
                  <div class="row">
                    <div class="col-md-3 mt-2 form-inline">
                      <b-form-checkbox
                        v-model="steps.rest.enabled"
                      >
                        Enable Rest API
                      </b-form-checkbox>
                    </div>
                  </div>
                  <div class="row" v-if="steps.rest.enabled">
                    <div class="col-md-6 mt-2">
                      <base-input
                        label="Interface"
                        v-model="steps.rest.interface"
                      ></base-input>
                    </div>
                    <div class="col-md-6 mt-2">
                      <base-input
                        label="Port"
                        v-model="steps.rest.port"
                      ></base-input>
                    </div>
                  </div>
                </card>
              </div>
            </div>
          </div>
          <div class="row">
            <base-button class="ml-4" type="primary" @click="buildConfiguration">
              Build
            </base-button>
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
import TekuLauncher from "@/services/TekuLauncher";
import {defaultOptions, optionNames} from "@/services/launcher/TekuCommandLineOptionNames";
import TekuOption from "@/services/launcher/TekuCommandLineOption";
import TekuOptions from "@/services/launcher/TekuCommandLineOptions";


export default {
  components: {
    FadeTransition
  },
  data() {
    return {
      modal: {
        id: 'modal-launcher',
        title: '',
        body: '',
      },
      steps: {
        nodeType: {
          show: true,
          beacon: true,
          validator: false,
        },
        network: {
          show: true,
          networkValue: 'minimal',
          networkOptions: [
            {text: 'minimal', value: 'minimal'},
            {text: 'mainnet', value: 'mainnet'},
            {text: 'medalla', value: 'medalla'},
            {text: 'toledo', value: 'toledo'},
            {text: 'pyrmont', value: 'pyrmont'},
          ],
        },
        rest: {
          show: true,
          enabled: false,
          interface: defaultOptions.restApiInterface,
          port: defaultOptions.restApiPort,
        },
      },
      options: new TekuOptions(),
      escapedOptions: [],
      launcher: new TekuLauncher(),
      configuration: '',
    }
  },
  computed: {
    ...mapState([
      'services',
    ])
  },
  mounted() {
  },
  methods: {
    buildConfiguration() {
      // Network options
      this.options.addOption(
        new TekuOption(optionNames.network, this.steps.network.networkValue),
      );

      // Rest API options
      this.options.addOption(
        new TekuOption(optionNames.restApiEnabled, this.steps.rest.enabled),
      );
      if (this.steps.rest.enabled) {
        this.options.addOptions(
          new TekuOption(optionNames.restApiInterface, this.steps.rest.interface),
          new TekuOption(optionNames.restApiPort, this.steps.rest.port),
        );
      }

      this.configuration = this.launcher.buildConfiguration(this.options);
      this.escapedOptions = this.configuration.split("\n");
      this.showModal(
        'Configuration',
        this.configuration,
      );
    },
    async downloadConfiguration() {
      this.downloadFile(this.configuration, 'config.yaml');
    },
    showModal(title, body) {
      this.modal.title = title;
      this.modal.body = body;
      this.$bvModal.show(this.modal.id);
    },
    downloadFile(data, name) {
      const contentType = 'application/yaml';
      const blob = new Blob([data], {type: contentType});
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
    },
  },
};
</script>
