<template>
  <div class="el-container">
    <provider-card v-if="userData.provider_profile"
                   :value="getProfileDataWithUser(userData.provider_profile)"
                   :to="{ name: 'admin.verify-provider', params: { id: userData.provider_profile.id } }">
      <template v-slot:append-profile-data v-if="hasCaution">
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
    <provider-card v-else-if="userData.customer_profile"
                   :value="getProfileDataWithUser(userData.customer_profile)">
      <template v-slot:append-profile-data v-if="hasCaution">
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
    <provider-card v-else :value="{}">
      <template v-slot:profile-data>
        <div class="icon-card profile-data">
          <div class="icon-card-icon">
            <b-avatar
                :src="avatarUrl"
                :size="$screens({ default: '54', sm: '64', md: '96', lg: '108' })"
            />
          </div>
          <b-row>
            <b-col cols="4"><strong>Full name:</strong></b-col>
            <b-col cols="8">{{userData.first_name}} {{userData.last_name}}</b-col>
            <b-col cols="4"><strong>Email:</strong></b-col>
            <b-col cols="8">{{userData.email}}</b-col>
          </b-row>

        </div>
        <hr>
      </template>
      <template v-slot:footer>
        <b-button variant="light">
          <div class="icon-card">
            <svg-icon name="eye" class="icon-card-icon"/>
            <span>This user has no profile yet</span>
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
      to: [String, Object],
      hasCaution: {
        type: Boolean,
        default: false
      }
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
    computed: {
      avatarUrl() {
        return this.userData?.images?.data?.length ? this.userData.images.data[this.userData.images.data.length - 1].url : null
      },
    },
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
