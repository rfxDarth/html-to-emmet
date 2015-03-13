function recursive(element) {
    var emtStr = "";
    var tag = element.tagName;
    if(tag==="SCRIPT")
        return "";
    if (tag) {
        emtStr += tag.toLowerCase();
        if (element.className.length) {
            var classes = element.className.split(/\s+/).join(".");
            emtStr += "." + classes;
        }
		
        var children = element.childNodes;
        if (children.length > 0) {
            var childRets = [];
            for (var i = 0; i < children.length; i++) {
                if (children[i].nodeType !== 1) {
                    if ((children[i].nodeType === 3) && (children[i].nodeValue.replace(/^\s+|\s+$/gm,'').length !== 0)) 
                        childRets.push("{" + children[i].nodeValue + "}");
                    else
                        continue;
                }
                childRets.push(recursive(children[i]));
            }
            if (childRets.length) emtStr += ">" + childRets.join("+") + "^";
        }
    }
    emtStr = emtStr.replace(/\^\+/g, "^"); //TODO: Remove this hack
    emtStr = emtStr.replace(/\n/g, "");
    return emtStr;
}
console.log(recursive(document.documentElement));