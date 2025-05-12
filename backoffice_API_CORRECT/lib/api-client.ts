// API client for interacting with the catalog API
// Base URL for the API
const API_BASE_URL = "https://api.catalog.dev.mktlab.app"

// Helper function for logging debug information
function logDebug(message: string, data?: any) {
  console.log(`[API Client] ${message}`, data ? data : "")
}

// Helper function to handle API errors
function handleApiError(error: any, customMessage: string): never {
  console.error(`API Error: ${customMessage}`, error)
  throw new Error(`${customMessage}: ${error.message || "Unknown error"}`)
}

// Interface definitions
export interface Guideline {
  id: string
  name: string
  description: string
  productId: string
  createdAt: string
  updatedAt: string
}

export interface Product {
  id: string
  name: string
  description: string
  productType: string
  status: string
  singleItemOnly: boolean
  categoryId: string
  prices: { amount: number; currencyId: string; modifierTypeId: string | null }[]
  deliverables: Deliverable[]
  guidelines: Guideline[]
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  description: string
}

export interface Currency {
  id: string
  code: string
  name: string
  symbol: string
}

export interface Deliverable {
  id: string
  name: string
  description: string
  productId: string
  createdAt: string
  updatedAt: string
}

export interface ModifierType {
  key: string
  displayName: string
  description: string
  createdBy: string
  priceAdjustment?: {
    type: "MULTIPLIER" | "FIXED_AMOUNT"
    value: number
  }
  valueRestrictions?: {
    maxValues: number
    restrictedCurrencies?: string[]
    restrictedProducts?: string[]
  } | null
}

export interface Coupon {
  id: string
  code: string
  discountType: string
  discountValue: number
  minPurchaseAmount: number | null
  usedCount: number
  status: string
  usageType: "ONE_TIME" | "RECURRING"
  createdAt: string
  updatedAt: string
}

// Generic fetch function with error handling
async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  try {
    const url = `${API_BASE_URL}${endpoint}`
    logDebug(`Fetching from: ${url}`)

    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP error ${response.status}: ${errorText}`)
    }

    const data = await response.json()
    return data as T
  } catch (error) {
    handleApiError(error, `Failed to fetch from ${endpoint}`)
  }
}

// Function to calculate adjusted price based on modifier
export function calculateAdjustedPrice(basePrice: number, modifierTypeId: string | null): number {
  if (!modifierTypeId) return basePrice

  // We'll need to fetch the modifier type from the API
  // For now, we'll implement a simplified version
  return basePrice // This will be updated once we implement getModifierTypeByKey
}

// API Functions

// Guidelines
export async function getGuidelines(): Promise<Guideline[]> {
  try {
    return await fetchApi<Guideline[]>("/guidelines")
  } catch (error) {
    handleApiError(error, "Failed to fetch guidelines")
  }
}

export async function getGuidelineById(id: string): Promise<Guideline> {
  try {
    return await fetchApi<Guideline>(`/guidelines/${id}`)
  } catch (error) {
    handleApiError(error, `Failed to fetch guideline with ID ${id}`)
  }
}

export async function createGuideline(guideline: {
  name: string
  description: string
  productId?: string
}): Promise<Guideline> {
  try {
    return await fetchApi<Guideline>("/guidelines", {
      method: "POST",
      body: JSON.stringify(guideline),
    })
  } catch (error) {
    handleApiError(error, "Failed to create guideline")
  }
}

export async function updateGuideline(id: string, guideline: Partial<Guideline>): Promise<Guideline> {
  try {
    return await fetchApi<Guideline>(`/guidelines/${id}`, {
      method: "PUT",
      body: JSON.stringify(guideline),
    })
  } catch (error) {
    handleApiError(error, `Failed to update guideline with ID ${id}`)
  }
}

export async function deleteGuideline(id: string): Promise<void> {
  try {
    await fetchApi(`/guidelines/${id}`, {
      method: "DELETE",
    })
  } catch (error) {
    handleApiError(error, `Failed to delete guideline with ID ${id}`)
  }
}

// Categories
export async function getCategories(): Promise<Category[]> {
  try {
    return await fetchApi<Category[]>("/categories")
  } catch (error) {
    handleApiError(error, "Failed to fetch categories")
  }
}

// Coupons
export async function getCoupons(): Promise<Coupon[]> {
  try {
    return await fetchApi<Coupon[]>("/coupons")
  } catch (error) {
    handleApiError(error, "Failed to fetch coupons")
  }
}

export async function getCouponById(id: string): Promise<Coupon> {
  try {
    return await fetchApi<Coupon>(`/coupons/${id}`)
  } catch (error) {
    handleApiError(error, `Failed to fetch coupon with ID ${id}`)
  }
}

export async function createCoupon(
  coupon: Omit<Coupon, "id" | "createdAt" | "updatedAt" | "usedCount" | "discountType"> & { discountType?: string },
): Promise<Coupon> {
  try {
    const couponToCreate = {
      ...coupon,
      discountType: "PERCENTAGE", // Always set to PERCENTAGE
    }

    return await fetchApi<Coupon>("/coupons", {
      method: "POST",
      body: JSON.stringify(couponToCreate),
    })
  } catch (error) {
    handleApiError(error, "Failed to create coupon")
  }
}

export async function updateCoupon(id: string, coupon: Partial<Coupon>): Promise<Coupon> {
  try {
    return await fetchApi<Coupon>(`/coupons/${id}`, {
      method: "PUT",
      body: JSON.stringify(coupon),
    })
  } catch (error) {
    handleApiError(error, `Failed to update coupon with ID ${id}`)
  }
}

export async function deleteCoupon(id: string): Promise<void> {
  try {
    await fetchApi(`/coupons/${id}`, {
      method: "DELETE",
    })
  } catch (error) {
    handleApiError(error, `Failed to delete coupon with ID ${id}`)
  }
}

// Currencies
export async function getCurrencies(): Promise<Currency[]> {
  try {
    return await fetchApi<Currency[]>("/currencies")
  } catch (error) {
    handleApiError(error, "Failed to fetch currencies")
  }
}

export async function createCurrency(currency: Omit<Currency, "id">): Promise<Currency> {
  try {
    return await fetchApi<Currency>("/currencies", {
      method: "POST",
      body: JSON.stringify(currency),
    })
  } catch (error) {
    handleApiError(error, "Failed to create currency")
  }
}

// Deliverables
export async function getDeliverables(): Promise<Deliverable[]> {
  try {
    return await fetchApi<Deliverable[]>("/deliverables")
  } catch (error) {
    handleApiError(error, "Failed to fetch deliverables")
  }
}

export async function deleteDeliverable(id: string): Promise<void> {
  try {
    await fetchApi(`/deliverables/${id}`, {
      method: "DELETE",
    })
  } catch (error) {
    handleApiError(error, `Failed to delete deliverable with ID ${id}`)
  }
}

// Products
export async function getProducts(): Promise<Product[]> {
  try {
    return await fetchApi<Product[]>("/products")
  } catch (error) {
    handleApiError(error, "Failed to fetch products")
  }
}

export async function getProductById(id: string): Promise<Product> {
  try {
    return await fetchApi<Product>(`/products/${id}`)
  } catch (error) {
    handleApiError(error, `Failed to fetch product with ID ${id}`)
  }
}

export async function createProduct(product: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product> {
  try {
    logDebug("Creating product with data:", product)

    return await fetchApi<Product>("/products", {
      method: "POST",
      body: JSON.stringify(product),
    })
  } catch (error) {
    handleApiError(error, "Failed to create product")
  }
}

export async function updateProduct(id: string, product: Partial<Product>): Promise<Product> {
  try {
    logDebug("Updating product with ID:", id)
    logDebug("Update data:", product)

    return await fetchApi<Product>(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(product),
    })
  } catch (error) {
    handleApiError(error, `Failed to update product with ID ${id}`)
  }
}

export async function deleteProductDeliverable(productId: string, deliverableId: string): Promise<void> {
  try {
    await fetchApi(`/products/${productId}/deliverables/${deliverableId}`, {
      method: "DELETE",
    })
  } catch (error) {
    handleApiError(error, `Failed to delete deliverable ${deliverableId} from product ${productId}`)
  }
}

export async function deleteProductGuideline(productId: string, guidelineId: string): Promise<Product> {
  try {
    return await fetchApi<Product>(`/products/${productId}/guidelines/${guidelineId}`, {
      method: "DELETE",
    })
  } catch (error) {
    handleApiError(error, `Failed to delete guideline ${guidelineId} from product ${productId}`)
  }
}

// Modifier Types
export async function getModifierTypes(): Promise<ModifierType[]> {
  try {
    return await fetchApi<ModifierType[]>("/modifier-types")
  } catch (error) {
    handleApiError(error, "Failed to fetch modifier types")
  }
}

export async function getModifierTypeByKey(key: string): Promise<ModifierType> {
  try {
    return await fetchApi<ModifierType>(`/modifier-types/${key}`)
  } catch (error) {
    handleApiError(error, `Failed to fetch modifier type with key ${key}`)
  }
}

export async function createModifierType(
  modifierType: Omit<ModifierType, "key"> & { key: string },
): Promise<ModifierType> {
  try {
    return await fetchApi<ModifierType>("/modifier-types", {
      method: "POST",
      body: JSON.stringify(modifierType),
    })
  } catch (error) {
    handleApiError(error, "Failed to create modifier type")
  }
}

export async function updateModifierType(key: string, modifierType: Partial<ModifierType>): Promise<ModifierType> {
  try {
    return await fetchApi<ModifierType>(`/modifier-types/${key}`, {
      method: "PUT",
      body: JSON.stringify(modifierType),
    })
  } catch (error) {
    handleApiError(error, `Failed to update modifier type with key ${key}`)
  }
}

export async function deleteModifierType(key: string): Promise<void> {
  try {
    await fetchApi(`/modifier-types/${key}`, {
      method: "DELETE",
    })
  } catch (error) {
    handleApiError(error, `Failed to delete modifier type with key ${key}`)
  }
}

// Now let's update the calculateAdjustedPrice function to use the API
export async function getAdjustedPrice(basePrice: number, modifierTypeId: string | null): Promise<number> {
  if (!modifierTypeId) return basePrice

  try {
    const modifier = await getModifierTypeByKey(modifierTypeId)

    if (!modifier || !modifier.priceAdjustment) return basePrice

    const { type, value } = modifier.priceAdjustment

    if (type === "MULTIPLIER") {
      return basePrice * value
    } else if (type === "FIXED_AMOUNT") {
      return basePrice + value
    }

    return basePrice
  } catch (error) {
    console.error(`Failed to calculate adjusted price: ${error}`)
    return basePrice // Return base price as fallback
  }
}
