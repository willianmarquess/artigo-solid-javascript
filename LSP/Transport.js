class Transport {

    constructor(name, model, velocity) {
        this.name = name
        this.model = model
        this.velocity = velocity
    }

    ride() {
        //some code to begin a transportation
    }

}

class MotorizedTransport extends Transport {

    constructor(name, model, velocity, engine) {
        super(name, model, velocity)
        this.engine = engine
    }

    ride() {
        //some code to begin a transportation
    }

    startEngine() {
        this.engine = true
    }

}

class Car extends MotorizedTransport {

    constructor(name, model, velocity, engine) {
        super(name, model, velocity, engine)
    }

    ride() {
        if (!this.engine){
            this.startEngine()
        }
        //some code to begin a transportation
    }

}

class Bike extends Transport {

    ride() {
        // SOME CODE TO START 
    }

}