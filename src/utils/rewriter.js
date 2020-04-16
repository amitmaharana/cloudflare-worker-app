// Rewrite HTML of response body using HTML Rewriter
class ElementHandler {
    constructor(content, attribute = '') {
        this.content = content
        this.attribute = attribute
    }

    element(element) {
        if (this.attribute) {
            element.setAttribute(this.attribute, this.content);
        } else {
            element.setInnerContent(this.content);
        }
    }
}

export const htmlRewrite = (response, index) => {
    return new HTMLRewriter()
        .on('title', new ElementHandler("Amit's Cloudflare Worker"))
        .on('h1#title', new ElementHandler(quotes[index]))
        .on('p#description', new ElementHandler(quotes[index+2]))
        .on('a#url', new ElementHandler('Visit my personal website!'))
        .on('a#url', new ElementHandler('https://amitmaharana.github.io/', 'href'))
        .transform(response)
}

const quotes = [
    'Do. Or do not. There is no try.',
    'Never tell me the odds.',
    'In my experience there is no such thing as luck.',
    'The Force will be with you. Always.'
  ];
  