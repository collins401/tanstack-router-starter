import { route } from '../post.$postId'

function Post() {
  const { data } = route.useLoader()
  return (
    <div className="p-2">
      <h3 className="text-xl font-medium">{data?.title}</h3>
      <hr className="my-4" />
      <div dangerouslySetInnerHTML={{ __html: data?.content }} className="text-color/60"></div>
    </div>
  )
}
export default Post
