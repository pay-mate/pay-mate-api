class DebtCalculatorService {
    constructor(users, payments) {
        this.users = users;
        this.payments = payments;
    }

    calculateDebts() {
        const debts = [];
        const payers = Object.assign([], this.payers());
        const receivers = Object.assign([], this.receivers());
  
            payers.forEach((payer) => {
                receivers.forEach((receiver) => {

                    if (payer.value === 0 || receiver.value === 0) return;
    
                    let amount = 0;
    
                    if (payer.value < receiver.value) {
                        amount = (payer.value)*-1;
                        payer.value = 0;
                    } else {
                        amount = (payer.value - receiver.value);
                        payer.value = payer.value - amount;
                    }

                    // if (Math.abs(payer.value) >= Math.abs(receiver.value)) {
                    //     amount = (Math.abs(payer.value) - Math.abs(receiver.value)).toFixed(2);
                    // } else {
                    //     amount = (payer.value)*-1;
                    // }

                    debts.push({
                        debtorName: this.users.find(u => u.id === payer.id).name,
                        debtorImage: this.users.find(u => u.id === payer.id).image,
                        destinationName: this.users.find(u => u.id === receiver.id).name,
                        debtor: payer.id,
                        destination: receiver.id,
                        destinationImage: this.users.find(u => u.id === receiver.id).image,
                        amount: amount
                    });
                });
            });
        return debts;
    }

   
    totalAmount() {
       return (this.payments.reduce((acc, el) => acc + el.amount, 0)).toFixed(2); 
    }

    part() {
        return Number(
            (this.totalAmount() / this.users.length).toFixed(2)
        );
    }

    paymentPerUserId() {
        const result = this.users.reduce((acc, el) => {
            acc[el.id] = 0;
            return acc;
        }, {})

        this.payments.forEach((payment) => {
            result[payment.payer.toString()] += payment.amount;
        })

        return result;
    }

    amountPerUser() {
        const result = Object.assign({}, this.paymentPerUserId());

        Object.keys(result).forEach((key) => {
            result[key] -= this.part();
        })

        return result;
    }

    payers() {
        const result = [];
        const data = Object.assign({}, this.amountPerUser());

        Object.keys(data).forEach((key) => {
            if(data[key] < 0) {
                result.push({
                    id: key,
                    value: Number(data[key].toFixed(2))
                })
            }
        });
        return result;
    }

    receivers() {

        const result = [];
        const data = Object.assign({}, this.amountPerUser());

        Object.keys(data).forEach((key) => {
            if(data[key] > 0) {
                result.push({
                    id: key,
                    value: Number(data[key].toFixed(2))
                })
            }
        });

        return result;
    }

    userDebtor(){
        
    }
}

module.exports = DebtCalculatorService;