import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions, ScrollView } from 'react-native'
import fontStyles from '../constants/fontStyles'
import colors from '../constants/colors'
import MainButton from '../components/MainButton'

const GameOver = (props) => {
    return (
        <ScrollView >
            <View style = {styles.screen}>
                <Text style={fontStyles.title}>The Game is Over!</Text>
                <View style={styles.imageContainer}>
                    <Image 
                        style = {styles.image}
                        //source = {{uri:'https://www.theuiaa.org/wp-content/uploads/2017/12/2018_banner.jpg'}} 
                        source={require('../assets/success.png')} 
                        resizeMode='cover'
                        />
                </View>
                <View style={styles.resultContainer}>
                    <Text style={{...fontStyles.bodyText, ...styles.resultText}}>
                        Your Phone needed{' '}
                        <Text style={styles.highlight}>{props.numOfRounds}</Text> 
                        {' '}rounds to guess the number{' '}
                        <Text style={styles.highlight}>
                        {props.guessedNum}</Text>
                    </Text>
                </View>
                <MainButton onPress={props.onRestart} >NEW GAME</MainButton>
            </View>
        </ScrollView>
    )
}

export default GameOver

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer:{
        width: Dimensions.get('window').width* .7,
        height: Dimensions.get('window').width* .7,
        borderRadius: Dimensions.get('window').width* .7/2,
        borderColor: 'black',
        borderWidth: 3,
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height/30
    },
    highlight:{
        color: colors.primary,
        fontFamily: 'open-sans-bold'
    },
    resultText:{
        textAlign: 'center',
        fontSize: Dimensions.get('window').height <400 ? 16 : 20
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: Dimensions.get('window').height/60
    }
})
