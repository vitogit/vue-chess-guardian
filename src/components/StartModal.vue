<template>
  <div class = "dialog">
    <div class="modal-card animation-content">
      <header class="modal-card-head" v-if="title">
          <p class="modal-card-title">{{ title }}</p>
      </header>
      <section
          class="modal-card-body"
          :class="{ 'is-titleless': !title }">
          <div class="media">
            <div class="media-content">
              <p v-html="message"/>

              <div class="field">
                <div class="control">
                  <input
                    v-model="prompt"
                    class="input"
                    ref="input"
                    required
                    :class="{ 'is-danger': validationMessage }"
                    v-bind="inputAttrs"
                    @keyup.enter="confirm">
                </div>
                  <p class="help is-danger">{{ validationMessage }}</p>
              </div>
            </div>
          </div>
      </section>

      <footer class="modal-card-foot">
        <button
          class="button is-light"
          @click="cancel">
          Default positions
        </button>
        <button
          class="button is-primary"
          :class="type"
          ref="confirmButton"
          @click="confirm">
          Ok
        </button>
      </footer>
    </div>
  </div>

</template>

<script>
  export default {
    props: {
        title: String,
        message: String,
        type: String,
        inputAttrs: {
            type: Object,
            default: () => {}
        },
        onConfirm: {
            type: Function,
            default: () => {}
        },
        onCancel: {
            type: Function,
            default: () => {}
        }
    },
    data() {
      return {
        prompt: this.inputAttrs.value || '',
        isActive: false,
        validationMessage: ''
      }
    },
    methods: {
        confirm() {
          if (this.$refs.input !== undefined) {
            if (!this.$refs.input.checkValidity()) {
              this.validationMessage = this.$refs.input.validationMessage
              this.$nextTick(() => this.$refs.input.select())
              return
            }
          }
          this.onConfirm(this.prompt)
          this.$parent.close()
        },
        cancel() {
          this.onCancel.apply(null, arguments)
          // Timeout for the animation complete before destroying
          setTimeout(() => {
            this.$parent.close()
          }, 150)
        }
    },
    mounted() {
      this.isActive = true
      this.$nextTick(() => {
        // Handle which element receives focus
        this.hasInput
            ? this.$refs.input.focus()
            : this.$refs.confirmButton.focus()
      })
    }
  }
</script>
