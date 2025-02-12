const port = 3003;

// TODO: Check if out distribution directory is populated
Bun.serve({
  port,
  fetch: async (req) => {
    const indexHtml = await Bun.file("./out/index.html").text();
    const url = new URL(req.url);
    
    if (url.pathname.includes('.')) {
      const decodedPath = decodeURIComponent(url.pathname);
      const file = Bun.file(`./out${decodedPath}`);
      return new Response(file);
    }
    return new Response(indexHtml, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  },
  error(error) {
    console.error('Error serving file:', error);
    return new Response('Not Found', { status: 404 });
  },
});

console.log(`🤖 Server running at http://localhost:${port}`);
