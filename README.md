# Bookworm Project

This project encompasses a web application focused on book sales.

## About the Project

The Book Sales Site project is an e-commerce platform that offers book lovers the opportunity to explore and purchase from a wide collection of books. The main objective of the project is to provide users with a rich experience concerning language options, payment methods, and secure shopping.

## Key Features

- **Multi-Language Support:** Users can choose between Turkish or English language options on the site. Translations can be easily done using the '@ngx-translate/core' npm package.

- **Interactive User Messages:** To provide a user-friendly interface, interactive messages are presented using the '@sweetalert2/ngx-sweetalert2' package in cases such as adding or removing items from the cart.

- **Variety of Books and Pricing:** The project offers a wide range of books in both Turkish and English languages. The price of each book is customized based on the language. Users are given the option to select the currency during the payment stage.

- **Secure Payment Transactions:** Payment transactions are facilitated using the 'İyzico Library'. User and payment information is securely transmitted to the server, ensuring a successful payment process.

- **Identity and FluentValidation Libraries:** The Identity library was used for user registration and login processes, while the FluentValidation library was utilized for data validation during user registration and login.

- **Error Handling with Error Service:** To control errors in the data received from the server, an Error Service was created to perform error handling. This service captures validation messages received from the server via ports and processes them to be compatible with multi-language support.

- **JWT Library, Decoding Operations on the Client:** During user login, the JWT library was utilized to generate a token.
The generated token data was decoded using jwtDecode on the client side to access user-specific information such as user ID and username for further processing.


## Additional Information

The development process of the project is ongoing.