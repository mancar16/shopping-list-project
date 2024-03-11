import { useState } from "react";
import { Shops } from "./arrays";
import { Categories } from "./arrays";
import { Button, Table } from "react-bootstrap";
import JSConfetti from "js-confetti";
import FuzzySearch from "fuzzy-search";
import { nanoid } from "nanoid";
const AddProductForm = () => {
  const [productName, setProductName] = useState("");
  const [selectedShop, setSelectedShop] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleShopChange = (e) => {
    setSelectedShop(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      name: productName,
      shop: selectedShop,
      category: selectedCategory,
      id: nanoid(),
    };
    setProducts([...products, newProduct]);
    setProductName("");
    setSelectedShop("");
    setSelectedCategory("");
  };
  const handleBuy = (id) => {
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        return { ...product, isBought: true };
      }
      return product;
    });
    if (updatedProducts.every((product) => product.isBought)) {
      alert("Alışveriş Tamamlandı");
      JsConfetti.addConfetti();
    }
    setProducts(updatedProducts);
  };

  const handleDelete = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  const handleCheckOut = () => {
    if (products.every((product) => product.isBought)) {
      alert("Alışveriş Tamamlandı");
      JsConfetti.addConfetti();
    }
  };
  const JsConfetti = new JSConfetti();

  return (
    <div>
      <h2>Ürün Ekle</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Ürün Adı:
          <input
            type="text"
            value={productName}
            onChange={handleProductNameChange}
          />
        </label>
        <label>
          Market:
          <select value={selectedShop} onChange={handleShopChange}>
            <option value="">Market Seçiniz</option>
            {Shops.map((shop) => (
              <option key={shop.id} value={shop.id}>
                {shop.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Kategori:
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Kategori Seçiniz</option>
            {Categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Ekle</button>
      </form>
      <h2>Ürünler</h2>
      <div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Ürün Adı</th>
              <th>Sil</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                style={{
                  textDecoration: product.isBought ? "line-through" : "none",
                }}
              >
                <td>{product.id.slice(0, 4)}</td>
                <td onClick={() => handleBuy(product.id)}>{product.name}</td>
                <td>
                  <Button onClick={() => handleDelete(product.id)}>Sil</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AddProductForm;
