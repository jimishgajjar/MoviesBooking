import * as React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import MoviesListScreen from "./src/screens/MoviesListScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import CustomHeader from "./src/components/CustomHeader/CustomHeader";
import MovieDetailsScreen from "./src/screens/MovieDetailsScreen";
import BookingsScreen from "./src/screens/BookingsScreen";
import SplashScreen from "./src/screens/SplashScreen";
import TicketBookingScreen from "./src/screens/TicketBookingScreen";
import RegisterScreen from "./src/screens/RegisterScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          size = focused ? 30 : 25;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Movies") {
            iconName = focused ? "film" : "film-outline";
          } else if (route.name === "BookingsScreen") {
            iconName = focused ? "ticket" : "ticket-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return (
            <View style={focused ? styles.focusedIcon : styles.defaultIcon}>
              <Icon
                name={iconName}
                size={size}
                color={focused ? "white" : color}
              />
            </View>
          );
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "500",
        },
        tabBarStyle: {
          height: 60,
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarActiveBackgroundColor: "#dc3558",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: ({ navigation }) => (
            <CustomHeader
              title="It All Starts Here!"
              subtitle="Explore movies"
              navigation={navigation}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Movies"
        component={MoviesListScreen}
        options={{
          header: ({ navigation }) => (
            <CustomHeader title="All Movies" navigation={navigation} />
          ),
        }}
      />
      <Tab.Screen
        name="BookingsScreen"
        component={BookingsScreen}
        options={{
          header: ({ navigation }) => (
            <CustomHeader title="All Your Bookings" navigation={navigation} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          header: ({ navigation }) => (
            <CustomHeader title="Profile" navigation={navigation} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen
          name="MovieDetailsScreen"
          component={MovieDetailsScreen}
        />
        <Stack.Screen
          name="TicketBookingScreen"
          component={TicketBookingScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  defaultIcon: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  focusedIcon: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 5,
  },
});
