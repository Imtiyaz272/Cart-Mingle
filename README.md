# **CartMingle**

CartMingle is a collaborative shopping platform that allows two or more users to create and manage a shared cart in real-time. It enhances the shopping experience by enabling users to add items together and discuss products within the cart using a real-time chat functionality. Built using the MEAN Stack , this platform aims to provide a seamless and engaging shopping experience for users who want to shop together, regardless of their location.

## **Technologies Used**

CartMingle is built using the following technologies:

- **Frontend**: Angular, Tailwind CSS
- **Backend**: Node.js , Express.js
- **Database**: MongoDB
- **Real-Time Communication**: Socket.IO
- **Development Tools**: VS Code , Git & GitHub

## **Features**

1. Shared Cart: Add items to a shared cart with your friends in real-time.
2. Real-time Chat: Communicate with others while browsing and adding items to the cart.
3. Collaborative Shopping: Simplifies group purchases by combining everyone's interests into one shared cart.

## **Installation**

To set up CartMingle locally, follow these steps in VS Code:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Imtiyaz272/Cart-Mingle.git
   ```

2. **Navigate to the project folder**

   Change into the project directory:
   ```bash
   cd CartMingle
   ```

3. **Install backend dependencies**

   Navigate to the backend folder and install required dependencies:
   ```bash
   cd api
   npm install
   ```

4. **Install frontend dependencies**

   Go to the frontend folder and install required dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

5. **Start the backend server**

   Navigate back to the backend folder and start the server:
   ```bash
   cd api
   npm start
   ```

6. **Start the frontend server**

   Navigate to the frontend folder and start the frontend development server:
   ```bash
   cd ../frontend
   npm start
   ng serve -o
   ```

## **Usage**

To use CartMingle, follow these steps:

1. **Register an Account:**
   - Open the application in your web browser.
   - Register for an account by providing your basic details.
     
     ![CM15](https://github.com/user-attachments/assets/51654d46-7fce-4c81-ac5d-765188316bc2)
     
3. **Log in:**
   - After registering, log in with your new credentials to access CartMingle.
     
     ![CM1](https://github.com/user-attachments/assets/9d735fad-1f7c-4a70-9e87-cc7633b83351)

     ![CM2](https://github.com/user-attachments/assets/1afb3900-dd58-4cda-9255-23ec2fa782ae)


4. **Initiate a Shared Cart:**
   - Click on the ShopTogether tab in the main menu.
   - Select Create a Cart, then enter a unique cart name.
   - A one-time password (OTP) will be generated for this cart.
     
    ![CM3](https://github.com/user-attachments/assets/ad9e2d10-49b5-4621-bd28-2ebecced43cc)

    ![CM4](https://github.com/user-attachments/assets/4cf6d57c-0aa4-4ab8-abd5-9fdc174f8609)


5. **Share the OTP:**
   - Share the OTP with the friend you want to invite to the shared cart.

    ![CM5](https://github.com/user-attachments/assets/612ace2e-a7f1-4162-93c7-97ec4c9e2447)

6. **Dual Accounts on Localhost:**
   - Open localhost:4200 in another browser window.
   - Create a separate account and log in.
7. **Join a Shared Cart:**
   - In the new account, go to the ShopTogether tab, and select Join a Cart.
   - Enter the OTP shared by the first user to access the shared cart.
     
    ![CM6](https://github.com/user-attachments/assets/5b9e7597-1782-4b4c-8248-23f80248a42f)

    ![CM7](https://github.com/user-attachments/assets/6fafeea7-c4dd-491f-ad05-a65a4e25d5e2)

    ![CM8](https://github.com/user-attachments/assets/16757606-d0f5-4407-acda-5526bf83b158)


9. **Collaborate on Shopping:**
   - Both users can now add items to the shared cart, while simultaneously discussing products in the 
     chat section within the cart.
   - Enjoy a real-time, collaborative shopping experience.
     
    ![CM9](https://github.com/user-attachments/assets/40864c07-6e5d-4617-bdb6-b7f1921ac299)

    ![CM10](https://github.com/user-attachments/assets/1bd299be-a5a9-4819-8540-eb0067ee9370)

    ![CM11](https://github.com/user-attachments/assets/b7ad5967-3268-4839-8651-c14f883449ac)

    ![CM12](https://github.com/user-attachments/assets/f857a1a4-6f4c-45a2-b321-a78956640d81)

    ![CM13](https://github.com/user-attachments/assets/e4997f8e-6f98-405d-aac0-94683ca09557)


10. **Complete the Purchase:**
   - When ready, either user can proceed to checkout to complete the order.
     
    ![CM14](https://github.com/user-attachments/assets/07395a1a-3f57-4d20-92d8-a7d016772a89)


## **Future Enhancements**
 
- Adding AI-powered product recommendations based on user preferences.  
- Integrating with payment gateways for a seamless checkout experience.  
- Enhancing the chat feature with emojis and multimedia sharing.

---
Thank you for exploring CartMingle! 🚀
