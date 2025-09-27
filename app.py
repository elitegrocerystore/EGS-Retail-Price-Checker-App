# app.py
import os
import sqlite3
import pandas as pd
from flask import Flask, jsonify
from flask_cors import CORS
# The 'googleapiclient.discovery' import is no longer strictly needed
# but is left commented out for reference if you were to reintroduce it.
# from googleapiclient.discovery import build 


# --- STATIC LOGO URL ---
# The provided logo image address will be used for all products
STATIC_LOGO_URL = "https://cdn.shopify.com/s/files/1/0685/6212/5032/files/g-form-72517-appearance.imageUrl-m65edvr1-PHOTO-2025-01-20-00-01-52.jpg?v=1737398803"

# --- MODIFIED: Placeholder function now returns the static logo URL ---
def find_product_image_url(product_name):
    # This function is now simplified to just return the static logo URL.
    # The Google API logic has been removed.
    return STATIC_LOGO_URL

# Initialize Flask App
app = Flask(__name__)
CORS(app) # Allows the frontend to communicate with the backend

DATABASE = 'products.db'

# --- Function to Read your CSV/Excel and populate the database ---
def populate_database():
    # Connect to the SQLite database (it will be created if it doesn't exist)
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    # Create table if it doesn't exist
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            retail_price REAL,
            daraz_price REAL,
            image_url TEXT
        )
    ''')

    # --- IMPORTANT: Place your file here ---
    # Change this to your Excel file if needed (pd.read_excel)
    file_path = 'retail_prices.csv' 
    if os.path.exists(file_path):
        df = pd.read_csv(file_path)

        # Assuming your CSV has columns 'ProductName' and 'RetailPrice'
        for index, row in df.iterrows():
            product_name = row['ProductName']
            retail_price = row['RetailPrice']

            # Check if product already exists
            cursor.execute("SELECT * FROM products WHERE name=?", (product_name,))
            if cursor.fetchone() is None:
                # --- MODIFIED: Use the simplified function to get the static logo URL ---
                image = find_product_image_url(product_name) 
                cursor.execute(
                    "INSERT INTO products (name, retail_price, image_url) VALUES (?, ?, ?)",
                    (product_name, retail_price, image)
                )
        print("Database populated successfully from CSV.")

    conn.commit()
    conn.close()

# --- API Endpoint to get all products ---
@app.route('/api/products')
def get_products():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row # This allows accessing columns by name
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM products")
    products = [dict(row) for row in cursor.fetchall()]

    conn.close()
    return jsonify(products)

# --- Main entry point ---
if __name__ == '__main__':
    populate_database() # Run this once on startup
    app.run(debug=True, port=5000)