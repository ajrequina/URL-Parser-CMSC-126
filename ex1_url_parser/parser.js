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


function parseUri(uri) {
    var scheme = uri.substring(0, uri.indexOf(":"));
    var authority = "";
    var path = "";
    var query = "";
    var fragment = "";

    if(uri.indexOf(":") + 1 == uri.indexOf("/")){
        uri = uri.substring(uri.indexOf(":") + 3);
    } else {
        uri = uri.substring(uri.indexOf(":") + 1);
    }
   
    if(uri.indexOf("/") >= 0){
        authority = uri.substring(0, uri.indexOf("/"));
        uri = uri.substring(uri.indexOf("/"));
        if(uri.lastIndexOf("/") == uri.indexOf("/")){
            if(uri.indexOf("#") >= 0 || uri.indexOf("?") >= 0){
                var res = checkFragmentAndQuery(uri);
                path = res.part;
                fragment = res.fragment;
                query = res.query;
            } else {
                path = uri;
            }
        } else {
            if(uri.lastIndexOf("/") == uri.length - 1 || (uri.indexOf("#") < 0 && uri.indexOf("?") < 0)){
                path = uri;
            } else {
                var res = checkFragmentAndQuery(uri);
                path = res.part;
                fragment = res.fragment;
                query = res.query;
            }
        }
    } else {
        if(uri.indexOf("#") >= 0 || uri.indexOf("?") >= 0){ 
            var res = checkFragmentAndQuery(uri);
            authority = res.part;
            fragment = res.fragment;
            query = res.query;
        } else {
            authority = uri;
        }
    }


    var uriParts = {
        scheme: scheme,
        authority: authority,
        path: path,
        query: query,
        fragment: fragment
    };

    return uriParts;
}


function checkFragmentAndQuery(uri){
    var parts = {
        part : "",
        fragment : "",
        query : ""
    };
    var star_idx = uri.indexOf("#");
    var quest_idx = uri.indexOf("?");
    if(star_idx >= 0 && quest_idx >= 0){
        if(star_idx < quest_idx){
          parts.part = uri.substring(0, uri.indexOf("#")); 
          parts.fragment = uri.substring(uri.indexOf("#") + 1);
        } else {
          parts.part = uri.substring(0, uri.indexOf("?")); 
          parts.query = uri.substring(quest_idx + 1, star_idx);
          parts.fragment = uri.substring(star_idx + 1);
        }
    } else if(star_idx >= 0){
        parts.part = uri.substring(0, uri.indexOf("#")); 
        parts.fragment = uri.substring(uri.indexOf("#") + 1);
    } else if(quest_idx >= 0){
        parts.part = uri.substring(0, uri.indexOf("?")); 
        parts.query = uri.substring(uri.indexOf("?") + 1);
    }

    return parts;
}