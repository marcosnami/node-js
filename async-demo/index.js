console.log("Before");
// Callbacks approach
getUser(1, getRepositories);
console.log("After");

function getRepositories(user) {
    getRepositories(user.gitHubUsername, getCommits);
}

function getCommits(repositories) {
    getCommits(repository, displayCommits);
}

function displayCommits(commits) {
    console.log("Callback Commits: ", commits);
}

// Promises approach
getUser(1)
    .then(user => getRepositories(user.gitHubUsername))
    .then(repositories => getCommits(repositories[0]))
    .then(commits => console.log("Commits", commits))
    .catch(err => console.log("Error", err.message));

// Async or Wait approach
async function asyncDisplayCommits() {
    try {
        const user = await getUser(1);
        const repositories = await getRepositories(user.gitHubUsername);
        const commits = await getCommits(repositories[0]);
        console.log("Commits: ", commits);
    } catch(err) {
        console.log("Error: ", err.message);
    }
}
asyncDisplayCommits();

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Reading a user from a database...");
            resolve({ id: id, gitHubUsername: 'mosh' });  
        }, 2000);
    });
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Calling GitHub API...");
            resolve([ 'repo01', 'repo02', 'repo03' ]);
        }, 2000);
    
    });
}

function getCommits(repository) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Calling GitHub API - Commits...");
            resolve([ 'commits' ]);
        }, 2000);
    
    });
}


// Promisses
// Async/Wait
