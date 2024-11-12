Here's a simple and clear **README** file for your graduate project:

---

# Arabic Text Extraction Web Application

This project is a web application that uses AI to extract Arabic text from images. The model is built on Google Tesseract OCR, which has been enhanced with a custom training method. The backend is built with Flask, and the frontend is developed with React.

## Features
- Upload an image containing Arabic text.
- AI-powered extraction of Arabic sentences from the image.
- Real-time processing and display of the extracted text to the user.

## Technologies Used
- **Frontend**: React
- **Backend**: Flask
- **OCR Model**: Google Tesseract (with custom training for improved Arabic recognition)
- **AI/ML**: Python, , Google Tesseract
- **API**: RESTful API for communication between frontend and backend

## Installation

### Backend (Flask)
1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the Flask app:
   ```bash
   python app.py
   ```

### Frontend (React)
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Run the React app:
   ```bash
   npm start
   ```

## How It Works
1. The user uploads an image containing Arabic text on the frontend.
2. The image is sent to the backend through a RESTful API.
3. The backend uses the custom-trained Tesseract model to process the image and extract the text.
4. The extracted text is sent back to the frontend and displayed to the user.

## Achievements
- **Best Project Poster** in the graduate project poster competition.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to adjust any section or add more details specific to your project!
