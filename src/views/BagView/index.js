import React from "react";
import { View,StyleSheet, ScrollView } from "react-native";
import { Appbar, BottomNavigation,Avatar,Text, Card  } from "react-native-paper";

const CircuitsView = () => <Text>Circuitos</Text>;


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
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);
  return (
    <>
      <View style={{flexDirection: 'row', justifyContent:"space-around" , padding:15}}>
        <Text style={styles.title}>Informações</Text>
        </View>
<View>
  <ScrollView>
    <Card onPress={() => {}}  >
      <Card.Title
      title="Novidades"
      subtitle="Nova funcionalidade implementada no perfil de Usuario"
      left={(props) => <Avatar.Icon {...props} icon="chat-alert" />}

      /> 
    </Card>
    
    <Card  onPress={() => { }} style={{backgroundColor: "#EAEDED" }}>
      
      <Card.Title
        
          title="Sistema"
          subtitle="Ranking de pontuação indísponivel"
          left={(props) => <Avatar.Icon {...props} icon="chat-alert" />}
          
      />
    </Card>
    
    <Card onPress={() => { }}  >
      <Card.Title 
          title="Sistema"
          subtitle="Atualização 2.0"
          left={(props) => <Avatar.Icon {...props} icon="chat-alert" />}
          
      />
    </Card>
    <Card onPress={() => { }}  style={{backgroundColor: "#EAEDED"}}>
      <Card.Title
          title="Sistema"
          subtitle="Atualização 2.0"
          left={(props) => <Avatar.Icon {...props} icon="chat-alert" />}
          
      />
    </Card>
    </ScrollView>
  </View>
     
    </>

  
  );
};

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