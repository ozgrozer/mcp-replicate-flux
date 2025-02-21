const { z } = require('zod')
const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js')
const {
  StdioServerTransport
} = require('@modelcontextprotocol/sdk/server/stdio.js')

const generateImage = require('./generateImage')

const server = new McpServer({
  version: '1.0.0',
  name: 'Replicate'
})

server.tool('generate-image', { prompt: z.string() }, async ({ prompt }) => {
  const outputPath = await generateImage(prompt)
  return {
    content: [
      { type: 'text', text: `Image generated and saved to ${outputPath}` }
    ]
  }
})

const run = async () => {
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

run()
