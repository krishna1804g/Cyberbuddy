import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import axios from "axios"

const Scanner = ({navigation}) => {
  const handleUrlChange = (text) => {
    setUrl(text);
  };
  
  const handleButtonClick = () => {
    getVulnerability();
  };
  
  const [url, setUrl] = useState("");
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const getVulnerability = (async () => {
    try {
      setLoading(true);
      const resp = await axios.post("http://192.168.1.10:3000/check_url/", {
        url: url
      });
      const response = resp.data;
      console.log(response);
      if (Array.isArray(response)) {
        setVulnerabilities(response);
      } else {
        const result = [resp.data];
        setVulnerabilities(result);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  
  })
  const scanWebsite = () => {
    // Perform vulnerability scanning logic here
    // This is where you would integrate with a vulnerability scanning library or API
    // For simplicity, let's assume vulnerabilities are returned as an array of objects
    const mockVulnerabilities = [
      {
        id: 1,
        title: "Cross-Site Scripting (XSS)",
        explanation:
          "XSS allows an attacker to execute malicious scripts on web pages viewed by other users.",
      },
      {
        id: 2,
        title: "SQL Injection",
        explanation:
          "SQL Injection allows an attacker to manipulate a database by injecting malicious SQL code.",
      },
      {
        id: 3,
        title: "Insecure Direct Object References",
        explanation:
          "Insecure Direct Object References allow an attacker to access unauthorized resources or data.",
      },
    ];

    // setVulnerabilities(mockVulnerabilities);
  };

  const handleVulnerabilityPress = (vulnerability) => {
    <Text>vulnerability</Text>
    Alert.alert(vulnerability.title, vulnerability.explanation, [
      { text: "Close", onPress: () => {} },
    ]);
  };

  const handleClear = () => {
    setUrl("");
    setVulnerabilities([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Ionicons
            name="menu"
            size={24}
            style={styles.headerMenuIcon}
          />
        </TouchableOpacity>
        <MaskedView
          maskElement={
            <Text
              style={[styles.headerTitle, { backgroundColor: "transparent" }]}
            >
              Scanner
            </Text>
          }
        >
          <LinearGradient
            colors={["red", "black"]}
            start={[0.5, 0]}
            end={[1, 1]}
            style={styles.yellowHeader}
          >
            <Text style={[styles.headerTitle, { opacity: 0 }]}>Scanner</Text>
          </LinearGradient>
        </MaskedView>
      </View>

      <TextInput
      style={styles.input}
      placeholder="Enter website URL"
      onChangeText={handleUrlChange}
      value={url}
    />
    {/* <Button title="Check Vulnerabilities" onPress={handleButtonClick} /> */}

    {/* {vulnerabilities.map((vulnerability, index) => (
      <TouchableOpacity key={index} onPress={() => handleVulnerabilityPress(vulnerability)}>
        <Text>{vulnerability}</Text>
      </TouchableOpacity>
    ))} */}

      <TouchableOpacity onPress={handleButtonClick} style={styles.scan}>
        <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
          Scan
        </Text>
      </TouchableOpacity>
<ScrollView>
      {/* <ScrollView style={styles.vulnerabilitiesContainer}>
        <Text style={styles.vulnerabilitiesTitle}>Vulnerabilities:</Text>
        {vulnerabilities.map((vulnerability, index) => (
          <TouchableOpacity
            key={index}
            style={styles.vulnerabilityItem}
            onPress={() => handleVulnerabilityPress(vulnerability)}
          >
            <Text style={styles.vulnerabilityTitle}>{vulnerability.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView> */}
      {/* <ScrollView>
        vulnerable.map((){

        })
      </ScrollView> */}

       {/* Render loading animation or vulnerabilities */}
    {loading ? (
      <ActivityIndicator size="large" color="blue" />
    ) : (
      vulnerabilities.map((vulnerability, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleVulnerabilityPress(vulnerability)}
          style={styles.vulnerabilityBlock}
        >
          <Text style={styles.vulnerabilityText}>{vulnerability}</Text>
        </TouchableOpacity>
      ))
    )}
     {vulnerabilities.length > 0 && (
        <>
          <TouchableOpacity onPress={handleClear} style={styles.clear}>
            <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>Clear</Text>
          </TouchableOpacity>
        </>
      )}
      </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    height: 70,
    backgroundColor: "#fff",
    elevation: 50,
  },
  headerTitle: {
    fontSize: 30,
    color: "#000",
    marginTop: 18,
    paddingLeft: 70,
  },
  headerMenuIcon: {
    color: "#000",
    top: 10,
    marginLeft: 20,
  },
  yellowHeader: {
    textAlign: "center",
    marginTop: -5,
    marginRight:130
  },

  input: {
    height: 40,
    marginBottom: 10,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 25,
    width: 300,
    alignSelf: "center",
    padding:5,
    borderRadius:10
  },
  scan: {
    backgroundColor: "black",
    width: 100,
    borderRadius: 20,
    alignSelf: "center",
    padding: 5,
    height: 40,
  },
  vulnerabilitiesContainer: {
    marginTop: 20,
    marginLeft:10
  },
  vulnerabilitiesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  vulnerabilityItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  vulnerabilityTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  clear:{
    backgroundColor: "black",
    width: 200,
    borderRadius: 20,
    alignSelf: "center",
    padding: 5,
    height: 40,
  },
  vulnerabilityBlock: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  vulnerabilityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default Scanner;
