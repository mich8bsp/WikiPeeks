console.log("sdd")
var a = document.getElementsByTagName('a');
var currentHtmlId;
for (i = 0; i < a.length; i++) {
    //console.log(a[i].toString().indexOf("mw-wiki-logo"));

    a[i].addEventListener('mouseover', function () {
        if (this.className.indexOf("image") == -1 && this.className.indexOf("mw-wiki-logo") == -1 &&
            this.innerHTML.indexOf("wrapper") == -1 && this.toString().indexOf(document.URL) == -1) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", this.href, false);
            xmlHttp.send(null);
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(xmlHttp.responseText, "text/xml");
            var images = xmlDoc.getElementsByTagName("img");
            var image;
            for (j = 0; j < images.length; j++) {
                // console.log$(images[j]).parents( ".infobox ").);
                // Checks that the image has infobox in its ancestry
                var toCheck = (($(images[j]).parents(".infobox ").length ||
                $(images[j]).parents(".thumb").length ||
                $(images[j]).parents(".right").length) && (!$(images[j]).parents("[class*='indicator']").length) &&
                (!$(images[j]).parents("[class*='flagicon']").length));

                if (toCheck) {
                    this.className = "wrapper";
                    image = images[j].getAttribute("src");
                    if (image != null)
                        break;
                }
            }

            if (image != null) {
                currentHtmlId = this.innerHTML;
                this.innerHTML += "<img class=\"tooltip\" src=\"" + image + "\" />";
            }
        }
        //console.log(xmlHttp.responseText);
    })

    a[i].addEventListener('mouseout', function () {
        if (currentHtmlId != null) {
            this.innerHTML = currentHtmlId;
            currentHtmlId = null;
        }
    })
}