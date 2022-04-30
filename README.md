# React-native-tcp-demo

In this project, you can be able to communicate with two different mobile devices(Android or IOS) with the TCP. It is a basic demo. Here we just send the text but you can be able to modify and send what you want. 

ın this project we use 3 main important libraries for the TCP. These are and the reference links:

1-) react-native-tcp-socket link:https://www.npmjs.com/package/react-native-tcp-socket

2-) react-native-network-info link : https://www.npmjs.com/package/react-native-network-info

3-) @react-native-community/netinfo link:https://github.com/react-native-netinfo/react-native-netinfo 


For the TCP, firstly we have to create a server. I won't explain all the detail on how to create a server and other things. You can see the codes in the Screens/ServerPage.js 

When we write the functions and the server pages you can see the this screen:

 ![Simulator Screen Shot - iPhone 13 - 2022-04-25 at 23 00 41](https://user-images.githubusercontent.com/98342655/166117081-96c78be8-7f55-417e-b122-dc42482423c3.png)


This taken from the IOS device. As you can see the device connection is established with wifi, and we can see the IP address and other things. For the create server we need to write the IP address to textınput which reading the enter the server IP address. After that we have to write the port number. When we write these two things after than we can be click the create server button. When we click the create server button, the server will be created with IP address which you write and the port number which you write.

Lets continue the Client side. As I mentioned above, I won't explained the whole code, you can see the codes in the Screen/ClientPage.js.

When we write the functions, the client side will be shown like that: 

![Screenshot_1650916839](https://user-images.githubusercontent.com/98342655/166117256-c3111e96-1db9-4c4d-b2b2-3c4501fa42b8.png)


This taken from the Android device. The important thing about the TCP is that both device connect the same wifi.If you can't connect same wifi you can't communicate. For the connect to server you have to write the server IP adress in the textınput which writing the enter the server IP address. After that you have to write port number which you write in the server page. 

Finally you can write whatever you want in the last textınput. Then when you click the create client and send button, it will be send to server and the server will be respond. The respond will be include the Echo Server. 


