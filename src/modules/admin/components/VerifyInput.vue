<template>
  <div :class="'verify-input' + (column ? ' flex-column' : '')">
    <div class="elem-wrapper">
      <slot></slot>
    </div>
    <b-button-group :size="size">
      <b-button :variant="selected && accepted ? 'primary' : 'outline-primary'"
                @click="accept">
        Accept
      </b-button>
      <b-button :id="id + '_decline'" :variant="selected && declined ? 'danger' : 'outline-danger'"
                @click="decline">
        Decline
      </b-button>
      <b-popover :target="id + '_decline'"
                 triggers="focus"
      >
        <template v-slot:title>
        </template>
        <b-form-textarea
            placeholder="Explanation..."
            rows="1"
            max-rows="3"
            :value="value.reason"
            @input="reasonChanged"
        ></b-form-textarea>
      </b-popover>
    </b-button-group>
    <slot name="reason">
      <div class="reason" v-if="value.reason && value.is_accepted !== true">
        <strong v-if="value.is_accepted === null">Previous reason: </strong>
        <strong v-else>Reason: </strong>
        <span>{{value.reason}}</span>
      </div>
    </slot>
  </div>

</template>
<style scoped lang="scss" src="./VerifyInput.scss"></style>

<script>
  export default {
    name: "VerifyInput",
    props: {
      value: {
        type: Object,
        default: () => ({
          is_accepted: null,
          reason: null
        })
      },
      size: {
        type: String,
        default: "sm"
      },
      column: Boolean,
    },
    data: () => ({
      id: null,
    }),
    methods: {
      accept() {
        this.value.is_accepted = true;
        this.$emit('input', this.value);
      },
      decline() {
        this.value.is_accepted = false;
        this.$emit('input', this.value);
      },
      reasonChanged(newValue) {
        this.value.reason = newValue;
        this.$emit('input', this.value);
      }
    },
    computed: {
      selected() {
        return this.value.is_accepted !== null && this.value.is_accepted !== undefined;
      },
      accepted() {
        return this.value.is_accepted === true;
      },
      declined() {
        return this.value.is_accepted === false;
      }
    },
    created() {
      this.id = this._uid;
    }
  }
</script>
