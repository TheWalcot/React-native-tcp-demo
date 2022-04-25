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
} from 'react-native';

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications


import NetInfo from "@react-native-community/netinfo";
import { NetworkInfo } from "react-native-network-info";
import TcpSocket from 'react-native-tcp-socket';
import { FlatList, TextInput } from 'react-native-gesture-handler';

export default class ClientPage extends Component{
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
      receivedServer:[],
      receivedClient:null,
      willSendData:null,
      forConnectionIP:null,
      forConnectionPort:null,
      time:null,

      startClient:null,
      sendControlState:null,
      readingDataTime:null,
    }
  }

  componentDidMount=async()=> {
    this.unsubscribe = await NetInfo.addEventListener(state => {
      //console.log("Is connected?", state.isConnected);
      //console.log("State details:",state.details.ssid)
      //console.log("ipAdrdress:",state.details.ipAddress)
      this.setState({stateNet: state})
      this.setState({type: state.type})

    });
    this.startClientGetData();

    await NetworkInfo.getIPAddress().then(ipAddress => {
      //console.log("ipAddres:",ipAddress);
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
    this.client = null;
  }


  startClientGetData =()=>{
    this.checkTimeIV = setInterval(this.creatingclient,1000)
  }


  closeTheClient = () => {
    this.client.destroy();
    
    clearInterval(this.creatingclient);

    console.log("client kapatıldı")

    this.setState({startClient:null, sendControlState:null, readingDataTime:null})
  }
  creatingclient = () => {

    if(this.state.startClient){
    let client =TcpSocket.createConnection({port:parseInt(this.state.forConnectionPort), host:this.state.forConnectionIP }, () => {
      //console.log("opened client on" + JSON.stringify(client.address()));
      this.setState({readingDataTime : this.state.readingDataTime+1})
      console.log(this.state.readingDataTime,"saniyedir client okuyor")

      if(this.state.sendControlState){
        client.write(this.state.willSendData);
        this.setState({sendControlState:false})
      }

    });
    client.on('data', (data) => {

      var date = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      var sec = new Date().getSeconds(); //Current Seconds
      var msec = new Date().getMilliseconds();
  
      const  currentData =date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec+'.'+msec

      
      const receivedDataTransformed = data.toString('utf-8');
      const {receivedServer} =this.state

      this.setState({receivedServer: receivedServer.concat([{time:currentData ,msg:receivedDataTransformed}])})

      //this.client.destroy(); // kill client after server's response
    });
    client.on('error', (error) => {
      console.log('client error ' + error);
    });
    client.on('close', () => {
      console.log('client close');
    });
  
    this.client = client;
    }
  }





  render(){
      return(
        <View style={{flex:1}}>

          <View style={{flex:0.25}}>
            {this.state.stateNet ?
            <View style={{flex:1,margin:10}}>
              <Text style={{textAlign:"center",fontSize:16}}>
                Type: {this.state.type}
                {"\n"}IP address:{this.state.stateNet.details.ipAddress}
                {"\n"}subnet:{this.state.IPAddress}
                {"\n"}IPV4Address:{this.state.IPV4Address}
                {"\n"}GatewayIPAddress:{this.state.GatewayIPAddress}

              </Text>
            </View>:null}

          </View>

          <View style={{margin:10,justifyContent:"center",alignItems:"center",flex:0.15}}>
              <Text style={{textAlign:"center",margin:1,flex:0.5}}>Enter the serve IP address</Text>
              <TextInput 
              placeholder='Enter the server IP address' 
              onChangeText={(text) => {this.setState({forConnectionIP: text})}}
              style={{height: windowHeight/30,width:windowWidth/2,borderRadius:20,borderWidth:0.2,flex:0.5,}}
              textAlign="center"
              />
          </View>

          <View style={{margin:10,justifyContent:"center",alignItems:"center",flex:0.15,}}>
              <Text style={{textAlign:"center",margin:1,flex:0.5}}>Server Port address</Text>
              <TextInput 
              placeholder='Enter the server port address' 
              onChangeText={(text) => {this.setState({forConnectionPort: text})}}
              style={{height: windowHeight/30,width:windowWidth/2,flex:0.5,borderRadius:20,borderWidth:0.2,}}
              textAlign="center"
              />
          </View>

          <View style={{margin:10,justifyContent:"center",alignItems:"center",flex:0.15}}>
              <Text style={{textAlign:"center",margin:1,flex:0.5}}> what do you want to send to server</Text>
              <TextInput 
              placeholder='please write what you want to send'
              onChangeText={(text) => {this.setState({willSendData: text})}}
              style={{height: windowHeight/30,width:windowWidth/2,flex:0.5,borderRadius:20,borderWidth:0.2,}}
              textAlign="center"/>
          </View>
          
          <View  style={{margin:10,justifyContent:"center",alignItems:"center",flex:0.1}}>
            <Button title="create client and send" onPress={() => {this.setState({startClient:true}),this.setState({sendControlState:true}),this.creatingclient()}} />
          </View>

          <View  style={{margin:10,justifyContent:"center",alignItems:"center",flex:0.1}}>
            <Button title="close the client" onPress={() => {this.closeTheClient()}} />
          </View>

          <View style={{flex:0.2}}>
                <FlatList 
                  data={this.state.receivedServer}
                  renderItem={ ({item})=> 
                  <View style={{backgroundColor:"gray", flexDirection:"row",margin:10}}>
                    <Text>
                      {item.time}
                    </Text>
                    <Text>
                      -->
                    </Text>
                    <Text>
                      {item.msg}
                    </Text>
                  </View> }
                />
          </View>
            
        </View>
      )
    }
}
