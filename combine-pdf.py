from PyPDF2 import PdfMerger

files = ["1.pdf", "2.pdf", "3.pdf"]
merger = PdfMerger()

for pdf in files:
    merger.append(pdf)

merger.write("combined.pdf")
merger.close()
