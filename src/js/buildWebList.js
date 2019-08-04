const apiFunc = () => {
    return {
        completeSiteList: () => {
            while (WEB_LIST.length < 10) {
                WEB_LIST.push({});
            }
            while (WEB_LIST.length > 10 && WEB_LIST.length % 5 !== 0) {
                WEB_LIST.push({});
            }
        },
        request: {
            init: () => {
                const HEADERS = new Headers();
                HEADERS.set('Content-Type', 'application/text');
                return {
                    headers: HEADERS,
                    mode: 'cors',
                    cache: 'default',
                    credentials: 'include'
                }
            },
            fetch: () => {
                const request = Object.assign({ method: 'GET' }, api.request.init());
                const response = fetch(`${location.origin}/src/css/card.min.css`, request);
                response.then(res => {
                    return res.text().then(style => {
                        api.buildSite(style.replace(/\n/g, ""));
                    });
                }).catch(err => {
                    console.warn(err);
                });
            }
        },
        createNode: (nodeName) => {
            return document.createElement(nodeName)
        },
        buildSite: (style) => {
            let list = document.querySelector('#webList');

            
            WEB_LIST.forEach(site => {
                let styleNode = api.createNode('style');
                styleNode.innerText = style;

                let webCard = api.createNode('web-card'); // Creation of HTML elt
                let shadow = webCard.attachShadow({mode: 'open'}); // Make shadowDOM into your HTML elt

                shadow.append(styleNode); // Place your style into the shadowDOM

                let url = site.url ? site.url : null;
                if (url) {
                    // BUTTON
                    let button = api.createNode('button');
                    button.innerText = "Y allez →";
                    button.addEventListener('click', () => {
                        let meta = api.createNode('meta');
                        meta.httpEquiv =  "refresh";
                        meta.content = `0; url=./projects/${url}/index.html`;
                        document.head.prepend(meta)
                    });

                    let cardButton = api.createNode('card-button');
                    cardButton.append(button);

                    // START BODY CODE //
                    // SLOGAN
                    let text = api.createNode('p');
                    text.innerText = site.slogan;

                    let cardText = api.createNode('card-text');
                    cardText.append(text);
                    
                    // TITRE
                    let title = api.createNode("h3");
                    title.innerText = site.name;
                    
                    let titleLink = api.createNode('a');
                    titleLink.setAttribute('href', `/projects/${url}/index.html`);
                    titleLink.setAttribute('target', "_blank");
                    titleLink.setAttribute('rel', "noopener noreferrer");
                    titleLink.append(title);

                    let cardtitle = api.createNode('card-title');
                    cardtitle.append(titleLink);

                    let cardBody = api.createNode('card-body');
                    cardBody.append(cardtitle, cardText);

                    // END BODY CODE //

                    // IMAGE
                    let img = api.createNode('img');
                    img.setAttribute('src', `src/img/webList/${url}.${site.image}`);
                    img.setAttribute('alt', 'image not found');

                    let imgLink = api.createNode('a');
                    imgLink.setAttribute('href', `/projects/${url}/index.html`);
                    imgLink.setAttribute('target', "_blank");
                    imgLink.setAttribute('rel', "noopener noreferrer");
                    imgLink.append(img);

                    let cardImage = api.createNode('card-image');
                    cardImage.append(imgLink);


                    let cardContent = api.createNode('card-content');
                    cardContent.append(cardImage, cardBody, cardButton)

                    shadow.append(cardContent);
                } else {
                    let cardContent = api.createNode('card-content');

                    shadow.append(cardContent);
                }
                list.append(webCard);
            })
        }
    }
}

const api = apiFunc();

api.completeSiteList();
api.request.fetch()