"use client";
import Bucket from "@/components/ExercisePage/BucketPage/Bucket.jsx";
import NavigationBar from "@/components/NavigationBar/NavigationBar";
import { useSearchParams } from "next/navigation";
/*

export async function generateStaticParams() {
  return [
    {type : 'ex-stat'},
    {type : 'select'}
  ]
}
*/
export default function BucketPage({ params }) {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  return (
    <div>
      <Bucket type={type} />
      <NavigationBar />
    </div>
  );
} 