#place the pdf files you want to combine in the same folder as this script name 1, 2, 3... run from terminal

from PyPDF2 import PdfMerger

files = ["1.pdf", "2.pdf", "3.pdf"]
merger = PdfMerger()

for pdf in files:
    merger.append(pdf)

merger.write("combined.pdf")
merger.close()
