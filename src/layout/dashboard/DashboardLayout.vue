<template>
  <div class="wrapper">
    <side-bar title="Ametherasu 2.0">
      <template slot="links">
        <sidebar-link :name="$t('sidebar.dashboard')" icon="tim-icons icon-chart-pie-36" to="/dashboard"/>
        <sidebar-link :name="$t('sidebar.information')" icon="tim-icons icon-alert-circle-exc" to="/information"/>
        <sidebar-link :name="$t('sidebar.peers')" icon="tim-icons icon-atom" to="/peers"/>
        <sidebar-link :name="$t('sidebar.configuration')" icon="tim-icons icon-paper" to="/configuration"/>
        <sidebar-link :name="$t('sidebar.teku')" icon="tim-icons icon-spaceship" to="/teku"/>
        <sidebar-link :name="$t('sidebar.validator')"  icon="tim-icons icon-components" to="/validator"/>
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./AppNavbar";
import ContentFooter from "./ContentFooter";
import DashboardContent from "./Content";
import MobileMenu from "./MobileMenu";

export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
