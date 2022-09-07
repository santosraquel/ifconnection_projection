import { getAccountModule } from '@/store'

export default function ({ store, route, redirect, error }) {
  if (!process.server) {
    const accountModule = getAccountModule(store)
    const isAuthenticated = accountModule.isAuthenticated
    const userRole = accountModule.userRole

    // Se o user tá logado e tentou acessar o login
    console.log(isAuthenticated)
    if (isAuthenticated && ['login', 'index'].includes(route.name)) {
    // Obtem a rota ?next
      const url = decodeURI(route.query.next)
      // Se next existe
      if (url) {
        // redireciona para url do ?next
        return redirect(url)
      }
      // Se não existe redireciona para dashboard
      return redirect('/dashboard')
    }
    // Se o user não tá logado e não está na página de login

    // if (!isAuthenticated && route.name !== 'login') {
    if (!isAuthenticated &&
      !['login', 'singup', 'contacts', 'index', 'auth/reset_password']
        .includes(route.name)) {
    // Redireciona para o login com a url atual em ?next
      return redirect(`/login/?next=${encodeURI(route.fullPath)}`)
    }

    // Somente Admins podem gerenciar usuários
    if (route.name === 'users' && userRole !== 'Admin') {
      return error({ statusCode: 404 })
    }

    if (route.name === 'domains' && userRole !== 'Admin') {
      return error({ statusCode: 4004 })
    }
  }

  return false
}
