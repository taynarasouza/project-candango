import React from "react";
import { View,StyleSheet, ScrollView, FlatList } from "react-native";
import { Appbar, BottomNavigation,Avatar,Text, Card, Paragraph, Title, Badge  } from "react-native-paper";

/** -------------------CIRCUITOS INICIO ----------------- */
const CircuitsView = () => <Text>Circuitos</Text>;

/** -------------------CIRCUITOS FIM ----------------- */

/** -------------------MEDALHAS INICIO ----------------- */

const Medal = ({src, hasMedal}) => {
  let style = {};
  if (hasMedal)
    style = {opacity: .2};
  return (
    <View style={styles.item}>
      <Avatar.Image
       {...style}
         source={src}
       
      />
    </View>
  )
};

const medals = [
  {id: 1, src:{uri: 'http://candango.ngrok.io/api/candango/imagem/catedral'}},
  {id: 2, src:{uri: 'http://candango.ngrok.io/api/candango/imagem/congresso'}},
  {id: 3, src:{uri: 'http://candango.ngrok.io/api/candango/imagem/dombosco'}},
  {id: 4, src:{uri: 'http://candango.ngrok.io/api/candango/imagem/estadio'}},
  {id: 5, src:{uri: 'http://candango.ngrok.io/api/candango/imagem/igrejinha'}},
  {id: 6, src:{uri: 'http://candango.ngrok.io/api/candango/imagem/memorialjk'}},
  {id: 7, src:{uri: 'http://candango.ngrok.io/api/candango/imagem/museu'}},
  {id: 8, src:{uri: 'http://candango.ngrok.io/api/candango/imagem/parquedacidade'}},
  {id: 9, src:{uri: 'http://candango.ngrok.io/api/candango/imagem/semmedalha'}},
  {id: 10, src:{uri: 'http://candango.ngrok.io/api/candango/imagem/torredetv'}},

];

const MedalsView = ({ navigation }) =>  {
  return (
    <>
      <View style={{flexDirection: 'row', justifyContent:"space-around" , padding:15}}>
        <Text style={styles.title}>Medalhas</Text>
      </View>
        
      <ScrollView contentContainerStyle={styles.view}>
          {medals.map((medal, i) => (
            <Medal
              key={medal.id}
              src={medal.src}
            
            />
          ))}
      </ScrollView>
    </>
  );
}


const styles = StyleSheet.create ({
  title:{
    fontSize:25,
    color:'blue',


  },
  view : {
    marginTop : 20,
    marginLeft : 20,
    width:'100%',
    display:'flex',
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent:'flex-start',
    alignItems: "center"
  },
  item: {
    marginRight : 20,
    marginTop: 20,
    shadowOpacity: .8,
    shadowColor: "#9e9e9e",
    shadowRadius: 3
  }
});
/** -------------------MEDALHAS FIM ----------------- */
/** ------------------- INFORMAÇÕES INICIO ----------------- */
const InfoView = () =>  {
  const bdMsg=[
    {key: 1, bagdeText: 'Novo',  msgTitle: 'Sistema' ,msgDesc: 'Atualização acontecerá no dia 06/06/2021 de 2h as 9h'},
    {key: 2, bagdeText: 'Novo',  msgTitle: 'Novidades' ,msgDesc: 'Novos pontos turisticos foram adicionados,aventureiros rumo a novas conquistas'},
    {key: 3, bagdeText: 'Novo',  msgTitle: 'Novidades' ,msgDesc: 'Nova funcionalidade implementada no perfil de Usuario funcionalidade implementada no perfil de Usuario'},
    {key: 4, bagdeText: 'Novo',  msgTitle: 'Novidades' ,msgDesc: 'Para tornarmos sua experiencia em Brasília mais inesquecível, atualizamos algumas funcionalidades no sistema de Premiação '},
    {key: 5, bagdeText: 'Novo',  msgTitle: 'Sistema' ,msgDesc: 'Sistema de Ranking indísponivel, em breve está novamente disponivel,agradecemos a compreensão!'},
    {key: 6, bagdeText: 'Novo',  msgTitle: 'Sistema' ,msgDesc: 'Está disponivel a nova versao do aplicativo , atualize agora mesmo!'}
  ]
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);
  return (
    <>
      <View style={{flexDirection: 'row', justifyContent:"space-around" , padding:10}}>
        <Text style={styles.title}>Informações</Text>
      </View>
      <View >
        <FlatList
              data={bdMsg}
              keyExtractor={item=>item.key}
              renderItem={({item}) => 
              <Card style={styleText.textItem}>
                  <Badge  style={styleText.textItemBadge}>{item.bagdeText}</Badge>
                  <Title style={styleText.textItemTitle}> {item.msgTitle}</Title> 
                  <Paragraph style={styleText.textItemDesc}> {item.msgDesc}</Paragraph>
              </Card>}
        />
        </View>
     
    </>

  
  );
};
/*------------------------------------STYLES ----------------------------------------*/
const styleText =StyleSheet.create({
  textItem:{
    padding:15,
    marginVertical: 3,
    marginHorizontal: 30,
  },
  textItemTitle:{
    flex:1,
    fontSize:20,
    color:'#34495e',
    fontWeight:"bold",
    textAlign: "justify",
    alignItems:"flex-start",
    
  },
  textItemDesc:{
    flex:1,
    fontSize:16,
    color:'#34495e',
    fontWeight:"bold",
    textAlign: "justify",

    
  },
  textItemBadge:{
    fontSize:10,
    color:'#fff',
    height:30,
    textAlign: "right",
    backgroundColor: "#00ff00"
    },
  textItemViewed:{
    padding:15,
    marginVertical: 3,
    marginHorizontal: 1,
  
    },


})
/** ------------------- INFORMAÇÕES FIM ----------------- */
export default function BagView({ navigation }) {

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'circuitos', title: 'Circuitos', icon: 'information-outline' },
    { key: 'medalhas', title: 'Medalhas', icon: 'album' },
    { key: 'informacoes', title: 'Informações', icon: 'information-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    circuitos: CircuitsView,
    medalhas: MedalsView,
    informacoes: InfoView,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  )
}

BagView.navigationOptions = ({ navigation }) => ({
  title: 'Mochila',
});