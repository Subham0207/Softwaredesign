# Design Principle
1. KISS ( Keep It Simple, Stupid)
2. YAGNI ( You Are'nt Gonna Need it)
3. Separation Of Concern
4. DRY ( Donot Repeat Yourself)

# OOPS Concepts
1. Abstraction ( using interfaces, not worrying about underlying details)
2. Polymorphism ( overloading, more than one form)
3. Encapsulation ( private, public, protected)
4. Inheritance (parent and child class)

## Composition
Instead a sub-class inheriting from parent class. We reference the parent class object in subclass.
Example:
`
Class Car
{
Private:
    Engine engine;
}
`

## Functional Programming


# Design Patterns

## Creational Pattern -- Creation of object.
1. Factory Pattern
    `const smsNotification = NotificationFactory.create('sms');`
2. Builder Pattern
    `const httpRequest = new HttpRequest().Builder().Url().Method().Body();`
3. Singleton Pattern


## Structural Pattern -- How objects connect.
1. Decorator -- wrap an object to add 1 new functionality. Use decorator if functionality is runtime. Use sub-class for predefined behaviour.

2. Facade -- a coordinator class. An orchestrator that coordinates multiple components.

# Behavioural Pattern -- How objects interact.

1. Strategy Pattern: instead a bunch of if/else and switch use Polymorphism and composition over inheritance.

`
class CreditCardPayment implements PaymentStrategy;
class PayPalPayment implements PaymentStrategy;

class ShoppingCart {
    private PaymentStrategy paymentStrategy;

    public void setPaymentStrategy(PaymentStrategy paymentStrategy) {
        this.paymentStrategy = paymentStrategy;
    }

    public void checkout(double amount) {
        paymentStrategy.pay(amount);
    }
}
`

2. Observer pattern: Listen to events and get get notified.

`
interface Observer {
  update(symbol: string, price: number): void;
}

interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notifyObservers(): void;
}

class Stock implments Subject{...}
class PriceDisplay implments Observer{...}
class PriceAlert implments Observer{...}

const stock = new Stock("AAPL");

const display = new PriceDisplay();
const alert = new PriceAlert(150.00);

stock.attach(display);
stock.attach(alert);

stock.setPrice(145.00);  // Both observers get notified
stock.setPrice(155.00);  // Both observers get notified
`

3. 
