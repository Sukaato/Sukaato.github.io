function initRequest() {
    const HEADERS = new Headers();
    HEADERS.set('Content-Type', 'application/text');
    return {
      headers: HEADERS,
      mode: 'cors',
      cache: 'default',
      credentials: 'include'
    }
}
function request() {
    const request = Object.assign({ method: 'GET' }, initRequest());
    const response = fetch(`http://${location.host}/src/css/card.min.css`, request);
    response.then(res => {
        return res.text().then(style => {
            buildSiteCard(style.replace(/\n/g, ""));
        });
    }).catch(err => {
        console.warn(err);
    });
}

function createNode(nodeName) {
    return document.createElement(nodeName)
}

function buildSiteCard(style) {
    let styleText = style
    console.log(styleText);
    let list = document.querySelector('#webList');
    WEB_LIST.forEach(site => {
        
        let webCard = createNode('web-card');
        if (!site.empty) {
            let url = site.url;
            
            let style = createNode('style');
            style.innerText = styleText;
            
            // IMAGE
            let img = createNode('img');
            img.src = `src/img/webList/${url}.${site.image}`;
            img.alt = "image not found";
            
            let imgLink = createNode('a');
            imgLink.classList.add("card-image");
            imgLink.setAttribute('href', `/projects/${url}/index.html`);
            imgLink.setAttribute('target', "_blank");
            imgLink.setAttribute('rel', "noopener noreferrer");
            imgLink.append(img);
            
            // TITRE
            let title = createNode("h3");
            title.innerText = site.name;
            
            let cardtitle = createNode('a');
            cardtitle.classList.add("card-title");
            cardtitle.setAttribute('href', `/projects/${url}/index.html`);
            cardtitle.setAttribute('target', "_blank");
            cardtitle.setAttribute('rel', "noopener noreferrer");
            cardtitle.append(title); 
            
            // SLOGAN
            let slogan = createNode('p');
            slogan.classList.add("card-slogan");
            slogan.innerText = site.slogan;
            
            // BOUTON
            let button = createNode('button');
            button.innerText = "Y allez →";
            button.addEventListener('click', () => {
                let meta = createNode('meta');
                meta.httpEquiv = "refresh";
                meta.content += `0; url=/projects/${url}/index.html`;
                document.head.append(meta)
            })
            
            let cardContent = createNode('card-content');
            cardContent.append(cardtitle, slogan, button)
            
            let shadow = webCard.attachShadow({mode: 'open'});
            shadow.append(style, imgLink, cardContent);
        } else {
            webCard.classList.add("empty");

            let style = createNode('style');
            style.innerText = styleText;

            let shadow = webCard.attachShadow({mode: 'open'});
            shadow.append(style);
        }
    
    
        list.append(webCard);
    })
}
request();