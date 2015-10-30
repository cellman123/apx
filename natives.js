var nodes = [];
var TAFFY = window.TAFFY;

nodes.push(new Node("23.209.102.55", 43, "super_admin", "foo", "NSA"));

function Node(ip, port, username, pass, name) {
    this.ip = ip;
    this.port = port;
    this.name = name || "";
    this.username = username;
    this.pass = pass;
    this.lgdin = false;
    this.db = TAFFY();
    
    this.store = function(key, val) {
        this.db.insert({
            key: key,
            val: val,
            id: this.db.length+1
        });
    };
    this.retrieve = function(i) {
        if(!i) {
            window.log("\[");
            this.db().each(function (r) { window.log("&nbsp;&nbsp;&nbsp;" + r.key + ":" + r.val) });
            window.log("\]");
        } else {
            window.log("<circle>");
            this.db().each(function (r) { window.log(r.key + ":" + r.val) } );
            window.log("</circle>");
        }
    };
    this.change = function(_key, _newval) {
        this.db({key: _key}).update({val: _newval});
    };
    this.delete = function(_key) {
        this.db({key: _key}).remove();
    };
}

function connect(sw) {
    for(var key in nodes) {
        var n = nodes[key];
        if(sw.split(" ")[1] == n.ip && sw.split(" ")[2] == n.port) {
            window.curr_node = n;
        } else window.log("no");
    }
}
function login(sw) {
    if(window.curr_node !== undefined) {
        if(sw.split(" ")[1] == window.curr_node.username && sw.split(" ")[2] == window.curr_node.pass) {
            window.curr_node.lgdin = true;
        }
    } else window.log("no");
}
function show() {
    for(var key in nodes) {
        function r() {
             if(nodes[key].name !== undefined) return ( " - " + nodes[key].name)
        }
        window.log("&nbsp;&nbsp;&nbsp;" + nodes[key].ip + r() + "<br>")
    }
}
