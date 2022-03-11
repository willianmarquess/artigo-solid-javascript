class Player {

    constructor (id, nickName, hp, mp, attackValue, defenseValue) {
        this.id = id
        this.nickName = nickName
        this.hp = hp
        this.mp = mp
        this.attackValue = attackValue
        this.defenseValue = defenseValue
    }

    findAll(){
        const dbInstance = new DbInstance();
        return dbInstance.findAll();
    }

    findById(){
        const dbInstance = new DbInstance();
        return dbInstance.findById();
    }
    
}







class DbInstance{

}