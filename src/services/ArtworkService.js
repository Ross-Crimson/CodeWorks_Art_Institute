import axios from "axios"
import { AppState } from "../AppState.js"
import { Artwork } from "../models/Artwork.js"
import { Account } from "../models/Account.js"
import { api } from "./AxiosService.js"

const artApi = axios.create({
    baseURL: 'https://sandbox.codeworksacademy.com/api/artworks',
    timeout: 8000
})


class ArtworkService {
    setActiveArt(artId) {
        const artToSetActive = AppState.artworks.find(art => art.id == artId)
        AppState.activeArtwork = artToSetActive
        console.log(artToSetActive)
    }

    async getArtwork() {
        try {
            const response = await artApi.get('')
            const artwork = response.data.artworks.map(artData => new Artwork(artData))
            AppState.artworks = artwork
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    async changePage(pageNum) {

        console.log("page change called", pageNum)
        const response = await artApi.get(`?page=${pageNum}`)

        const artwork = response.data.artworks.map(artData => new Artwork(artData))
        AppState.currentPage = response.data.page
        AppState.artworks = artwork
    }

    async admireArtwork(artId) {
        const respose = await api.post(`api/artworks/${artId}/admire`)
        console.log(respose.data)
        const admiredArt = new Artwork(respose.data)
        const artToUpdateIndex = AppState.artworks.findIndex(art => art.id == artId)
        AppState.artworks.splice(artToUpdateIndex, 1, admiredArt)
        console.log(AppState.artworks)
    }
}

export const artworkService = new ArtworkService