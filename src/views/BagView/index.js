import React from "react";
import { View,StyleSheet, ScrollView, FlatList } from "react-native";
import { Appbar, BottomNavigation,Avatar,Text, Card, Paragraph, Title, Badge,Surface  } from "react-native-paper";


/** -------------------CIRCUITOS INICIO ----------------- */
const CircuitsView = ({ navigation }) =>  {return (
  <>
    <View style={{flexDirection: 'row', justifyContent:"space-around" , padding:15}}>
      <Text style={styles.title}>Circuitos</Text>
    </View>
    </>
  );
}

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

/** -------------------MEDALHAS FIM ----------------- */
/** ------------------- INFORMAÇÕES INICIO ----------------- */
const InfoView = () =>  {
 
  return (
    <>
      <View style={{flexDirection: 'row', justifyContent:"space-around" , padding:10}}>
        <Text style={styles.title}>Informações</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent:"center" , padding:10}}>

        <Surface style={styles.surface}>

        <Title style={styles.titleVersion}>Versão </Title>
        <Paragraph style={styles.descVersion}>1.0</Paragraph>

        <Title style={styles.titleVersion}>Email </Title>
        <Paragraph style={styles.descVersion}>candangoapp@gmail.com </Paragraph>

        </Surface>
      </View>



    </>

  
  );
};

/*------------------------------------STYLES ----------------------------------------*/
const styles =StyleSheet.create({
  
  titleVersion:{
    fontSize:15, 
    textAlign:'center', 
    fontStyle:'italic', 
    color:'#808080'
    },
  descVersion:{
      fontSize:20 , 
      textAlign:'center', 
      color:'#4F4F4F'
    },
  surface: {  
      height: 200,
      width: '80%',
      justifyContent: 'center',
      elevation: 5,
      borderRadius: 20
     

    },
/*------ Medalha Styles ----*/

      title:{
        fontSize:25,
        color:'blue'
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