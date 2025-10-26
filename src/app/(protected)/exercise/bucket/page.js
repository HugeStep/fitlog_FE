import Bucket from "@/components/ExercisePage/BucketPage/Bucket.jsx";
import { useSearchParams } from "next/navigation";

export async function generateStaticParams() {
  return [
    {type : 'ex-stat'},
    {type : 'select'}
  ]
}

export default function BucketPage({ params }) {
  const { get } = useSearchParams();
  const type =  get('type')
  return <Bucket type={type} />;
} 