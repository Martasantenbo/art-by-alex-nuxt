<script setup lang="ts">

const props = defineProps<{
  modelValue?: boolean;
}>();
const emit = defineEmits(['update:modelValue', 'close']);
const close = () => {
  emit('update:modelValue', false);
  emit('close');
};
const onEscape = (e: any) => {
  if (props.modelValue && e?.keyCode === 27) {
    close();
  }
}
onUpdated(() => {
  document?.addEventListener('keydown', onEscape, { once: true });
})
</script>

<template>
  <teleport v-if="modelValue" to="#app">
    <div @click="close"
      class="z-50 fixed top-0 left-0 bg-opacity-60 bg-black w-full h-full flex items-center justify-center">
      <div @click.stop
        class="p-5 border-1 gap-4 bg-white border-gray shadow rounded-xl max-h-11/12 m-4 overflow-auto relative sm:min-w-40 md:min-w-150 xl:min-w-175"
        :class="$attrs.class" role="dialog">
        <div class="sm:pl-50 md:pl-63 xl:pl-73 pb-4 flex justify-between">
          <div>
            <slot name="header" />
          </div>

          <button class="flex-shrink-0" @click="close" type="button">
            <img src="../assets/images/cross.svg" width="20" alt="cross">
          </button>
        </div>

        <slot name="content" />

        <slot name="footer" />
      </div>
    </div>
  </teleport>
</template>