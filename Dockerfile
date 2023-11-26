FROM ubuntu:latest

# Copy the script into the container
COPY start-camera.sh /start-camera.sh

# Set execute permissions
RUN chmod +x /start-camera.sh

# Specify the command to run your script
ENTRYPOINT [ "/start-camera.sh" ]