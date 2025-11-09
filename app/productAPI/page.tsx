"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProductTable() {

type Product = {
 id: number;
 category?: string;
 rating?: {
    rate: number;
    count: number;
 }
 price: number;
 title: string;
 image: string;
};
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
 
    useEffect(() => {
	fetch("https://fakestoreapi.com/products") // your fake API endpoint
  	.then((res) => res.json())
  	.then((data) => {
    	console.log(data);
    	setProducts(data);
    	setLoading(false);
  	})
  	.catch((err) => {
    	console.error(err);
    	setLoading(false);
  	});
  }, []);
 
  if (loading) return <p>Loading products...</p>;
 
  return (
	<div className="overflow-x-auto">
  	<table className="min-w-full border">
    	<thead>
      	<tr>
        	<th className="px-4 py-2 border">ID</th>
        	<th className="px-4 py-2 border">Title</th>
        	<th className="px-4 py-2 border">Category</th>
        	<th className="px-4 py-2 border">Price ($)</th>
        	<th className="px-4 py-2 border">Rating</th>
        	<th className="px-4 py-2 border">Reviews Count</th>
			<th className="px-4 py-2 border">Image</th>
      	</tr>
    	</thead>
    	<tbody>
      	{products.map((product) => (
        	<tr key={product.id} className="hover:bg-red-300">
          	<td className="px-4 py-2 border text-center">{product.id}</td>
          	<td className="px-4 py-2 border">{product.title}</td>
          	<td className="px-4 py-2 border">{product.category || "-"}</td>

          	<td className="px-4 py-2 border text-right">
            	{product.price.toFixed(2)}
          	</td>
          	<td className="px-4 py-2 border text-center">
            	{product.rating?.rate.toFixed(1) ?? "-"}
          	</td>
          	<td className="px-4 py-2 border text-center">
            	{product.rating?.count ?? "-"}
          	</td>
			<td className="px-4 py-2 border text-center">
            	<div className="flex justify-center">
              	<Image
                	src={product.image}
                	alt={product.title}
                	width={80}
                	height={80}
                	className="object-contain rounded"
              	/>
            	</div>
          	</td>
        	</tr>
     	 ))}
    	</tbody>
  	</table>
	</div>
  );
}
