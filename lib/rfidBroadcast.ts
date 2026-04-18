// lib/rfidBroadcast.ts
// In-memory registry of SSE clients.
// Works fine for a single-server / single-process deployment (local dev, single Vercel instance).

type Client = {
  id: string
  controller: ReadableStreamDefaultController
}

// Module-level set — persists across requests in the same process.
const clients = new Set<Client>()

export const addClient = (client: Client) => {
  clients.add(client)
}

export const removeClient = (client: Client) => {
  clients.delete(client)
}

// Broadcast a named event + JSON payload to every connected browser tab.
export const broadcast = (event: string, data: object) => {
  const chunk = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`
  const encoded = new TextEncoder().encode(chunk)
  for (const client of clients) {
    try {
      client.controller.enqueue(encoded)
    } catch {
      // Client already disconnected — clean up silently.
      clients.delete(client)
    }
  }
}