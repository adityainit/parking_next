export async function GET() {
  let interval: NodeJS.Timeout;

  const stream = new ReadableStream({
    start(controller) {
      globalThis.sseController = controller

      interval = setInterval(() => {
        try {
          controller.enqueue(`data: ping\n\n`)
        } catch {
          // connection closed, stop the interval
          clearInterval(interval)
        }
      }, 30000)
    },
    cancel() {
      // fires when client disconnects
      clearInterval(interval)
      globalThis.sseController = undefined
    }
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive"
    }
  })
}