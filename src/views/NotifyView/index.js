import React from "react";
import { View,StyleSheet, FlatList} from 'react-native';
import { Appbar, BottomNavigation,Avatar,Text, Card, Paragraph, Title, Badge  } from "react-native-paper";

export default function NotifyView({ navigation }) {

 
        const bdMsg=[
          {key: 1, bagdeText: 'Novo',  msgTitle: 'Sistema' ,msgDesc: 'Atualização acontecerá no dia 01/07/2021 de 2h as 9h'},
          {key: 2, bagdeText: 'Novo',  msgTitle: 'Novidades' ,msgDesc: 'Novos pontos turisticos foram adicionados,aventureiros rumo a novas conquistas'},
          {key: 3, bagdeText: 'Novo',  msgTitle: 'Novidades' ,msgDesc: 'Nova funcionalidade implementada no perfil de Usuario funcionalidade implementada no perfil de Usuario'},
          {key: 4, bagdeText: 'Novo',  msgTitle: 'Novidades' ,msgDesc: 'Para tornarmos sua experiencia em Brasília mais inesquecível, atualizamos algumas funcionalidades no sistema de Premiação '},
          {key: 5, bagdeText: 'Novo',  msgTitle: 'Sistema' ,msgDesc: 'Sistema de Ranking indísponivel, em breve está novamente disponivel,agradecemos a compreensão!'},
          {key: 6, bagdeText: 'Novo',  msgTitle: 'Sistema' ,msgDesc: 'Está disponivel a nova versao do aplicativo , atualize agora mesmo!'},
          {key: 7, bagdeText: 'Novo',  msgTitle: 'Sistema' ,msgDesc: 'Atualização acontecerá no dia 01/06/2021 de 2h as 9h'},
          {key: 8, bagdeText: 'Novo',  msgTitle: 'Sistema' ,msgDesc: 'Está disponivel a nova versao do aplicativo , atualize agora mesmo!'},
          {key: 9, bagdeText: 'Novo',  msgTitle: 'Sistema' ,msgDesc: 'Atualização acontecerá no dia 01/05/2021 de 2h as 9h'},
        ]
     
        return (
          <>
            <View style={{flexDirection: 'row', justifyContent:"space-around" , padding:10}}>
              <Text style={styles.title}></Text>
            </View>
            <View style={styles.Container} >
              <FlatList
                    data={bdMsg}
                    keyExtractor={item=>item.key}
                    renderItem={({item}) => 
                    <Card style={styles.textItem}>
                  
                        <Title style={styles.textItemTitle}> {item.msgTitle}  <Badge  style={styles.textItemBadge}>{item.bagdeText}</Badge></Title> 
                        <Text style={styles.textItemDesc}> {item.msgDesc}</Text>
                    </Card>}
              />
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

