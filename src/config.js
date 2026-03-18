const whatsappPhone = String(import.meta.env.VITE_WHATSAPP_PHONE || '').trim()

const clientConfig = {
  shopName: 'Brothers Fashion Hub',
  tagline: 'The Destination for your Life Style',
  address: 'Opp. H.P Petrol Bunk, Gandhi Road, Proddatur',
  phone: whatsappPhone,
  whatsappNumber: whatsappPhone,
  instagramLink: 'https://instagram.com/brothersfashionhub1',
  logoPath: '/logo.png',
  heroImage: '/mens-hero.png',
  heroImagePosition: 'center 15%',
  productCategories: ['Shirts', 'T-Shirts', 'Jeans', 'Shoes', 'Accessories'],
}

export default clientConfig