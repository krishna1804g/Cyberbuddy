import React,{ useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const Screen1 = ({ navigation }) => {
  const nameAnimation = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    startNameAnimation();
  }, []);

  const startNameAnimation = () => {
    Animated.sequence([
      Animated.delay(500), // Delay before animation starts
      Animated.timing(nameAnimation, {
        toValue: 1,
        duration: 5500,
        useNativeDriver: true,
      }),
    ]).start();
  };
  

  const nameOpacity = nameAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  
  const nameTranslateX = nameAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });
  const nameText = "WELCOME, RAGHAV KUMAR JHA";
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Feather
            name="menu"
            size={24}
            color="white"
            style={styles.headerMenuIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>CYBER BUDDY</Text>

        <View style={styles.iconsContainer}>
          <Feather name="search" size={24} color="white" style={styles.icon} />
          <Feather name="bell" size={24} color="white" style={styles.icon} />
        </View>
      </View>
      <ScrollView style={{}}>
        <View style={{ left: 0 }}>
            <Image
        source={require("../../Images/Login.jpeg")}
        style={styles.headerImage}
        resizeMode="cover"
            />
          
            <Animated.Text
          style={[
            styles.nameText,
            { opacity: nameOpacity },
            { transform: [{ translateX: nameTranslateX }] },
          ]}
        >
          {nameText}
        </Animated.Text>
        
           
          </View>
        <View style={[styles.rectangleContainer, { backgroundColor: "transparent" }]}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.rowContainer}
          >
           
            <TouchableOpacity style={[styles.blueContainer, { backgroundColor: "black" }]} onPress={()=>navigation.navigate('Malacious')}>
              <Feather
                name="link"
                size={40}
                color="white"
                style={styles.iconInBlueContainer}
              />
              <Text style={styles.blueText}>Malicious Link</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.blueContainer, { backgroundColor: "black" }]} onPress={()=>navigation.navigate('Sofia')}>
              <MaterialCommunityIcons
                name="image"
                size={40}
                color="white"
                style={styles.iconInBlueContainer}
              />
              <Text style={styles.blueText}>Image Encryption</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.blueContainer, { backgroundColor: "black" }]} onPress={()=>navigation.navigate('Number')}>
              <Feather
                name="search"
                size={40}
                color="white"
                style={styles.iconInBlueContainer}
              />
              <Text style={styles.blueText}>Ph. number</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.blueContainer, { backgroundColor: "black" }]} onPress={()=>navigation.navigate('Phone')}>
              <Feather
                name="phone-call"
                size={40}
                color="white"
                style={styles.iconInBlueContainer}
              />
              <Text style={styles.blueText}>Sarathi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.blueContainer, { backgroundColor: "black" }]} onPress={()=>navigation.navigate('Delete')}>
              <Feather
                name="cloud-off"
                size={40}
                color="white"
                style={styles.iconInBlueContainer}
              />
              <Text style={styles.blueText}>DELETE ME</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.blueContainer, { backgroundColor: "black" }]} onPress={()=>navigation.navigate('Mask')}>
              <Feather
                name="message-circle"
                size={40}
                color="white"
                style={styles.iconInBlueContainer}
              />
              <Text style={styles.blueText}>OTP BYPASS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.blueContainer, { backgroundColor: "black" }]} onPress={()=>navigation.navigate('Metasploit')}>
              <MaterialCommunityIcons
                name="skull"
                size={40}
                color="white"
                style={styles.iconInBlueContainer}
              />
              <Text style={styles.blueText}>Metasploit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.blueContainer, { backgroundColor: "black" }]} onPress={()=>navigation.navigate('Social')}>
              <Feather
                name="users"
                size={40}
                color="white"
                style={styles.iconInBlueContainer}
              />
              <Text style={styles.blueText}>Social Engneering Attack</Text>
            </TouchableOpacity>
             <TouchableOpacity style={[styles.blueContainer, { backgroundColor: "black" }]} onPress={()=>navigation.navigate('Encryption')}>
              <Feather
                name="lock"
                size={40}
                color="white"
                style={styles.iconInBlueContainer}
              />
              <Text style={[styles.blueText]}>DOUBLE EXTENSION</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.blueContainer, { backgroundColor: "black" }]} onPress={()=>navigation.navigate('Dencoder')}>
              <Feather
                name="lock"
                size={40}
                color="white"
                style={styles.iconInBlueContainer}
              />
              <Text style={[styles.blueText]}>DOUBLE ENCODER</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View style={{flexDirection:"row"}}>
          <View style={{left:10}}>
            <Text style={{fontSize:26,fontWeight:"bold"}}>How secure is your website?</Text>
            <Text style={{fontSize:17,fontWeight:"bold",marginTop:5}}>Get analysis within minutes</Text>
            <Text style={{fontSize:12,fontWeight:"bold",marginTop:15}}>    ~ Web Security Analysis</Text>
            <Text style={{fontSize:12,fontWeight:"bold",marginTop:5}}>     ~ Cloud Architecture and Security Analysis</Text>
            <Text style={{fontSize:12,fontWeight:"bold",marginTop:5}}>     ~ Database Analysis</Text>
            <Text style={{fontSize:12,fontWeight:"bold",marginTop:5}}>     ~ System and API Security Analysis</Text>
          </View>
      
      </View>
</ScrollView>
      


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  nameText: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
    top: -30,
    color: "white",
    textAlign:"center"
  },
  headerMenuIcon: {
    top: 20,
    color: "white",
  },
  header: {
    backgroundColor: "black",
    padding: 10,
    paddingBottom: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  iconInBlueContainer: {
    marginTop: 10,
  },
  headerImage: {
    height: 400,
    width:400
  },
  blueContainer: {
    height: 100,
    width: 100,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    marginHorizontal: 10,
    elevation:10,
    borderWidth:2,
    borderColor:"grey"
  },
  rectangleContainer: {
    paddingTop: 10,
    height: 150,
    borderBottomWidth:2
  },
  blueText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    top: 20,
    marginRight: 70,
  },
  iconsContainer: {
    flexDirection: "row",
    top: 20,
  },
  icon: {
    marginLeft: 15,
    fontSize: 24,
  },
  rowContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
  },
  EarthImage:{
    height:200,
    width:200,
    marginTop:30,
    marginLeft:10
  }
});

export default Screen1;
