<script setup lang="ts">

import { languages } from '../components/languages';

const language = ref('cz')
const languageReturn = ref(languages.czech)
const changeLanguage = () => {
  language.value = language.value === 'cz' ? 'en' : 'cz'
  languageReturn.value = language.value === 'cz' ? languages.czech : languages.english
}

</script>
<template>
  <Header type="home" @change="changeLanguage" />
  <Main v-bind="languageReturn" />
  <Footer />
</template>