const PAYMENTS_METHODS = {
    CASH: 'CASH',
    CREDIT_CARD: 'CREDIT_CARD'
}

class Payment {

    calcPayment(method, value) {
        let finalAmount = 0
        switch (method) {
            case PAYMENTS_METHODS.CASH:
                finalAmount = value * 0.9
                break
            case PAYMENTS_METHODS.CREDIT_CARD:
                finalAmount = value * 1
                break
        }
        return finalAmount;
    }

}