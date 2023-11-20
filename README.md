# optex

A utility for optional execution of functions.

## Annoying

```typescript
function greet(greeting: string) {
    console.log(greeting);
}

const maybe = Math.random() > 0.5 ? "Hello" : undefined;

if (maybe) { // Need to check if defined to narrow type
    greet(maybe);
}
```

## Much better

```typescript
import { run } from "optex";

function greet(greeting: string) {
    console.log(greeting);
}

const maybe = Math.random() > 0.5 ? "Hello" : undefined;

run(greet).wif(maybe)();
```

Why is the syntax so weird? Because this is similar to a builder pattern. It's like

```typescript
run(greet).wif(maybe).go();
```

where `"go"` &rarr; `""`. Which is there because we can also

```typescript
run(greet).wif(maybe).else(() => console.log("Go away"));
```

This function actually supports an arbitrary number of arguments. The `wif` case is executed when all arguments are neither `null` nor `undefined`.

```typescript
import { run } from "optex";

function greetBetter(greeting: string, name: string, end: string) {
    console.log(`${greeting} ${name}${end}`);
}

const greeting = Math.random() > 0.5 ? "Hello" : undefined;
const name = Math.random() > 0.5 ? "John" : null;
const end = Math.random() > 0.5 ? "!" : undefined;

run(greetBetter).wif(greeting, name, end)(); // logs "Hello John!" or nothing
````
