function getRequiredEnv(name) {
  const value = import.meta.env[name]

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value
}

const cloudName = getRequiredEnv('VITE_CLOUDINARY_CLOUD_NAME')
const uploadPreset = getRequiredEnv('VITE_CLOUDINARY_UPLOAD_PRESET')

export const uploadImage = async (file) => {
  if (!file) {
    throw new Error('Image file is required.')
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData,
    },
  )

  const data = await res.json().catch(() => ({}))

  if (!res.ok || !data.secure_url) {
    throw new Error(data?.error?.message || 'Image upload failed.')
  }

  return data.secure_url
}

export const uploadImages = async (files) => {
  const imageFiles = Array.isArray(files) ? files : Array.from(files || [])

  if (imageFiles.length === 0) {
    return []
  }

  const results = await Promise.allSettled(imageFiles.map((file) => uploadImage(file)))
  const uploadedUrls = []
  const errors = []

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      uploadedUrls.push(result.value)
    } else {
      const fileName = imageFiles[index]?.name || 'an image'
      errors.push(`${fileName}: ${result.reason?.message || 'Upload failed'}`)
    }
  })

  if (errors.length > 0) {
    throw new Error(
      `Some images failed to upload: ${errors.join(', ')}`,
    )
  }

  return uploadedUrls
}