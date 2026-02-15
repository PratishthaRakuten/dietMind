require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

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

  // Parse the mocked response
  const parsedResponse = parseMarkdownResponse(mockLLMResponse);

  console.log('Parsed Response:', parsedResponse); // Debugging: Log the parsed response
  res.json({ data: parsedResponse });
});

// Parsing function to extract data from markdown
const parseMarkdownResponse = (markdown) => {
  const sections = markdown.split('###').map((section) => section.trim());
  const result = {};

  sections.forEach((section) => {
    if (section.startsWith('Breakfast')) {
      result.breakfast = parseDishes(section);
    } else if (section.startsWith('Lunch')) {
      result.lunch = parseDishes(section);
    } else if (section.startsWith('Dinner')) {
      result.dinner = parseDishes(section);
    } else if (section.startsWith('Recommended Foods')) {
      result.recommendedFoods = parseList(section);
    } else if (section.startsWith('Foods to Avoid')) {
      result.foodsToAvoid = parseList(section);
    }
  });

  return result;
};

// Helper function to parse dishes and their benefits
const parseDishes = (section) => {
  return section
    .split('\n')
    .slice(1)
    .map((line) => {
      const [dish, benefits] = line.split(':');
      return {
        dish: dish.replace(/^\d+\.\s\*\*/, '').replace(/\*\*$/, '').trim(),
        benefits: benefits.trim(),
      };
    });
};

// Helper function to parse lists (e.g., recommended foods, foods to avoid)
const parseList = (section) => {
  return section
    .split('\n')
    .slice(1)
    .map((item) => item.replace(/^-/, '').trim());
};

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});