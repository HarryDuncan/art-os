import os
import json

# Specify the base directory
base_dir = r'C:\Users\harry\Projects\art-os\public\assets\models'

# List of allowed folders
allowed_folders = ['sculptures']  # Replace with your actual folder names

# List to hold the asset information
assets = []

# Function to process each file in allowed folders
def process_files():
    for folder_name in os.listdir(base_dir):
        folder_path = os.path.join(base_dir, folder_name)
        if os.path.isdir(folder_path) and folder_name in allowed_folders:
            for file_name in os.listdir(folder_path):
                file_path = os.path.join(folder_path, file_name)
                if os.path.isfile(file_path):
                    # Remove file extension for id and name
                    name_without_extension = os.path.splitext(file_name)[0]
                    asset_info = {
                        "id": name_without_extension,
                        "name": name_without_extension,
                        "url": f"../assets/models/{folder_name}/{file_name}",
                        "assetType": "MODEL3D"
                    }
                    assets.append(asset_info)

# Process the files and generate the JSON
process_files()

# Path to save the generated JSON file
output_path = os.path.join(base_dir, 'assets.json')

# Write the assets data to the JSON file
with open(output_path, 'w') as json_file:
    json.dump(assets, json_file, indent=4)

print(f"Assets JSON file has been generated at {output_path}")
