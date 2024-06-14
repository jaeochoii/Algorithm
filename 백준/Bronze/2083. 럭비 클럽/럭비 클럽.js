const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on("line", (line) => {
    if (line === "# 0 0") {
        rl.close();
    }
    main(line);
}).on("close", () => {
    process.exit();
});

const main = (line) => {
    const [name, age, weight] = line.split(" ");
    if (age > 17 || weight >= 80) {
        console.log(`${name} Senior`);
    } else {
        console.log(`${name} Junior`);
    }
};