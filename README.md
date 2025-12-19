How to download the source code and install software/packages and run the program locally
The Software you want to have installed on your device is Node.js version 18 or higher and run it using npm. 
Make sure git is downloaded and we used visual studio code as our editor 
To download the source code make sure your repository points to product and clone it 

git clone https://github.com/your-username/product.git
cd product

you can also download a zip and extract is as well but make sure it points to product 
Then install any directories 
npm install

To connect to the Supabase(backend-as-a-service) the .env file has the url and key in it to connect to to the system. Supabase does not need for you to create an account as you don't have to access the main data so you should be fine

The Supabase handles sql code in its editor which is provided in eclass on a doc 

then to run the program on your system 
npm run dev
Local: http://localhost:5173/
which should be your outcome 

Many errors arose when trying to deploy using vercel so that had to be scrapped 
Due to time contraints Admin is not set up to be logged in so no need for an account or password as you can see the fucntionality  
