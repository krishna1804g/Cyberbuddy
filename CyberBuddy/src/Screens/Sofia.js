import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet ,ScrollView } from 'react-native';
import axios from "axios"


const Sofia = ({navigation}) => {
  const [url, setUrl] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [hiddenText, setHiddenText] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [imgResp, setImagResp] = useState("")
  const handleUrlChange = (text) => {
    setUrl(text);
  };
  
// give image link and message to backend
  const post_data = (()=>{
    axios.post("http://192.168.1.10:3000/post/image/text/data",{
      url,
      hiddenText
    }).then(resp =>{
      console.log(resp.data)
      setImagResp(resp.data)
    }).catch(e=>{
      console.error(e)
    })
  })

  const handleImageFetch = () => {
    // Fetch the image based on the URL and update the imageUri state
    // Example implementation using fetch:
    
    fetch(url)
      .then((response) => response.url)
      .then((uri) => setImageUri(uri))
      .catch((error) => console.error(error));
  };

  const handleHiddenTextChange = (text) => {
    setHiddenText(text);
  };

  const handleEncrypt = () => {
    // Implement encryption logic for hiddenText and update the encryptedText state
    // Example implementation using a simple Caesar cipher:
    post_data()
    
    const shift = 1;
    const encrypted = hiddenText
      .split('')
      .map((char) => String.fromCharCode(char.charCodeAt(0) + shift))
      .join('');
    setEncryptedText(encrypted);
  };

  const handleDownload = () => {
    // const fileUrl = imgResp; // Replace with your file URL
  
    // // Get the file name from the URL
    // const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
  
    // // Define the file path where the downloaded file will be saved
    // const filePath = `${RNFetchBlob.fs.dirs.DownloadDir}/${fileName}`;
  
    // // Start the file download
    // RNFetchBlob.config({
    //   fileCache: true,
    //   path: filePath,
    // })
    //   .fetch('GET', fileUrl)
    //   .then((res) => {
    //     console.log('File downloaded:', res.path());
    //     // Handle the downloaded file as needed
    //   })
    //   .catch((error) => {
    //     console.error('Error downloading file:', error);
    //   });
  };
  

  const handleDecrypt = () =>{
    navigation.navigate('Decrypt')
  };

  const handleReset = () => {
    setUrl('');
    setImageUri('');
    setHiddenText('');
    setEncryptedText('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style = {styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Encryption and Decryption</Text>
        </View>
      </View>
      <View>
      <Text style={styles.title}>Encrypt</Text>
      </View>
      <Text style={styles.text}>
        Enter the URL:
      </Text>
      <TextInput
      style={styles.textInput}
        value={url}
        onChangeText={handleUrlChange}
        placeholder="Enter Here"
      />
      <Button title="Fetch Image" onPress={handleImageFetch} style={styles.fetchButton}/>
      {imageUri !== '' && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Text style={styles.Htext}>
        Enter the Hidden Text:
      </Text>
      <TextInput
        value={hiddenText}
        onChangeText={handleHiddenTextChange}
        placeholder="Enter here"
        style={styles.HtextInput}
      />
      <View style={styles.buttonRow}>
        <Button title="Download" onPress={handleDownload} />
        <Button title="Reset" onPress={handleReset} />
        <Button title="Encrypt" onPress={handleEncrypt} />
      </View>
      <TextInput>{imgResp.image_uri}</TextInput>
      <View style = {styles.decrypted}>
      <Button title="Decrypt" onPress={handleDecrypt} />
      </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
    header: {
      backgroundColor: '#5FD4DB',
      padding: 10,
      marginTop:50,

    },
    mainContainer:{
        justifyContent:'center',
       // alignItems:'center',
    },
    fetchButton:{
        width:'40%',
    },
    headerText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    container:{
        paddingBottom:10,
    },
    text:{
        marginBottom:20,
        fontSize:16,

    },
    Htext:{
        //marginBottom:20,
        fontSize:16,
        marginTop:10,
    },


    title: {
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 10,
        marginBottom:30,
      },
      textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        marginBottom: 10,
       // width:400,
      },
      HtextInput:{
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        marginBottom: 10,
        marginTop:20,
      },
      image: {
        marginTop:20,
        width: 300,
        height: 300,
      },
      buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        margin:60,
      },


});
  

export default Sofia;