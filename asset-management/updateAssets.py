import os
import json

def get_file_info(folder_path):
    file_list = []
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            file_name, file_extension = os.path.splitext(file)
            file_list.append({"fileName": file_name, "fileExtension": file_extension})
    return file_list

folder_path = "path/to/folder"
file_info = get_file_info(folder_path)

output_folder = "path/to/output/folder"
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

with open(os.path.join(output_folder, "file_info.json"), "w") as outfile:
    json.dump(file_info, outfile)