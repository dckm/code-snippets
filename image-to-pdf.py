# place the .jpg you want to combine into the same folder named 1, 2, 3...
# and run python image-to-pdf.py in terminal

from PIL import Image
from fpdf import FPDF
import os

# Define image filenames (in the same folder as the script)
image_files = [
    "1.jpg",
    "2.jpg",
    "3.jpg"
]

# A4 size in mm
PAGE_WIDTH = 210
PAGE_HEIGHT = 297

pdf = FPDF(unit="mm", format="A4")

for image_file in image_files:
    image_path = os.path.join(os.getcwd(), image_file)
    cover = Image.open(image_path)
    width_px, height_px = cover.size

    # Convert pixel dimensions to mm (1px = 0.264583 mm)
    width_mm = width_px * 0.264583
    height_mm = height_px * 0.264583

    # Calculate scale factor to fit image within A4 size
    scale = min(PAGE_WIDTH / width_mm, PAGE_HEIGHT / height_mm)
    new_width = width_mm * scale
    new_height = height_mm * scale

    # Center the image on the page
    x = (PAGE_WIDTH - new_width) / 2
    y = (PAGE_HEIGHT - new_height) / 2

    pdf.add_page()
    pdf.image(image_path, x, y, new_width, new_height)

# Save the PDF
output_pdf_path = os.path.join(os.getcwd(), "electronics_project_images.pdf")
pdf.output(output_pdf_path)

print("PDF created:", output_pdf_path)
input("Done! Press Enter to exit...")
