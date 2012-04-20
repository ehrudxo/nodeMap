var pg = require('pg');
var connString = 'tcp://nodeMap:asdf@localhost/nodeMap';

pg.connect(connString, function(err, client) {

    var sql = 'select * from table01 ';
//    sql = sql + 'from spatial.state_1 ';
//    sql = sql + 'where geog && ST_GeogFromText(\'SRID=4326;POLYGON((' + bounds._southWest.lng + ' ' + bounds._southWest.lat + ',' + bounds._northEast.lng + ' ' + bounds._southWest.lat + ',' + bounds._northEast.lng + ' ' + bounds._northEast.lat + ',' + bounds._southWest.lng + ' ' + bounds._northEast.lat + ',' + bounds._southWest.lng + ' ' + bounds._southWest.lat + '))\') ';
//    sql = sql + 'and ST_Intersects(geog, ST_GeogFromText(\'SRID=4326;POLYGON((' + bounds._southWest.lng + ' ' + bounds._southWest.lat + ',' + bounds._northEast.lng + ' ' + bounds._southWest.lat + ',' + bounds._northEast.lng + ' ' + bounds._northEast.lat + ',' + bounds._southWest.lng + ' ' + bounds._northEast.lat + ',' + bounds._southWest.lng + ' ' + bounds._southWest.lat + '))\'));';

    client.query(sql, function(err, result) {

        
        for (i = 0; i < result.rows.length; i++)
        {
        	console.log(result.rows[i].seq,result.rows[i].title,result.rows[i].contents);
        }

    });
});