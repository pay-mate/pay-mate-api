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
                console.log('payer', payer.value)
                receivers.forEach((receiver) => {
                console.log('receiver', receiver.value)

                    if (payer.value === 0 || receiver.value === 0) return;
    
                    let amount = 0;
    
                    if (Math.abs(payer.value) >= Math.abs(receiver.value)) {
                        amount = (Math.abs(payer.value) - Math.abs(receiver.value)).toFixed(2);
                    } else {
                        amount = (Math.abs(receiver.value) - Math.abs(payer.value)).toFixed(2);
                    }
                    debts.push({
                        debtor: payer.id,
                        destination: receiver.id,
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
}

module.exports = DebtCalculatorService;