import { useSearchParams } from "react-router-dom"
/**
 * 
 * @param keys 从URL中返回指定键的参数值
 */
export const useUrlQueryParam = (keys: string[]) => {
  const [searchParams, setSearchParam] = useSearchParams()
  // console.log(searchParams.get('name'));
  return [
    keys.reduce((prev: {[p: string]: string}, key: string) => {
      return {...prev, [key]: searchParams.get(key) || ''}
    }, {} as { [key in string]: string}),
    setSearchParam
  ] as const
  
}