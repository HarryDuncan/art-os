# syntax=docker/dockerfile:1

FROM python:3.10.5
WORKDIR /interaction_node

RUN pip install --upgrade pip setuptools
# Copy requirements folder to image
COPY requirements /requirements

# Install requirements
RUN for file in /requirements/*; do pip install --no-cache-dir -r "$file"; done



WORKDIR /interaction_node

COPY . .
RUN chmod +x interaction_node.py
CMD ["python3", "interaction_node.py"]
