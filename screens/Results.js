import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import { FONTS, COLORS, SIZES } from "../constants/theme.js"
import { ICONS } from "../constants/icons.js"
import ResultCard from '../components/ResultCard.js';


const Results = function({route, navigation}){

    const [errorMsg, setErrorMsg] = useState(null);
    const [responseMsg, setResponseMsg] = useState('');

    const APP_KEY = 'edaf40f6b8e73418600e642c64c17e97'
    const APP_ID = '8bf92b34'

    const searchQuery = route.params.searchQuery;
    const excluded = route.params.excluded;

    var responseBreakdown = [];

    var recipesRetrieved = [];

    useEffect( () => {
        getRecipes()
    }, [extractRecipes()])

    const getRecipes = async () =>{

        var url = `https://api.edamam.com/search?app_id=${APP_ID}&app_key=${APP_KEY}`

        if(!excluded){
            console.log("included")
            url += `&q=${searchQuery}`
        } else {
            console.log("excluded")
            url += `&q=${searchQuery}` /////////////////////
        }

        const response = await fetch(url,{
            method:"GET",
            headers:{
                Accept:'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response)=>response.json())
        .then((json)=>{
            setResponseMsg(JSON.stringify(json));
        })
        .catch((error)=>{
            setErrorMsg(error);
            console.log("Error: " + errorMsg)
        })
        
    }

    function extractRecipes(){
                
        var newResponse = responseMsg;
        
        // the first item in array will be the labels 
        // the next N items are each recipes
        responseBreakdown = newResponse.split('"recipe":')
        
        for (var i=1; i<responseBreakdown.length; i++){
            var temp = responseBreakdown[i].split('"dietLabels"')
            recipesRetrieved.push(temp);
        }

        // console.log("BREAKDOWN: "+ recipesRetrieved)

    }

    function renderHeader(){
        
        {getRecipes()}

        return(         
    
            <View style={styles.headerContainer}>
                
                {/* back button */}
                <TouchableOpacity 
                    style={styles.headerBackButton}
                    onPress={()=>navigation.goBack()}
                >
                    <Image
                        source={ICONS.back}
                        style={{width:15, height:15, tintColor:COLORS.lightGrey}}
                    />
                </TouchableOpacity>
                
                {/* text */}
                <View style={styles.textContainer}>
                    <Text style={styles.headerText}>Showing Results for:</Text>
                    <Text style={styles.headerText}>{searchQuery}</Text>
                </View>

                <View style={styles.spacer} />                

            </View>
        )
    }

    return(
                   
            <SafeAreaView style={{flex:1, backgroundColor:COLORS.white}}>

            {renderHeader()}

                <FlatList
                    data={recipesRetrieved}
                    keyExtractor={item => {item.key}}
                    keyboardDismissMode='on-drag'
                    showsVerticalScrollIndicator={false}
                    renderItem={({item})=>{
                        return(
                            <ResultCard
                                containerStyle={{marginHorizontal: SIZES.padding}}
                                categoryItem={item}
                                onPress={()=>console.log((item))}
                            />
                        )
                      }}
                />
            </SafeAreaView>

    )
}

const styles = StyleSheet.create({

    headerContainer: {
        flexDirection: 'row',
        paddingHorizontal: 30,
        alignItems: 'center',
        backgroundColor: COLORS.grey2,
    },

    textContainer: {
        height: 80,
        flex: 1,
        justifyContent: 'center',
    },
    
    headerBackButton: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        width: 35,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: COLORS.lightGrey,
        backgroundColor: COLORS.transparentBlack5
    },
    
    spacer: {
        width: 35,
        backgroundColor: COLORS.transparent
    },

    headerText: {
        marginTop: 3,
        textAlign: 'center',
        color: COLORS.black,
        ...FONTS.body3
    }
})


export default Results;