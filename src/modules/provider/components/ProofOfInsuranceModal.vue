<template>
  <b-modal v-model="isOpen" size="lg" :modal-class="'profile-modal'">
    <svg-icon width="16" height="16" name="modal_close_icon" slot="modal-header-close"/>
    <b-row>
      <b-col cols="12" lg="6" class="justify-contents-center d-flex">
        <img class="cert-img img-fluid" :src="imageUrl" alt="" />
      </b-col>
      <b-col cols="12" lg="6" class="proof-of-insurance">
        <h4 class="title">Proof of insurance</h4>
        <div class="info">
          <div class="line"><strong>Proof of insurance:</strong>{{prof.insurance_provider_name}}</div>
          <div class="line"><strong>Policy period:</strong>{{prof.start_date}}<span class="dash">&ndash;</span>{{prof.end_date}}
          </div>
          <div class="icon-card" v-if="false">
            <svg-icon name="icon_proof_of_insurance" class="icon-card-icon"/>
            <div class="align-self-center">Verified by our team</div>
          </div>
        </div>
      </b-col>
    </b-row>

    <template v-slot:modal-footer="{ close }">
      <b-button class="footer-close" variant="light" @click="close()">Close</b-button>
    </template>
  </b-modal>
</template>

<script>
  export default {
    name: "ProofOfInsuranceModal",
    props: {
      value: {
        type: Object,
        default: null
      }
    },
    data () {
      return {
        isOpen: !!this.value,
        prof: this.value || {}
      }
    },
    watch: {
      value(v) {
        this.isOpen = !!v;
        this.prof = v || {};
      },
    },
    computed: {
      imageUrl() {
        return this.prof?.image?.url || null
      },
      name() {
        return this.prof?.name || null
      }
    }
  }
</script>
