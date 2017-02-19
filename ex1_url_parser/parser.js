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
                var star_idx = uri.indexOf("#");
                var quest_idx = uri.indexOf("?");
                if(star_idx >= 0 && quest_idx >= 0){
                    if(star_idx < quest_idx){
                      path = uri.substring(0, uri.indexOf("#")); 
                      fragment = uri.substring(uri.indexOf("#") + 1);
                    } else {
                      path = uri.substring(0, uri.indexOf("?")); 
                      query = uri.substring(quest_idx + 1, star_idx);
                      fragment = uri.substring(star_idx + 1);
                    }
                } else if(star_idx >= 0){
                    path = uri.substring(0, uri.indexOf("#")); 
                    fragment = uri.substring(uri.indexOf("#") + 1);
                } else if(quest_idx >= 0){
                    path = uri.substring(0, uri.indexOf("?")); 
                    query = uri.substring(uri.indexOf("?") + 1);
                }
            } else {
                path = uri;
            }
        } else {
            if(uri.lastIndexOf("/") == uri.length - 1 || (uri.indexOf("#") < 0 && uri.indexOf("?") < 0)){
                path = uri;
            } else {
                var star_idx = uri.indexOf("#");
                var quest_idx = uri.indexOf("?");
                if(star_idx >= 0 && quest_idx >= 0){
                    if(star_idx < quest_idx){ 
                      fragment = uri.substring(uri.indexOf("#") + 1);
                      path = uri.substring(0, uri.indexOf("#"));
                    } else {
                      path = uri.substring(0, uri.indexOf("?"));
                      query = uri.substring(quest_idx + 1, star_idx);
                      fragment = uri.substring(star_idx + 1);

                    }
                } else if(star_idx >= 0){
                    path = uri.substring(0, uri.indexOf("#"));
                    fragment = uri.substring(uri.indexOf("#") + 1);
                } else if(quest_idx >= 0){
                    path = uri.substring(0, uri.indexOf("?"));
                    query = uri.substring(uri.indexOf("?") + 1);
                }
            }
        }
    } else {
        if(uri.indexOf("#") >= 0 || uri.indexOf("?") >= 0){ 
            var star_idx = uri.indexOf("#");
            var quest_idx = uri.indexOf("?");
            if(star_idx >= 0 && quest_idx >= 0){
                if(star_idx < quest_idx){
                  authority = uri.substring(0, uri.indexOf("#")); 
                  fragment = uri.substring(uri.indexOf("#") + 1);
                } else {
                  authority = uri.substring(0, uri.indexOf("?")); 
                  query = uri.substring(quest_idx + 1, star_idx);
                  fragment = uri.substring(star_idx + 1);
                }
            } else if(star_idx >= 0){
                authority = uri.substring(0, uri.indexOf("#")); 
                fragment = uri.substring(uri.indexOf("#") + 1);
            } else if(quest_idx >= 0){
                authority = uri.substring(0, uri.indexOf("?")); 
                query = uri.substring(uri.indexOf("?") + 1);
            }
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