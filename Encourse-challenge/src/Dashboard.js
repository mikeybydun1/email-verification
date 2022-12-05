import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import React, { useState, useEffect, Component, Alert } from 'react';
import Login from './Login'
import CountDown from 'react-native-countdown-component';
import axios from 'axios';

var countdown_amount = 300;

const Dashboard = ({ navigation }) => {

    const [code, setCode] = useState('');
    const [countDownId, setCountDownId] = useState(undefined);

    const onSendingCode = () => {
        
        var server_response;
        axios.post('http://10.0.2.2:5001/submitcode', {code: code})
        .then((res) => {
            server_response = res.data
            
            if(server_response == "time over") {
                alert("עברו יותר מ-5 דקות מאז שביקשת את הקוד. אם אתה מעוניין לקבל קוד חדש לחץ על הכפתור וישלח אליך קוד חדש למייל")
            }
            else if(server_response == "size error") {
                alert("הקוד צריך להכיל 6 ספרות")
            }
            else if(server_response == "wrong code") {
                alert("קוד שגוי. הקוד שהוזן כעת אינו זהה לקוד שנשלח לכתובת המייל שהוזנה")
            }
            else {
                alert("התחברת בהצלחה. שם המשתמש שלך הוא: " + server_response)
            }
        })
        
    }


    const resendEmail = () => {
        countdown_amount = 300;
        var server_response;
        axios.post('http://10.0.2.2:5001/resendcode')
        .then((res) => {})
        alert("נשלח אליך קוד חדש לכתובת המייל שהזנת. תוקפו של הקוד הוא 5 דקות.")
    }

    const prevScreen = () => {
        navigation.navigate("Login Again")
    }

    return (
        <View style={style.container}>
            <Text style={style.title}>הכנס את הקוד שקיבלת👇</Text>
            <TextInput
                    style={style.input}
                    inputStyle={style.inputStyle}
                    labelStyle={style.labelStyle}
                    placeholderStyle={style.placeholderStyle}
                    textErrorStyle={style.textErrorStyle}
                    label="Password"
                    placeholder="הכנס קוד"
                    placeholderTextColor="gray"
                    showIcon = {true}  
                    secureTextEntry = {true}
                    keyboardType="numeric"
                    onChangeText = {(val) => setCode(val)}
            />
            <TouchableOpacity
                 style={style.verifybutton}
                 onPress={onSendingCode}

            >
                <Text style={style.buttonText}>אימות קוד</Text>
            </TouchableOpacity>

            <TouchableOpacity
                 onPress={resendEmail}
                 style={style.resendmail}

            >
                <Text>שלח קוד אימות חדש📧</Text>
            </TouchableOpacity>

            <Text style={{fontSize: 18, marginTop: 50}}>⏰נשאר לך עוד...⏰</Text>

            <CountDown 
                style={style.countdown} 
                size={30}
                until={countdown_amount}
                digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#1CC625'}}
                digitTxtStyle={{color: '#1CC625'}}
                timeLabelStyle={{color: '#00b300', fontWeight: 'bold'}}
                separatorStyle={{color: '#1CC625'}}
                timeToShow={['M', 'S']}
                timeLabels={{m: "דקות", s: "שניות"}}
                showSeparator

            />

            <TouchableOpacity
                 onPress={prevScreen}
                 style={{marginTop: 160, marginRight: 199, fontSize: 19}}

            >
                <Text style={{fontSize: 19, fontWeight: "bold"}}>עמוד קודם👈</Text>
            </TouchableOpacity>
            
        
            
        </View>
    )
}

export default Dashboard


const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        marginTop: 100,
    },
    resendmail: {
        marginTop: 10,

    },  
    countdown: {
        margin: 10,
    },
    buttonText: {
      color: "white",
      fontSize: 15,
    },  
    title: {
        fontSize: 25,

    },
    verifybutton: {
        height: 30,
        width: 100,
        backgroundColor: '#00cc99',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    button: {
        marginTop: 10,
        height: 40,
        width: 160,
        backgroundColor: '#00cc99',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    }, 
    input: {
      marginTop: 15,
      marginBottom: 25,
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
    placeholderStyle: { fontSize: 16 },
    textErrorStyle: { fontSize: 16 }, 
    
})