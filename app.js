var mysql = require('mysql');
var conn = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'batman',
	port : 3306
});
conn.connect();
conn.query('select 1 + 1 as solution',function(err,rows,fields){
	for(var name in rows[0]){
		console.log(name + ':' + rows[0][name]);
	}
});
conn.end();