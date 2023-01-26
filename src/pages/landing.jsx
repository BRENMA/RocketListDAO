import React from "react";
import Sketch from "react-p5";
import './landing.css'

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const Landing = () => {

    let boids = [];
    let height = window.innerHeight
    let width = window.innerWidth

    function setup(p5, canvasParentRef) {
        p5.createCanvas(width, height).parent(canvasParentRef);
        
        // Add an initial set of boids into the system
        for (let i = 0; i < 100; i++) {
            boids[i] = new Boid(getRandomInt(width), getRandomInt(height), p5);
        }
    }
    
    function draw(p5) {
        p5.background('white');

        // Run all the boids
        for (let i = 0; i < boids.length; i++) {
            boids[i].run(p5, boids);
        }
    }
    
    // Boid class
    // Methods for Separation, Cohesion, Alignment added
    class Boid {
        constructor(x, y, p5) {
            this.acceleration = p5.createVector(0, 0);
            this.velocity = p5.constructor.Vector.random2D();
            this.position = p5.createVector(x, y);
            this.r = 3.0;
            this.maxspeed = 2;    // Maximum speed
            this.maxforce = 0.05; // Maximum steering force
        }
        
        run(p5, boids) {
            this.flock(p5, boids);
            this.update();
            this.borders();
            this.render(p5);
        }
        
        // Forces go into acceleration
        applyForce(force) {
            this.acceleration.add(force);
        }
        
        // We accumulate a new acceleration each time based on three rules
        flock(p5, boids) {
            let sep = this.separate(p5, boids); // Separation
            let ali = this.align(p5, boids);    // Alignment
            let coh = this.cohesion(p5, boids); // Cohesion
            // Arbitrarily weight these forces
            sep.mult(2.5);
            ali.mult(1.0);
            coh.mult(1.0);
            // Add the force vectors to acceleration
            this.applyForce(sep);
            this.applyForce(ali);
            this.applyForce(coh);
        }
        
        // Method to update location
        update() {
            // Update velocity
            this.velocity.add(this.acceleration);
            // Limit speed
            this.velocity.limit(this.maxspeed);
            this.position.add(this.velocity);
            // Reset acceleration to 0 each cycle
            this.acceleration.mult(0);
        }
        
        // A method that calculates and applies a steering force towards a target
        // STEER = DESIRED MINUS VELOCITY
        seek(p5, target) {
            let desired = p5.constructor.Vector.sub(target, this.position); // A vector pointing from the location to the target
            // Normalize desired and scale to maximum speed
            desired.normalize();
            desired.mult(this.maxspeed);
            // Steering = Desired minus Velocity
            let steer = p5.constructor.Vector.sub(desired, this.velocity);
            steer.limit(this.maxforce); // Limit to maximum steering force
            return steer;
        }
        
        // Draw boid as a circle
        render(p5) {
            p5.fill(255, 204, 0);
            //p5.stroke(100);
            p5.ellipse(this.position.x, this.position.y, 15, 15);
        }
        
        // Wraparound
        borders() {
            if (this.position.x < -this.r) this.position.x = width + this.r;
            if (this.position.y < -this.r) this.position.y = height + this.r;
            if (this.position.x > width + this.r) this.position.x = -this.r;
            if (this.position.y > height + this.r) this.position.y = -this.r;
        }
        
        // Separation
        // Method checks for nearby boids and steers away
        separate(p5, boids) {
            let desiredseparation = 25.0;
            let steer = p5.createVector(0, 0);
            let count = 0;
            // For every boid in the system, check if it's too close
            for (let i = 0; i < boids.length; i++) {
                let d = p5.constructor.Vector.dist(this.position, boids[i].position);
                // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
                if ((d > 0) && (d < desiredseparation)) {
                    // Calculate vector pointing away from neighbor
                    let diff = p5.constructor.Vector.sub(this.position, boids[i].position);
                    diff.normalize();
                    diff.div(d); // Weight by distance
                    steer.add(diff);
                    count++; // Keep track of how many
                }
            }
            // Average -- divide by how many
            if (count > 0) {
                steer.div(count);
            }
        
            // As long as the vector is greater than 0
            if (steer.mag() > 0) {
                // Implement Reynolds: Steering = Desired - Velocity
                steer.normalize();
                steer.mult(this.maxspeed);
                steer.sub(this.velocity);
                steer.limit(this.maxforce);
            }
            return steer;
        }
        
        // Alignment
        // For every nearby boid in the system, calculate the average velocity
        align(p5, boids) {
            let neighbordist = 50;
            let sum = p5.createVector(0, 0);
            let count = 0;
            for (let i = 0; i < boids.length; i++) {
                let d = p5.constructor.Vector.dist(this.position, boids[i].position);
                if ((d > 0) && (d < neighbordist)) {
                    sum.add(boids[i].velocity);
                    count++;
                }
            }
            if (count > 0) {
                sum.div(count);
                sum.normalize();
                sum.mult(this.maxspeed);
                let steer = p5.constructor.Vector.sub(sum, this.velocity);
                steer.limit(this.maxforce);
                return steer;
            } else {
                return p5.createVector(0, 0);
            }
        }
        
        // Cohesion
        // For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
        cohesion(p5, boids) {
            let neighbordist = 50;
            let sum = p5.createVector(0, 0); // Start with empty vector to accumulate all locations
            let count = 0;
            for (let i = 0; i < boids.length; i++) {
                let d = p5.constructor.Vector.dist(this.position, boids[i].position);
                if ((d > 0) && (d < neighbordist)) {
                    sum.add(boids[i].position); // Add location
                    count++;
                }
            }
            if (count > 0) {
                sum.div(count);
                return this.seek(p5, sum); // Steer towards the location
            } else {
                return p5.createVector(0, 0);
            }
        }  
    }


    return (
        <div id="canvas">
            <div className="text">
                <h1 className="title">rocketlistDAO</h1>
                <p className="description">bringing liquidity to vc</p>
            </div>
            <Sketch className="canvas" setup={setup} draw={draw} />
        </div>
    )
}

export default Landing;
