import { useRouter } from "vue-router";

export function useArticle() {
  const router = useRouter();
  const toDetails = (id: string) => {
    router.push({ path: "/articleDetails", query: { id } }).then();
  };
  const toOtherPage = (path: string, query?: Record<string, string|number>) => {
    router.push({ path, query }).then();
  };

  return {
    toDetails,
    toOtherPage,
  };
}
