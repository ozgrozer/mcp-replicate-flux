const path = require('path')
const Replicate = require('replicate')
const { writeFile } = require('node:fs/promises')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })

module.exports = async ({ prompt, filename }) => {
  const outputPath = path.join(__dirname, 'output', filename)

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN
  })

  const [output] = await replicate.run('black-forest-labs/flux-schnell', {
    input: {
      prompt,
      go_fast: true,
      num_outputs: 1,
      megapixels: '1',
      output_quality: 80,
      aspect_ratio: '16:9',
      output_format: 'jpg',
      num_inference_steps: 4
    }
  })

  await writeFile(outputPath, output)

  return outputPath
}
