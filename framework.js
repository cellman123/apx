var curr_node;
var imports = [];

function log(str) {
    $("#lii8ns").append(("<p>" + str + "</p>") || undefined);
}

function contains(arr, dat) {
    for(var key in arr) if(arr[key] == dat) return true;
}

function run(sw) {
    log(sw);
    if(/^import /.test(sw)) {
        log("SYS>> file <code>\'" + sw.split(" ")[1] + "\'</code> imported");
        imports.push(sw.split(" ")[1]);
    }
    else if (/Node /.test(sw)) {
        if(contains(imports, "Server.apx")) {
            window.nodes.push(new window.Node(sw.split(" ")[1], sw.split(" ")[2], sw.split(" ")[3], sw.split(" ")[4], sw.split(" ")[5]));
            log("SYS>> Node created at domain <code>" + sw.split(" ")[1] + "</code>, port <code>" + sw.split(" ")[2] + "</code>");
            $.ajax({
                type: 'POST',
                url: "nodes.js",//url of receiver file on server
                data: "new Node\(" + (sw.split(" ")[1], sw.split(" ")[2], sw.split(" ")[3], sw.split(" ")[4], sw.split(" ")[5]) + "\)" //your data
            });
        }
        else log("ERR>> package Node needs file Server to run");
    }
    else if(/connect /.test(sw)) {
        window.connect(sw);
    }
    else if(/login/.test(sw)) {
        window.login(sw);
    }
    else if(/store /.test(sw)) {
        if(curr_node !== undefined)
            if(curr_node.lgdin)
                curr_node.store(sw.split(" ")[1], sw.split(":")[1]);
            else log("ERR>> PERMISSION DENIED");
        else log("ERR>> No Node is connected to");
    }
    else if(/get/.test(sw)) {
        if(curr_node !== undefined)
            if(curr_node.lgdin)
                if(/vis$/.test(sw))
                    curr_node.retrieve(true);
                else curr_node.retrieve(false);
            else log("ERR>> PERMISSION DENIED");
        else log("ERR>> No Node is connected to");
    }
    else if(/update/.test(sw)) {
        if(curr_node !== undefined) {
            if(curr_node.lgdin)
                curr_node.change(sw.split(" ")[1], sw.split("to")[1]);
            else log("ERR>> PERMISSION DENIED");
        } else log("ERR>> No Node is connected to");
    }
    else if(/delete /.test(sw)) {
         if(curr_node !== undefined) {
            if(curr_node.lgdin)
                curr_node.delete(sw.split(" ")[1]);
            else log("ERR>> PERMISSION DENIED");
        } else log("ERR>> No Node is connected to");
    }
    else if(/show/.test(sw)) {
        window.show();
    }
    else {
        log("ERR> \'" + sw + "\' is not an operable program or file");
    }
}

$(document).keydown(function(e) {
    if(e.keyCode === 13) {
        run($("#input").val())
        $("#input").val("")
    }
})
