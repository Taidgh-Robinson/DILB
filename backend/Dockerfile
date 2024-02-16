# syntax=docker/dockerfile:1
FROM python:3.9.13-slim-buster
# create working directory and install pip dependencies
WORKDIR /backend
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

EXPOSE 5000
# run the flask server  
CMD ["python", "app.py"]
