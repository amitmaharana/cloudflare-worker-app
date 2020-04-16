import { distributeVariant } from './src/utils/distributer'
import { htmlRewrite } from './src/utils/rewriter'
import { getCookie } from './src/utils/cookie'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  let url = getCookie(request, 'variant')
  if (!url) {
    let response = await fetch(variantURL);
    const variantsJson = await response.json();
    const variants = variantsJson['variants'];
    url = distributeVariant(variants)
  }
  let response = await fetch(url)
  response = await htmlRewrite(response).text()

  return new Response(response, {
    headers: {
      'Content-type': 'text/html',
      'Set-Cookie': 'variant=' + url + '; max-age=' + 24 * 60 * 60 + ';'
    },
  })
}

const variantURL = 'https://cfw-takehome.developers.workers.dev/api/variants'