const resolve = Promise.resolve({ id: 1 });
resolve.then(result => console.log(result));

const reject = Promise.reject(new Error('reason for rejection...'));
reject.catch(error => console.log(error));

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Async Operation 1...");
        //reject(new Error('Because something failed.'));
        resolve(1);
    }, 2000);
});

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Async Operation 2...");
        resolve(2);
    }, 2000);
});

Promise.all([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.log("Error: ", err.message));

Promise.race([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.log("Error: ", err.message));