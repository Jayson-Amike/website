FROM node:20-alpine

# This sets the base directory inside the container
WORKDIR /app

# 1. Copy everything from your 'website' folder on the VM into '/app' in the container
COPY . .

# 2. MOVE INTO the actual React project folder where index.html lives
WORKDIR /app/my-react-app

# 3. Install and run from INSIDE that subfolder
RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host","0.0.0.0","--polling"]
