# Countries

Full Stack Project

This project is a web application that includes a backend developed with Node.js and a frontend built with Next.js. Follow the instructions below to install and run both parts.

Prerequisites

Make sure you have the following programs installed on your machine:
• Node.js (recommended version 14 or higher)
• npm (included with Node.js)

Installation

1. Clone the repository

git clone https://github.com/your-username/your-repository.git  
cd your-repository

2. Backend Setup

Navigate to the backend directory:

cd api

Install dependencies:

npm install

Start the server:

npm run dev

The backend will be available at http://localhost:3001

3. Frontend Setup

Navigate to the frontend directory:

cd country-info-app

Install dependencies:

npm install

Start the server:

npm run dev

The frontend will be available at http://localhost:3000

add .env file

NEXT_PUBLIC_API_URL=http://localhost:3001
