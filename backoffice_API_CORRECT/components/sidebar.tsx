"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Package, ShoppingCart, FileText, Tag, Settings, LayoutDashboard, Ticket } from "lucide-react"
import { useSidebar } from "./sidebar-provider"

export function Sidebar() {
  const pathname = usePathname()
  const { isOpen, close } = useSidebar()

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-20 bg-background/80 backdrop-blur-sm md:hidden" onClick={close} />}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r bg-white transition-transform md:static md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="border-b px-4 py-4 bg-primary-50">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Package className="h-6 w-6 text-primary-700" />
            <span className="text-primary-700">Backoffice</span>
          </Link>
        </div>
        <ScrollArea className="flex-1">
          <nav className="grid gap-1 p-2">
            <Link href="/dashboard" passHref legacyBehavior>
              <Button
                variant={pathname === "/dashboard" ? "secondary" : "ghost"}
                className={cn("justify-start", pathname === "/dashboard" ? "sidebar-active" : "sidebar-item")}
                onClick={close}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/dashboard/products" passHref legacyBehavior>
              <Button
                variant={pathname.startsWith("/dashboard/products") ? "secondary" : "ghost"}
                className={cn(
                  "justify-start",
                  pathname.startsWith("/dashboard/products") ? "sidebar-active" : "sidebar-item",
                )}
                onClick={close}
              >
                <Package className="mr-2 h-4 w-4" />
                Produtos
              </Button>
            </Link>
            <Link href="/dashboard/categories" passHref legacyBehavior>
              <Button
                variant={pathname.startsWith("/dashboard/categories") ? "secondary" : "ghost"}
                className={cn(
                  "justify-start",
                  pathname.startsWith("/dashboard/categories") ? "sidebar-active" : "sidebar-item",
                )}
                onClick={close}
              >
                <Tag className="mr-2 h-4 w-4" />
                Categorias
              </Button>
            </Link>
            <Link href="/dashboard/deliverables" passHref legacyBehavior>
              <Button
                variant={pathname.startsWith("/dashboard/deliverables") ? "secondary" : "ghost"}
                className={cn(
                  "justify-start",
                  pathname.startsWith("/dashboard/deliverables") ? "sidebar-active" : "sidebar-item",
                )}
                onClick={close}
              >
                <FileText className="mr-2 h-4 w-4" />
                Entregáveis
              </Button>
            </Link>
            <Link href="/dashboard/currencies" passHref legacyBehavior>
              <Button
                variant={pathname.startsWith("/dashboard/currencies") ? "secondary" : "ghost"}
                className={cn(
                  "justify-start",
                  pathname.startsWith("/dashboard/currencies") ? "sidebar-active" : "sidebar-item",
                )}
                onClick={close}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Moedas
              </Button>
            </Link>
            <Link href="/dashboard/coupons" passHref legacyBehavior>
              <Button
                variant={pathname.startsWith("/dashboard/coupons") ? "secondary" : "ghost"}
                className={cn(
                  "justify-start",
                  pathname.startsWith("/dashboard/coupons") ? "sidebar-active" : "sidebar-item",
                )}
                onClick={close}
              >
                <Ticket className="mr-2 h-4 w-4" />
                Cupons
              </Button>
            </Link>
            <Link href="/dashboard/modifier-types" passHref legacyBehavior>
              <Button
                variant={pathname.startsWith("/dashboard/modifier-types") ? "secondary" : "ghost"}
                className={cn(
                  "justify-start",
                  pathname.startsWith("/dashboard/modifier-types") ? "sidebar-active" : "sidebar-item",
                )}
                onClick={close}
              >
                <Settings className="mr-2 h-4 w-4" />
                Tipos de Modificadores
              </Button>
            </Link>
          </nav>
        </ScrollArea>
      </aside>
    </>
  )
}
