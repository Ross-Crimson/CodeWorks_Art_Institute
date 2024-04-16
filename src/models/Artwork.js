

export class Artwork {
    constructor(data) {
        this.id = data.id
        this.attribution = data.attribution
        this.description = data.description
        this.smallDisplay = data.imgUrls.small
        this.fullDisplay = data.imgUrls.full
        this.admirers = data.admirers
        this.open = false
    }
}