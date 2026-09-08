# Chain of responsibility: Strategy pattern as used to select different types of payment. Keeping the system extendible.

enum PaymentMethod
{
    UPI,
    NETBANKING
    ...
}

Interface Payment{
    void pay(Booking booking, PaymentMethod method)
}

class UPIPayment implements Payment{
    PaymentMethod next;
    void pay(Booking booking, PaymentMethod method)
    {
        if(method !== PaymentMethod.UPI)
            next.pay(booking, method);
        
        ...
         handle UPI payment
        ...
    }
}

class NetbankingPayment implements Payment{
    PaymentMethod? next;
    void pay(Booking booking, PaymentMethod method)
    {
        if(method !== PaymentMethod.NETBANKING && next)
            next.pay(booking, method);

        if(!next)
            throw ('payment strategy not found')

        ...
         handle UPI payment
        ...
    }
}

class BookingService
{
    IPayment payment;
    Booking(Payment payment){
        this.payment = payment;
    }

    reserve(Booking booking, PaymentMethod method)
    {
        payment.pay(booking, method);
    }
}

Payment upiPay = new UPIPayment(); // singleton
Payment netbankingPay = new NetbankingPayment(); // singleton

upiPay.next = netbankingPay;


# Use a map of strategies
class PaymentService{
    Map<type, PaymentHandler> paymentHandlers;

    pay(BillingInfo, type)
    {
        if(!paymentHandlers.has(type)) throw new UnSupportedPaymentMethod(type);

        paymentHandlers.get(type).pay(BillingInfo);
    }
}
