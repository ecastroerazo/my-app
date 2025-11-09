type Product = {
 id: number;
 name: string;
 category?: string;
 rating?: number;
};

const productList: Product[] = [
  {
    id: 1,
    name: "shoes",
    category: "footwear",
    rating: 1
  },
  {
    id: 2,
    name: "jeans",
    category: "clothing",
    rating: 4
  },
  {
    id: 3,
    name: "t-shirt",
    category: "clothing",
    rating: 3
  },
  {
    id: 4,
    name: "sneakers",
    category: "footwear",
    rating: 5
  },
  {
    id: 5,
    name: "jacket",
    category: "clothing",
    rating: 2
  }
];

export default function ProductsPage() {
  return (
    <div>
      <h1>Products Page</h1>
        <table>
          <thead>
            <tr>
              <th >ID</th>
              <th>Name</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
}