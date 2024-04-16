<script setup>

import { AppState } from '../AppState.js';
import { computed, ref } from 'vue';
import { Artwork } from '../models/Artwork.js';
import { artworkService } from '../services/ArtworkService.js';

defineProps({ art: Artwork })

async function admireArtwork(artId) {
    try {
        await artworkService.admireArtwork(artId)
    } catch (error) {
        error.console(error)
    }
}

//const open = ref(false)
function setActiveArt(artId) {
    artworkService.setActiveArt(artId)
}

</script>


<template>
    <div class="p-3">

        <img :src="art.smallDisplay" alt="" class="img-fluid" @click="setActiveArt(art.id)">

        <button class="btn btn-success" @click="admireArtwork(`${art.id}`)">Admire</button>
        <!-- <button v-if="!art.admirers.includes(`${AppState.account.id}`)" class="btn btn-success"
            @click="admireArtwork(`${art.id}`)">Admire</button>
        <button v-else class="btn btn-warning" @click="admireArtwork(`${art.id}`)">Un-Admire</button> -->
    </div>


</template>

<style scoped>
.modal {
    position: fixed;
    z-index: 999;
    top: 20%;
    left: 50%;
    width: 300px;
    margin-left: -150px;
}
</style>