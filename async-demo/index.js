console.log('before');
getUser(1, (user) =>
{
    console.log('user', user)
});
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