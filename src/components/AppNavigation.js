// IMPORTAÇÃO DAS ROTAS DO APP
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// IMPORTAÇÃO USESTATE e USEEFFECT
import { useState, useEffect } from "react";

// IMPORTANDO AS PÁGINAS EXISTENTES
import HomeScreen from "../pages/HomeScreen";
import LoginScreen from "../pages/LoginScreen";
import MovieScreen from "../pages/MovieScreen"

// DECLARANDO STACK NAVIGATOR
const Stack = createNativeStackNavigator();

//IMPORTANDO ASYNC STORAGE
import { getItem } from "./AsyncStorage";

export default function AppNavigation() {
  const [LoggedIn, setLoggedIn] = useState(null)

  useEffect(() => {
    checkIfAlredyLoggedIn();
  }, [])

  const checkIfAlredyLoggedIn = async () => {
    let login = await getItem("login")

    console.log(login)
    console.log(typeof login)

    if (login === "1") {
      setLoggedIn(false)
    } else {
      setLoggedIn(true)
    }
  }

  // IF DE SEGURANÇA - Se não tiver encontrado nada, retorna nada
  if (LoggedIn === null) {
    return null
  }

  // Esse IF funciona caso o usuário nunca tiver entrado na tela LOGIN,
  // fazendo que ele seja redirecionado para essa tela antes de ir para HOME
  if (LoggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MovieScreen" component={MovieScreen} options={{ headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>
    )

    // Esse ELSE funciona caso o usuário já tenha entrado na tela de LOGIN,
    // fazendo que ele seja redirecionado para a tela HOME diretamente.
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MovieScreen" component={MovieScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
