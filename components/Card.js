import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Card = (props) => {
    return (
        <View style={{...styles.card, ...props.style}} >{props.children}</View>
    )
}

export default Card

const styles = StyleSheet.create({
    card:{
        shadowColor: 'black',
        shadowOffset: {height: 2,width: 0},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 5,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10

    }
})
