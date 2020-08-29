# Face++ Compare Helper

A simple helper class for Face++ Compare API in nodejs.

# Getting started

To run example,

    npm install

Open **example.js** to and replace the API_KEY and API_SECRET

    npm start

# Reference

Import the FacePlusPlus module and initialize using FacePlusPlus.initialize(API_KEY, API_SECRET) once.

To call API, FacePlusPlus.match(image1: string, image2: string, options: { type: "url" | "base_64" | "face_token" })