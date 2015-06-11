var mysql = require('mysql');
var conn = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'batman',
	port : 3306
});
conn.connect();

var insertSQL = 'insert into t_user(name) values ("conan"),("fens.me")';
var selectSQL = 'select * from t_user';
var deletSQL = 'delete from u_user';
var updateSQL = 'update t_user set name = "conan update" where name = "conan"';

//insert
conn.query(insertSQL,function(err1,err2){
	console.log(err1);
	console.log(err2);
});

//close connection
//add test
conn.end();

