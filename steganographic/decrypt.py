from PIL import Image


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


# Prompt for the encoded image file path
encoded_image_path = input("Enter the path of the encoded image: ")

# Open the encoded image
encoded_image = Image.open(encoded_image_path)

# Decode the message from the encoded image
decoded_text = decode_image(encoded_image)

print("Decoded Message:")
print(decoded_text)
