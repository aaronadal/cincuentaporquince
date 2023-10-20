<script setup lang="ts">
import Header from '@/components/Header.vue'
import { useRouter } from 'vue-router';

const router = useRouter()

function onUploadContest() {
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="page">
    <Header />
    <div>
      <div class="text-flow">
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

        <input style="margin-top: 4rem;" type="file" accept="application/json" @change="onUploadContest" />
      </div>
    </div>
  </div>
</template>
