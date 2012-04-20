var assert = require('assert'),util = require('../../lib/util/Util');
var StringBuffer = util.StringBuffer;
var sb = new StringBuffer();
assert.equal( sb.append("a").append("b").toString(),"ab");