import React, { useEffect, useState } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import Tabs from "./navigation/tabs.js";
import Landing from './screens/Landing';
import Login from './screens/Login';
import Recipe from './screens/Recipe';
import Search from './screens/Search';
import Results from './screens/Results';
import Bookmarks from './screens/Bookmarks';
import BookmarkRecipe from './screens/BookmarkRecipe';

const Stack = createStackNavigator();

export default function App({navigation}) {

  return (

    <NavigationContainer>  
      
      <Stack.Navigator initialRouteName={'Landing'}>
        
        <Stack.Screen name="Landing" component={Landing} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={Tabs} options={{headerShown: false}} />
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="Recipe" component={Recipe} options={{headerShown: false}} />
        <Stack.Screen name="Search" component={Search} options={{headerShown: false}} />
        <Stack.Screen name="Results" component={Results} options={{headerShown: false}} />
        <Stack.Screen name="Bookmarks" component={Bookmarks} options={{headerShown: false}} />
        <Stack.Screen name="BookmarkRecipe" component={BookmarkRecipe} options={{headerShown: false}} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
