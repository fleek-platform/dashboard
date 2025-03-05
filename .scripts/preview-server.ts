const port = 3003;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

if (!basePath) throw Error('Missing base path!');

Bun.serve({
  port,
  fetch: async (req) => {
    const url = new URL(req.url);
    let pathname = url.pathname;

    if (!pathname.startsWith(basePath)) {
      return new Response("Not Found", { status: 404 });
    }

    pathname = pathname.slice(basePath.length) || "/index.html";
    
    if (pathname.includes('.')) {
      const decodedPath = decodeURIComponent(pathname);
      const file = Bun.file(`./out${decodedPath}`);
      return new Response(file);
    }
    
    const index = await Bun.file("./out/index.html").text();
    return new Response(index, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  },
  error(error) {
    console.error('👹 Oops! Failed to serve file', error);

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`🤖 Server running at http://localhost:${port}${basePath}`);
