require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

// Function to establish a connection to the MongoDB database
async function connectToDatabase() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    return client.db(dbName);
  }

// Create a new todo
async function createTodo(title) {
    const db = await connectToDatabase();
    const collection = db.collection('todo-list');
    const result = await collection.insertOne({ title });
    return result.ops[0];
  }

// Read all todos
async function getAllTodos() {
    const db = await connectToDatabase();
    const collection = db.collection('todo-list');
    const todos = await collection.find({}).toArray();
    return todos;
  }

// Read a single todo
async function getTodoById(id) {
    const db = await connectToDatabase();
    const collection = db.collection('todo-list');
    const todo = await collection.findOne({ _id: new ObjectId(id) });
    if (!todo) {
      throw new Error('Todo not found');
    }
    return todo;
  }

// Update a todo
async function updateTodoById(id, title) {
    const db = await connectToDatabase();
    const collection = db.collection('todo-list');
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { title } }
    );
    if (result.modifiedCount === 0) {
      throw new Error('Todo not found');
    }
    return { _id: id, title };
  }

// Delete a todo
async function deleteTodoById(id) {
    const db = await connectToDatabase();
    const collection = db.collection('todo-list');
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      throw new Error('Todo not found');
    }
    return { _id: id };
  }

export default {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodoById,
  deleteTodoById,
};
