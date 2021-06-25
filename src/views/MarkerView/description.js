import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const MAX_HEIGHT = 216;
const MAX_LINES = 10;

const Description = ({description}) => {
  const [show, setShow] = React.useState(false);
  const [toggled, setToggled] = React.useState(false);
  
  const handleTextLayout = e => {
    const shownText = e.nativeEvent.lines.slice(0, MAX_LINES).map((line) => line.text).join('');
    const hiddenText = description.substring(shownText.length);
    
    if (hiddenText.length > 0)
      setShow(true);
  }

  const handleToggle = () => {
    setToggled(prevState => !prevState);
  }

  const toggleText = toggled ? "Ver menos" : "Ver mais";

  return (
    <View style={styles.descriptionView}>
      <Text style={styles.label}>
        Sobre
      </Text>
      <View>
        <Text 
          style={styles.scrollText}
          numberOfLines={toggled ? undefined : MAX_LINES}
          onTextLayout={handleTextLayout}
        >
          {description}
        </Text>
        {show && (
          <Text 
            onPress={handleToggle}
            style={{color: "#000099"}}
          >
            {toggleText}
          </Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: 20,
    color: "rgba(0,0,0,.5)",
    marginBottom: 5
  },
  descriptionView: {
    marginTop: 5,
    width: "100%",
    // minHeight: 300,
    // maxHeight: 400,
  },
  scroll: {
    maxHeight: 300
  },
  scrollText: {
    fontSize: 16,
    textAlign: "justify",
    color: "rgba(0,0,0,.85)"
  }
});

export default Description;