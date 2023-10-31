import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FONTS, COLORS, SIZES } from "../constants/theme.js"
import { ICONS } from "../constants/icons.js"
import BookmarkCard from '../components/BookmarkCard.js';


const Bookmarks = function({route, navigation}){

    const [errorMsg, setErrorMsg] = useState(null);
    const [responseMsg, setResponseMsg] = useState('');

    const APP_KEY = 'edaf40f6b8e73418600e642c64c17e97'
    const APP_ID = '8bf92b34'

    var recipes = [];
    
    var recipesRetrieved = [];

    const [recipesRet, setRecipesRet] = useState([])

    useEffect( ()=>{
        retrieveRecipes()
    }, [])

    const retrieveRecipes = async () => {
        // if (recipesRet.length==0){
            try {
                const value = await AsyncStorage.getItem("recipes")
                
                if(value!=null){
                    const saved = JSON.parse(value)
                    setRecipesRet(saved)
                }
            } catch (error) {
                console.log(error)
            }

            
        // }
    }

    function clearBookmarks(){
        const removeData = async() => {
            try {
                const clearing = await AsyncStorage.clear()
                console.log("Cleared!")
            } catch (error) {
                console.log(error);
            }
        }
    }

    function renderHeader(){
        
        {retrieveRecipes()}

        return(         
    
            <View style={styles.headerContainer}>
                
                {/* back button */}
                <View style={styles.spacer}></View>
                
                {/* text */}
                <View style={styles.textContainer}>
                    <Text style={styles.headerText}>Bookmarks</Text>
                </View>

                {/* back button */}
                <TouchableOpacity 
                    style={styles.headerBackButton}
                    onPress={()=>{clearBookmarks()}}
                >
                    <Image
                        source={ICONS.bin}
                        style={{width:20, height:20, tintColor:COLORS.lightGrey}}
                    />
                </TouchableOpacity>              

            </View>
        )
    }

    function updateRecipes(){
        recipes.push(recipesRet.label,recipesRet.serving,recipesRet.source,recipesRet.uri,recipesRet.image)
        recipesRetrieved.push(recipes);
        recipes=[]
    }
    
    return(
        <SafeAreaView style={{flex:1, backgroundColor:COLORS.white}}>

            {renderHeader()}
            {updateRecipes()}

            <FlatList
                data={recipesRetrieved}
                keyExtractor={item => {recipes.label}}
                keyboardDismissMode='on-drag'
                showsVerticalScrollIndicator={false}
                renderItem={({item})=>{
                    return(
                        <BookmarkCard
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
        paddingTop:50,
        marginTop:-60,
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


export default Bookmarks;