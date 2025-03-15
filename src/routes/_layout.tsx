import { createFileRoute, Outlet } from '@tanstack/react-router'


export const Route = createFileRoute('/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <header>123</header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
