const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const ExcelFile = require('./models/ExcelFile');
const Analytics = require('./models/Analytics');

async function createSampleData() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/excelAnalytics');
    console.log('Connected to MongoDB');

    // Create sample user
    const hashedPassword = await bcrypt.hash('password123', 10);
    const sampleUser = await User.create({
      name: 'Sample User',
      email: 'sample@example.com',
      password: hashedPassword,
      role: 'user'
    });
    console.log('Sample user created:', sampleUser.email);

    // Create sample Excel file record
    const sampleFile = await ExcelFile.create({
      filename: 'sample-data-123.xlsx',
      originalName: 'Sample Sales Data.xlsx',
      filePath: './uploads/excel/sample-data-123.xlsx',
      fileSize: 15420,
      sheetNames: ['Sales', 'Products', 'Customers'],
      uploadedBy: sampleUser._id,
      status: 'processed',
      metadata: {
        totalRows: 100,
        totalColumns: 5,
        fileType: '.xlsx'
      }
    });
    console.log('Sample file record created:', sampleFile.originalName);

    // Create sample analytics
    const sampleAnalytics = await Analytics.create({
      fileId: sampleFile._id,
      userId: sampleUser._id,
      analysisType: 'summary',
      name: 'Sales Summary Report',
      description: 'Monthly sales summary analysis',
      config: {
        sheetName: 'Sales',
        columns: ['Product', 'Sales', 'Revenue']
      },
      results: {
        summary: {
          'Product': { count: 50, uniqueCount: 10 },
          'Sales': { count: 50, min: 100, max: 5000, avg: 1250, sum: 62500 },
          'Revenue': { count: 50, min: 1000, max: 50000, avg: 12500, sum: 625000 }
        }
      }
    });
    console.log('Sample analytics created:', sampleAnalytics.name);

    console.log('\n✅ Sample data created successfully!');
    console.log('You can now view this data in MongoDB Compass');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating sample data:', error);
    process.exit(1);
  }
}

createSampleData();
