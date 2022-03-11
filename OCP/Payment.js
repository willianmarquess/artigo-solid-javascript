class Payment {

    calc(value) { }

    calcDiscount(value, percent) {
        return value - (value * (percent / 100)) 
    }

}

class CashPayment extends Payment{

    calc(value){
        return this.calcDiscount(value, 10)
    }

}

class CreditCardPayment extends Payment{

    calc(value){
        return this.calcDiscount(value, 0)
    }

}
