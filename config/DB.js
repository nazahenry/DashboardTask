module.exports = require('knex')({
    debug: true,
    asyncStackTraces: false,
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '@Nazachi15',
      database : 'test',
    }
  });


  // mysql -u root -p
  // @Nazachi15