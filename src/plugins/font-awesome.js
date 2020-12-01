import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDownload, faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faDownload,
  faCopy
);

Vue.component('font-awesome-icon', FontAwesomeIcon);
