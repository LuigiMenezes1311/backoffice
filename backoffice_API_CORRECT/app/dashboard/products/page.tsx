"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Eye } from "lucide-react"
import { useApiQuery } from "@/hooks/use-api-query"
import { getProducts, getCurrencies, getModifierTypes } from "@/lib/api-client"
import type { Product, Currency, ModifierType } from "@/lib/api-client"

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const { data: products, isLoading: productsLoading } = useApiQuery<Product[]>(getProducts)
  const { data: currencies } = useApiQuery<Currency[]>(getCurrencies)
  const { data: modifierTypes } = useApiQuery<ModifierType[]>(getModifierTypes)

  const filteredProducts =
    products?.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || []

  const getModifierName = (modifierId: string | null) => {
    if (!modifierId || !modifierTypes) return "Nenhum"
    const modifier = modifierTypes.find((m) => m.key === modifierId)
    return modifier ? modifier.displayName : modifierId
  }

  const formatPrice = (price: { amount: number; currencyId: string; modifierTypeId: string | null }) => {
    if (!currencies) return "Carregando..."

    const currency = currencies.find((c) => c.id === price.currencyId)
    const symbol = currency ? currency.symbol : ""

    if (!price.modifierTypeId) {
      return `${symbol} ${price.amount.toFixed(2)}`
    }

    // Since calculateAdjustedPrice is now async, we'll use a simplified version here
    const basePrice = price.amount
    const adjustedPrice = price.modifierTypeId ? price.amount * 1.5 : price.amount // Simplified calculation

    return (
      <div>
        <div>
          {symbol} {adjustedPrice.toFixed(2)}
        </div>
        <div className="text-xs text-muted-foreground">({getModifierName(price.modifierTypeId)})</div>
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Produtos</h1>
        <Button onClick={() => router.push("/dashboard/products/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Produto
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Produtos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar produtos..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {productsLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Modificador</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        Nenhum produto encontrado.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.productType === "ONE_TIME" ? "Único" : "Recorrente"}</TableCell>
                        <TableCell>
                          <Badge variant={product.status === "ACTIVE" ? "default" : "secondary"}>
                            {product.status === "ACTIVE" ? "Ativo" : "Inativo"}
                          </Badge>
                        </TableCell>
                        <TableCell>{product.categoryId}</TableCell>
                        <TableCell>
                          {product.prices && product.prices.length > 0
                            ? getModifierName(product.prices[0].modifierTypeId)
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          {product.prices && product.prices.length > 0
                            ? formatPrice(product.prices[0])
                            : "Não definido"}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push(`/dashboard/products/${product.id}`)}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Ver</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push(`/dashboard/products/${product.id}/edit`)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
