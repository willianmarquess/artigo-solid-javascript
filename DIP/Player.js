class PlayerService {

    constructor(playerRepository){
        this.playerRepository = playerRepository
    }

    create(player) {
        const newPlayer = this.playerRepository.create(player)
        return newPlayer
    }

    update () {
        const playerUpdated = this.playerRepository.update(player)
        return playerUpdated
    }

    findAll() {
        return this.playerRepository.findAll()
    }

    findById() {
        return this.playerRepository.findById()
    }
}