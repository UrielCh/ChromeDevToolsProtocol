export default class LocalServer {
    private server?: Deno.Listener;
    public nbRequest = 0;
    public nbConnection = 0;
    constructor(private port: number) {
    }

    async start() {
        if (this.server)
            throw Error('server alrready running');
        this.server = Deno.listen({ port: this.port });
        console.log(`File server running on http://localhost:${this.port}/`);

        const handleHttp = async (conn: Deno.Conn) => {
            const httpConn = Deno.serveHttp(conn);
            for await (const requestEvent of httpConn) {
                const { url } = requestEvent.request;
                if (url.endsWith("favicon.ico")) {
                    const notFoundResponse = new Response("404 Not Found", { status: 404 });
                    await requestEvent.respondWith(notFoundResponse);
                    return;
                }
                console.log(url);
                this.nbRequest++;
                // Build and send the response
                const response = new Response(`"Request ${this.nbRequest}"`, { headers: { "content-type": "application/json" } });
                await requestEvent.respondWith(response);
            }
        }

        for await (const conn of this.server) {
            this.nbConnection++;
            handleHttp(conn).catch(console.error);
        }
    }
}