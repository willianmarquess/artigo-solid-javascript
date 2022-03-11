## Princípios do S.O.L.I.D em Javascript

A quem diga que os princípios de SOLID podem somente ser aplicados em linguagens puramente orientadas a objetos como: Java, C#, C++, etc.

Segundo Uncle Bob (Robert C. Martin) no livro Arquitetura Limpa: Os princípios SOLID nos dizem como organizar as funções, estruturas de dados, classes e também como esses artefatos devem ser interconectados. O uso da palavra "classe" não implica que esses princípios sejam aplicados apenas em linguagens e softwares orientados a objetos, em definição uma classe é apenas um agrupamento acoplado de funções, dados e os princípios de SOLID se aplicam a esses agrupamentos.

## Javascript é orientado a objetos?

Javascript é uma linguagem multiparadigma, conhecida por ser orientada a Protótipos, e pode funcionar como linguagem procedural, orientada a objetos e também como linguagem funcional.

A partir da especificação ECMAScript 2015 (ES6) foram introduzidas algumas syntax sugar (açucar de sintaxe) no javascript que auxiliam no uso clássico da orientação a objetos, como, por exemplo a introdução da palavra reservada "class" (entre outras features) para a definição de classes. 

## Objetivos do SOLID

- Software que tolere mudanças;
- Software que sejam fáceis de entender;
- Software que sejam a base de componentes reutilizaveis;

## Vamos começar?

## 1 - Single Responsability Principle

"A class should have one, and only one, reason to change"

O SRP (Princípio da responsabilidade única), uma entre várias interpretações diz que "uma classe deve ter uma única responsabilidade", vejamos esse princípio sendo violado na prática:

```javascript
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
```

A implementação da classe "Player" está violando o princípio do SRP, pois está implementando funcionalidades de acesso ao banco de dados, esse acesso ao banco de dados não deve ser responsabilidade de uma classe que representa um modelo de dados, que deveria apenas cuidar dos modelos de dados e regras de negócio relativas a ela mesma.

## 1 - Single Responsability Principle - Solução

Existem várias abordagens que seriam válidas para aplicar o SRP de maneira correta na classe "Player", uma delas seria separar as responsabilidades em duas classes distintas, uma classe "Player" é apenas responsável por representar os dados de uma entidade (poderia ter regras de negócio também), e uma classe "PlayerRepository" que fica responsável por acessar e realizar operações no banco de dados da aplicação.

- A classe "Player" tem apenas a responsabilidade de representar o modelo de dados do player;
- A classe "PlayerRepository" tem apenas a responsabilidade de acessar e realizar operações junto ao banco de dados da aplicação.

```javascript
class Player {

    constructor(id, nickName, hp, mp, attackValue, defenseValue) {
        this.id = id
        this.nickName = nickName
        this.hp = hp
        this.mp = mp
        this.attackValue = attackValue
        this.defenseValue = defenseValue
    }
    
}

class PlayerRepository {
    findAll() {
        const dbInstance = new DbInstance();
        return dbInstance.findAll();
    }

    findById() {
        const dbInstance = new DbInstance();
        return dbInstance.findById();
    }
}
```

## 2 - Open Close Principle

"Software entities (classes, modules, functions, etc.) should be open for extension but closed for modification"

O OCP diz que, um artefato de software deve ser extensível sem que isso modifique o comportamento original deste artefato

Quando falamos de artefato, estamos fazendo uma referência a: classes, módulos, funções, etc.

Vamos ver um exemplo que viola esse princípio:

```javascript
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
```

Temos a classe Payment, com a função "calcPayment" que recebe o método de pagamento e o valor para realizar o cálculo final do pagamento, porém realiza o cálculo se baseando no método de pagamento, e caso o sistema passe a ter um novo método de pagamento, teriamos que modificar o comportamento dessa função para cada nova forma de pagamento adicionada, e isso viola o OCP.

## 2 - Open Close Principle - Solução

Para implementar o OCP corretamente, vamos deixar a classe Payment como uma superclasse, e ao invés de implementar novas funcionalidades nessa classe, devemos utilizar o conceito de herança para tornar a classe Payment extensivel.

Portanto, para cada nova forma de pagamento, devemos que criar uma classe que herdará as características da superclasse Payment, e deverá usar o conceito de polimorfismo para sobreescrever a função de cálculo do pagamento de acordo com suas regras específicas.

- A classe "Payment" não terá mais o comportamento modificado;
- A classe "Payment" agora é extensível;
- Cada novo método de pagamento poderá realizar a sobreescrita da função que realiza o cálculo final do pagamento; 

``` Javascript
class Payment {

    calc(value) { }

    calcDiscount(value, percent) {
        return value - (value * (percent / 100)) 
    }

}

class CashPayment extends Payment {

    calc(value) {
        return this.calcDiscount(value, 10)
    }

}

class CreditCardPayment extends Payment {

    calc(value) {
        return this.calcDiscount(value, 0)
    }

}
```

## 3 - Liskov Substitution Principle

"Let q(x) be a property provable of objects x of a type T. Then q(y) should be provable objects of type S, where S is a subtype of T."

Uma definição interessante sobre LSP é: "uma classe base deve poder ser substituída por sua classe derivada", ou seja, uma subclasse deve ser capaz de substituir uma superclasse em todas as suas características e funcionalidades.

Abaixo temos um exemplo de violação desse princípio:

```javascript
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
```

No exemplo acima temos a superclasse "Transport", que representa meios de transporte, temos também duas subclasses "Car" (Carro) e "Bike" (Bicicleta) que extendem as características da classe "Transport" (então, podemos dizer que: bike e car são transport), porém ao afirmar que "Bike" é um "Transport", assim como a classe "Car", temos uma inconsistência, pois na nossa implementação "Transport" possui uma característica chamada "engine" (motor), e essa característica é passada por herança para todas as subclasses, e ao olharmos atentamente para a classe "Bike" percebemos que a mesma não deve possuir a propriedade "engine" e nem a funcionalidade "startEngine", pois uma bicicleta por padrão não possui um motor. 

Então nesse contexto "Bike" não pode substituir todas as características e funcionalidades de "Transporte", então estamos violando o LSP.

Como podemos resolver este problema?

## 3 - Liskov Substitution Principle - Solução

```javascript
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
```
Podemos resolver a violação LSP criando especializações específicas, ou seja, realizando heranças mais assertivas conforme o contexto da aplicação. Na solução deixamos a classe "Transport" como uma superclasse genérica e criamos uma ramificação com a superclasse "MotorizedTransport" que é uma subclasse de "Transport", e fizemos com que a classe "Car" herde diretamente de "MotorizedTransport" que possui as características e funcionalidades específicas para representar transportes motorizados, já a classe "Bike" herda diretamente da superclasse "Transport" que contém características genéricas no contexto transporte.

## 4 - Interface Segregation Principle

"Classes that implement interfaces should not be forced to implement methods they do not use."

Em definição o ISP condena o uso de interfaces "genéricas" que possuem métodos genéricos que nem sempre vão ser implementados por todas as classes.

Vamos analisar o exemplo abaixo que viola o ISP:

```javascript
class VideoGame {

    play() { }

    cloudConnect() { }

}

class Ps5 extends VideoGame {

    play() { 
        //playing
    }

    cloudConnect() { 
        //connecting in cloud
     }

}

class Ps4 extends VideoGame {

    play() { 
        //playing
    }

    cloudConnect() { 
        //connecting in cloud
     }

}

class Snes extends VideoGame {

    play() { 
        //playing
    }

    cloudConnect() { 
        //connecting in cloud ??? SNES ???
     }

}
```

No exemplo de violação fica nítido o problema, pois temos uma "interface" (representada por uma classe em JS) genérica que representa as características e funcionalidades dos videogames. As classes "Ps5" e "Ps4" conseguem implementar todas as funcionalidades (play, cloudConnect) da classe "VideoGame", porém a classe "Snes" não pode implementar a funcionalidade "cloudConnect".

Como podemos resolver este problema? 

## 4 - Interface Segregation Principle - Solução

```javascript
class ModernVideoGame {

    play() { }

    cloudConnect() { }

}


class Ps5 extends ModernVideoGame {

    play() { 
        //playing
    }

    cloudConnect() { 
        //connecting in cloud
     }

}

class Ps4 extends ModernVideoGame {

    play() { 
        //playing
    }

    cloudConnect() { 
        //connecting in cloud
     }

}

class ClassicVideoGame {

    play() { }

}


class Snes extends ClassicVideoGame {

    play() { 
        //playing
    }

}
```
Para resolver o problema de violação do ISP, devemos criar uma segregação de interfaces, ou seja, criar interfaces específicas para contextos específicos. Na nossa solução agora temos duas interfaces distintas: "ModernVideoGame" com características específicas de video games modernos e "ClassicVideoGame" com características específicas de video games antigos. Além disso, temos as implementações das interfaces conforme o contexto: "Ps4" e "Ps5" implementam "ModernVideoGame" e "Snes" implementa "ClassicVideoGame".

Obs: O exemplo utilizado poderia ser ainda mais específico, utilizando mais abstrações, lembrando, é apenas um exemplo para ajudar a melhor absorvição do conceito.

## 5 - Dependency Inversion Principle

"High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details. Details should depend on abstractions."

Este princípio procura aumentar o desacoplamento entre módulos do sistema, onde módulos que sejam de alto ou baixo nível não devem depender de implementações, mas sim de abstrações.

Vamos analisar o código abaixo: 

```javascript
class PlayerService {

    create(player) {
        const playerRepository = new PlayerRepository()
        const newPlayer = playerRepository.create(player)
        return newPlayer
    }

    update () {
        const playerRepository = new PlayerRepository()
        const playerUpdated = playerRepository.update(player)
        return playerUpdated
    }

    findAll() {
        const playerRepository = new PlayerRepository()
        return playerRepository.findAll()
    }

    findById() {
        const playerRepository = new PlayerRepository()
        return playerRepository.findById()
    }
}
```

A classe "PlayerService" possui algumas funções que utilizam uma implementação da classe "PlayerRepository", então a classe "PlayerService" está dependendo de uma implementação da classe "PlayerRepository".

## 5 - Dependency Inversion Principle - Solução

```javascript
class PlayerService {

    constructor(playerRepository){
        this.playerRepository = playerRepository
    }

    create(player) {
        const newPlayer = this.playerRepository.create(player)
        return newPlayer
    }

    update () {
        const playerUpdated = this.playerRepository.update(player)
        return playerUpdated
    }

    findAll() {
        return this.playerRepository.findAll()
    }

    findById() {
        return this.playerRepository.findById()
    }
}
```

A solução foi inverter a dependência, agora a classe "PlayerService" não depende diretamente de uma implementação da classe "PlayerRepository". A classe agora recebe como parâmetro no seu construtor uma instância da classe "PlayerRepository", retiramos a dependência entre elas e consequentemente tiramos o acoplamento.

Seria interessante se pudéssemos desenvolver uma aplicação que utilize todos esses conceitos, mas isso fica para o próximo capítulo.

Obrigado pela leitura, até mais!

Referências: 

MARTIN, Robert. Arquitetura Limpa. Alta Books. 2019.

<img src="https://images-na.ssl-images-amazon.com/images/I/815d9tE7jSL.jpg" width="100" height="150">





