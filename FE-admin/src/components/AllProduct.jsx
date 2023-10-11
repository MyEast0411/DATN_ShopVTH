import React from "react";
import products from "../db/ProductData";

function AllProduct() {
  return (
    <>
        <h2 className="fixed z-10 bg-slate-200 mt-2 ml-5 rounded p-2">All product</h2>
      {/* Products */} 
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto pb-12 px-4">
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white rounded-lg overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
              >
                <a href="#" className="block">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="object-cover object-center"
                  />
                </a>
                <div className="flex justify-between items-center mt-4 mx-3">
                  <a
                    href="#"
                    className="text-gray-700 overflow-x-auto text-sm scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-200 font-medium"
                  >
                    {product.name}
                  </a>
                  <span className="text-gray-600 text-sm">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AllProduct;
