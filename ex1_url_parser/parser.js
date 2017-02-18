var form = document.getElementById('url-form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    var uri = document.getElementById('uri-box').value;
    var uriParts = parseUri(uri);
    render(uriParts);
});

function render(uriParts) {
    document.getElementById('parts').className = '';
    for (var key in uriParts) {
        document.getElementById(key + '-value').innerHTML = uriParts[key];
    }
}


// Mao ni trish 
function parseUri(uri) {
    var url = document.createElement('a');
    url.href = uri;
    console.log(uri.substr(1, 4));


    var scheme = uri.substring(0, uri.indexOf(":"));
    var authority = "";
    var path = "";
    var query = "";
    var fragment = "";
    uri = uri.substring(uri.indexOf(":") + 3);
    if(uri.indexOf("/") >= 0){
        authority = uri.substring(0, uri.indexOf("/"));
        uri = uri.substring(uri.indexOf("/"));
        if(uri.lastIndexOf("/") == uri.indexOf("/")){
            if(uri.indexOf("?") >= 0 && uri.lastIndexOf("#") > uri.indexOf("?")){
                if(uri.indexOf("#") >= 0){
                    query = uri.substring(uri.indexOf("?") + 1, uri.lastIndexOf("#"));
                    fragment = uri.substring(uri.indexOf("#") + 1);
                } else {
                    query = uri.substring(uri.indexOf("?") + 1);
                }
            } else if(uri.indexOf("#") >= 0){
                fragment = uri.substring(uri.indexOf("#") + 1);
            }
        } else {
            if(uri.lastIndexOf("/") == uri.length - 1){
                path = uri;
            } else {
                path = uri.substring(0, uri.lastIndexOf("/") + 1);
                if(uri.indexOf("?") >= 0 && uri.lastIndexOf("#") > uri.indexOf("?")){
                    if(uri.indexOf("#") >= 0){
                        query = uri.substring(uri.indexOf("?") + 1, uri.lastIndexOf("#"));
                        fragment = uri.substring(uri.lastIndexOf("#") + 1);
                    } else {
                        query = uri.substring(uri.indexOf("?") + 1);
                    }
                } if(uri.indexOf("#") >= 0){
                    fragment = uri.substring(uri.indexOf("#") + 1);
                }
            }
        }
      
        
    } else {
        authority = uri;
    }
    console.log(uri);
    var uriParts = {
        scheme: scheme,
        authority: authority,
        path: path,
        query: query,
        fragment: fragment
    };

    return uriParts;
}