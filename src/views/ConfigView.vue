<script setup lang="ts">
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { ensureContestValid, type Contest } from '@/model/Contest'
import { useContestStore } from '@/stores/contest';
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const { setContest } = useContestStore()

const file = ref<HTMLInputElement>();
const error = ref('')
const preparing = ref(false)

async function parseJsonFile(file: File): Promise<Contest> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (evt) => resolve(JSON.parse(evt.target?.result?.toString() || '{}'))
    reader.onerror = (error) => reject(error)

    reader.readAsText(file)
  })
}

async function onUploadContest() {
  error.value = ''

  const json = file.value?.files?.[0];
  if(!json) {
    return;
  }

  const newContest = await parseJsonFile(json);
  try {
    ensureContestValid(newContest);
  }
  catch(e) {
    error.value = `${e}`;
    return;
  }

  preparing.value = true;
  setContest(newContest)
  router.push({ name: 'home' })
}

function retry() {
  error.value = ''
}
</script>

<template>
  <div class="page">
    <Header />
    <div>
      <div v-if="preparing">Preparando partida...</div>
      <div v-else class="text-flow">
        <h1>¡Configura tu cincuentaporquince!</h1>

        <p>
          Para configurar tu partida tan solo tienes que preparar un fichero JSON con los datos de las diferentes preguntas y respuestas.
        </p>

        <p>
          Descarga el <a download href="/cincuentaporquince.json">fichero de la partida de demostración</a> y reemplaza las preguntas y respuestas por las
          que quieras incluir en tu partida.
        </p>

        <p>
          Ten en cuenta que, aunque en el fichero de demo hayan 10 preguntas configuradas, tú puedes incluir el número que desees. Eso sí, cada una de las
          preguntas deberá contar con 4 respuestas y solo una de ellas debe ser la correcta.
        </p>

        <p>Una vez tengas listo el fichero, guarda los cambios y súbelo a continuación:</p>

        <p v-if="error" style="color: var(--app-color-red)">
          {{ error }}
          <br />
          <a @click="retry">REINTENTAR</a>
        </p>
        <input v-else ref="file" style="margin-top: 4rem;" type="file" accept="application/json" @change="onUploadContest" />
      </div>
    </div>
    <Footer />
  </div>
</template>
