require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000; // Use Render's dynamic port or default to 5000

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

// Root Route
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the DietMind Backend!');
});

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', message: 'Server is running smoothly' });
});

// Mock API for generating diet recommendations
app.post('/generate-diet', async (req, res) => {
  console.log('Received Request:', req.body); // Debugging: Log the request body

  // Mocked LLM response in markdown format
  const mockLLMResponse = `
### Breakfast
1. **Idli**: Rich in carbohydrates, easy to digest, and low in fat.
2. **Poha**: High in iron, low in calories, and quick to prepare.

### Lunch
1. **Dal Tadka with Rice**: High in protein, rich in fiber, and easy to digest.
2. **Vegetable Curry with Roti**: Packed with vitamins, minerals, and antioxidants.

### Dinner
1. **Khichdi**: Light on the stomach, high in protein, and easy to digest.
2. **Paneer Bhurji with Paratha**: High in protein, rich in calcium, and energy-boosting.

### Recommended Foods
- Fruits
- Nuts
- Leafy Greens

### Foods to Avoid
- Fried Foods
- Sugary Drinks
- Processed Snacks
`;

  res.json({ data: mockLLMResponse });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
