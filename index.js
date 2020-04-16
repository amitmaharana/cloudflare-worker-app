import { distributeVariant } from './src/utils/distributer'

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
  console.log(url)

  response = await fetch(url)
  const resp = await response.text()

  return new Response(resp, {
    headers: {
      'Content-type': 'text/html'
    },
  })
}

const variantURL = 'https://cfw-takehome.developers.workers.dev/api/variants'