
import { useRouter } from 'vue-router'
export default {
  setup() {
    const _router = useRouter()
    return {
      _router
    }
  }
}
/* export const useRouterCustom = () => {
  const router = useRouter();

  const goToPage = (path = '/', pforce = false) => {
    void router.push({ path, force: pforce })
  }
  return {
    goToPage
  }
} */
