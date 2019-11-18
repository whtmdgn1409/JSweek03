const html = `
<html>
<body>
    <p>hello</p>
    <div id="test">Me</div>
</body>
</html>
`

var domTree = [{
    name : 'root',
    children : []
}];

var cnt=0;
var tagNames=new Array();

function findTag(html){
    for(let i=0;i<html.length;i++){
        if(html[i]==='<'&& html[i+1]!='/'){
            tagNames.push(findTagName(html.slice(i+1,-1)));
            cnt++;
            //console.log(cnt,tagNames[cnt-1]);
            putNode(tagNames[cnt-1],cnt);
        } else if(html[i]==='<'&& html[i+1]=='/'){
            tagNames.pop();
            cnt--;
            //console.log(cnt,tagNames);
        }
    }
}

function findTagName(html){
    for(let i=0;i<html.length;i++){
        if(html[i]==='>' || html[i]==' '){
             return html.slice(0,i);
        }
    }
}

function putNode(val,cnt){
    var parent=domTree;
    while(cnt!=0){
        parent=parent[0].children;
        //console.log(cnt,parent);
        cnt--;
    }
    parent.push({name:val,children:[]});
}
findTag(html);
//domTree['name'].children.push({'name':div,children:[]});
//console.log(domTree[0].children.push(1));

// var parent=domTree;
// while(parent.children!==[]){
//     parent=parent[0].children;
//     console.log(parent);
// }
