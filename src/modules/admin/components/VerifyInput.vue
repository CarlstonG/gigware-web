<template>
  <div :class="'verify-input' + (column ? ' flex-column' : '')">
    <div class="elem-wrapper">
      <slot></slot>
    </div>
    <b-button-group :size="size">
      <b-button :variant="selected && accepted ? 'primary' : 'outline-primary'" @click="accept">Accept</b-button>
      <b-button :id="id + '_decline'" :variant="selected && declined ? 'danger' : 'outline-danger'" @click="decline">
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
        ></b-form-textarea>
      </b-popover>
    </b-button-group>
  </div>

</template>
<style scoped lang="scss" src="./VerifyInput.scss"></style>

<script>
  export default {
    name: "VerifyInput",
    props: {
      size: {
        type: String,
        default: "sm"
      },
      column: Boolean,
    },
    data: () => ({
      id: null,
      needMessage: null
    }),
    methods: {
      accept() {
        this.needMessage = false
      },
      decline() {
        this.needMessage = true
      }
    },
    computed: {
      selected() {
        return this.needMessage !== null;
      },
      accepted() {
        return this.needMessage === false;
      },
      declined() {
        return this.needMessage === true;
      }
    },
    created() {
      this.id = this._uid;
    }
  }
</script>
