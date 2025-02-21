require('dotenv').config()
const path = require('path')
const Replicate = require('replicate')
const { writeFile } = require('node:fs/promises')

module.exports = async prompt => {
  const timestamp = Math.floor(Date.now() / 1000)
  const outputPath = path.join(__dirname, output, `${timestamp}.webp`)

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
      aspect_ratio: '1:1',
      output_format: 'webp',
      num_inference_steps: 4
    }
  })

  await writeFile(outputPath, output)

  return outputPath
}
