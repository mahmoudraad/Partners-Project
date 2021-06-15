import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native';
import styled from 'styled-components/native';
import {API_URL} from '@env'
import { ServerStyleSheet } from 'styled-components';

const Item = ({ title } ) => (
  <View style={{ flex:0.5}}>
    <Text style={styles.title}>{title}</Text>
   </View>
);

export default class App extends React.Component {
 
  state = {
     dataSource: [],
     TextRange: "",
  };

FetchPartners= (text) => {
  this.setState({ TextRange: text });
    if(!isNaN(text))
    {
        fetch(API_URL + '/ReadFromJsonFile?KilometerRange=' + (text != "" ? text : 0) )
        .then((response) => response.json())
        .then((responseJson) => {
    this.setState({ dataSource: responseJson  });

        })
        .catch((error) => {
            console.error(error);
        });
  }
  else
  {
    this.setState({ TextRange: "" });
    alert("please enter a numeric value");
  }

}
 
  render() {
  return (

    <View> 
          <View style={{ flex:1, alignItems:'center', marginTop:40}}>
            <Text style={{  fontSize:25  }}> Enter the range in kilometers </Text>
            <TextInput style={{ width: 310, height:36, marginTop:5 , borderColor: '#f9c2ff' ,
              borderLeftWidth: 4, borderRightWidth: 4, borderTopWidth:4 , borderBottomWidth: 4 }}
              onChangeText={(text) => this.FetchPartners(text) } value={this.state.TextRange} >
           </TextInput>
          </View>
  
            <FlatList
                data={this.state.dataSource}
                renderItem={({ item }) => {
                  return (
                    <View style={ { flexDirection: "row", flex:1, width:'75%',     backgroundColor: '#f9c2ff', margin:16 } } >
                         <Item title={item.organization} />
                      

                         <Item title={item.addresses} />
                    
                 
                      </View>
                  )
                   }}

                keyExtractor={item => Math.random().toString(36).substr(2, 9)}
                ListHeaderComponent={() => {
                  return (
                   
                    <View>
                      {  this.state.dataSource.length > 0 ?
                          <View style={{ flexDirection: "row", flex: 1, width:'75%' }}>
                              <View style={{ flex:0.5 }}> 
                            <Text style={{ fontWeight:"bold", marginHorizontal: 16, marginVertical: 8, fontSize:25  }}>Company Name</Text>
                            </View>
                            <View style={{ flex:0.5 }}>
                            <Text style={{ fontWeight:"bold", marginHorizontal: 16, marginVertical: 8, fontSize:25  }}>Addresses </Text>
                            </View>
                         </View>
                        : ""
                      }
                    </View>
 
                  )
                    }}
             />
      </View>

  );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    alignItems:'center'
  },
  item: {
    backgroundColor: '#f9c2ff',
    width:200
  },
  item2: {
    backgroundColor: '#f9c2ff',
    width:400
  },
  title: {
    fontSize: 20,
  },
});
