const express = require('express'); // Require the express package
const cors = require('cors'); // Require the cors package
const db = require('./db'); // Database connection file

const app = express();  //create an instance of an Express application in Node.js

app.use(express.json()); //enable your Express application to handle JSON data in incoming requests seamlessly
app.use(cors());  //domains are permitted to access resources on your server, making it essential for building web applications that interact with APIs from different origins.

// Route to fetch all users
app.get('/users', async (req, res) => {
    const query = 'SELECT * FROM user';

    try {
        // Execute the database query
        const [users] = await db.query(query); // Using destructuring to get the users array
        res.json(users); // Return the list of users with a 200 OK status
    } catch (error) {
        console.error('Error fetching users:', error);
        res.json({ error: 'Internal Server Error' }); // Handle errors and return 500 status
    }
});

// Route to fetch all products
app.get('/products', async (req, res) => {
    
    try {
        // Execute the database query
        const query = 'SELECT * FROM products ORDER BY product_id DESC';
        const [products] = await db.query(query); // Using destructuring to get the users array
        res.json(products); // Return the list of users with a 200 OK status
    } catch (error) {
        console.error('Error fetching users:', error);
        res.json({ error: 'Internal Server Error' }); // Handle errors and return 500 status
    }
});


app.post('/add-product', async (req, res) => {
    const { name, model, image, description, price } = req.body;

    // Ensure you are receiving the correct data
    if (!name || !model ||!image || !description || !price) {
        return res.json({ error: 'All fields are required' });
    }

    try {
        const query = 'INSERT INTO products (name, model, image, description, price) VALUES (?, ?, ?, ?, ?)';
        //Your logic to insert the product into the database
        const result = await db.query(query, [name, model, image, description, price]);

        //Respond with the newly created product
        res.json({ id: result.insertId, name, model, image, description, price });
    } catch(error) {
        console.error('Error inserting product:', error);
        res.json({ error: 'Internal Server Error' }); //Return a 500 error
    }
});

app.put('/update-product/:id', async (req, res) => {

    const { id } = req.params; // Get the product ID from the URL
    //console.log(id);
    const { name, model, description, price } = req.body; // Get the updated data from the request body

    // Validate input
    if (!name || !model || !description || price == null) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const query = 'UPDATE products SET name = ?, model = ?, description = ?, price = ? WHERE product_id = ?';
        const result = await db.query(query, [name, model, description, price, id]);

        // Check if the product was found and updated
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Respond with the updated product info
        res.json({ id, name, model, description, price });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/delete-product/:id', async (req, res) => {
    const productId = req.params.id;

    const query = 'DELETE FROM products WHERE product_id = ?'; // Adjust table/column names
    try {
        db.query(query, [productId], (error, result) => {
            if (error) {
                return res.status(500).json({ error: 'Failed to delete product' });
            }

            res.status(200).json({ message: 'Product deleted successfully' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Include the port number in the log message
});
