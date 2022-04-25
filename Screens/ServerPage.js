import React, {Component} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Alert
} from 'react-native';

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import NetInfo from "@react-native-community/netinfo";
import { NetworkInfo } from "react-native-network-info";
import TcpSocket from 'react-native-tcp-socket';

const net = require('net');

export default class ServerPage extends Component{
  constructor(props){
    super(props);
    this.state={
        stateNet:null,
        IPAddress:null,
        IPV4Address:null,
        Broadcast:null,
        SSID:null,
        BSSID:null,
        Subnet:null,
        GatewayIPAddress:null,
        Frequency:null,
        type:null,
  
        receivedServer:null,
        receivedClient:null,
        forConnectionIP:null,
        forConnectionPort:null,
        serverWillSendData:null,
  
        controlCreateServerButton:false,
        sendControlState:false,

    }
  }

  componentDidMount=async()=> {
    this.unsubscribe = await NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("state:",state)
      this.setState({stateNet: state})
      this.setState({type: state.type})
      
    });

    await NetworkInfo.getIPAddress().then(ipAddress => {
      console.log("ipAddres:",ipAddress);
      this.setState({IPAddress:ipAddress})
    });
    await NetworkInfo.getIPV4Address().then(ipv4Address => {
      //console.log("ipv4addres:",ipv4Address);
      this.setState({IPV4Address:ipv4Address})
    });
    await NetworkInfo.getBroadcast().then(broadcast => {
      //console.log("broadcast",broadcast);
      this.setState({Broadcast:broadcast})
    });
    await NetworkInfo.getSSID().then(ssid => {
      this.setState({SSID:ssid})
      //console.log("ssid:",ssid);
    });
    await NetworkInfo.getBSSID().then(bssid => {
      //console.log("bssid:",bssid);
      this.setState({BSSID:bssid})
    });
    await NetworkInfo.getSubnet().then(subnet => {
      //console.log("subnet:",subnet);
      this.setState({Subnet:subnet})
    });
    await NetworkInfo.getGatewayIPAddress().then(defaultGateway => {
      //console.log("defaultGateway:",defaultGateway);
      this.setState({GatewayIPAddress:defaultGateway})
    });
    await NetworkInfo.getFrequency().then(frequency => {
      //console.log("frequency:",frequency);
      this.setState({Frequency:frequency})
    });

  }

  componentWillUnmount=()=> {
    this.unsubscribe && this.unsubscribe();
  }

  creatingServers = () => {
    console.log("entering the creating server function")
    const server = TcpSocket.createServer(function(socket) {

      socket.on('data', (data) => {

        console.log("server received:"+data)

        socket.write('Echo server ' + data);
      });

      
      socket.on('error', (error) => {
        console.log('An error ocurred with client socket ', error);
      });
    
      socket.on('close', (error) => {
        console.log('Closed connection with ', socket.address());
      });
     
    }).listen({ port: parseInt(this.state.forConnectionPort), host:this.state.forConnectionIP });

   
    server.on('error', (error) => {
      Alert.alert(error)
      console.log('An error ocurred with the server', error);
    });
    
    server.on('close', () => {
      console.log('Server closed connection');
    });    
    if(server){
      this.setState({controlCreateServerButton :true});
      Alert.alert("","host:"+this.state.forConnectionIP+" port:"+this.state.forConnectionPort+"adresli server oluşturuldu")
    }else{
      null
    }

    this.server = server;
  }

  sendData = () => {
    const servercik = this.server;

    servercik.on('connection', (socket)=> {
      if(this.state.sendControlState){
        this.state.exampleData.map((data) => {
          socket.write(data.title);
        })

      this.setState({sendControlState:false})
      }
    })
  }


  render(){
      return(
          <View>
              <Text style={{fontSize:32,fontWeight:"bold",textAlign:"center",margin:10}}>
                  Server Page
              </Text>

              <Text style={{textAlign:"center",fontSize:20,fontWeight:"bold"}}>
                  State:{this.state.type}
              </Text>
              <Text style={{textAlign:"center"}}>
                  {"\n"}IP address:{this.state.IPAddress}
                  {"\n"}IPv4 address:{this.state.IPV4Address}
                  {"\n"}Broadcast:{this.state.Broadcast}
                  {"\n"}SSID:{this.state.SSID}
                  {"\n"}BSSID:{this.state.BSSID}
                  {"\n"}Subnet:{this.state.Subnet}
                  {"\n"}GatewayIPAddress:{this.state.GatewayIPAddress}
                  {"\n"}Frequency:{this.state.Frequency}
              </Text>

              <View style={{justifyContent:"center",alignItems:"center",margin:10}}>
                <Text style={{margin:10}}>Enter the IPv4 address for server</Text>
                <TextInput 
                placeholder="Enter the IPv4 address which you connect"
                onChangeText={(text) => { this.setState({forConnectionIP:text})}}
                textAlign='center'/>
              </View>

              <View style={{justifyContent:"center",alignItems:"center",margin:10}}>
                <Text style={{margin:10}}>Enter the port address for server</Text>
                <TextInput 
                placeholder="Enter the port address "
                onChangeText={(text) => { this.setState({forConnectionPort:text})}}
                textAlign='center'/>
              </View>

              <Button title =" create server" 
              onPress={() => this.creatingServers()} 
              disabled={this.state.controlCreateServerButton}/>




          </View>

      )
    }
}