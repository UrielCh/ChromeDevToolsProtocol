export default class LocalServer {
    private server?: Deno.Listener;
    public nbRequest = 0;
    public nbConnection = 0;
    #httpConn?: Deno.HttpConn;
    constructor(private port: number) {
    }

    stop() {
        if (this.#httpConn) {
            this.#httpConn.close();
        }
        if (this.server) {
            this.server.close();
        }
    }

    async start() {
        if (this.server)
            throw Error('server alrready running');
        this.server = Deno.listen({ port: this.port });
        console.log(`File server running on http://localhost:${this.port}/`);
        const handleHttp = async (conn: Deno.Conn) => {
            this.#httpConn = Deno.serveHttp(conn);
            for await (const requestEvent of this.#httpConn) {
                const { url } = requestEvent.request;
                if (url.endsWith("favicon.ico")) {
                    const notFoundResponse = new Response("404 Not Found", { status: 404 });
                    await requestEvent.respondWith(notFoundResponse);
                    return;
                }
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