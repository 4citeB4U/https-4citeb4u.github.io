import base64

# Path to save the Base64 encoded text
output_path = "A:\\\\leolav21\\\\image_base64.txt"

# Read and encode the image
image_path = "A:\\\\leolav21\\\\public\\\\MRDYE.webp"
with open(image_path, "rb") as image_file:
    base64_encoded = base64.b64encode(image_file.read()).decode("utf-8")

# Save the Base64 string to a text file
with open(output_path, "w") as output_file:
    output_file.write(base64_encoded)

print(f"Base64 encoding saved to {output_path}")
