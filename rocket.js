export class Rocket {
    constructor(name, weight, cargoWeight, remainingGas, distanceTravelled) {
        this.name = name;
        this.weight = weight;
        this.cargoWeight = cargoWeight;
        this.remainingGas = remainingGas;
        this.distanceTravelled = distanceTravelled;
    }

    launch() {
        if (this.cargoWeight < (40 / 100) * this.weight) { //incarcatura trebuie sa fie 40% din greutatea rachetei
            console.log(`Rocket ${this.name} with weight ${this.weight} kg and cargo weight ${this.cargoWeight} is launched successfully!`);
            return true;
        } else {
            console.log("The launch has been abandoned...");
            return false;
        }

    }

    land() {
        if (this.remainingGas > 1000 && this.cargoWeight < (40 / 100) * this.weight) {
            console.log(`Rocket ${this.name} land successfully!`);
            return true;
        } else {
            console.log(`Red Alert! The fuel is not enough or the cargo is too heavy.`);
            return false;
        }


    }

    distanceTravelledByTheRocket(distance) {
        this.distanceTravelled = distance;
        console.log(`Distance traveled by the Rocket ${this.name} is: ${this.distanceTravelled} million km.`);
    }


}