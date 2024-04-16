<script setup>
import { onMounted, computed, ref } from 'vue';
import { artworkService } from '../services/ArtworkService.js';
import { AppState } from '../AppState.js';
import ArtworkCard from '../components/ArtworkCard.vue'

const artworks = computed(() => AppState.artworks)
const activeArt = computed(() => AppState.activeArtwork)
onMounted(() => { artworkService.getArtwork() })

async function changePage(pageNum) {
  try {
    await artworkService.changePage(pageNum)
  } catch (error) {
    console.error(error)
  }
}

function clearActiveArtwork() {
  AppState.activeArtwork = null
}

</script>

<template>
  <section class="container-fluid">
    <div class="row justify-content-around py-3">
      <button class="btn btn-primary col-2" @click="changePage(AppState.currentPage - 1)">Prev</button>
      <div class="col-2 text-center">{{ AppState.currentPage }}</div>
      <button class="btn btn-primary col-2" @click="changePage(AppState.currentPage + 1)">Next</button>
    </div>


    <div class="row">
      <ArtworkCard v-for="art in artworks" :key="art.id" :art="art" class="col-3" />
    </div>

    <div v-if="activeArt" class="row">
      <div style="position: fixed; top: 5%;">
        <img :src="activeArt.fullDisplay" alt="" class="img-fluid">
        <button class="btn btn-warning" @click="clearActiveArtwork()">Clear</button>
      </div>
    </div>

  </section>
</template>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: clamp(500px, 50vw, 100%);

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
