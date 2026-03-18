import { useEffect, useState } from 'react'
import clientConfig from '../config'

const CUSTOMER_DETAILS_STORAGE_KEY = 'quickShopCustomerDetails'

const initialFormState = {
  name: '',
  phone: '',
  address: '',
  notes: '',
}

const initialErrorState = {
  name: '',
  phone: '',
  address: '',
}

function getStoredCustomerDetails() {
  try {
    const rawValue = window.localStorage.getItem(CUSTOMER_DETAILS_STORAGE_KEY)

    if (!rawValue) {
      return null
    }

    const parsedValue = JSON.parse(rawValue)

    if (!parsedValue || typeof parsedValue !== 'object') {
      return null
    }

    return {
      name: typeof parsedValue.name === 'string' ? parsedValue.name : '',
      phone: typeof parsedValue.phone === 'string' ? parsedValue.phone : '',
      address: typeof parsedValue.address === 'string' ? parsedValue.address : '',
    }
  } catch {
    return null
  }
}

function persistCustomerDetails({ name, phone, address }) {
  try {
    const valueToStore = JSON.stringify({ name, phone, address })
    window.localStorage.setItem(CUSTOMER_DETAILS_STORAGE_KEY, valueToStore)
  } catch {
    // Ignore storage failures so ordering flow is never blocked.
  }
}

function QuickShopModal({
  isOpen,
  open,
  onClose,
  onSubmit,
  product,
  selectedSize,
  productName,
  price,
  size,
}) {
  const [formValues, setFormValues] = useState(() => {
    const storedDetails = getStoredCustomerDetails()
    return {
      name: storedDetails?.name || '',
      phone: storedDetails?.phone || '',
      address: storedDetails?.address || '',
      notes: '',
    }
  })
  const [errors, setErrors] = useState(initialErrorState)
  const modalOpen = typeof isOpen === 'boolean' ? isOpen : Boolean(open)

  const resolvedProductName = String(product?.name || productName || '').trim()
  const numericPrice = Number(product?.price ?? price ?? 0)
  const formattedPrice = new Intl.NumberFormat('en-IN').format(numericPrice)
  const resolvedSize = String(selectedSize || product?.selectedSize || size || 'N/A').trim()
  const resolvedImageUrl = String(
    product?.imageUrl || product?.image || product?.images?.[0] || '',
  ).trim()
  const sanitizedPhone = String(clientConfig.whatsappNumber || '').replace(/\D/g, '')

  useEffect(() => {
    if (!modalOpen) {
      return
    }

    const handleEscapePress = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscapePress)

    return () => {
      window.removeEventListener('keydown', handleEscapePress)
    }
  }, [modalOpen, onClose])

  if (!modalOpen) {
    return null
  }

  const validateForm = () => {
    const nextErrors = {
      name: formValues.name.trim() ? '' : 'Name is required.',
      phone: formValues.phone.trim() ? '' : 'Phone number is required.',
      address: formValues.address.trim() ? '' : 'Address is required.',
    }

    setErrors(nextErrors)

    return !nextErrors.name && !nextErrors.phone && !nextErrors.address
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target

    setFormValues((previousValues) => ({
      ...previousValues,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        [name]: '',
      }))
    }
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    if (!resolvedProductName) {
      alert('Product details are missing. Please try again.')
      return
    }

    if (!sanitizedPhone) {
      alert('WhatsApp number is not configured.')
      return
    }

    const payload = {
      name: formValues.name.trim(),
      phone: formValues.phone.trim(),
      address: formValues.address.trim(),
      notes: formValues.notes.trim(),
    }

    const imageLine = resolvedImageUrl ? `\nImage: ${resolvedImageUrl}` : ''
    const whatsappMessage = `Hi, I want to order:\nProduct: ${resolvedProductName}\nPrice: ₹${formattedPrice}\nSize: ${resolvedSize || 'N/A'}${imageLine}\n\nCustomer Details:\nName: ${payload.name}\nPhone: ${payload.phone}\nAddress: ${payload.address}\nNotes: ${payload.notes || 'N/A'}`
    const whatsappLink = `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(whatsappMessage)}`

    persistCustomerDetails(payload)
    if (onSubmit) {
      onSubmit(payload)
    }
    window.open(whatsappLink, '_blank', 'noopener,noreferrer')
    onClose()
    setFormValues(initialFormState)
    setErrors(initialErrorState)
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/65 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl md:p-6"
        role="dialog"
        aria-modal="true"
        aria-label="Quick shop customer details"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5">
          <h2 className="font-display text-2xl text-obsidian">Quick Shop</h2>
          <p className="mt-2 text-sm leading-relaxed text-black/70">
            Confirm your details to place order for {resolvedProductName || 'this product'}
            {' '}
            (Rs. {formattedPrice}, Size: {resolvedSize || 'N/A'}).
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-3.5">
          <div>
            <label htmlFor="customerName" className="text-sm font-semibold text-obsidian">
              Name *
            </label>
            <input
              id="customerName"
              name="name"
              type="text"
              value={formValues.name}
              onChange={handleInputChange}
              className={`mt-1.5 w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm outline-none transition ${
                errors.name ? 'border-red-400' : 'border-black/15 focus:border-obsidian'
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="customerPhone" className="text-sm font-semibold text-obsidian">
              Phone Number *
            </label>
            <input
              id="customerPhone"
              name="phone"
              type="tel"
              value={formValues.phone}
              onChange={handleInputChange}
              className={`mt-1.5 w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm outline-none transition ${
                errors.phone ? 'border-red-400' : 'border-black/15 focus:border-obsidian'
              }`}
              placeholder="Enter your phone number"
            />
            {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
          </div>

          <div>
            <label
              htmlFor="customerAddress"
              className="text-sm font-semibold text-obsidian"
            >
              Address *
            </label>
            <textarea
              id="customerAddress"
              name="address"
              rows={3}
              value={formValues.address}
              onChange={handleInputChange}
              className={`mt-1.5 w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm outline-none transition ${
                errors.address ? 'border-red-400' : 'border-black/15 focus:border-obsidian'
              }`}
              placeholder="Enter delivery address"
            />
            {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address}</p>}
          </div>

          <div>
            <label htmlFor="customerNotes" className="text-sm font-semibold text-obsidian">
              Notes (Optional)
            </label>
            <textarea
              id="customerNotes"
              name="notes"
              rows={2}
              value={formValues.notes}
              onChange={handleInputChange}
              className="mt-1.5 w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-obsidian"
              placeholder="Any special requests"
            />
          </div>

          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-xl border border-black/15 px-4 py-2.5 text-sm font-semibold text-black/75 transition hover:bg-black/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1EBE5D]"
            >
              Send on WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default QuickShopModal
