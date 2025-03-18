import base64

# Image path
image_path = "A:\\\\leolav21\\\\public\\\\NeedleandYarn.png"

# Output file path
books_file_path = "A:\\\\leolav21\\\\src\\\\Books\\\\books.ts"

try:
    # Read and encode the image
    with open(image_path, "rb") as image_file:
        base64_encoded = base64.b64encode(image_file.read()).decode("utf-8")

    # Read books.ts content
    with open(books_file_path, "r") as books_file:
        books_content = books_file.read()

    # Find the line to replace
    search_string = "coverImageUrl: NeedleandYarnCover,"
    replacement_string = f'coverBase64: "data:image/png;base64,{base64_encoded}",' # Corrected mime type to image/png

    # Replace the line
    modified_books_content = books_content.replace(search_string, replacement_string)

    # Write the modified content back to books.ts
    with open(books_file_path, "w") as books_file:
        books_file.write(modified_books_content)

    print(f"Base64 encoded image inserted into {books_file_path} for Needle & Yarn book")

except Exception as e:
    print(f"Error: {e}")
