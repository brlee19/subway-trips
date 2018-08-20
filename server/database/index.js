const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://avdkxmxpequseh:b9c2faa837df0ef8f4e7a3d898030d7a4ec8e631f1fda27946100790aba60004@ec2-54-235-160-57.compute-1.amazonaws.com:5432/d4f7k8qn91oc1d',
  ssl: true,
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});