console.log('before');
// getUser(1, getRepositories);
console.log('after');

// function getRepositories(user) {
//     getRepositories(user.githubUsername, getCommits);
// }

// function getCommits(repos) {
//     getCommits(repo, displayCommits);
// }

// function displayCommits(commits) {
//     console.log(commits);
// }

//promise approach
getUser(1)
    .then(user => getRepositories(user.githubUsername))
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log('Commits', commits))
    .catch(err => console.log("Error", err.message)) 

//Async-await approach
async function displayCommits() {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user.githubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    }
    catch (err) {
        console.log('Error', err.message)
    }
}


//Synchronous
// console.log('before');
// const user = getUser(1);
// const repos = getRepositories(user.githubUsername);
// const commits = getCommits(repo[0]);
// console.log('after');

//callback
//promises => Promise is an object that holds the eventual result of an asynchronous operations
//async/await

function getUser(id)
{
    return new Promise((resolve, reject) =>
    {
        setTimeout(() => {
            console.log('Reading a user from a database......')
            resolve({ id: id, githubUsername: 'akshat' });
        }, 2000);
    });
} 

function getRepositories(username)
{
    return new Promise((resolve, reject) =>
    {
        setTimeout(() => {
            console.log('Calling github apis......')
            resolve([ 'user1', 'user2', 'user3' ]);
        }, 2000);
    });
} 

function getCommits(repo)
{
    return new Promise((resolve, reject) =>
    {
        setTimeout(() => {
            console.log('Calling github Commits......')
            resolve([ 'commit' ]);
        }, 2000);
    });
} 