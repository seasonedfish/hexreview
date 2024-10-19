export default function Page({ params }: { params: { id: string } }) {
  return <div>Project ID: {params.id}</div>
}