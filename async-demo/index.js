console.log('before');
getUser(1);
console.log('after');

//callback
//promices
//async/await

function getUser(id)
{
setTimeout(() =>
{
    console.log('Reading a user from a database......')
    return { id: id, githubUSername: 'akshat' };
}, 2000);
}