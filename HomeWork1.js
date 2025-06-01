// Homework1.js - TypeScript/JavaScript Fundamentals MiniSprint 001

console.log("=== MiniSprint 001: TypeScript/JavaScript Fundamentals ===\n");

// ==================================================================================
// 1.1. ES6 Methods (Arrow Functions, Template Literals, Destructuring)
// ES6(ECMAScript 2015) is a JavaScript version that introduced a set of new features
// ==================================================================================

console.log("1.1 ES6 Methods:");

//arrow functions - more concise syntax for functions as shown in the example below
const traditionalFunction = function(name) {
    return "Hello " + name;
}

const arrowFunction = (name) => {
    return `Hello ${name}`;
}

//single expression arrow functions(implicit return)
const shortArrowFunction = name => `Hello ${name}`;

console.log("Traditional function:", traditionalFunction("Mark"));
console.log("Arrow function:", arrowFunction("Andrei"));
console.log("Short arrow function:", shortArrowFunction("Alex"));



//template literals - a new way to work with strings that use backticks(``) instead of regular quotes("")
const user = { name: "Alex", age: 25 };

//traditional way
const oldWay = "Hello, my name is " + user.name + " and I am " + user.age + " years old.";

//template literal
const message = `Hello, my name is ${user.name} and I am ${user.age} years old.`

console.log("Traditional Way:", oldWay);
console.log("Template Literal:", message);



//destructing - extract values from arrays/objects making the code cleaner, easier  to read and allows to return multiple values
const numbers = [1, 2, 3, 4, 5];
//create variables with values from the array
const [first, second, ...rest] = numbers;
console.log("Array destructing - first:", first, "second:", second, "rest", rest);


const person = {name: "Alex", age: 25, city: "Bucharest"};
//create variables with values from the object
const { name, age, city} = person;
console.log("Object destructing:", { name, age, city });

//function to return multiple values
const greetUser = ({ name, age, city }) => {
    return `Hi ${name}, age ${age}, from ${city}`;
}
console.log(greetUser(person));

console.log("\n" + "=".repeat(80) + "\n");



// ==================================================================================
// 1.2. Difference between var, let, and const
// ==================================================================================

console.log("1.2 var vs let vs const:");

//var - function scoped, can be redeclared
const varExample = () => {
    if(true) {
        var varVariable = "var - function scoped";
    }
    console.log("var inside function:", varVariable);   //accesible outside if block
}
varExample();

//let - block scoped, cannot be redeclared in same scope
const letExample = () => {
    let letVariable = "let - block scoped";
    if(true) {
        let letVariable = "different let variable"; //different scope
        console.log("let inside block:", letVariable);
    }
    console.log("let outside block:", letVariable);
}
letExample();

//const - block scoped, cannot be reassigned or redeclared
const constExample = () => {
    const constVariable = "const - cannot be reassigned";
    console.log("const variable:", constVariable);

    //objects and arrays declared with const can still be mutated
    const constObject = { value: 1 };
    constObject.value = 2;  //this is allowed because we're not reassigning the object
    console.log("const object after mutation:", constObject);

    const constArray = [1, 2, 3];
    constArray.push(4); //this is allowed bacause we're not reassigning the array
    console.log("const array after mutation:", constArray);
}
constExample();

console.log("\n" + "=".repeat(80) + "\n");



// ==================================================================================
// 1.3. Spread Operator (...)
// Expands iterables (arrays, objects, strings) into individual elements
// ==================================================================================

console.log("1.3 Spread Operator:");

//spread with arrays - expand array elements
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combinedArray = [...arr1, ...arr2];   //combines arrays
console.log("Combined arrays:", combinedArray);

//spread for copying arrays
const originalArray = [1, 2, 3];
const copiedArray = [...originalArray];
copiedArray.push(4);
console.log("Original array:", originalArray);  //remains unchanged
console.log("Copied array:", copiedArray);

//spread with objects - expand object properties
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const combinedObject = { ...obj1, ...obj2 };    //combines objects
console.log("Combined objects:", combinedObject);

//spred for copying objects
const originalObject = { name: "Alex", age: 25 };
const copiedObject = { ...originalObject, age: 26 };    //copy and override
console.log("Original object:", originalObject);
console.log("Copied object:", copiedObject);

//spread in function parameters
const sumNumbers = (...numbers) => {
    return numbers.reduce(  //reduce the array to a single value by applying a function to each element and accumulating the result
        (sum, num) => sum + num,    //callback function - sum: accumulator, num: current array element
        0   //sum start at 0
    );
}
console.log("Sum using spread parameters:", sumNumbers(1, 2, 3, 4, 5));

console.log("\n" + "=".repeat(80) + "\n");



// ==================================================================================
// 1.4. Objects: Iteration and Deep Copy
// A deep copy is a completely independent copy of an object, including all nested objects and arrays.
// Changes to the copy don't affect the original.
// ==================================================================================

console.log("1.4 Objects - Iteration and Deep Copy:");

const sampleObject = {
    name: "Alex",
    age: "25",
    hobbies: ["coding", "music", "gaming"],
        address: {
        street: "123 Main St",
        city: "Bucharest"
    }
};

//object iteration methods
console.log("Object iteration methods:");

//for...in loop - iterates over enumerable properties
console.log("Using for...in:");
for (const key in sampleObject) {
    console.log(`${key}: ${sampleObject[key]}`);
}

//Object.keys() - returns array of object's keys
console.log("Using Object.keys():");
Object.keys(sampleObject).forEach(key => {
    console.log(`${key}: ${sampleObject[key]}`);
});

//Object.values() - returns array of object's values
console.log("Using Object.values():", Object.values(sampleObject));

//Object.entries() - returns array of [key, value] pairs
console.log("Using Object.entries():");
Object.entries(sampleObject).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
});



// shallow copy unlike deep copy, it modifies nested objects and that's a problem
// const shallowCopy = { ...sampleObject };
// shallowCopy.hobbies.push("swimming");
// console.log(sampleObject.hobbies); // ["coding", "music", "gaming", "swimming"]


//deep copy implementation
const deepCopy = (obj) => {
    //stop recursion for primitive values(string, number, boolean) and null
    if(obj === null || typeof obj !== "object") {
        return obj;
    }

    //handle date - create a new Date object with the same timestamp
    if(obj instanceof Date) {
        return new Date(obj.getTime());
    }

    //handle array - maps each array element through deepCopy recursively
    if(Array.isArray(obj)) {
        return obj.map(item => deepCopy(item));
    }

    //handle object
    const copy = {};
    for(const key in obj) {
        if(obj.hasOwnProperty(key)) {   //ensure we only copy the object's own properties(in case object has inherited properties)
            copy[key] = deepCopy(obj[key]); //recursively call deepCopy on each property value
        }
    }
    return copy;
}

//alternative deep copy using JSON (limited - doesn't handle functions, dates, etc...)
const jsonDeepCopy = (obj) => JSON.parse(JSON.stringify(obj));


console.log("Deep copy demonstration:");
const deepCopiedObject = deepCopy(sampleObject);
deepCopiedObject.address.city = "New City";
deepCopiedObject.hobbies.push("swimming");

console.log("Original object address city:", sampleObject.address.city); //unchanged
console.log("Deep copied object address city:", deepCopiedObject.address.city); //changed
console.log("Original hobbies length:", sampleObject.hobbies.length); //unchanged
console.log("Deep copied hobbies length:", deepCopiedObject.hobbies.length); //changed

console.log("\n" + "=".repeat(80) + "\n");

// ==================================================================================
// 1.5. Arrays - Accessor, Iteration, and Mutator Methods
// ==================================================================================

console.log("1.5 Array Methods:");

const sampleArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


//ACCESSOR METHODS (don't modify original array)
console.log("Accessor Methods (don't modify original):");

//concat() - joins arrays
const newArray = sampleArray.concat([11, 12]);
console.log("concat:", newArray);

//slice() - extracts section of array
console.log("slice(2, 5):", sampleArray.slice(2, 5));

//indexOf() and includes() - find elements
console.log("indexOf(5):", sampleArray.indexOf(5));
console.log("includes(7):", sampleArray.includes(7));

//join() - creates string from array
console.log("join(' - '):", sampleArray.join(' - '));



//ITERATION METHODS (don't modify original array)
console.log("\nIteration Methods:");

//forEach() - executes function for each element
console.log("forEach - doubling each number:");
sampleArray.forEach((num, index) => {
    console.log(`Index ${index}: ${num} * 2 = ${num* 2 }`);
})

//map() - creates new array with transformed element
const doubledArray = sampleArray.map(num => num * 2);
console.log("map - doubled array:", doubledArray);

//filter() - creates new array with elements that pass test
const evenNumbers = sampleArray.filter(num => num % 2 === 0);
console.log("filter - even numbers:", evenNumbers);

//find() - returns first element that satisfies condition
const firstGreaterThanFive = sampleArray.find(num => num > 5);
console.log("find - first > 5:", firstGreaterThanFive);

//reduce() - reduces array to single value
const sum = sampleArray.reduce(
    (accumulator, current) => accumulator + current, 
    0
);
console.log("reduce - sum of all numbers:", sum);

//some() and every() - test elements
console.log("some - has numbers > 8:", sampleArray.some(num => num > 8));
console.log("every - all numbers > 0:", sampleArray.every(num => num > 0));



//MUTATOR METHODS (modify original array)
console.log("\nMutator Methods (modify original array):");
const mutableArray = [1, 2, 3];

//push() and pop() - add/remove from end
mutableArray.push(4, 5);
console.log("After push(4, 5):", mutableArray);
const popped = mutableArray.pop();
console.log("After pop():", mutableArray, "- popped:", popped);

//unshift() and shift() - add/remove from beginning
mutableArray.unshift(0);
console.log("After unshift(0):", mutableArray);
const shifted = mutableArray.shift();
console.log("After shift():", mutableArray, "- shifted:", shifted);

//splice() - add/remove elements at any position
const spliceArray = [1, 2, 3, 4, 5];
const removed = spliceArray.splice(2, 1, 'a', 'b'); //at index 2, remove 1, add 'a', 'b'
console.log("After splice(2, 1, 'a', 'b'):", spliceArray, "- removed:", removed);

//sort() and reverse() - reorder elements
const sortArray = [3, 1, 4, 1, 5, 9];
console.log("Before sort:", sortArray);
sortArray.sort(
    (a, b) => a - b //numeric sort - compares parts from array (example: 3 - 1 = 2(positive), 1 comes before 3)
);
console.log("After numeric sort:", sortArray);

sortArray.reverse();
console.log("After reverse:", sortArray);

console.log("\n" + "=".repeat(80) + "\n");



// ==================================================================================
// 1.6. Promises and Callbacks
// ==================================================================================

console.log("1.6 Promises and Callbacks:");

//CALLBACKS - functions passed as arguments to other functions
console.log("Callback Example:");

const fetchDataWithCallback = (callback) => {
    //simulate async operation with setTimeout
    setTimeout(
        () => {
        const data = { id: 1, name: "User Data" };
        callback(null, data);   //call the callback with null(no error occured), data(fetched data)
    }, 1000 //wait 1 second, then creates mock data
);
}

const handleCallback = (error, data) => {
    if (error) {
        console.log("Callback error:", error);
    } else {
        console.log("Callback success:", data);
    }
}

fetchDataWithCallback(handleCallback);



//PROMISES - objects representing eventual completion/failure of async operation
console.log("Promise Examples:");

//this is a promise
const fetchDataWithPromise = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            //generate a number between 0 and 1
            const success = Math.random() > 0.3; //70% success rate
            if (success) {
                resolve({ id: 2, name: "Promise Data" });
            } else {
                reject(new Error("Promise failed"));
            }
        }, 1500);
    });
}

//example running a promise
fetchDataWithPromise()
    .then(data => {
        console.log("Promise resolved:", data);
        return data.id * 2; //this goes as parameter to the next .then call
    })
    .then(doubledId => {
        console.log("Doubled ID:", doubledId);
    })
    .catch(error => {
        console.log("Promise rejected:", error.message);
    })
    .finally(() => {
        console.log("Promise completed (finally block)");
    });


//wait for a bunch of promises to resolve then print aggregated output
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = new Promise(resolve => setTimeout(() => resolve(3), 500));

Promise.all([promise1, promise2, promise3])
    .then(values => {
        console.log("Promise.all results:", values);
    });


//print the fastest promise
const fastPromise = new Promise(resolve => 
    setTimeout(() => resolve("Fast"), 100)
);
const slowPromise = new Promise(resolve => 
    setTimeout(() => resolve("Slow"), 1000)
);

Promise.race([fastPromise, slowPromise])
    .then(value => {
        console.log("Promise.race winner:", value);
    });

console.log("\n" + "=".repeat(80) + "\n");



// ==================================================================================
// 1.7. Async/Await
// ==================================================================================
console.log("1.7 Async/Await:");

//we need to always return a promise in async functions
const fetchUserData = async(userId) => {
    //simulate API call
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ 
                    id: userId, 
                    name: `User ${userId}`, 
                    email: `user${userId}@example.com` 
                });
            } else {
                reject(new Error("Invalid user ID"));
            }
        }, 800);
    });
}

//using async/await is cleaner than .then() chains
const demonstrateAsyncAwait = async() => {
    try {
        console.log("Fetching user data...");
        
        //wait for function to finish before continuing
        const user = await fetchUserData(123);
        console.log("User data received:", user);
        
        const user1Promise = fetchUserData(1);
        const user2Promise = fetchUserData(2);
        
        //you can wait for a promise and chain async functions this way
        const [user1, user2] = await Promise.all([user1Promise, user2Promise]);
        console.log("Multiple users:", { user1, user2 });
        
    } catch (error) {
        console.log("Async/await error:", error.message);
    }
}

demonstrateAsyncAwait();

//throw an error
const handleAsyncErrors = async() => {
    try {
        const invalidUser = await fetchUserData(-1);
    } catch (error) {
        console.log("Caught async error:", error.message);
    }
}

handleAsyncErrors();

console.log("\n" + "=".repeat(80) + "\n");



// ==================================================================================
// 1.8. Closures
// A closure is created when an inner function accesses variables from outer function
// ==================================================================================
console.log("1.8 Closures:");

const outerFunction = (x) => {
    //variable in outer function scope
    const outerVariable = `Outer variable: ${x}`;
    
    //inner function has access to outer function's variables
    const innerFunction = (y) => {
        console.log(outerVariable);
        console.log(`Inner parameter: ${y}`);
        return x + y;   //use parameter from outer function
    }
    
    return innerFunction;   //return the inner function
}

//create the closure
const closureFunction = outerFunction(10);
console.log("Closure result:", closureFunction(5));


//design pattern: function factory
const createMultiplier = (multiplier) => {
    return (number) => number * multiplier;
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log("Double 5:", double(5));
console.log("Triple 4:", triple(4));


//design pattern: module pattern
const createCounter = () => {
    let count = 0;  //private variable (only accessible within the scope of the function)
    
    return {
        increment: () => {
            count++;
            return count;
        },
        decrement: () => {
            count--;
            return count;
        },
        getCount: () => {
            return count;
        }
    };
}

const counter = createCounter();
console.log("Counter increment:", counter.increment())
console.log("Counter increment:", counter.increment());
console.log("Counter decrement:", counter.decrement());
console.log("Counter value:", counter.getCount());


//closure in loops
const demonstrateClosureInLoop = () => {
    const functions = [];
    
    //var is function-scoped, so all functions will log 3
    for (var i = 0; i < 3; i++) {
        functions.push( () => {
            console.log("var in loop:", i); //will always log 3
        });
    }
    
    //use let (block-scoped)
    const functionsWithLet = [];
    for (let j = 0; j < 3; j++) {
        functionsWithLet.push( () => {
            console.log("let in loop:", j); //will log 0, 1, 2
        });
    }
    
    //use closure to capture value: IIFE(Immediately Invoked Function Expression) pattern
    const functionsWithClosure = [];
    for (var k = 0; k < 3; k++) {
        //create a separate closure for each loop iteration
        functionsWithClosure.push(((index) => {
            return () => {
                console.log("closure in loop:", index);
            };
        })(k)); //immediately calls function with the current value of k
    }
    
    console.log("Executing loop closure examples:");
    functions.forEach(fn => fn());  //all functions reference the same var i
    functionsWithLet.forEach(fn => fn());
    functionsWithClosure.forEach(fn => fn());
}

demonstrateClosureInLoop();

console.log("\n" + "=".repeat(80) + "\n");



// ==================================================================================
// 1.9. useState and useRef (React Hooks)
// ==================================================================================
console.log("1.9 useState and useRef (React Hooks):");

//these are React hooks, so this is conceptual demonstration
//in a real React component, we would import these from 'react'

//simulated useState
const simulateUseState = (initialValue) => {
    let state = initialValue;   //private variable
    
    const setState = (newValue) => {
        if (typeof newValue === 'function') {
            state = newValue(state);    //functional update
        } else {
            state = newValue;   //direct value update
        }
        console.log("State updated to:", state);
        //in real React, this would trigger re-render
    };
    
    const getState = () => state;   //getter function
    
    return [getState, setState];    //returns array like real useState
}


//simulated useRef
const simulateUseRef = (initialValue) => {
    const ref = {
        current: initialValue
    };
    return ref;
}

console.log("useState simulation:");

//useState is used for managing component state that triggers re-renders
const [getCount, setCount] = simulateUseState(0);

console.log("Initial count:", getCount());

//updating state with direct value
setCount(1);

//updating state with function (useful for complex updates)
setCount(prevCount => prevCount + 5);

//useState with objects
const [getUser, setUser] = simulateUseState({ name: "John", age: 25 });
console.log("Initial user:", getUser());

//when updating objects, always create new object (React uses shallow comparison)
setUser(prevUser => ({ ...prevUser, age: 26 }));


console.log("useRef Simulation:");

//useRef is used for:
//1.Storing mutable values that don't trigger re-renders
//2.Accessing DOM elements directly
//3.Keeping values between renders

const countRef = simulateUseRef(0);
const previousValueRef = simulateUseRef(null);

console.log("Initial ref value:", countRef.current);

//updating ref doesn't trigger re-render
countRef.current = 10;
console.log("Updated ref value:", countRef.current);

//common pattern: storing previous value
const simulateComponentUpdate = (newValue) => {
    previousValueRef.current = countRef.current;
    countRef.current = newValue;
    
    console.log(`Value changed from ${previousValueRef.current} to ${countRef.current}`);
}

simulateComponentUpdate(20);
simulateComponentUpdate(30);


console.log("\n" + "=".repeat(80));