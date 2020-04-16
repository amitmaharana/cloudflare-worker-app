import { distributeVariant } from './src/utils/distributer'
import { htmlRewrite } from './src/utils/rewriter'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  let response = await fetch(variantURL);
  const variantsJson = await response.json();
  const variants = variantsJson['variants'];

  const url = distributeVariant(variants)
  response = await fetch(url)

  response = await htmlRewrite(response).text()

  return new Response(response, {
    headers: {
      'Content-type': 'text/html'
    },
  })
}

const variantURL = 'https://cfw-takehome.developers.workers.dev/api/variants'