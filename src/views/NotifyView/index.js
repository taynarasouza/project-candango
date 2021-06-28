import React from "react";
import { View,StyleSheet, FlatList} from 'react-native';
import { Appbar, BottomNavigation,Avatar,Text, Card, Paragraph, Title, Badge  } from "react-native-paper";

export default function NotifyView({ navigation }) {
     
        return (
          <>
            <View style={{flexDirection: 'row', justifyContent:"space-around" , padding:10}}>
              <Text style={styles.title}></Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent:"space-around" , padding:10}} >
              <Text> Não há novas mensagens</Text>
            </View>
           
          </>
      
        
        );
      };
const styles = StyleSheet.create({
    Container:{
      flex:1,
    },
    textItem:{
      padding:15,
      marginVertical: 3,
      marginHorizontal: 30
    },
    textItemTitle:{
      fontSize:15,
      color:'#A9A9A9',
      fontWeight:"bold",
      textAlign: "justify",
      alignItems:"flex-start"
      
    },
    textItemDesc:{
      flex:1,
      fontSize:16,
      color:'#34495e',
      fontWeight:"bold",
      textAlign: "justify"
    },
    textItemBadge:{
      fontSize:10,
      color:'#fff',
      height:30,
      textAlign: "right",
      paddingRight:20,
      backgroundColor: "#00ff00"
      },
    textItemViewed:{
      padding:15,
      marginVertical: 3,
      marginHorizontal: 1
    
      }

});         
NotifyView.navigationOptions = ({navigation}) => ({
  title: 'Notificações',
});

