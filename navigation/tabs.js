import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import Home from '../screens/Home.js';
import Search from '../screens/Search.js';

import TabIcon from "../components/TabIcon.js";
import { COLORS } from '../constants/theme.js'
import { ICONS } from '../constants/icons.js'
import Bookmarks from "../screens/Bookmarks.js";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarShowLabel: false,
                style: styles.tabIcon,
                
        }}>

            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    headerShown: false,
                    tabBarIcon:({focused}) => 
                    <TabIcon focused={focused} icon={[ICONS.search,ICONS.search]} />
                }}
            />
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false, //////////////
                    tabBarIcon:({focused}) => 
                    <TabIcon focused={focused} icon={[ICONS.home,ICONS.homeFilled]} />
                }}
            />

            <Tab.Screen
                name="Bookmarks"
                component={Bookmarks}
                options={{
                    headerShown: false,
                    tabBarIcon:({focused}) => 
                    <TabIcon focused={focused} icon={[ICONS.pantry,ICONS.pantryFilled]} />
                }}
            />
            
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabIcon: {
        position:'absolute',
        bottom: 0,
        left: 0, 
        right: 0,
        elevation:0,
        backgroundColor: COLORS.white,
        borderTopColor: COLORS.transparent,
        height: 100
    }
});

export default Tabs;