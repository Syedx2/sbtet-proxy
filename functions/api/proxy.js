export async function onRequest(context) {
  const url = new URL(context.request.url);
  const params = url.searchParams.toString();
  const workerUrl = `https://sbtet-connect.zoro3000worldsx2.workers.dev/?${params}`;
  
  const response = await fetch(workerUrl, {
    signal: AbortSignal.timeout(30000)
  });
  
  const data = await response.text();
  
  return new Response(data, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
