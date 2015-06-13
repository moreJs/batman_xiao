var mysql = require('mysql');
var EventProxy = require('eventproxy');
var conn = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'car',
	port : 3306
});
conn.connect();

/*var insertSQL = 'insert into t_user(name) values ("conan"),("fens.me")';
var selectSQL = 'select * from t_user';
var deletSQL = 'delete from u_user';
var updateSQL = 'update t_user set name = "conan update" where name = "conan"';*/
var getFrameByName = "select frame from car where short_value = '",
	getUpperClassFrame = "select distinct short_value from car where slot in ('9087','2004') and frame = '";

var proxy = new EventProxy();
/*//insert
conn.query(insertSQL,function(err1,err2){
	console.log(err1);
	console.log(err2);
});*/
//select
/*conn.query(selectSQL,function(err,data){
	for(var item in data){
		var temp = data[item];
		console.log(temp['id']);
		console.log(temp['name']);
	}
});*/
//close connection
//add test
var getFrameByNameFn = function(name){
	conn.query(getFrameByName +name +"'",function(err1,data){
		//console.log(data[0]['frame'] || '');
		proxy.emit('getFrameByNameFn',data[0]['frame'] || '');
	});
};
proxy.on('getFrameByNameFn',function(frame){
//	console.log(frame);
	getUpperClassFrameFn(frame);
});
var getUpperClassFrameFn = function(id){
	conn.query(getUpperClassFrame + id +"'",function(err1,data){
	//	console.log(data[0]['short_value'] || '');
		proxy.emit('getUpperClassFrameFn',data[0]['short_value'] || '');
	});
};

proxy.on('getUpperClassFrameFn',function(upperClassId){
	if(upperClassId == '1000'){
		showDeep();
		return;
	}
	getDeepth.deep++;
	getUpperClassFrameFn(upperClassId);
});

var showDeep = function(){
	var id = getDeepth.deep;
	getDeepth.deep = 0;
	console.log(id);
	conn.end();
}
var getDeepth = function(name){
	getDeepth.deep = !getDeepth.deep ? 0 : getDeepth.deep;
	//首先，计算该节点的 id
	//计算该节点的上层节点，并且 getDeepth.deep++,如不是1000，则继续递归调用，若是，则清空getDeepth.deep，返回即可。
	getFrameByNameFn(name);
};

//getFrameByNameFn('tyre');
//getUpperClassFrameFn(11595);
getDeepth('tyre'); 


