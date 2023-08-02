from PIL import Image
import requests
from io import BytesIO

def text_to_binary(text):
    binary = ''.join(format(ord(char), '08b') for char in text)
    return binary


def encode_image(image, binary_text):
    image = image.convert("RGB")  # Convert image to RGB mode
    pixels = list(image.getdata())
    width, height = image.size

    if len(binary_text) > len(pixels) * 3:
        raise ValueError("Text is too long to be encoded in the image.")

    # Calculate the required padding length
    padding_length = (len(pixels) * 3) - len(binary_text)
    # Add padding to binary_text
    binary_text += "0" * padding_length

    encoded_pixels = []
    index = 0
    for pixel in pixels:
        if index < len(binary_text):
            red, green, blue = pixel

            # Encode 1 bit of the text in the least significant bit of each color channel
            red = (red & 0xFE) | int(binary_text[index])
            green = (green & 0xFE) | int(binary_text[index + 1])
            blue = (blue & 0xFE) | int(binary_text[index + 2])

            encoded_pixels.append((red, green, blue))
            index += 3
        else:
            encoded_pixels.append(pixel)

    encoded_image = Image.new(image.mode, image.size)
    encoded_image.putdata(encoded_pixels)

    return encoded_image


def decode_image(encoded_image):
    pixels = list(encoded_image.getdata())

    binary_text = ''
    for pixel in pixels:
        red = pixel[0]
        green = pixel[1]
        blue = pixel[2]

        # Extract the least significant bit from each color channel
        binary_text += str(red & 1)
        binary_text += str(green & 1)
        binary_text += str(blue & 1)

    text = ''
    for i in range(0, len(binary_text), 8):
        byte = binary_text[i:i+8]
        text += chr(int(byte, 2))

    return text

# Prompt for image URL and text to hide
image_url = input("Enter the URL of the image: ")
text = input("Enter the text to hide: ")

# Download the image from the URL
response = requests.get(image_url)
image = Image.open(BytesIO(response.content))

# Convert the text to binary
binary_text = text_to_binary(text)

# Encode the text in the image
encoded_image = encode_image(image, binary_text)

# Save the encoded image
encoded_image.save("encoded_image.png")

# Generate decoding code
decoding_code = decode_image(encoded_image)

# Save the decoding code within the encoded image
with open("encoded_image.png", "ab") as f:
    f.write(decoding_code.encode())

print("Steganography complete.")
