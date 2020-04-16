import { distributeVariant } from './src/utils/distributer'
import { htmlRewrite } from './src/utils/rewriter'
import { getCookie } from './src/utils/cookie'

/*
 * Author: Amit Maharana
 * Version: 1.0
 * Date: 4/15/2020
 * Purpose: Cloudflare worker to randomly send users to one of two webpages
 */

 addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

 async function handleRequest(request) {
  try {
    // Fetch cookie value by name
    let url = getCookie(request, 'variant')

    // Case: Cookie doesn't exist
    if (!url) {

      // GET array of URLs from variants API
      let response = await fetch(variantURL);

      // Parse the response as JSON
      const variantsJson = await response.json();
      const variants = variantsJson['variants'];

      // Request a variant
      url = distributeVariant(variants)
    }

    // GET request to fetch variant of the page
    let response = await fetch(url)

    // Rewrite HTML
    response = await htmlRewrite(response).text()

    return new Response(response, {
      headers: {
        'Content-type': 'text/html',
        'Set-Cookie': 'variant=' + url + '; max-age=' + 24 * 60 * 60 + ';' // Persist the variant URL
      },
    })
  } catch (err) {
    return new Response('Encountered an error! Contact the author: amahara1@asu.edu')
  }
}

const variantURL = 'https://cfw-takehome.developers.workers.dev/api/variants'