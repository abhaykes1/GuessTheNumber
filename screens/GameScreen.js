import React,{useState, useRef, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, Alert, Dimensions } from 'react-native'
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import fontStyles from '../constants/fontStyles';
import MainButton from '../components/MainButton';
import {Ionicons} from '@expo/vector-icons';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random()*(max-min)) + min;
    if(rndNum===exclude){
        return generateRandomBetween(min, max, exclude)
    }
    else{
        return rndNum;
    }
}

const renderListItems = (guess, numOfRounds) => {
    return(
    <View key={guess} style={styles.listItem}>
        <Text style={fontStyles.bodyText}>#{numOfRounds}</Text>
        <Text style={fontStyles.bodyText}>{guess}</Text>
    </View>
    )
}

const GameScreen = (props) => {

    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [pastGuess, setPastGuess] = useState([initialGuess])
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width)
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height)

    useEffect(() => {
        
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
        }

        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        }
    })

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const nextGuessHandler = (direction) => {
        if(
            (direction === 'lower' && currentGuess < props.userChoice) ||
            (direction === 'greater' && currentGuess > props.userChoice)
        ){
            Alert.alert("Don\'t lie!", "You know that this is wrong...",[
                {text:'Sorry!', style:'cancel'}
            ]);
            return;
        }
        if(direction=== 'lower'){
            currentHigh.current = currentGuess;
        }
        else{
            currentLow.current = currentGuess + 1;
        }
        const nextNumber =  generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setPastGuess(curPastGuess => [nextNumber, ...curPastGuess])
    }

    const {userChoice, onGameOver} = props;

    useEffect(() => {
        if(currentGuess === userChoice ){
            onGameOver(pastGuess.length)
        } 
    },[currentGuess,userChoice, onGameOver ])

    let listStylesContainer = styles.listContainer;
    if(availableDeviceWidth < 350)
    {
        listStylesContainer = listStylesContainer
    }

    if(availableDeviceHeight<500)
    {
        return(
            <View style = {styles.screen}>
            <Text style={fontStyles.title}>Opponent's Guess</Text>
            <View style={styles.controls}>
                <MainButton  onPress={() => nextGuessHandler('lower')} >
                        <Ionicons name='md-remove' size={24} color='white' />
                    </MainButton>
                <NumberContainer>{currentGuess}</NumberContainer>
                <MainButton  onPress={() => nextGuessHandler('greater')} >
                    <Ionicons name='md-add' size={24} color='white'/>
                </MainButton>
            </View>
            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuess.map((guess, i) => renderListItems(guess, pastGuess.length-i))}
                </ScrollView>
            </View>
        </View>
        )
    }

    return (
        <View style = {styles.screen}>
            <Text style={fontStyles.title}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton  onPress={() => nextGuessHandler('lower')} >
                    <Ionicons name='md-remove' size={24} color='white' />
                </MainButton>
                <MainButton  onPress={() => nextGuessHandler('greater')} >
                    <Ionicons name='md-add' size={24} color='white'/>
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuess.map((guess, i) => renderListItems(guess, pastGuess.length-i))}
                </ScrollView>
            </View>
        </View>
    )
}

export default GameScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height >600 ? 20 : 10,
        width: 400,
        maxWidth: '90%'
    },
    listContainer: {
        width:'60%',
        flex: 1
    },
    listContainerBig:{
        width: '80%',
        flex: 1
    },
    listItem:{
        borderColor: '#ccc',
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%'
    },
    list: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexGrow: 1
    },
    controls:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%'
    }
})
