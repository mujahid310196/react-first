import { useState, useEffect } from "react";
import '../App.css';
/*************  ✨ Codeium Command ⭐  *************/
/******  8bbee524-b577-4d75-9b64-c8d4d901cbae  *******/
const Dashboard = () => { 

    // state for Products Data
    const [products, getProducts] = useState([]);

    // state for Open Insert Popup
    const [insertPopup, setInsertPopup] = useState(false);

    // state for form data to insert product
    const [productName, setProductName] = useState('');
    const [productModel, setProductModel] = useState('');
    const [productDesc, setProductDesc] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productId, setProductId] = useState('');

    // state for Open Update Popup
    const [updatePopup, setUpdatePopup] = useState(false);


    const getProduct = async () => {
        const response = await fetch('http://localhost:8000/products');
        const data = await response.json();
        getProducts(data);
    }

    useEffect(() => {
        getProduct();
    }, [products]);


    const handleChange = (e) => {

        if (e.target.name === 'name') {
            setProductName(e.target.value);
        } else if (e.target.name === 'model') {
            setProductModel(e.target.value);
        } else if (e.target.name === 'description') {
            setProductDesc(e.target.value);
        } else if (e.target.name === 'price') {
            setProductPrice(e.target.value);
        }
    }

    const insertData = async (e) => {

        e.preventDefault(); // Prevent form from refreshing the page
        //console.log();
        const response = await fetch('http://localhost:8000/add-product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: productName,
                model: productModel,
                image: 'noimage.jpg',
                description: productDesc,
                price: productPrice
            })
        });

        const data = await response.json();
        console.log('Product Data is:', data);
        getProduct();
        setInsertPopup(false);
    };

    const fillEditData = (product) => {
        setProductName(product.name);
        setProductModel(product.model);
        setProductDesc(product.description);
        setProductPrice(product.price);
        setProductId(product.product_id);
    }

    const updateData = async (e) => {
        //console.log(productId);
        e.preventDefault();

        const response = await fetch(`http://localhost:8000/update-product/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: productName,
                model: productModel,
                description: productDesc,
                price: productPrice
            })
        });

        const updatedProduct = await response.json();
        console.log('Updated Product Data:', updatedProduct);
        getProduct();
        setUpdatePopup(false);
        //onUpdate(updatedProduct); //Call a function to update the product list in the parent component
    };


    const fillDeleteData = async (productId) => {

        const response = await fetch(`http://localhost:8000/delete-product/${productId}`, {
            method: 'DELETE',
        });

        const deletedProduct = await response.json();
        console.log('Deleted Product Data:', deletedProduct);
        getProduct();
    }


    return (
        <>
            <div className="product-container">
                <h1>Product List</h1>
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Model</th>
                            <th>Product Description</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.product_id}>
                                <td>{product.name}</td>
                                <td>{product.model}</td>
                                <td>{product.description}</td>
                                <td>${product.price}</td>
                                <td>
                                    <button onClick={() => setInsertPopup(true)}>Insert</button>
                                    <button onClick={() => { setUpdatePopup(true); fillEditData(product) }}>Edit</button>
                                    <button onClick={() => fillDeleteData(product.product_id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Product Insert Popup */}
            {insertPopup && (
                <div className="popup">
                    <div className="popup-inner">
                        <h2>Add New Product</h2>
                        <form onSubmit={insertData}>
                            <label>
                                Product Name:
                                <input
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    value={productName}

                                />
                            </label>
                            <label>
                                Model:
                                <input
                                    type="text"
                                    name="model"
                                    onChange={handleChange}
                                    value={productModel}
                                />
                            </label>
                            <label>
                                Description:
                                <input
                                    type="text"
                                    name="description"
                                    onChange={handleChange}
                                    value={productDesc}
                                />
                            </label>
                            <label>
                                Price:
                                <input
                                    type="number"
                                    name="price"
                                    onChange={handleChange}
                                    value={productPrice}
                                />
                            </label>
                            <div className="popup-buttons">
                                <button type="submit">Submit</button>
                                <button type="button" onClick={() => setInsertPopup(false)}>
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            {/* Product Update Popup */}
            {updatePopup && (
                <div className="popup">
                    <div className="popup-inner">
                        <h2>Update Existing Product</h2>
                        <form onSubmit={updateData}>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                Model:
                                <input
                                    type="text"
                                    value={productModel}
                                    onChange={(e) => setProductModel(e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                Description:
                                <input
                                    type="text"
                                    value={productDesc}
                                    onChange={(e) => setProductDesc(e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                Price:
                                <input
                                    type="number"
                                    value={productPrice}
                                    onChange={(e) => setProductPrice(e.target.value)}
                                    required
                                />
                            </label>
                            <div className="popup-buttons">
                                <button type="submit">Submit</button>
                                <button type="button" onClick={() => setUpdatePopup(false)}>
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </>
    )
}

export default Dashboard;