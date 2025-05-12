import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingCart, FileText, BookOpen, Tag, Ticket } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="grid gap-6">
      <h1 className="page-title">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/dashboard/products">
          <Card className="dashboard-card border-l-4 border-l-primary-600">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Produtos</CardTitle>
              <Package className="dashboard-card-icon h-4 w-4" />
            </CardHeader>
            <CardContent>
              <CardDescription>Gerenciar produtos, preços e atributos</CardDescription>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/categories">
          <Card className="dashboard-card border-l-4 border-l-secondary-600">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Categorias</CardTitle>
              <Tag className="h-4 w-4 text-secondary-600" />
            </CardHeader>
            <CardContent>
              <CardDescription>Gerenciar categorias de produtos</CardDescription>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/deliverables">
          <Card className="dashboard-card border-l-4 border-l-accent-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Entregáveis</CardTitle>
              <FileText className="h-4 w-4 text-accent-600" />
            </CardHeader>
            <CardContent>
              <CardDescription>Gerenciar entregáveis de produtos</CardDescription>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/guidelines">
          <Card className="dashboard-card border-l-4 border-l-primary-600">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Diretrizes</CardTitle>
              <BookOpen className="dashboard-card-icon h-4 w-4" />
            </CardHeader>
            <CardContent>
              <CardDescription>Gerenciar diretrizes de produtos</CardDescription>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/currencies">
          <Card className="dashboard-card border-l-4 border-l-secondary-600">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Moedas</CardTitle>
              <ShoppingCart className="h-4 w-4 text-secondary-600" />
            </CardHeader>
            <CardContent>
              <CardDescription>Gerenciar moedas para preços</CardDescription>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/coupons">
          <Card className="dashboard-card border-l-4 border-l-accent-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Cupons</CardTitle>
              <Ticket className="h-4 w-4 text-accent-600" />
            </CardHeader>
            <CardContent>
              <CardDescription>Gerenciar cupons de desconto</CardDescription>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
