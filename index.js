/**
 * A Parser for the github repo information :)
 * 
 */
var RepoParser = (function(w, b) {

    var tre = /`([^`]+)`/gi;

	function parseTemplate( template, values ) {

	    var split = template.split(tre),
	        max = split.length, str = '', index = 0;

	    for (; index < max; index++) {
		str += split[index];
		str += values[split[++index]] || '';
	    }

	    return str;

	};

    function parseRepos( inc ) {

        var repos = inc.data,
            template = document.getElementById("template1").innerHTML,
            o1 = "",
            o2 = "";

        console.log(template, repos);
        
        for ( var i = 0; i < repos.length; i++ ) {
        
            var repo = repos[i],
                cn = repo.homepage?"repo hasHomepage":"repo noHomepage",
                out = parseTemplate ( template, { link: repo.homepage || repo.html_url, repo: repo.html_url, title: repo.name, desc: repo.description, className: cn } );
            
            if ( repo.homepage ) {
                o1 += out;
            } else {
                o2 += out;
            }

        }
        
        document.getElementById( "repoList" ).innerHTML = o1 + o2;

    }
    
    var public = {

        parseGitRepos: function( inc ) {

            return parseRepos( inc );

        }

    }

    return public;

})();