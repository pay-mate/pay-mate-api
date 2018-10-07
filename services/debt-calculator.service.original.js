// class DebtCalculatorService {
//     constructor(users, payments, group) {
//         this.group = group;
//         this.users = users;
//         this.payments = payments;
//     }

//     calculate() {
//         const result = [];
//         const payers = Object.assign([], this.payers());
//         const receivers = Object.assign([], this.receivers());

//         while (payers.some(x => x !== 0) && receivers.some(x => x !== 0)) {
//             console.log(payers)
//             console.log(receivers)
//             payers.forEach((p) => {
//                 receivers.forEach((r) => {
//                     if (p.value === 0 || r.value === 0) return;
    
//                     let amount = 0;
    
//                     if (Math.abs(p.value) >= Math.abs(r.value)) {
//                         amount = Math.abs(p.value) - Math.abs(r.value);
//                     } else {
//                         amount = Math.abs(r.value) - Math.abs(p.value);
//                     }
    
//                     result.push({
//                         source: p.id,
//                         destination: r.id,
//                         amount: amount
//                     });
    
//                     p.value += amount;
//                     r.value -= amount;
//                 });
//             });
//         }
    
//         return result;
//     }

//     totalAmount() {
//        return this.payments.reduce((acc, el) => acc + el.amount, 0); 
//     }

//     part() {
//         return Number(
//             (this.totalAmount() / this.users.length).toFixed(2)
//         )
//     }

//     paymentPerUserId() {
//         const result = this.users.reduce((acc, el) => {
//             acc[el.id] = 0;
//             return acc;
//         }, {})

//         this.payments.forEach((payment) => {
//             result[payment.payer.toString()] += payment.amount;
//         })

//         return result;
//     }

//     amountPerUser() {
//         const result = Object.assign({}, this.paymentPerUserId());

//         Object.keys(result).forEach((key) => {
//             result[key] -= this.part();
//         })

//         return result;
//     }

//     payers() {
//         const result = [];
//         const data = Object.assign({}, this.amountPerUser());

//         Object.keys(data).forEach((key) => {
//             if(data[key] < 0) {
//                 result.push({
//                     id: key,
//                     value: Number(data[key].toFixed(2))
//                 })
//             }
//         });

//         return result;
//     }

//     receivers() {
//         const result = [];
//         const data = Object.assign({}, this.amountPerUser());

//         Object.keys(data).forEach((key) => {
//             if(data[key] > 0) {
//                 result.push({
//                     id: key,
//                     value: Number(data[key].toFixed(2))
//                 })
//             }
//         });

//         return result;
//     }
// }

// module.exports = DebtCalculatorService;