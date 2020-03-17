import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native'
import Card from '../components/Card'
import colors from '../constants/colors'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'
import fontStyles from '../constants/fontStyles'
import MainButton from '../components/MainButton'


const StartGameScreen = (props) => {

    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width/4);

    

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width/4);
        }
    
        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change',updateLayout)
        }
    })

    const numberInputHandler = (inputText) => {
        setEnteredValue(inputText.replace(/[^0-9]/g,''))
    }

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if(isNaN(chosenNumber) || chosenNumber<=0 || chosenNumber>99)
        {
            Alert.alert(
                'Invalid Number!',
                'Number has to be a number between 1 and 99',
                [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]
            )
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    }

    let confirmedNumber;
    if(confirmed)
    {
        confirmedNumber = 
            <Card style={styles.summaryContainer}>
                <Text>You Selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectedNumber)}>
                    START GAME
                </MainButton>
            </Card>    
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => {
                    Keyboard.dismiss();
                    }}>
                    <View style={styles.screen}>
                        <Text style={{...fontStyles.title, ...styles.title}}>Start a New Game!</Text>
                        <Card style={styles.inputContainer}>
                            <Text style = {fontStyles.bodyText}>Select a Number</Text>
                            <Input style={styles.input} 
                                blurOnSubmit 
                                autoCapitalize='none' 
                                autoCorrect={false} 
                                keyboardType='number-pad' 
                                maxLength={2} 
                                onChangeText={numberInputHandler}
                                value={enteredValue}
                            />
                            <View style={styles.buttonContainer}>
                                <View style={{width: buttonWidth}}><Button title='Confirm' onPress={confirmInputHandler} color={colors.primary}/></View>
                                <View style={{width: buttonWidth}}><Button title='Reset' onPress={resetInputHandler} color={colors.accent}/></View>
                            </View>
                        </Card>
                        {confirmedNumber}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default StartGameScreen

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding: 10,
        alignItems: 'center',

    },
    title:{
        marginVertical:10

    },
    inputContainer: {
        width: '80%',
        maxWidth:'95%',
        minWidth: 300,
        alignItems: 'center',

    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    // button:{
    //     width: Dimensions.get('window').width /4
    // },
    input:{
        width: 50,
        textAlign: 'center'
    },
    summaryContainer:{
        marginTop: 20,
        alignItems: 'center'
    }
})
