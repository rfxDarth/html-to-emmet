function recursive(element) {
    var emtStr = "";
    var tag = element.tagName;
    if (tag) {
        emtStr += tag.toLowerCase();
        var children = element.childNodes;
        if (children.length > 0) {
            var childRets = [];
            for (var i = 0; i < children.length; i++) {
                if (children[i].nodeType !== 1) {
                        continue;
                }
                childRets.push(recursive(children[i]));
            }
            if (childRets.length) emtStr += ">" + childRets.join("+") + "^";
        }
    }
    emtStr = emtStr.replace(/\^\+/g, "^");

    return emtStr;
}
console.log(recursive(document.documentElement));