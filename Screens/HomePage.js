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
import { TouchableOpacity } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



export default class HomePage extends Component{
  constructor(props){
    super(props);
  }

  render(){
      return(
          <View>

              <View style={{justifyContent:"center",alignItems:"center",margin:10}}>
                    <Button title='Go to Server Page' onPress={() => {this.props.navigation.navigate('Server')}}/>
              </View>
              <View style={{justifyContent:"center",alignItems:"center",margin:10}}>
                    <Button title='Go to Client Page' onPress={() => {this.props.navigation.navigate('Client')}}/>
              </View>
          </View>
      )
    }
}