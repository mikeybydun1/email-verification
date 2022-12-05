// Importing
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import React, { useState, useEffect, Component } from 'react';
import  { useNavigation } from "@react-navigation/stack";
import Dashboard from './Dashboard';
import { isSearchBarAvailableForCurrentPlatform } from 'react-native-screens';
import axios from 'axios';

var final_email = ""; // The input email

const Login = ({ navigation }) => {

    const [email, setEmail] = useState(''); // Const var for the email
    
    // The function calls when the user sends the email
    const onSendingMail = () => {    
        
        final_email = email
        var server_response = ""; // The server response
        
        // Axios post request for sending the input email
        axios.post('http://10.0.2.2:5001/submitemail', {email: final_email})
        .then((res) => {
            server_response = res.data
            // User is not in the DB
            if(server_response == "notUser") {
              alert("המייל שרשמת לא רשום במערכת. נסה שוב לרשום מייל שרשום במאגר הנתונים.")
            }
            // The user email is not valid
            else if(server_response == "not valid") {
              alert("כתובת המייל אינה תקינה, נסה שוב.")
            }
            // The user in the DB - redirecting to Dashboard.js
            else if(server_response == "user") {
              alert("המייל שלך רשום במערכת. ברגע זה נשלח אליך קוד אישור בן 6 ספרות לכתובת המייל שהזנת. שים לב: ייתכן והמייל ישלח לתיבת הספאם.")
              navigation.navigate("Code Entering")
            }
        }).catch((error) => {
            console.log(error)
        })
        
    }

   
    return (
           
        <View style={style.container}>
            <Text style={style.title}>
            ✨ התחברות ✨
            </Text>
            
            <View style={{marginTop:40}}>
                <TextInput
                    style={style.input}
                    inputStyle={style.inputStyle}
                    labelStyle={style.labelStyle}
                    placeholderStyle={style.placeholderStyle}
                    textErrorStyle={style.textErrorStyle}
                    placeholder="הכנס מייל:"
                    placeholderTextColor="gray"
                    showIcon = {true}  
                    onChangeText = {(val) => setEmail(val)}
                />
            </View>
            
            <TouchableOpacity
                 style={style.button}
                 onPress={onSendingMail}

            >
                <Text style={style.buttonText}>בואו נתחיל 👆</Text>
            </TouchableOpacity>
       
        </View>
    )  
}

export default Login // Exporting


// Styling of the screen
const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        marginTop: 100,
        
    },
    buttonText: {
        color: "white",
        fontSize: 17
    },  
    title: {
        fontSize: 35,
        fontWeight: "400",

    },
    
    button: {
        marginTop: 20,
        height: 40,
        width: 160,
        backgroundColor: '#00cc99',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },  
    input: {
      marginBottom: 25,
      width: 250,
      height: 45,
      paddingHorizontal: 68,
      borderRadius: 8,
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    inputStyle: { fontSize: 16 },
    labelStyle: { fontSize: 14 },
    placeholderStyle: { fontSize: 16, alignItems:'left',},
    textErrorStyle: { fontSize: 16 }, 
    
    
    
    
})
