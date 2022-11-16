<script setup lang="ts">

import { paintings } from './paintings'
defineProps<{
  header: string
  unavailable: string
  price: string
  all: string
  contact: string
  format: string
  onlyAvailable: string
  paintingMail: string
  formatLang: string
}>()
const checked = ref(false)
const modal = reactive<{
  open: boolean
  activeIndex: number
}>({
  open: false,
  activeIndex: 0
});
const resultPaintings = ref(paintings)
const resultAvailable = ref()
resultAvailable.value = resultPaintings.value
const openModal = (index: number) => {
  modal.open = true;
  modal.activeIndex = index;
}
const result = (n: number) => {
  resultPaintings.value = n == 0 ? paintings : paintings.filter(x => x.format == n)
  resultAvailable.value = !checked.value ? resultPaintings.value : resultPaintings.value.filter(y => y.available == checked.value)
}
watch(checked, () => {
  resultAvailable.value = !checked.value ? resultPaintings.value : resultPaintings.value.filter(y => y.available == checked.value)
})
const paintingSize = (i: number) => {
  const firstSlice = resultAvailable.value[i].format.toString().slice(0, 2)
  const secondSlice = resultAvailable.value[i].format.toString().slice(2)
  return firstSlice + "x" + secondSlice
}
</script>
<template>
  <article>
    <div class="bg-primary-pastel py-3 xl:(flex gap-11 justify-center)">
      <div class="text-20px leading-normal md:text-32px xl:text-24px text-primary">{{ format }}:</div>
      <div class="text-20px leading-normal md:text-32px xl:text-24px text-primary cursor-pointer" @click="result(4040)">
        40x40</div>
      <div class="text-20px leading-normal md:text-32px xl:text-24px text-primary cursor-pointer" @click="result(3060)">
        30x60</div>
      <div class="text-20px leading-normal md:text-32px xl:text-24px text-primary cursor-pointer" @click="result(3070)">
        30x70</div>
      <div class="text-20px leading-normal md:text-32px xl:text-24px text-primary cursor-pointer" @click="result(5060)">
        50x60</div>
      <div class="text-20px leading-normal md:text-32px xl:text-24px text-primary cursor-pointer" @click="result(5070)">
        50x70</div>
      <div class="text-20px leading-normal md:text-32px xl:text-24px text-primary cursor-pointer" @click="result(6080)">
        60x80</div>
      <div class="text-20px leading-normal md:text-32px xl:text-24px text-primary cursor-pointer"
        @click="result(30120)">
        30x120</div>
      <div class="text-20px leading-normal md:text-32px xl:text-24px text-primary cursor-pointer" @click="result(0)">{{
          all
      }}</div>
      <div class="flex text-20px leading-normal md:text-32px xl:text-24px text-primary">{{ onlyAvailable }}:
        <input type="checkbox" name="onlyAvailable" id="onlyAvailable" class="block w-6 h-6 ml-2" v-model="checked">
      </div>
    </div>
    <div class="up">
      <div class="down">
        <h2
          class="text-white text-36px py-7 font-header md:(text-secondary text-48px) xl:(text-primary text-56px py-12)">
          {{ header }}
        </h2>
        <div class="flex flex-wrap gap-19 justify-center">
          <div @click="openModal(index)" v-for="(n, index) in resultAvailable"
            class="relative min-w-80 min-h-80 max-w-80 max-h-80 cursor-pointer transform duration-500 hover:(scale-110) xl:(min-w-90 min-h-90) overflow-hidden">
            <div v-if="!n.available" class="absolute z-10 w-350px text-white top-35 bg-red-600 text-center">
              {{
                  unavailable
              }}</div>
            <img :src="n.image" width="350" height="350" />
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="modal.open">

      <template v-slot:header>
        <h1 class="text-primary text-24px md:text-32px xl:text-32px">{{ resultAvailable[modal.activeIndex].header }}
        </h1>
      </template>
      <template v-slot:content>
        <div class="flex justify-center gap-5 md:gap-10 xl:gap-20">
          <div class="flex items-center max-w-50 md:(max-w-100) xl:(max-w-100)">
            <img :src="resultAvailable[modal.activeIndex].image" />
          </div>
          <div class="flex items-center max-w-50 md:(max-w-100) xl:(max-w-100)">
            <video controls muted class="max-h-50 max-w-50 md:(max-h-100 max-w-100) xl:(max-h-100 max-w-100)">
              <source :src="resultAvailable[modal.activeIndex].video" type="video/mp4" />
            </video>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div v-if="resultAvailable[modal.activeIndex].available"
          class="flex justify-center text-16 px gap-4 pt-2 md:(gap-6 pt-4 text-24px) xl:(gap-6 pt-4 text-24px)">
          <h2 class="text-primary font-semibold">{{ price }}: {{ resultAvailable[modal.activeIndex].price }},-
          </h2>
          <a :href="`mailto:info@artbyalex.cz?subject=${paintingMail} ${resultAvailable[modal.activeIndex].header}`"
            class="cursor-pointer font-semibold">{{ contact }}</a>
        </div>
        <div v-else
          class="flex justify-center text-16 px gap-4 pt-2 font-semibold md:(gap-6 pt-4 text-24px) xl:(gap-6 pt-4 text-24px)">
          {{ unavailable }}
        </div>
        <div class="font-semibold text-16 pt-2 md:(pt-2 text-24px) xl:(pt-4 text-24px)">
          {{ formatLang }} {{ paintingSize(modal.activeIndex) }}
        </div>
      </template>

    </Modal>
  </article>
</template>
<style scoped>
.up {
  background-image: url("../assets/images/gallery-up.svg");
  background-repeat: no-repeat;
}

.down {
  @apply pb-40;
  background-image: url("../assets/images/gallery-down.svg");
  background-repeat: no-repeat;
  background-position: bottom right;
}
</style>