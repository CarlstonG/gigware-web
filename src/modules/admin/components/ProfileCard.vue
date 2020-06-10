<template>
  <div>
    <provider-card v-if="userData.provider_profile"
                   :value="getProfileDataWithUser(userData.provider_profile)"
                   :to="{ name: 'admin.verify-provider', params: { id: userData.provider_profile.id } }">
      <template v-slot:append-profile-data>
        <span class="caution-icon">!</span>
      </template>
      <template v-slot:footer>
        <b-button variant="light">
          <div class="icon-card">
            <svg-icon name="eye" class="icon-card-icon"/>
            <span>View Provider Profile</span>
          </div>
        </b-button>
      </template>
    </provider-card>
    <provider-card v-if="userData.customer_profile"
                   :value="getProfileDataWithUser(userData.customer_profile)">
      <template v-slot:append-profile-data>
        <span class="caution-icon">!</span>
      </template>
      <template v-slot:footer>
        <b-button variant="light">
          <div class="icon-card">
            <svg-icon name="eye" class="icon-card-icon"/>
            <span>View Customer Profile</span>
          </div>
        </b-button>
      </template>
    </provider-card>
  </div>
</template>
<style scoped lang="scss" src="./ProfileCard.scss"></style>

<script>
  import ProviderCard from "../../search/components/ProviderCard";

  export default {
    components: { ProviderCard },
    name: "ProfileCard",
    props: {
      value: {
        type: Object,
        default: null
      },
      to: [String, Object]
    },
    data() {
      return {
        userData: this.value,
      }
    },
    watch: {
      value(v) {
        this.userData = v;
      }
    },
    computed: {},
    methods: {
      routeTo() {
        if (this.to) {
          this.$router.push(this.to);
        }
      },
      getProfileDataWithUser(profile) {
        return { ...profile, user: this.userData }
      }
    }
  }
</script>
