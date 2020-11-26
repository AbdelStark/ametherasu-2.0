<template>
  <div>
      <div class="row">
        <div class="col-md-4 pr-md-1">
          <h5 class="card-title text-primary">
            {{ peerName }}
          </h5>
        </div>
        <div class="col-md-8 pr-md-1">
          <div class="card-title">
            {{ peerId }}
          </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name: "peer",
  props: {
    peerName: {
      type: String,
      description: "Peer Name"
    },
    peerId: {
      type: String,
      description: "Peer ID"
    },
  }
};
</script>
<style>
</style>
