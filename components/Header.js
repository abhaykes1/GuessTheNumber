import React from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import colors from '../constants/colors'
import fontStyles from '../constants/fontStyles'

const Header = (props) => {
    return (
        <View style={{
                ...styles.headerBase, 
                ...Platform.select({
                    ios: styles.headerIOS,
                    android: styles.headerAndroid 
                })
            }}>
            <Text style={{...fontStyles.title, ...styles.title}}>{props.title}</Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    headerBase:{
        width: '100%',
        height: 90,
        paddingTop: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerIOS:{
        backgroundColor: 'white',
        borderBottomColor: '#ccc',
        borderBottomWidth:1 ,
    },
    headerAndroid:{
        backgroundColor:colors.primary,
    },
    title:{
        color: Platform.OS === 'ios' ? colors.primary : 'white'
    } 
})
