FROM python:3.10.7
WORKDIR /api
COPY requirements.txt ./
RUN pip install -r requirements.txt
EXPOSE 5000
CMD ["flask", "--app", "api", "--debug", "run", "--host=0.0.0.0"]