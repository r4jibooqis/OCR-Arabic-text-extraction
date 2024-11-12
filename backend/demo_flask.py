from flask import Flask, request, jsonify
from PIL import Image
import asyncio
from subprocess import Popen
from flask_cors import CORS
import os

# create flask app
app = Flask(__name__)
CORS(app)

@app.route('/process-image', methods=['POST'])
async def process_image():
    # Check if an image file is present in the request
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    image_file = request.files['image']
    image_name = image_file.filename
    save_folder = '/root/app/tesseract_tutorial_ara/tesstrain/demoData'
    image_path = os.path.join(save_folder, image_name)
    image_file.save(image_path)
    
    
    # Process the image using pytesseract
    command = f"TESSDATA_PREFIX=/root/app/tesseract_tutorial_ara/tesseract/tessdata tesseract {image_path} stdout --tessdata-dir /root/app/tesseract_tutorial_ara/tesstrain/Completed-model --psm 7 -l Mixed --loglevel ALL"
    

    # Use asyncio to run the subprocess asynchronously
    process = await asyncio.create_subprocess_shell(command, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE)
    stdout, stderr = await process.communicate()

    output_lines = stdout.decode().strip().split('\n')
    processed_text = output_lines[-1]  # Get the last line
    
    return {'text': processed_text} ,200


@app.route('/')
def hello_world():
    return 'Hello World!'

if __name__ == "__main__":
    app.run(host='0.0.0.0' , ssl_context='adhoc')
