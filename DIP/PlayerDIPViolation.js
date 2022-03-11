class PlayerService {

    create(player) {
        const playerRepository = new PlayerRepository()
        const newPlayer = playerRepository.create(player)
        return newPlayer
    }

    update () {
        const playerRepository = new PlayerRepository()
        const playerUpdated = playerRepository.update(player)
        return playerUpdated
    }

    findAll() {
        const playerRepository = new PlayerRepository()
        return playerRepository.findAll()
    }

    findById() {
        const playerRepository = new PlayerRepository()
        return playerRepository.findById()
    }
}