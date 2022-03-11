class Transport {

    constructor(name, model, velocity, engine) {
        this.name = name
        this.model = model
        this.velocity = velocity
        this.engine = engine
    }

    ride() {
        //some code to start a transportation
    }

    startEngine() {
        //some code to start engine
    }

}

class Car extends Transport{

    constructor (name, model, velocity, engine, fuelTank) {
        super(name, model, velocity, engine)
        this.fuelTank = fuelTank
    }

    ride(){
        if(this.fuelTank.isEmpty){
            return;
        }
        if (!this.engine){
            this.startEngine()
        }
        //some code to start a transportation
    }

    startEngine() {
        this.engine = true
    }

}

class Bike extends Transport{

    constructor (name, model, velocity, engine) {
        super(name, model, velocity, engine)
    }

    ride(){
        //some code to begin a transportation
    }

    startEngine() {
        // bike has no engine
    }

}