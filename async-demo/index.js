//Asychronous

console.log('before');
getUser(1, (user) =>
{
    getRepositories(user.githubUsername, (repos) =>
    {
        getCommits(repo, (commits) =>
        {
            
        });
    });
});
console.log('after');

//Synchronous

console.log('before');
const user = getUser(1);
const repos = getRepositories(user.githubUsername);
const commits = getCommits(repo[0]);
console.log('after');

//callback
//promices
//async/await

function getUser(id, callback)
{
setTimeout(() =>
    {
        console.log('Reading a user from a database......')
        callback ({ id: id, githubUsername: 'akshat' });
    }, 2000);
} 

function getRepositories(username, callback)
{
setTimeout(() =>
    {
        console.log('Calling github apis......')
        callback ([ 'user1', 'user2', 'user3' ]);
    }, 2000);
} 