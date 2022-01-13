var users = { stove: { name: '홍길동' }, test: { name: '김철수' } };

// async, await 테스트
process();

async function process() {
    var id = await getId();
    console.log('User ID: ' + id);

    var name = await getUserName(id);
    console.log('User Name: ' + name);
}

function getId() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('calling');
            resolve('stove');
        }, 2000);
    });
}

function getUserName(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('requesting user name with id: ' + id);
            resolve(users[id].name);
        }, 3000);
    });
}

var githubIds = ['jeresig', 'ahejlsberg', 'ungmo2'];

Promise.all(githubIds.map(id => fetch(`https://api.github.com/users/${id}`)))
  // [Response, Response, Response] => Promise
  .then(responses => Promise.all(responses.map(res => res.json())))
  // [user, user, user] => Promise
  .then(users => users.map(user => user.name))
  // [ 'John Resig', 'Anders Hejlsberg', 'Ungmo Lee' ]
  .then(console.log)
  .catch(console.log);