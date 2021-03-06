const api = () => {

    /**
     * @desc completes the list of websites
     */
    let completeSiteList = () => {
        while ((WEB_LIST.length < 10 || (WEB_LIST.length > 10 && WEB_LIST.length % 5 !== 0))) {
            WEB_LIST.push({});
        }
    }

    /**
     * @desc Initialize the request
     */
    let initRequest = () => {
        const HEADERS = new Headers();
        HEADERS.set('Content-Type', 'text/css');
        return {
            headers: HEADERS,
            mode: 'cors',
            cache: 'default',
            credentials: 'include'
        }
    }

    /**
     * @desc Request for get the card style
     */
    let getStyle = () => {
        const request = Object.assign({method: 'GET'}, initRequest());
        const response = fetch(`${location.origin}/src/css/card.min.css`, request);
        response.then(res => {
            res.text().then(style => {
                newList(style);
            })
        }).catch(err => console.warn(err));
    }

    /**
     * 
     * @param {{name: String, class: String[], id: String}} json 
     * @returns {HTMLElement}
     */
    let createNode = (json) => {
        if (json && typeof(json) === "object") {
            let nodeName = json.name !== null
                ? typeof(json.name) === "string"
                    ? json.name
                    : console.error("The name must be a string !")
                : console.error("You need to defined the name of node you want");

            /**
             * @type {HTMLElement}
             */
            let node = document.createElement(nodeName);

            let classes = json.class !== null
                ? typeof(json.class) === "object"
                    ? json.class
                    : typeof(json.class) === "string"
                        ? json.class.split(" ")
                        : null
                : null;
            classes && classes.forEach(e => node.classList.add(e));

            let id = json.id !== null
                ? typeof(json.id) === "string"
                    ? json.id
                    : typeof(json.id) === "number"
                        ? json.id
                        : null
                : null;

            id ? node.id = id : null;

            return node;
        } else {
            let pattern = {
                name: "name-of-node-you-want",
                class: ["class1", "class-2", "class_X"],
                id: "name-of-ID"
            };
            console.error("The function need one paramter follow this structure : ", pattern);
        }
    }

    /**
     * 
     * @param {String} params Contains the style of the card
     */
    let newList = (params) => {
        for (let index = 0, count = WEB_LIST.length; index < count; index += 5) {
            let list = WEB_LIST.slice(index, index + 5)
            build(params, list)
        }
    }

    /**
     * @desc Create a new card
     * @param {String} style Contains the style of card
     * @param {String[]} json Contains the website information
     */
    let build = (style, json) => {
        let webList = document.querySelector('#webList');

        let list = createNode({name: "list"});
        webList.append(list);

        json.forEach(site => {
            let webCard = createNode({name: "web-card"}); // Creation of HTML elt
            list.append(webCard);

            let shadow = webCard.attachShadow({mode: 'open'}); // Make shadowDOM into your HTML elt

            let styleNode = createNode({name: "style"});
            styleNode.innerText = style;

            let cardContent = createNode({name: "card-content"});
            shadow.append(styleNode, cardContent);

            let url = site.url ? site.url : null;
            if (url) {
                // BUTTON
                let button = createNode({name: "button"});
                button.innerText = "Y allez →";
                button.addEventListener('click', () => {
                    location.href += url
                });
    
                let cardButton = createNode({name: "card-button"});
                cardButton.append(button);
    
                // START BODY CODE //
                // SLOGAN
                let text = createNode({name: "p"});
                text.innerText = site.slogan;
    
                let cardText = createNode({name: "card-text"});
                cardText.append(text);
    
                // TITRE
                let title = createNode({name: "h3"});
                title.innerText = site.name;
    
                let titleLink = createNode({name: "a"});
                titleLink.setAttribute('href', url);
                titleLink.setAttribute('target', "_blank");
                titleLink.setAttribute('rel', "noopener noreferrer");
                titleLink.append(title);
    
                let cardtitle = createNode({name: "card-title"});
                cardtitle.append(titleLink);
    
                let cardBody = createNode({name: "card-body"});
                cardBody.append(cardtitle, cardText);
    
                // END BODY CODE //
    
                // IMAGE
                let img = createNode({name: "img"});
                img.setAttribute('src', `src/img/webList/${url}.${site.image}`);
                img.setAttribute('alt', 'image not found');
    
                let imgLink = createNode({name: "a"});
                imgLink.setAttribute('href', url);
                imgLink.setAttribute('target', "_blank");
                imgLink.setAttribute('rel', "noopener noreferrer");
                imgLink.append(img);
    
                let cardImage = createNode({name: "card-image"});
                cardImage.append(imgLink);
    
                cardContent.append(cardImage, cardBody, cardButton)
            }
        });

    }

    /**
     * @desc initilise 
     */
    let init = () => {
        WEB_LIST.length < 10 && completeSiteList();
        getStyle();
    }

    return {
        function: {
            init
        }
    }
}

api().function.init()