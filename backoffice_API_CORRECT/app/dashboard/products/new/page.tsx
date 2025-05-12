"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft } from "lucide-react"
import { useApiQuery } from "@/hooks/use-api-query"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { getCategories, getCurrencies, getModifierTypes, createProduct } from "@/lib/api-client"
import type { Product } from "@/lib/api-client"

export default function NewProductPage() {
  const router = useRouter()

  const { data: categories, isLoading: categoriesLoading } = useApiQuery(getCategories)
  const { data: currencies, isLoading: currenciesLoading } = useApiQuery(getCurrencies)
  const { data: modifierTypes, isLoading: modifierTypesLoading } = useApiQuery(getModifierTypes)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    productType: "ONE_TIME",
    status: "ACTIVE",
    singleItemOnly: false,
    categoryId: "",
    price: "",
    currencyId: "",
    modifierTypeId: "",
  })

  const { mutate: createProductMutation, isLoading: isCreating } = useApiMutation<
    Product,
    Omit<Product, "id" | "createdAt" | "updatedAt">
  >(createProduct, {
    onSuccess: () => {
      router.push("/dashboard/products")
    },
    successMessage: "Produto criado com sucesso!",
  })

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Convert modifierTypeId "null" string to actual null
    const modifierTypeId = formData.modifierTypeId === "null" ? null : formData.modifierTypeId

    const productData = {
      name: formData.name,
      description: formData.description,
      productType: formData.productType,
      status: formData.status,
      singleItemOnly: formData.singleItemOnly,
      categoryId: formData.categoryId,
      prices: [
        {
          amount: Number.parseFloat(formData.price),
          currencyId: formData.currencyId,
          modifierTypeId,
        },
      ],
      deliverables: [],
      guidelines: [],
      createdBy: "system",
    }

    await createProductMutation(productData as any)
  }

  const isLoading = categoriesLoading || currenciesLoading || modifierTypesLoading

  return (
    <div className="grid gap-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.push("/dashboard/products")}>
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Voltar</span>
        </Button>
        <h1 className="text-3xl font-bold">Novo Produto</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Produto</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="productType">Tipo de Produto</Label>
                    <Select value={formData.productType} onValueChange={(value) => handleChange("productType", value)}>
                      <SelectTrigger id="productType">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ONE_TIME">Único</SelectItem>
                        <SelectItem value="RECURRENT">Recorrente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ACTIVE">Ativo</SelectItem>
                        <SelectItem value="INACTIVE">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="singleItemOnly"
                    checked={formData.singleItemOnly}
                    onCheckedChange={(checked) => handleChange("singleItemOnly", checked)}
                  />
                  <Label htmlFor="singleItemOnly">Item Único</Label>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="categoryId">Categoria</Label>
                  <Select
                    value={formData.categoryId}
                    onValueChange={(value) => handleChange("categoryId", value)}
                    required
                  >
                    <SelectTrigger id="categoryId">
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="price">Preço</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) => handleChange("price", e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="currencyId">Moeda</Label>
                    <Select
                      value={formData.currencyId}
                      onValueChange={(value) => handleChange("currencyId", value)}
                      required
                    >
                      <SelectTrigger id="currencyId">
                        <SelectValue placeholder="Selecione a moeda" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies?.map((currency) => (
                          <SelectItem key={currency.id} value={currency.id}>
                            {currency.name} ({currency.symbol})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="modifierTypeId">Modificador</Label>
                    <Select
                      value={formData.modifierTypeId}
                      onValueChange={(value) => handleChange("modifierTypeId", value)}
                    >
                      <SelectTrigger id="modifierTypeId">
                        <SelectValue placeholder="Selecione o modificador" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="null">Nenhum modificador</SelectItem>
                        {modifierTypes?.map((modifier) => (
                          <SelectItem key={modifier.key} value={modifier.key}>
                            {modifier.displayName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/dashboard/products")}
                  disabled={isCreating}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isCreating}>
                  {isCreating ? "Criando..." : "Criar Produto"}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
